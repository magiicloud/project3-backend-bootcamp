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

interface CartLineItemAttributes {
  cart_id: number;
  item_id: number;
  quantity: number;
  consumed: boolean;
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

  @Column(DataType.INTEGER)
  quantity!: number;

  @Column(DataType.BOOLEAN)
  consumed!: boolean;

  // Associations can be defined here if needed
  @BelongsTo(() => Cart)
  cart!: Cart;

  @BelongsTo(() => Item)
  item!: Item;
}
