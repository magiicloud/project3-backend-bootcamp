import { ItemsController } from "../controllers/itemsController";
import { Router } from "express";

const itemsController = new ItemsController();

export class ItemsRouter {
  routes = () => {
    const router = Router();
    router.get("/allitems", itemsController.getAllItems);
    router.get("/allrooms", itemsController.getAllRooms);
    router.get("/finditem/:itemId/:roomId", itemsController.findOneItem);
    router.get("/findserial/:serialNum/:roomId", itemsController.findBySerial);
    router.put("/updateitem", itemsController.updateItem);
    return router;
  };
}
