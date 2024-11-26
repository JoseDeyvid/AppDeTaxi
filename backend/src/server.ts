import express, { Express } from "express"
import { router } from "./routes"

import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, '../../.env') })

const app: Express = express()

import cors from "cors";
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