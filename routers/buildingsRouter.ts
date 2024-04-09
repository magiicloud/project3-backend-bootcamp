import { BuildingsController } from "../controllers/buildingController";
import { Router } from "express";

const buildingsController = new BuildingsController();

export class BuildingsRouter {
  routes = () => {
    const router = Router();
    router.get("/buildings/:userEmail", buildingsController.getBuildingsByUser);
    router.get("/buildings", buildingsController.getAllBuildings);
    router.post("/buildings", buildingsController.AddNewBuilding);
    return router;
  };
}
