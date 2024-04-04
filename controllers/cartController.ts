import { Request, Response } from "express";
import { Item, Cart, CartLineItem, RoomItem } from "../db/models";
import { sequelize } from "../db/models";

export class CartController {
  async retrieveActiveCart(req: Request, res: Response) {
    const userId = 1; //req.user.id; // Assuming you have the user's ID from session/authentication

    try {
      const cart = await Cart.findOne({
        where: { user_id: userId, active: true },
        include: [
          {
            model: CartLineItem,
            include: [Item], // Include details of items in the cart
          },
        ],
      });

      if (!cart) {
        return res
          .status(404)
          .json({ message: "No active cart found for the user." });
      }

      res.json(cart);
    } catch (err) {
      console.error("Error retrieving cart:", err);
      res.status(500).json({ message: "Failed to retrieve cart." });
    }
  }

  async addItemToCart(req: Request, res: Response) {
    const { serialNum, quantity, expiryDate, roomSelect, userId } = req.body;

    try {
      // Step 1: Find the item by serial number to get the itemId
      const item = await Item.findOne({ where: { serial_num: serialNum } });
      if (!item) {
        return res
          .status(404)
          .json({ error: true, message: "Item not found." });
      }

      // Step 2: Ensure the user has a cart
      const [cart] = await Cart.findOrCreate({
        where: { user_id: userId, active: true },
        defaults: { user_id: userId, active: true },
      });

      // Step 3: Add or update the item in the cart
      const [itemInCart, itemCreated] = await CartLineItem.findOrCreate({
        where: {
          cart_id: cart.id,
          item_id: item.id, // Use the item's id obtained in Step 1
          room_id: roomSelect,
        },
        defaults: {
          cart_id: cart.id,
          item_id: item.id,
          room_id: roomSelect,
          quantity: quantity,
          expiry_date: expiryDate,
        },
      });

      if (!itemCreated) {
        // The item exists in the cart, so update its quantity and possibly other details
        itemInCart.quantity = quantity;
        itemInCart.expiry_date = expiryDate;
        // Update other fields as necessary
        await itemInCart.save();
      }

      res.json({
        success: true,
        message: "Item added to cart successfully",
        cartItem: itemInCart,
      });
    } catch (err) {
      console.error("Failed to add item to cart:", err);
      res.status(500).json({
        success: false,
        message: "Failed to add item to cart",
        error: (err as Error).message,
      });
    }
  }

  async checkoutCart(req: Request, res: Response) {
    const userId = 1; //req.body.userId; // Or obtain the userId from session/authentication

    try {
      // Sequelize managed transaction
      await sequelize.transaction(async (transaction) => {
        // Step 1: Retrieve the active cart for the user
        const cart = await Cart.findOne({
          where: { user_id: userId, active: true },
          include: [{ model: CartLineItem, include: [Item] }],
          transaction,
        });

        if (!cart) {
          throw new Error("Active cart not found.");
        }

        // Step 2: Batch update inventory quantities based on cart items
        for (const cartLineItem of cart.cartLineItems) {
          await RoomItem.update(
            {
              quantity: cartLineItem.quantity,
              expiry_date: cartLineItem.expiry_date,
            },
            {
              where: {
                room_id: cartLineItem.room_id,
                item_id: cartLineItem.item_id,
              },
              transaction,
            }
          );
        }

        // Step 3: Mark the cart as inactive or clear cart items
        await Cart.update(
          { active: false },
          { where: { id: cart.id }, transaction }
        );
      });

      // If the transaction is successful, respond with success
      res.json({ success: true, message: "Checkout successful." });
    } catch (err) {
      console.error("Checkout process failed:", err);
      res.status(500).json({
        success: false,
        message: "Checkout process failed",
        error: (err as Error).message,
      });
    }
  }
}
