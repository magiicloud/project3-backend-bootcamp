import { Request, Response } from "express";
import { sequelize } from "../db/models";
import { Op } from "sequelize";
import {
  Item,
  RoomItem,
  Room,
  CartLineItem,
  Building,
  BuildingUser,
} from "../db/models";

export class ItemsController {
  async getAllItems(req: Request, res: Response) {
    const userId = req.params.userId;
    try {
      const result = await sequelize.transaction(async (t) => {
        const buildings = await Building.findAll({
          include: [{ model: BuildingUser, where: { user_id: userId } }],
        });
        const buildingIds = buildings.map((building) => building.id);
        const rooms = await Room.findAll({
          where: { building_id: { [Op.in]: buildingIds } },
        });
        const roomIds = rooms.map((room) => room.id);
        const output = await Item.findAll({
          include: [
            {
              model: RoomItem,
              include: [{ model: Room, attributes: ["name"] }],
              where: { room_id: { [Op.in]: roomIds } },
            },
          ],
          order: [["id", "ASC"]],
        });
        return output;
      });
      return res.json(result);
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

  async getRoomItems(req: Request, res: Response) {
    try {
      const { roomId } = req.params;
      console.log(roomId);
      const output = await Item.findAll({
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
      const roomItem = await RoomItem.findOne({
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

  async deleteItem(req: Request, res: Response) {
    try {
      const { serialNum } = req.body;

      // Find the item by serial number
      let item = await Item.findOne({ where: { serial_num: serialNum } });

      if (!item) {
        return res.status(404).json({ error: true, msg: "Item not found." });
      }

      // Delete associated RoomItem entries before deleting the Item
      await RoomItem.destroy({
        where: { item_id: item.id },
      });
      // Delete associated CartLineItem entries before deleting the Item
      await CartLineItem.destroy({
        where: { item_id: item.id },
      });

      // Delete the item after its associated RoomItem entries have been deleted
      await item.destroy();

      return res.json({
        success: true,
        msg: "Item and associated RoomItem entries deleted successfully.",
      });
    } catch (err) {
      return res.status(400).json({ error: true, msg: (err as Error).message });
    }
  }

  async deleteRoomItem(req: Request, res: Response) {
    try {
      const { serialNum, roomSelect } = req.body;

      // Find the item by serial number
      let item = await Item.findOne({ where: { serial_num: serialNum } });

      if (!item) {
        return res.status(404).json({ error: true, msg: "Item not found." });
      }

      // Attempt to delete the RoomItem entry linking the item to the specified room
      const deletionResult = await RoomItem.destroy({
        where: { item_id: item.id, room_id: roomSelect },
      });

      // Check if a RoomItem entry was deleted
      if (deletionResult === 0) {
        // No RoomItem entry was deleted, possibly because it didn't exist
        return res
          .status(404)
          .json({ error: true, msg: "Item not found in the specified room." });
      }

      // Successfully deleted the RoomItem entry
      return res.json({
        success: true,
        msg: "Item deleted from the specified room successfully.",
      });
    } catch (err) {
      return res.status(400).json({ error: true, msg: (err as Error).message });
    }
  }
}
