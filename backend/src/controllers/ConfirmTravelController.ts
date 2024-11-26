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
                "error_description": "O id do usuario nao pode estar em branco."
            })
            return;
        }

        if (!travelInfos.origin || !travelInfos.destination) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": "Os enderecos de origem e destino recebidos nao podem estar em branco."
            })
            return;
        }

        if (travelInfos.destination === travelInfos.origin) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": "Os enderecos de origem e destino nao podem ser o mesmo endereco."
            })
            return;
        }

        if (!checkHasDriver(travelInfos.driver.id)) {
            res.statusMessage = "Motorista nao encontrado";
            res.status(404).send({
                "error_code":
                    "DRIVER_NOT_FOUND",
                "error_description":
                    "A opcao de motorista informada e invalida"
            });
            return;
        }

        if (!distanceIsValidToDriver(travelInfos.distance, travelInfos.driver.id)) {
            res.statusMessage = "Quilometragem invalida para o motorista";
            res.status(406).send({
                "error_code":
                    "INVALID_DISTANCE",
                "error_description":
                    "A quilometragem informada e invalida para o motorista selecionado."
            });
            return;
        }

        const confirmTravelService = new ConfirmTravelService();
        await confirmTravelService.execute(travelInfos)

        res.statusMessage = "Operacao realizada com sucesso";
        res.status(200).send({ "success": true })
        return;


    }

}

export default ConfirmTravelController;