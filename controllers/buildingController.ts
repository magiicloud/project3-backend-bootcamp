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
  async getBuildingsByUser(req: Request, res: Response) {
    const userEmail = req.params.userEmail;
    try {
      const user = await User.findOne({ where: { email: userEmail } });
      if (user) {
        const output = await Building.findAll({
          include: [
            {
              model: Room,
            },
            { model: BuildingUser, where: { user_id: user.id } },
          ],
        });
        return res.json(output);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: (err as Error).message });
    }
  }
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
    const userEmail = req.body.userEmail;
    try {
      const result = await sequelize.transaction(async (t) => {
        const newBuilding = await Building.create(building, {
          transaction: t,
        });
        await Promise.all(
          rooms.map(async (obj: RoomAttributes) => {
            const newRoom = { ...obj };
            newRoom["building_id"] = newBuilding.id;
            await Room.create(newRoom, { transaction: t });
          })
        );
        const user = await User.findOne({ where: { email: userEmail } });
        const newBuildingUser = {
          building_id: newBuilding.id,
          user_id: user?.id,
          admin: true,
        };
        await BuildingUser.create(newBuildingUser, { transaction: t });
      });
      return res.json(result);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
