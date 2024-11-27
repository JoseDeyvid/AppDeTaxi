import { Router, Request, Response } from "express";
import CalculateTravelController from "./controllers/CalculateTravelController";
import ConfirmTravelController from "./controllers/ConfirmTravelController";
import { getTravels } from "./data/TravelsHistoryData";
import UserTravelsController from "./controllers/UserTravelsController";
import axios from "axios";
import ListDriversController from "./controllers/ListDriversController";
const router = Router();
router.get('/map', async (req: Request, res: Response) => {

    const { origin, destination, } = req.query;
    if (!origin || !destination) {
        res.status(400).send({ error: "Origem e Destino são necessários" });
        return;
    }

    const directionsResponse = await axios.get("https://maps.googleapis.com/maps/api/directions/json", {
        params: {
            origin,
            destination,
            mode: "driving",
            key: process.env.GOOGLE_API_KEY
        },
    });

    const data = directionsResponse.data;

    if (data.status !== "OK") {
        res.status(500).json({ error: "Failed to fetch route data" });
        return;
    }

    const route = data.routes[0];
    const encodedPolyline = route.overview_polyline.points;
    const duration = route.legs[0].duration.text;
    const distance = route.legs[0].distance.text;
    console.log(route.legs[0]);

    if (!encodedPolyline) {
        res.status(400).send({ error: "Ocorreu algum erro com a criação da rota." });
        return;
    }
    const staticMapURL = new URL("https://maps.googleapis.com/maps/api/staticmap")
    staticMapURL.searchParams.set("size", "800x600");
    staticMapURL.searchParams.set("path", `enc:${encodedPolyline}`);
    staticMapURL.searchParams.append("markers", `color:red|label:A|${origin}`);
    staticMapURL.searchParams.append("markers", `color:red|label:B|${destination}`);
    if (process.env.GOOGLE_API_KEY) {
        staticMapURL.searchParams.set("key", process.env.GOOGLE_API_KEY)
    }

    res.send({
        staticMapURL,
        duration,
        distance
    });


});
router.post("/estimate", new CalculateTravelController().handle);
router.patch("/confirm", new ConfirmTravelController().handle);
router.get("/drivers", new ListDriversController().handle)
router.get("/:customer_id", new UserTravelsController().handle)

router.get("/test/travels", getTravels);




export { router };