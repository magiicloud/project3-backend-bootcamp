import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Cart } from "./Cart";
import { Room } from "./Room";

interface TransactionAttributes {
  cycle_count: boolean;
}

@Table({
  modelName: "Transaction",
  underscored: true,
})
export class Transaction extends Model<TransactionAttributes> {
  @ForeignKey(() => Cart)
  @Column(DataType.INTEGER)
  cart_id!: number;

  @ForeignKey(() => Room)
  @Column(DataType.INTEGER)
  room_id!: number;

  @Column(DataType.BOOLEAN)
  cycle_count!: boolean;

  // Associations can be defined here if needed

  @BelongsTo(() => Cart)
  cart!: Cart;

  @BelongsTo(() => Room)
  room!: Room;
}
