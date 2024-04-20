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
  sequelize = new Sequelize({
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT as Dialect,
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
  sequelize = new Sequelize({
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
}

// Confirms the connection to the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database!");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
})();

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
