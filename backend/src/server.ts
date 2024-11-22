import express, { Express } from "express"
import { router } from "./routes"

const app: Express = express()
app.use(express.json());
app.use("/ride", router);
app.listen(3333, () => console.log('Servidor online!'))