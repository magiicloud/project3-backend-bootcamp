"use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init(
//     {
//       name: DataTypes.STRING,
//       email: DataTypes.STRING,
//       profile_img_url: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: "User",
//     }
//   );
//   return User;
// };

import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import { Cart } from "./Cart";
import { BuildingUser } from "./BuildingUser";

interface UserAttributes {
  name: string;
  email: string;
  profile_img_url?: string;
}

@Table({
  modelName: "User",
  underscored: true,
})
export class User extends Model<UserAttributes> {
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  profile_img_url?: string;

  // Associations can be defined here if needed
  @HasMany(() => Cart)
  carts!: Cart[];

  @HasOne(() => BuildingUser)
  buildingUser!: BuildingUser;
}
