import { Router, Request, Response } from "express";
import CalculateTravelController from "./controllers/CalculateTravelController";
import ConfirmTravelController from "./controllers/ConfirmTravelController";
import UserTravelsController from "./controllers/UserTravelsController";
import ListDriversController from "./controllers/ListDriversController";
import GetMapController from "./controllers/GetMapController";
const router = Router();

router.get('/map', new GetMapController().handle);
router.post("/estimate", new CalculateTravelController().handle);
router.patch("/confirm", new ConfirmTravelController().handle);
router.get("/drivers", new ListDriversController().handle)
router.get("/:customer_id", new UserTravelsController().handle)




export { router };