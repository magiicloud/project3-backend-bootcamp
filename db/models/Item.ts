import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { CartLineItem } from "./CartLineItem";
import { RoomItem } from "./RoomItem";

interface ItemAttributes {
  serial_num: string;
  item_name: string;
  par_level: number;
}

@Table({
  modelName: "Item",
  underscored: true,
})
export class Item extends Model<ItemAttributes> {
  @Column(DataType.STRING)
  serial_num!: string;

  @Column(DataType.STRING)
  item_name!: string;

  @Column(DataType.INTEGER)
  par_level!: number;

  // Associations can be defined here if needed
  @HasMany(() => CartLineItem)
  cartLineItems!: CartLineItem[];

  @HasMany(() => RoomItem)
  roomItems!: RoomItem[];
}
