import { Request, Response } from "express";
import { Item, RoomItem, Room } from "../db/models";

export class ItemsController {
  async getAllItems(req: Request, res: Response) {
    try {
      const output = await Item.findAll({
        include: [
          {
            model: RoomItem,
            include: [{ model: Room, attributes: ["name"] }],
          },
        ],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: (err as Error).message });
    }
  }
}
