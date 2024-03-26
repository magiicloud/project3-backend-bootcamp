import { ItemsController } from "../controllers/itemsController";
import { Router } from "express";

const itemsController = new ItemsController();

export class ItemsRouter {
  routes = () => {
    const router = Router();
    router.get("/allitems", itemsController.getAllItems);
    return router;
  };
}
