"use strict";
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable("Rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      room_coordinates: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      building_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Buildings",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("Carts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cart_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Carts",
          key: "id",
        },
      },
      room_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Rooms",
          key: "id",
        },
      },
      cycle_count: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.dropTable("Transactions");
    await queryInterface.dropTable("Carts");
    await queryInterface.dropTable("Rooms");
  },
};
