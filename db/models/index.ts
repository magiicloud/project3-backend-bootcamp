import { Sequelize } from "sequelize-typescript";
import { Item } from "./Item";
import { Cart } from "./Cart";
import { Building } from "./Building";
import { BuildingUser } from "./BuildingUser";
import { CartLineItem } from "./CartLineItem";
import { Room } from "./Room";
import { RoomItem } from "./RoomItem";
import { Transaction } from "./Transaction";
import { User } from "./User";
import { Dialect } from "sequelize";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const env = process.env.NODE_ENV || "development";
const config = require(path.join(
  __dirname,
  "..",
  "..",
  "config",
  "database.js"
))[env];

let sequelize: Sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as Dialect,
    models: [
      Building,
      BuildingUser,
      CartLineItem,
      Item,
      Cart,
      Room,
      RoomItem,
      Transaction,
      User,
    ],
  });
} else if (config.use_env_variable) {
  // If your configuration specifies a variable (e.g., DATABASE_URL), use it
  const dbUrl = process.env[config.use_env_variable]!;
  sequelize = new Sequelize(dbUrl, config);
} else {
  // Use the configuration file details
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    models: [
      Building,
      BuildingUser,
      CartLineItem,
      Item,
      Cart,
      Room,
      RoomItem,
      Transaction,
      User,
    ],
  });
}

// const sequelize = new Sequelize({
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   host: process.env.DB_HOST,
//   dialect: process.env.DB_DIALECT as Dialect,
//   models: [
//     Building,
//     BuildingUser,
//     CartLineItem,
//     Item,
//     Cart,
//     Room,
//     RoomItem,
//     Transaction,
//     User,
//   ],
// });

// // Attach models to Sequelize instance
// sequelize.addModels([
//   Building,
//   BuildingUser,
//   CartLineItem,
//   Item,
//   Cart,
//   Room,
//   RoomItem,
//   Transaction,
//   User,
// ]);

// Export model instance
export {
  sequelize,
  Item,
  Cart,
  Building,
  BuildingUser,
  CartLineItem,
  Room,
  RoomItem,
  Transaction,
  User,
};
