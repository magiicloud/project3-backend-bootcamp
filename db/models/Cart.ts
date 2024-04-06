import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import { User } from "./User";
import { CartLineItem } from "./CartLineItem";

interface CartAttributes {
  id?: number;
  active: boolean;
  user_id: number;
}

@Table({
  tableName: "Carts",
  modelName: "Cart",
  underscored: true,
})
export class Cart extends Model<CartAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

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
