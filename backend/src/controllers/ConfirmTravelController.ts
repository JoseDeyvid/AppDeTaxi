import { Request, Response } from "express";
import { checkHasDriver, distanceIsValidToDriver } from "../data/driversData";
import ConfirmTravelService from "../services/ConfirmTravelService";

class ConfirmTravelController {

    async handle(req: Request, res: Response) {

        // console.log("Request Body: ", req.body)
        const travelInfos = req.body
        const errorDescription = "Os dados fornecidos no corpo da requisição são inválidos"

        if (!travelInfos.customer_id) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": errorDescription
            })
            return;
        }

        if (!travelInfos.origin || !travelInfos.destination) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": errorDescription
            })
            return;
        }

        if (travelInfos.destination === travelInfos.origin) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": errorDescription
            })
            return;
        }

        if (!await checkHasDriver(travelInfos.driver.id)) {
            res.status(404).send({
                "error_code":
                    "DRIVER_NOT_FOUND",
                "error_description":
                    "Motorista não encontrado"
            });
            return;
        }

        if (!await distanceIsValidToDriver(travelInfos.distance, travelInfos.driver.id)) {
            res.status(406).send({
                "error_code":
                    "INVALID_DISTANCE",
                "error_description":
                    "Quilometragem inválida para o motorista"
            });
            return;
        }

        const confirmTravelService = new ConfirmTravelService();
        try {
            await confirmTravelService.execute(travelInfos)
            res.status(200).send({ "success": true })
            return;
        } catch (error) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": errorDescription
            })
            return;
        }





    }

}

export default ConfirmTravelController;