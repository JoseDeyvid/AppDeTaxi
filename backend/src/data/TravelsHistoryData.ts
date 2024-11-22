export type Travel = {
    "customer_id": string,
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
    travelsData.push(travel);
}

export function getTravels() {
    console.log(travelsData)
}

export default travelsData;