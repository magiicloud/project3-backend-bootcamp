import { Request, Response } from "express";
import { Item } from "../db/models";

export class ItemsController {
  async getAllItems(req: Request, res: Response) {
    try {
      const output = await Item.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: (err as Error).message });
    }
  }
}
