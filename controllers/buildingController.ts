import { Request, Response } from "express";
import { Building, BuildingUser, User, Room } from "../db/models";
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

// const sequelize = new Sequelize({
//   database: process.env.DB_NAME,
//   username: process.env.DB_USERNAME,
//   dialect: process.env.DB_DIALECT as Dialect,
//   models: [Building, BuildingUser, Room, User], // Import your model classes
// });

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
    // const transaction: Transaction = await sequelize.transaction();
    try {
      const newBuilding = await Building.create(building);
      rooms.map(async (obj: RoomAttributes) => {
        const newRoom = { ...obj };
        newRoom["building_id"] = newBuilding.id;
        await Room.create(newRoom);
      });
      return res.json(newBuilding);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
