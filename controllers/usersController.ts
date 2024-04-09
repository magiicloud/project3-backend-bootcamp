import { Request, Response } from "express";
import { Building, BuildingUser, User, Room, sequelize } from "../db/models";
import { Sequelize } from "sequelize-typescript";
import { Dialect, Transaction, where } from "sequelize";

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
    const { email, name, id, photoUrl } = req.body;
    try {
      const output = await User.findOrCreate({
        where: { email: email },
        defaults: {
          auth_id: id,
          email: email,
          name: name,
          profile_img_url: photoUrl,
        },
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: (err as Error).message });
    }
  }

  async findUserByEmail(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const output = await User.findOne({ where: { email: email } });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: (err as Error).message });
    }
  }
}
