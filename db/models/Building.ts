import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { Room } from "./Room";
import { User } from "./User";
import { BuildingUser } from "./BuildingUser";

interface BuildingAttributes {
  name: string;
  item_size: string;
  building_img_url: string;
}

@Table({
  modelName: "Building",
  underscored: true,
})
export class Building extends Model<BuildingAttributes> {
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  item_size!: string;

  @Column(DataType.STRING)
  building_img_url!: string;

  // Associations can be defined here if needed
  @HasMany(() => Room)
  rooms!: Room[];

  @BelongsToMany(() => User, () => BuildingUser)
  users!: User[];
}
