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
        order: [["id", "ASC"]],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: (err as Error).message });
    }
  }

  async getAllRooms(req: Request, res: Response) {
    try {
      const output = await Room.findAll({ order: [["id", "ASC"]] });
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

  async updateItem(req: Request, res: Response) {
    try {
      const { serialNum, quantity, expiryDate, roomSelect } = req.body;

      // Find the item by serial number
      const item = await Item.findOne({ where: { serial_num: serialNum } });

      if (!item) {
        return res.status(404).json({ error: true, msg: "Item not found." });
      }

      // Update RoomItem entries
      const updated = await RoomItem.update(
        { quantity, expiry_date: expiryDate },
        { where: { room_id: roomSelect, item_id: item.id } }
      );

      return res.json({ success: true, updated });
    } catch (err) {
      return res.status(400).json({ error: true, msg: (err as Error).message });
    }
  }

  async addNewItem(req: Request, res: Response) {
    try {
      const {
        serialNum,
        itemName,
        quantity,
        expiryDate,
        roomSelect,
        par,
        uom,
      } = req.body;

      let item = await Item.findOne({ where: { serial_num: serialNum } });

      if (item) {
        // Update existing item
        await item.update({
          item_name: itemName,
          par_level: par,
        });
      } else {
        item = await Item.create({
          serial_num: serialNum,
          item_name: itemName,
          par_level: par,
        });
      }

      // Check if a RoomItem entry exists for this item and room
      let roomItem = await RoomItem.findOne({
        where: { item_id: item.id, room_id: roomSelect },
      });

      if (roomItem) {
        // Update existing RoomItem entry
        await roomItem.update({
          quantity: quantity,
          expiry_date: expiryDate,
          uom: uom,
        });
      } else {
        // Create a new RoomItem entry

        const roomItem = await RoomItem.create({
          item_id: item.id,
          quantity: quantity as number,
          expiry_date: expiryDate as Date,
          uom: uom as string,
          room_id: roomSelect as number,
        });
      }

      return res.json({ success: true, item: item, roomItem: roomItem });
    } catch (err) {
      return res.status(400).json({ error: true, msg: (err as Error).message });
    }
  }
}
