import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { User } from "./User";
import { CartLineItem } from "./CartLineItem";

interface CartAttributes {
  active: boolean;
  user_id: number;
}

@Table({
  modelName: "Cart",
  underscored: true,
})
export class Cart extends Model<CartAttributes> {
  @Column(DataType.BOOLEAN)
  active!: boolean;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  // Associations can be defined here if needed
  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => CartLineItem)
  cartLineItems!: CartLineItem[];
}
