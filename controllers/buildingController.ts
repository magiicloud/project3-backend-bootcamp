import { Request, Response } from "express";
import { Building, BuildingUser, User, Room, sequelize } from "../db/models";
import { Sequelize } from "sequelize-typescript";
import { Dialect, Transaction } from "sequelize";

interface RoomAttributes {
  name: string;
  left: Float64Array;
  top: Float64Array;
  width: Float64Array;
  height: Float64Array;
  building_id: number;
}

export class BuildingsController {
  async getAllBuildings(req: Request, res: Response) {
    try {
      const output = await Building.findAll({
        include: [
          {
            model: Room,
          },
        ],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: (err as Error).message });
    }
  }

  async AddNewBuilding(req: Request, res: Response) {
    const building = req.body.building;
    const rooms = req.body.rooms;
    const transaction: Transaction = await sequelize.transaction();
    try {
      const newBuilding = await Building.create(building, {
        transaction,
      });
      rooms.map(async (obj: RoomAttributes) => {
        const newRoom = { ...obj };
        newRoom["building_id"] = newBuilding.id;
        await Room.create(newRoom, { transaction });
      });
      await transaction.commit();
      return res.json(newBuilding);
    } catch (err) {
      await transaction.rollback();
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
