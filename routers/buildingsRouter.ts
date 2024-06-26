import { BuildingsController } from "../controllers/buildingController";
import { Router } from "express";

const buildingsController = new BuildingsController();

export class BuildingsRouter {
  routes = () => {
    const router = Router();
    router.get("/buildings/:userId", buildingsController.getBuildingsByUser);
    router.get("/buildings", buildingsController.getAllBuildings);
    router.post("/buildings", buildingsController.AddNewBuilding);
    router.post("/buildings/user", buildingsController.AddBuildingUser);
    return router;
  };
}
