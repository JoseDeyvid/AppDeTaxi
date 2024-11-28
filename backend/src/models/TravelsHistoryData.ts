
export type Travel = {
    "id": number,
    "date": Date,
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
};