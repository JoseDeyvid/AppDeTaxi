import { Request, Response } from "express";

export type Travel = {
    "id": number,
    "date": Date,
    "customer_id": number,
    "origin": string,
    "destination": string,
    "distance": number,
    "duration": string,
    "driver": {
        "id": number,
        "name": string
    },
    "value": number
}
    ;

let travelsData: Travel[] = [];

export function createTravel(travel: Travel) {
    travel.id = travelsData.length;
    travel.date = new Date()
    travelsData.push(travel);
    return;
}

export function getTravels(req: Request, res: Response) {
    res.send(travelsData);
    return;
}

export function getTravelsByUserId(id: number, driver_id?: number): Travel[] {

    if (driver_id) {
        const travels = travelsData.filter((travel) => travel.customer_id === id && travel.driver.id === driver_id)
        return travels;
    } else {
        return travelsData.filter((travel) => travel.customer_id === id);
    }
}

export default travelsData;