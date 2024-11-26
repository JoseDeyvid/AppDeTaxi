import { Travel } from "../data/TravelsHistoryData";
import prisma from "../prisma";

class ConfirmTravelService {
    async execute(travel: Travel) {
        await prisma.ride.create({
            data: {
                customerId: travel.customer_id,
                date: travel.date,
                destination: travel.destination,
                distance: travel.distance,
                driverName: travel.driver.name,
                duration: travel.duration,
                id: travel.id,
                origin: travel.origin,
                value: travel.value,
                driverId: travel.driver.id
            }
        })

    }
}

export default ConfirmTravelService;