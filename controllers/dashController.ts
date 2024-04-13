import { Request, Response } from "express";
import { Op } from "sequelize";
import { Item, RoomItem, Room } from "../db/models";
import { sequelize } from "../db/models";
import { QueryTypes } from "sequelize";

export class DashController {
  async getExpiringItemsCount(req: Request, res: Response) {
    const buildingId = req.params.buildingId;
    try {
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

      const output = await RoomItem.findAndCountAll({
        where: {
          expiry_date: {
            [Op.lt]: sixMonthsFromNow,
          },
        },
        include: [
          {
            model: Item,
            attributes: ["serial_num", "item_name"],
          },
          {
            model: Room,
            attributes: ["name", "building_id"],
            where: { building_id: buildingId },
          },
        ],
        order: [["expiry_date", "ASC"]],
      });
      res.json({ success: true, count: output.count, items: output.rows });
    } catch (error) {
      console.error("Error getting expiring items count:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get expiring items count",
      });
    }
  }

  async getItemsBelowPar(req: Request, res: Response) {
    const buildingId = req.params.buildingId;
    try {
      const itemsBelowPar = await RoomItem.findAll({
        include: [
          {
            model: Item,
            attributes: ["par_level", "serial_num", "item_name"],
          },
          {
            model: Room,
            attributes: ["name", "building_id"],
            where: { building_id: buildingId },
          },
        ],
        attributes: {
          include: [
            // Include a custom attribute that flags if the quantity is below 50% of the par level
            [
              sequelize.literal(`"RoomItem"."quantity" * 100 /item.par_level`),
              "parPercent",
            ],
          ],
        },
        where: sequelize.literal(
          // only include items 150% or below par level
          `"RoomItem"."quantity" * 100 /item.par_level <= 150`
        ),
        order: [
          // Order the results by the custom attribute isBelowPar in ascending order
          [
            sequelize.literal(`"RoomItem"."quantity" * 100 /item.par_level`),
            "ASC",
          ],
        ],
      });

      res.json({
        success: true,
        count: itemsBelowPar.length,
        items: itemsBelowPar,
      });
    } catch (error) {
      console.error("Error getting items below par level:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get items below par level",
      });
    }
  }
}
