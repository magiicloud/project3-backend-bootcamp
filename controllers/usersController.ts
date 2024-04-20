import { Request, Response } from "express";
import { User } from "../db/models";

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
