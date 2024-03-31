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

  async findOneItem(req: Request, res: Response) {
    try {
      const { itemId } = req.params;
      const { roomId } = req.params;
      const output = await Item.findByPk(itemId, {
        include: [
          {
            model: RoomItem,
            where: { room_id: roomId },
            include: [{ model: Room, attributes: ["name"] }],
          },
        ],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: (err as Error).message });
    }
  }

  async findBySerial(req: Request, res: Response) {
    try {
      const { serialNum } = req.params;
      const { roomId } = req.params;
      const output = await Item.findOne({
        include: [
          {
            model: RoomItem,
            where: { room_id: roomId },
            include: [{ model: Room, attributes: ["name"] }],
          },
        ],
        where: { serial_num: serialNum },
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: (err as Error).message });
    }
  }
}
