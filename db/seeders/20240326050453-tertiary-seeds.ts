"use strict";
/** @type {import('sequelize-cli').Migration} */

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkInsert("Building_Users", [
      {
        building_id: 1,
        user_id: 1,
        admin: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        building_id: 1,
        user_id: 2,
        admin: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        building_id: 1,
        user_id: 3,
        admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Cart_Line_Items", [
      {
        cart_id: 1,
        item_id: 1,
        room_id: 1,
        quantity: 100,
        expiry_date: new Date("2024-12-31"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 1,
        item_id: 2,
        room_id: 3,
        quantity: 2500,
        expiry_date: new Date("2024-11-31"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 1,
        item_id: 3,
        room_id: 1,
        quantity: 250,
        expiry_date: new Date("2024-10-31"),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Room_Items", [
      {
        room_id: 1,
        item_id: 1,
        quantity: 20,
        uom: "TUBE",
        expiry_date: new Date("2024-12-31"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 2,
        item_id: 1,
        quantity: 15,
        uom: "TUBE",
        expiry_date: new Date("2024-12-31"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 1,
        item_id: 2,
        quantity: 30,
        uom: "TUBE",
        expiry_date: new Date("2024-06-31"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 3,
        item_id: 2,
        quantity: 38,
        uom: "TUBE",
        expiry_date: new Date("2024-06-31"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 1,
        item_id: 3,
        quantity: 25,
        uom: "TUBE",
        expiry_date: new Date("2025-09-31"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 1,
        item_id: 4,
        quantity: 25,
        uom: "TUBE",
        expiry_date: new Date("2025-11-31"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 1,
        item_id: 5,
        quantity: 250,
        uom: "TAB",
        expiry_date: new Date("2025-10-31"),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkDelete("Room_Items", {}, {});
    await queryInterface.bulkDelete("Cart_Line_Items", {}, {});
    await queryInterface.bulkDelete("Building_Users", {}, {});
  },
};
