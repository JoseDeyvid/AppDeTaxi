import { Router, Request, Response } from "express";
import CalculateTravelController from "./controllers/CalculateTravelController";
//AIzaSyABnRgaRiD6Ezk_WDUToeX5Uc1zRqQlUpM
const router = Router();

router.post("/ride/estimate", new CalculateTravelController().handle)

export { router };