import { Request, Response } from "express";
import ListDriversService from "../services/ListDriversService";


class ListDriversController {

    async handle(req: Request, res: Response) {

        const listDriversService = new ListDriversService();
        const drivers = await listDriversService.execute();
        res.send(drivers)
    }
}

export default ListDriversController;