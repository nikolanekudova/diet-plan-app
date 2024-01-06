import express, { Express } from "express";
import cors from "cors";
import { addRoutes } from "./routes/ingredientsRoutes";
import { Database } from "./database";

let app: Express;

const PORT = 8080;

start();

async function start() {
    try {
        await Database.getDbClient();

        startHttpServer(PORT);
    } catch (error) {
        console.log("dbClient error");
    }
}

async function startHttpServer(port: number) {
    app = express();
    app.use(express.json());
    app.use(cors());

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);

        addRoutes(app);
    });
}