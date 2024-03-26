import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Building } from "./Building";
import { User } from "./User";

interface BuildingUserAttributes {
  admin: boolean;
}

@Table({
  tableName: "Building_Users",
  modelName: "BuildingUser",
  underscored: true,
})
export class BuildingUser extends Model<BuildingUserAttributes> {
  @ForeignKey(() => Building)
  @Column(DataType.INTEGER)
  building_id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @Column(DataType.BOOLEAN)
  admin!: boolean;

  @BelongsTo(() => Building)
  building!: Building;

  @BelongsTo(() => User)
  user!: User;
}
