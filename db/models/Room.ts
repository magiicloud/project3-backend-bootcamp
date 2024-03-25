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
  room_coordinates: string;
  building_id: number;
}

@Table({
  modelName: "Room",
  underscored: true,
})
export class Room extends Model<RoomAttributes> {
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  room_coordinates!: string;

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
