import { Request, Response } from "express";
import { checkHasDriver, distanceIsValidToDriver } from "../data/driversData";
import ConfirmTravelService from "../services/ConfirmTravelService";
import { Travel } from "../data/TravelsHistoryData";

class ConfirmTravelController {

    async handle(req: Request, res: Response) {

        const travelInfos = req.body as Travel

        if (!travelInfos.customer_id) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": "O id do usuário não pode estar em branco."
            })
            return;
        }

        if (!travelInfos.origin || !travelInfos.destination) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": "Os endereços de origem e destino recebidos não podem estar em branco."
            })
            return;
        }

        if (travelInfos.destination === travelInfos.origin) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": "Os endereços de origem e destino não podem ser o mesmo endereço."
            })
            return;
        }

        if (!checkHasDriver(travelInfos.driver.id)) {
            res.statusMessage = "Motorista não encontrado";
            res.status(404).send({
                "error_code":
                    "DRIVER_NOT_FOUND",
                "error_description":
                    "A opção de motorista informada é inválida"
            });
            return;
        }

        if (!distanceIsValidToDriver(travelInfos.distance, travelInfos.driver.id)) {
            res.statusMessage = "Quilometragem inválida para o motorista";
            res.status(406).send({
                "error_code":
                    "INVALID_DISTANCE",
                "error_description":
                    "A quilometragem informada é inválida para o motorista selecionado."
            });
            return;
        }

        const confirmTravelService = new ConfirmTravelService();
        const travel = await confirmTravelService.execute(travelInfos)

        res.statusMessage = "Operação realizada com sucesso";
        res.status(200).send({ "success": true })
        return;


    }

}

export default ConfirmTravelController;