import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Cart } from "./Cart";
import { Item } from "./Item";
import { Room } from "./Room";

interface CartLineItemAttributes {
  cart_id: number;
  item_id: number;
  room_id: number;
  quantity: number;
  expiry_date: Date;
}

@Table({
  tableName: "Cart_Line_Items",
  modelName: "CartLineItem",
  underscored: true,
})
export class CartLineItem extends Model<CartLineItemAttributes> {
  @ForeignKey(() => Cart)
  @Column(DataType.INTEGER)
  cart_id!: number;

  @ForeignKey(() => Item)
  @Column(DataType.INTEGER)
  item_id!: number;

  @ForeignKey(() => Room)
  @Column(DataType.INTEGER)
  room_id!: number;

  @Column(DataType.INTEGER)
  quantity!: number;

  @Column(DataType.DATE)
  expiry_date!: Date;

  // Associations can be defined here if needed
  @BelongsTo(() => Cart)
  cart!: Cart;

  @BelongsTo(() => Item)
  item!: Item;

  @BelongsTo(() => Room)
  room!: Room;
}
