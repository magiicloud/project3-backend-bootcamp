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

export class UsersController {
  async updateUser(req: Request, res: Response) {
    const user = req.body;
    try {
      const output = await User.findOrCreate({ where: user });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: (err as Error).message });
    }
  }
}
