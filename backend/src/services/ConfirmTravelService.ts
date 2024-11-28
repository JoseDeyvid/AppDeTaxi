import { Travel } from "../models/TravelsHistoryData";
import prisma from "../prisma";

class ConfirmTravelService {
    async execute(travel: Travel) {
        await prisma.ride.create({
            data: {
                customerId: travel.customer_id,
                origin: travel.origin,
                destination: travel.destination,
                distance: travel.distance,
                duration: travel.duration,
                driverId: travel.driver.id,
                driverName: travel.driver.name,
                value: travel.value,
            }
        })



    }
}

export default ConfirmTravelService;