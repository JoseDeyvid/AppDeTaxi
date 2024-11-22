import { Request, Response } from "express";

class UserTravels {

    async handle(req: Request, res: Response) {
        const {customer_id} = req.params;
        const {driver_id} = req.query;
        res.send({customer_id, driver_id})
        return;
    }
}

export default UserTravels;