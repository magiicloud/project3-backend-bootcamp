"use strict";
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
  tableName: "Users",
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
