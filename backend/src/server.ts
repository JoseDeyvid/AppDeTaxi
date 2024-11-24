import express, { Express } from "express"
import { router } from "./routes"

const app: Express = express()

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json());
app.use("/ride", router);
app.listen(3333, () => console.log('Servidor online!'))