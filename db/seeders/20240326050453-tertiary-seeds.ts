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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        building_id: 1,
        user_id: 2,
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        building_id: 1,
        user_id: 3,
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Cart_Line_Items", [
      {
        cart_id: 1,
        item_id: 1,
        quantity: 20,
        consumed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cart_id: 1,
        item_id: 2,
        quantity: 30,
        consumed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cart_id: 1,
        item_id: 3,
        quantity: 25,
        consumed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Room_Items", [
      {
        room_id: 1,
        item_id: 1,
        quantity: 20,
        uom: "TUBE",
        expiry_date: new Date("2024-12-31"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 1,
        item_id: 2,
        quantity: 30,
        uom: "TUBE",
        expiry_date: new Date("2024-06-31"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_id: 1,
        item_id: 3,
        quantity: 25,
        uom: "TUBE",
        expiry_date: new Date("2025-09-31"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkDelete("Room_Items", {}, {});
    await queryInterface.bulkDelete("Cart_Line_Items", {}, {});
    await queryInterface.bulkDelete("Building_Users", {}, {});
  },
};
