
import prisma from "../prisma";

class UserTravelsService {
    async execute(customer_id: string, driver_id?: number) {
        if (driver_id) {
            return await prisma.ride.findMany({
                where: {
                    customerId: customer_id,
                    driverId: Number(driver_id)
                }
            })
        }
        return await prisma.ride.findMany({
            where: {
                customerId: customer_id,
            }
        })
    }
}

export default UserTravelsService;