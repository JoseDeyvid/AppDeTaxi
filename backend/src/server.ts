import express, { Express } from "express"
import { router } from "./routes"

const app: Express = express()

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

const PORT = 8080;
const HOST = '0.0.0.0'

app.use(cors(corsOptions))
app.use(express.json());
app.use("/ride", router);
app.listen(PORT, HOST, () => console.log('Server subiu!'))