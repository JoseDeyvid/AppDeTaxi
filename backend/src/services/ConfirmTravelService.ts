import { Travel } from "../data/TravelsHistoryData";
import prisma from "../prisma";

class ConfirmTravelService {
    async execute(travel: Travel) {
        console.log('Travel: ', travel);
        await prisma.ride.create({
            data: {
                // date: new Date().toLocaleString("pt-BR", {
                //     timeZone: "America/Sao_Paulo",
                //     hour: "2-digit",
                //     minute: "2-digit",
                //     second: "2-digit",
                //     day: '2-digit',
                //     month: '2-digit',
                //     year: 'numeric'
                // }),
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