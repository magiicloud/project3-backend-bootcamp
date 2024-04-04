import { CartController } from "../controllers/cartController";
import { Router } from "express";

const cartController = new CartController();

export class CartRouter {
  routes = () => {
    const router = Router();
    router.get("/getactivecart", cartController.retrieveActiveCart);
    router.post("/additemcart", cartController.addItemToCart);
    router.put("/checkoutcyclecount", cartController.checkoutCart);
    return router;
  };
}
