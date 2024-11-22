import { Request, Response } from "express";
import { checkHasDriver } from "../data/driversData";
import UserTravelsService from "../services/UserTravelsService";

class UserTravelsController {

    async handle(req: Request, res: Response) {
        const { customer_id } = req.params;
        const { driver_id } = req.query;

        if (!customer_id) {
            res.status(400).send({
                "error_code": "INVALID_DATA",
                "error_description": "O id do usuário não pode estar em branco."
            })
            return;
        }

        if (driver_id) {
            if (!checkHasDriver(Number(driver_id))) {
                res.statusMessage = "Motorista invalido";
                res.status(404).send({
                    "error_code":
                        "INVALID_DRIVER",
                    "error_description":
                        "A opção de motorista informada é inválida"
                });
                return;
            }
        }

        const userTravelsService = new UserTravelsService();
        const travels = await userTravelsService.execute(Number(customer_id), String(driver_id));
        const formattedTravels = travels.map((travel) => {
            return {
                "id": travel.id,
                "date": travel.date,
                "origin": travel.origin,
                "destination":
                    travel.destination,
                "distance":
                    travel.distance,
                "duration":
                    travel.duration,
                "driver": {
                    "id": travel.driver.id,
                    "name": travel.driver.name
                },
                "value": travel.value
            }

        }).reverse()

        if (formattedTravels.length === 0) {
            res.statusMessage = "Nenhum registro encontrado";
            res.status(404).send({
                "error_code":
                    "NO_RIDES_FOUND",
                "error_description":
                    "Nenhuma viagem foi encontrada com os parâmetros passados."
            });
            return;
        }

        res.statusMessage = "Operação realizada com sucesso";
        res.status(200).send({
            "customer_id": customer_id,
            "rides": formattedTravels
        })
        return;
    }
}

export default UserTravelsController;