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
dotenv.config();

const sequelize = new Sequelize({
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

// Attach models to Sequelize instance
sequelize.addModels([
  Building,
  BuildingUser,
  CartLineItem,
  Item,
  Cart,
  Room,
  RoomItem,
  Transaction,
  User,
]);

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
