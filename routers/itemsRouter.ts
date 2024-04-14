import { ItemsController } from "../controllers/itemsController";
import { Router } from "express";

const itemsController = new ItemsController();

export class ItemsRouter {
  routes = () => {
    const router = Router();
    router.get("/allitems/:userId", itemsController.getAllItems);
    router.get("/allrooms/:userId", itemsController.getAllRooms);
    router.get("/finditem/:itemId/:roomId", itemsController.findOneItem);
    router.get("/findserial/:serialNum/:roomId", itemsController.findBySerial);
    router.get("/items/:roomId", itemsController.getRoomItems);
    router.put("/updateitem", itemsController.updateItem);
    router.post("/addnewitem", itemsController.addNewItem);
    router.delete("/deleteroomitem", itemsController.deleteRoomItem);
    router.delete("/deleteitem", itemsController.deleteItem);
    return router;
  };
}
