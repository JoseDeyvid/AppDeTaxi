import { Router, Request, Response } from "express";
import CalculateTravelController from "./controllers/CalculateTravelController";
import ConfirmTravelController from "./controllers/ConfirmTravelController";
import { getTravels } from "./data/TravelsHistoryData";
import UserTravelsController from "./controllers/UserTravelsController";
//AIzaSyABnRgaRiD6Ezk_WDUToeX5Uc1zRqQlUpM
const router = Router();

router.post("/estimate", new CalculateTravelController().handle);
router.patch("/confirm", new ConfirmTravelController().handle);
router.get("/:customer_id", new UserTravelsController().handle)

router.get("/test/travels", getTravels);

export { router };