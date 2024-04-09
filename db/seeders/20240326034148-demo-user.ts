"use strict";
/** @type {import('sequelize-cli').Migration} */

import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkInsert("Users", [
      {
        auth_id: "lkajlsdliiosvnlk",
        name: "Paloma Diamond",
        email: "pdiamond@gmail.com",
        profile_img_url: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        auth_id: "akjshfkjhgoivknlas",
        name: "Lynn Kelogg",
        email: "lynnk@gmail.com",
        profile_img_url: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        auth_id: "akjhsgihioljla",
        name: "Lorelai Lynch",
        email: "lorelailynch@gmail.com",
        profile_img_url: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Items", [
      {
        serial_num: "0005-84-129-C",
        item_name: "clotrimazole 1% CREAM 15G/20G",
        par_level: 200,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        serial_num: "0005-84-002-E",
        item_name: "chlorhexidine 1% CREAM 15G",
        par_level: 100,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        serial_num: "0005-84-082-C",
        item_name: "tetracycline 3% SKIN oint 15G",
        par_level: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        serial_num: "0005-84-108-K",
        item_name: "betamethasone 0.025%/CLIOQUINOL 3% cream 15G",
        par_level: 250,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        serial_num: "0000-21-18X-2",
        item_name: "etoricoxib <90mg> tab",
        par_level: 250,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Buildings", [
      {
        name: "Health Plus",
        image_size: "250px",
        building_img_url:
          "https://firebasestorage.googleapis.com/v0/b/rocket-academy-proj3.appspot.com/o/floorplans%2FWorkplace%201?alt=media&token=43b7e8a1-b4dd-4059-9f03-96b1d87cc0fe",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.bulkDelete("Buildings", {}, {});
    await queryInterface.bulkDelete("Items", {}, {});
    await queryInterface.bulkDelete("Users", {}, {});
  },
};
