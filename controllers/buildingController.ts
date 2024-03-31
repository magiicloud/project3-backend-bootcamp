import { Request, Response } from "express";
import { Building, BuildingUser, Room } from "../db/models";

export class BuildingsController {
  async getAllBuildings(req: Request, res: Response) {
    try {
      const output = await Building.findAll({
        include: [
          {
            model: Room,
          },
        ],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: (err as Error).message });
    }
  }

  async AddNewBuilding(req: Request, res: Response) {
    const building = req.body.building;
    const rooms = req.body.rooms;
    try {
      const newBuilding = await Building.create(building);
      const newRooms: number[] = [];
      rooms.map(async (obj: Object) => {
        const newRoom = { ...obj };
        newRoom["building_id" as keyof Object] = newBuilding.id;
        const newRoomInstance = await rooms.create(newRoom);
        newRooms.push(newRoomInstance.id);
      });
      // const newBuildingRooms = newBuilding.setRooms(newRooms);
      return res.json(newBuilding);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
