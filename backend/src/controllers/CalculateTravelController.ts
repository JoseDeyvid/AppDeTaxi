import { Request, Response } from "express";
import CalculateTravelService from "../services/CalculateTravelService";

class CalculateTravelController {
    async handle(req: Request, res: Response) {
        const { customer_id, origin, destination } = req.body;
        console.log("Request Body: ",req.body)
        // res.statusMessage = "Os dados fornecidos no corpo da requisicao sao invalidos";
        const errorDescription = "Os dados fornecidos no corpo da requisição são inválidos"
        if (!customer_id) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": errorDescription
            })
            return;
        }
        if (!origin || !destination) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": errorDescription
            })
            return;
        }
        if (destination === origin) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": errorDescription
            })
            return;
        }
        const calculateTravelService = new CalculateTravelService();
        const travel = await calculateTravelService.execute(origin, destination)

        res.status(travel.statusCode).send(travel.data);
    }
}

export default CalculateTravelController;