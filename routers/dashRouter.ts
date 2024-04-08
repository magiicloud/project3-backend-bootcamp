import { DashController } from "../controllers/dashController";
import { Router } from "express";

const dashController = new DashController();

export class DashRouter {
  routes = () => {
    const router = Router();
    router.get("/getexpiry", dashController.getExpiringItemsCount);
    router.get("/getbelowpar", dashController.getItemsBelowPar);
    return router;
  };
}
