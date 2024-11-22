import { getTravelsByUserId } from "../data/TravelsHistoryData";

class UserTravelsService {
    async execute(customer_id: number, driver_id?: string) {

        if (driver_id) {
            return getTravelsByUserId(customer_id, Number(driver_id))
        }
        return getTravelsByUserId(customer_id);
    }
}

export default UserTravelsService;