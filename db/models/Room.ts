import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Building } from "./Building";
import { Transaction } from "./Transaction";
import { RoomItem } from "./RoomItem";

interface RoomAttributes {
  name: string;
  left: Float64Array;
  top: Float64Array;
  width: Float64Array;
  height: Float64Array;
  building_id: number;
}

@Table({
  tableName: "Rooms",
  modelName: "Room",
  underscored: true,
})
export class Room extends Model<RoomAttributes> {
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.FLOAT)
  left!: Float64Array;

  @Column(DataType.FLOAT)
  top!: Float64Array;

  @Column(DataType.FLOAT)
  height!: Float64Array;

  @Column(DataType.FLOAT)
  width!: Float64Array;

  @ForeignKey(() => Building)
  @Column(DataType.INTEGER)
  building_id!: number;

  // Associations can be defined here if needed
  @BelongsTo(() => Building)
  building!: Building;

  @HasMany(() => Transaction)
  transactions!: Transaction;

  @HasMany(() => RoomItem)
  roomItems!: RoomItem[];
}
