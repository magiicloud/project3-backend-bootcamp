import { UsersController } from "../controllers/usersController";
import { Router } from "express";

const usersController = new UsersController();

export class UsersRouter {
  routes = () => {
    const router = Router();
    router.post("/users", usersController.updateUser);
    return router;
  };
}
