import { Request, Response } from "express";
import CalculateTravelService from "../services/CalculateTravelService";

class CalculateTravelController {
    async handle(req: Request, res: Response) {
        const { customer_id, origin, destination } = req.body;
        res.statusMessage = "Os dados fornecidos no corpo da requisicao sao invalidos";
        if (!customer_id) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": "O id do usuario nao pode estar em branco."
            })
            return;
        }
        if (!origin || !destination) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": "Os enderecos de origem e destino recebidos nao podem estar em branco."
            })
            return;
        }
        if (destination === origin) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": "Os enderecos de origem e destino nao podem ser o mesmo endereco."
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