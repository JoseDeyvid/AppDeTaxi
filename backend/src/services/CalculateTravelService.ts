import axios from "axios";
import driversData from "../data/driversData";

class CalculateTravelService {
    async execute(origin: String, destination: String) {
        try {
            const res = await axios.post("https://routes.googleapis.com/directions/v2:computeRoutes", {
                "origin": {
                    "address": origin
                },
                "destination": {
                    "address": destination
                },
                "travelMode": "DRIVE"
            }, {
                headers: {
                    "X-Goog-Api-Key": "AIzaSyABnRgaRiD6Ezk_WDUToeX5Uc1zRqQlUpM",
                    "X-Goog-FieldMask": "routes.legs"
                }
            })
            const travelInfos = res.data.routes[0].legs[0]
            const options = driversData.filter((driver) => {
                return travelInfos.distanceMeters / 1000 >= driver.minKm
            }).map((driver) => {
                return {
                    id: driver.id,
                    name: driver.name,
                    description: driver.description,
                    vehicle: driver.vehicle,
                    review: driver.review,
                    value: driver.value,
                }
            })
            return {
                statusCode: 200,
                description: "Operacao realizada com sucesso",
                data: {
                    "origin": travelInfos.startLocation.latLng,
                    "destination": travelInfos.endLocation.latLng,
                    "distance": (travelInfos.distanceMeters / 1000).toFixed(2),
                    "duration": travelInfos.duration,
                    options,
                    routeResponse: res.data
                }
            }
        } catch (error) {
            return {
                statusCode: 400,
                description: "Os dados fornecidos no corpo da requisicao são invalidos",
                data: {
                    "error_code": "INVALID_DATA",
                    "error_description": "Os dados fornecidos no corpo da requisicao são invalidos"
                }
            }
        }

    }
}

export default CalculateTravelService;