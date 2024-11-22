import { Router, Request, Response } from "express";
import CalculateTravelController from "./controllers/CalculateTravelController";
import ConfirmTravelController from "./controllers/ConfirmTravelController";
import { getTravels } from "./data/TravelsHistoryData";
import UserTravels from "./controllers/UserTravels";
//AIzaSyABnRgaRiD6Ezk_WDUToeX5Uc1zRqQlUpM
const router = Router();

router.post("/estimate", new CalculateTravelController().handle);
router.patch("/confirm", new ConfirmTravelController().handle);
router.get("/:customer_id", new UserTravels().handle)

router.get("/travels", getTravels);

export { router };