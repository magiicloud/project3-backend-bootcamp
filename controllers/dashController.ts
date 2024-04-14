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

    const rawFindQuery = `
      SELECT "Item"."id", "Item"."serial_num", "Item"."item_name", "Item"."par_level", COALESCE(SUM("roomItems"."quantity"), 0) AS "itemTotal"
      FROM "Items" AS "Item"
      LEFT JOIN "Room_Items" AS "roomItems" ON "roomItems"."item_id" = "Item"."id"
      LEFT JOIN "Rooms" AS "Rooms" ON "Rooms"."id" = "roomItems"."room_id"
      WHERE "Rooms"."building_id" = ${buildingId}
      GROUP BY "Item"."id", "Item"."serial_num", "Item"."item_name", "Item"."par_level"
      HAVING COALESCE(SUM("roomItems"."quantity"), 0) <= ("Item"."par_level" * 1.5)
      ORDER BY "itemTotal" ASC;
      `;

    const rawCountQuery = `
      SELECT COUNT(*)
      FROM (
          SELECT "Item"."id"
          FROM "Items" AS "Item"
          LEFT JOIN "Room_Items" AS "roomItems" ON "roomItems"."item_id" = "Item"."id"
          LEFT JOIN "Rooms" AS "Rooms" ON "Rooms"."id" = "roomItems"."room_id"
          WHERE "Rooms"."building_id" = ${buildingId}
          GROUP BY "Item"."id"
          HAVING COALESCE(SUM("roomItems"."quantity"), 0) <= ("Item"."par_level" * 1.5)
      ) AS FilteredItems;
      `;

    try {
      const itemsBelowPar = await sequelize.query(rawFindQuery, {
        type: QueryTypes.SELECT,
      });
      const countItemsBelowPar = await sequelize.query(rawCountQuery, {
        type: QueryTypes.SELECT,
      });

      res.json({
        success: true,
        items: itemsBelowPar,
        count: countItemsBelowPar,
      });
    } catch (error) {
      console.error("Error getting items below par level:", error);
    }
  }
}
