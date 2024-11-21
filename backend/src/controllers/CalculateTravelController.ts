import { Request, Response } from "express";
import CalculateTravelService from "../services/CalculateTravelService";

class CalculateTravelController {
    async handle(req: Request, res: Response) {
        const { customer_id, origin, destination } = req.body;
        res.statusMessage = "Os dados fornecidos no corpo da requisição são inválidos";
        if (!customer_id) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": "O id do usuário não pode estar em branco."
            })
            return;
        }
        if (!origin || !destination) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": "Os endereços de origem e destino recebidos não podem estar em branco."
            })
            return;
        }
        if (destination === origin) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": "Os endereços de origem e destino não podem ser o mesmo endereço."
            })
            return;
        }

        const calculateTravelService = new CalculateTravelService();
        const travel = await calculateTravelService.execute(origin, destination)

        res.statusMessage = travel.description;
        res.status(travel.statusCode).send(travel.data);
    }
}

export default CalculateTravelController;