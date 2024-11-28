import axios from "axios";
import { Request, Response } from "express";

class GetMapController {

    async handle(req: Request, res: Response) {
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
        const startAddress = route.legs[0].start_address
        const endAddress = route.legs[0].end_address

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
            distance,
            startAddress,
            endAddress
        });


    }
}

export default GetMapController;