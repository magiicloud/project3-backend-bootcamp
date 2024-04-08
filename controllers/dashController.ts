import { Request, Response } from "express";
import { Op } from "sequelize";
import { Item, RoomItem, Room } from "../db/models";
import { sequelize } from "../db/models";
import { QueryTypes } from "sequelize";

export class DashController {
  async getExpiringItemsCount(req: Request, res: Response) {
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
            attributes: ["name"],
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

  async getItemsBelowParOLD(req: Request, res: Response) {
    try {
      const itemsBelowPar = await RoomItem.findAndCountAll({
        include: [
          {
            model: Item,
            attributes: ["par_level", "serial_num", "item_name"],
          },
          {
            model: Room,
            attributes: ["name"],
          },
        ],
        where: sequelize.where(
          sequelize.literal(`item.par_level * 0.5`),
          Op.gte,
          sequelize.col(`"RoomItem"."quantity"`)
        ),
        // attributes: {
        //   include: [
        //     // Include a custom attribute that flags if the quantity is below 50% of the par level
        //     [
        //       sequelize.literal(
        //         `item.par_level * 0.5 >= "RoomItem"."quantity"`
        //       ),
        //       "isBelowPar",
        //     ],
        //   ],
        // },
      });
      res.json({
        success: true,
        count: itemsBelowPar.count,
        items: itemsBelowPar.rows,
      });
    } catch (error) {
      console.error("Error getting items below par level:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get items below par level",
      });
    }
  }

  // async getItemsBelowParNEW(req: Request, res: Response) {
  //   try {
  //     const itemsBelowPar = await RoomItem.findAndCountAll({
  //       include: [
  //         {
  //           model: Item,
  //           attributes: ["par_level", "serial_num", "item_name"],
  //         },
  //         {
  //           model: Room,
  //           attributes: ["name"],
  //         },
  //       ],
  //       attributes: {
  //         include: [
  //           // Include a custom attribute that flags if the quantity is below 50% of the par level
  //           [
  //             sequelize.literal(
  //               `item.par_level * 0.5 >= "RoomItem"."quantity"`
  //             ),
  //             "isBelowPar",
  //           ],
  //         ],
  //       },
  //     });

  //     res.json({
  //       success: true,
  //       count: itemsBelowPar.count,
  //       items: itemsBelowPar.rows,
  //     });
  //   } catch (error) {
  //     console.error("Error getting items below par level:", error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Failed to get items below par level",
  //     });
  //   }
  // }

  async getItemsBelowPar(req: Request, res: Response) {
    const rawFindQuery = `SELECT * FROM
          (SELECT "Item"."id", "Item"."serial_num", "Item"."item_name", "Item"."par_level",
          (SELECT SUM(quantity) FROM "Room_Items" AS "roomItems" WHERE "roomItems"."item_id" = "Item"."id") AS "itemTotal"
          FROM "Items" AS "Item") 
          AS FilteredItems WHERE "itemTotal" <= ("par_level" * 1.5)
          ORDER BY "itemTotal" ASC;`;

    const rawCountQuery = `SELECT COUNT(*) FROM
          (SELECT "Item"."id", "Item"."serial_num", "Item"."item_name", "Item"."par_level",
          (SELECT SUM(quantity) FROM "Room_Items" AS "roomItems" WHERE "roomItems"."item_id" = "Item"."id") AS "itemTotal"
          FROM "Items" AS "Item") 
          AS FilteredItems WHERE "itemTotal" <= ("par_level" * 1.5);`;

    try {
      const itemsBelowPar = await sequelize.query(rawFindQuery, {
        type: QueryTypes.SELECT,
      });
      const countItemsBelowPar = await sequelize.query(rawCountQuery, {
        type: QueryTypes.SELECT,
      });
      // const itemsBelowPar = await Item.findAll({
      //   include: [
      //     {
      //       model: RoomItem,
      //       attributes: ["quantity", "item_id", "uom"],
      //       include: [
      //         {
      //           model: Room,
      //           attributes: ["name"],
      //         },
      //       ],
      //     },
      //   ],
      //   attributes: {
      //     include: [
      //       // Subquery to calculate the sum of quantities from RoomItems for each Item
      //       [
      //         sequelize.literal(`(
      //       SELECT SUM(quantity)
      //       FROM "Room_Items" AS "roomItems"
      //       WHERE "roomItems"."item_id" = "Item"."id"
      //     )`),
      //         "itemTotal",
      //       ],
      //     ],
      //   },
      //   where: sequelize.where(
      //     sequelize.literal(`"items"."par_level" * 0.5`),
      //     Op.gte,
      //     sequelize.col(`"items"."itemTotal"`)
      //   ),
      // });

      res.json({
        success: true,
        items: itemsBelowPar,
        count: countItemsBelowPar,
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
