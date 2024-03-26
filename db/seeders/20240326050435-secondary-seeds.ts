"use strict";
/** @type {import('sequelize-cli').Migration} */

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkInsert("Rooms", [
      {
        name: "Main Area",
        room_coordinates: "pdiamond@gmail.com",
        building_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Store Room",
        room_coordinates: "pdiamond@gmail.com",
        building_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Satellite",
        room_coordinates: "pdiamond@gmail.com",
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
