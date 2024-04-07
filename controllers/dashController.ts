import { Request, Response } from "express";
import { Op } from "sequelize";
import { Item, RoomItem, Room, CartLineItem } from "../db/models";
import { sequelize } from "../db/models";

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
    try {
      const itemsBelowPar = await RoomItem.findAll({
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

      // interface RoomItemWithVirtual extends RoomItem {
      //   isBelowPar: boolean;
      // }

      // const filteredItems = itemsBelowPar.filter((item) =>
      //   (item as any).getDataValue("isBelowPar")
      // );

      res.json({ success: true, items: itemsBelowPar });
    } catch (error) {
      console.error("Error getting items below par level:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get items below par level",
      });
    }
  }
}
