"use strict";
/** @type {import('sequelize-cli').Migration} */

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkInsert("Rooms", [
      {
        name: "Bedroom",
        left: 12,
        top: 17,
        height: 30,
        width: 17,
        building_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Store Room",
        left: 12,
        top: 49,
        height: 23.5,
        width: 7,
        building_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Kitchen",
        left: 68,
        top: 58,
        height: 27,
        width: 21,
        building_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Carts", [
      {
        active: true,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: false,
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        active: false,
        user_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Transactions", [
      {
        cart_id: 1,
        room_id: 1,
        cycle_count: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkDelete("Transactions", {}, {});
    await queryInterface.bulkDelete("Carts", {}, {});
    await queryInterface.bulkDelete("Rooms", {}, {});
  },
};
