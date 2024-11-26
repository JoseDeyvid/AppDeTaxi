
import prisma from "../prisma";

class UserTravelsService {
    async execute(customer_id: number, driver_id?: string) {
        console.log("Id do motorista: ",driver_id)
        // if (driver_id) {
        //     // return getTravelsByUserId(customer_id, Number(driver_id))
        //     return await prisma.ride.findMany({
        //         where: {
        //             customerId: customer_id,
        //             driverId: Number(driver_id)
        //         }
        //     })
        // }
        // return getTravelsByUserId(customer_id);
        return await prisma.ride.findMany({
            where: {
                customerId: customer_id,
            }
        })
    }
}

export default UserTravelsService;