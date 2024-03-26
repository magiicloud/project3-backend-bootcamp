import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Room } from "./Room";
import { Item } from "./Item";

interface RoomItemAttributes {
  room_id: number;
  item_id: number;
  quantity: number;
  uom: string;
  expiry_date: Date;
}

@Table({
  tableName: "Room_Items",
  modelName: "RoomItem",
  underscored: true,
})
export class RoomItem extends Model<RoomItemAttributes> {
  @ForeignKey(() => Room)
  @Column(DataType.INTEGER)
  room_id!: number;

  @BelongsTo(() => Room)
  room!: Room;

  @ForeignKey(() => Item)
  @Column(DataType.INTEGER)
  item_id!: number;

  @BelongsTo(() => Item)
  item!: Item;

  @Column(DataType.INTEGER)
  quantity!: number;

  @Column(DataType.STRING)
  uom!: string;

  @Column(DataType.DATE)
  expiry_date!: Date;
}
