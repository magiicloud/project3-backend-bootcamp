"use strict";
/** @type {import('sequelize-cli').Migration} */

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Paloma Diamond",
        email: "pdiamond@gmail.com",
        profile_img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lynn Kelogg",
        email: "lynnk@gmail.com",
        profile_img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lorelai Lynch",
        email: "lorelailynch@gmail.com",
        profile_img_url: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Items", [
      {
        serial_num: "0005-84-129-C",
        item_name: "clotrimazole 1% CREAM 15G/20G",
        par_level: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serial_num: "0005-84-002-E",
        item_name: "chlorhexidine 1% CREAM 15G",
        par_level: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serial_num: "0005-84-082-C",
        item_name: "tetracycline 3% SKIN oint 15G",
        par_level: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serial_num: "0005-84-108-K",
        item_name: "betamethasone 0.025%/CLIOQUINOL 3% cream 15G",
        par_level: 250,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serial_num: "0000-21-18X-2",
        item_name: "etoricoxib <90mg> tab",
        par_level: 250,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serial_num: "0005-84-153-F",
        item_name: "KETOPROFEN 30MG PLAST(KEFENTECH)7S/8S/9S",
        par_level: 250,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serial_num: "0004-40-022-F",
        item_name: "calcium CARBONATE 625mg tab",
        par_level: 350,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        serial_num: "0463-49-68X-9",
        item_name: "IRON POLYMALTOSE 100MG CAP",
        par_level: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Buildings", [
      {
        name: "Health Plus",
        image_size: "250px",
        building_img_url: "https://www.buildingimgurl.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkDelete("Buildings", {}, {});
    await queryInterface.bulkDelete("Items", {}, {});
    await queryInterface.bulkDelete("Users", {}, {});
  },
};
