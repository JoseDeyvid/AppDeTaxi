import axios from "axios";
import prisma from "../prisma";
import { Driver } from "@prisma/client";

class CalculateTravelService {
    async execute(origin: string, destination: string) {
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
            const drivers = await prisma.driver.findMany();

            let options: Driver[] = []
            if (drivers) {
                options = drivers.filter((driver) => {
                    return travelInfos.distanceMeters / 1000 >= driver.minKm
                }).map((driver) => {
                    return {
                        id: driver.id,
                        name: driver.name,
                        description: driver.description,
                        vehicle: driver.vehicle,
                        reviewRating: driver.reviewRating,
                        reviewComment: driver.reviewComment,
                        minKm: driver.minKm,
                        value: driver.value * (travelInfos.distanceMeters / 1000)
                    }
                })
            }

            return {
                statusCode: 200,
                description: "Operacao realizada com sucesso",
                data: {
                    "origin": travelInfos.startLocation.latLng,
                    "destination": travelInfos.endLocation.latLng,
                    "distance": Number((travelInfos.distanceMeters).toFixed(2)),
                    "duration": String(travelInfos.duration),
                    "options": options.map((driver) => {
                        return {
                            "id": driver.id,
                            "name": driver.name,
                            "description": driver.description,
                            "vehicle": driver.vehicle,
                            "review": {
                                "rating": driver.reviewRating,
                                "comment": driver.reviewComment
                            },
                            "value": driver.value
                        }

                    }),
                    routeResponse: res.data
                }
            }
        } catch (error) {
            return {
                statusCode: 400,
                data: {
                    "error_code": "INVALID_DATA",
                    "error_description": "Os dados fornecidos no corpo da requisicao são invalidos"
                }
            }
        }

    }
}

export default CalculateTravelService;