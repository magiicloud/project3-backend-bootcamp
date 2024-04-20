import { Request, Response } from "express";
import { Building, BuildingUser, User, Room, sequelize } from "../db/models";

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
    const userId = req.params.userId;
    try {
      const output = await Building.findAll({
        include: [
          {
            model: Room,
          },
          { model: BuildingUser, where: { user_id: userId } },
        ],
      });
      return res.json(output);
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
    const userId = req.body.userId;
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
        const newBuildingUser = {
          building_id: newBuilding.id,
          user_id: userId,
          admin: true,
        };
        await BuildingUser.create(newBuildingUser, { transaction: t });
        return newBuilding;
      });
      return res.json(result);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async AddBuildingUser(req: Request, res: Response) {
    const { buildingId, newUserEmail, admin } = req.body;
    try {
      const result = await sequelize.transaction(async (t) => {
        const user = await User.findOne({ where: { email: newUserEmail } });
        if (!user) {
          throw new Error("User not found");
        } else {
          const newBuildingUser = {
            building_id: buildingId,
            user_id: user.id,
            admin: admin,
          };
          return await BuildingUser.create(newBuildingUser, { transaction: t });
        }
      });
      return res.json(result);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: true, msg: err.message });
      } else {
        return res.status(400).json({ error: true, msg: err });
      }
    }
  }
}
