import { createTravel, Travel } from "../data/TravelsHistoryData";

class ConfirmTravelService {
    async execute(travel: Travel) {
        createTravel(travel);
    }
}

export default ConfirmTravelService;