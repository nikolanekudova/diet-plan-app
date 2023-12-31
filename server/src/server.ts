import express, { Express, Request, Response } from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

let app: Express;
let dbClient: MongoClient | null;

const PORT = 8080;
const URI = "mongodb://localhost:27017";

start();

async function start() {
    dbClient = await connectToDatabase(URI);
    if (dbClient) startHttpServer(PORT);
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

async function addRoutes(app: Express) {
    app.get("/", (req: Request, res: Response) => {
        res.status(200);
        res.send({ message: "Hello world!" });
    });

    app.post("/ingredient", (req: Request, res: Response) => {
        //let data = req.body;

        console.log(req.body);
        //res.status(200);
        //res.send(data);
        res.sendStatus(200);
    });
}

async function connectToDatabase(uri: string): Promise<MongoClient | null> {
    try {
        let mongoClient = new MongoClient(uri); // vytvoří nového klienta do monga

        await mongoClient.connect();

        console.log("Successfully connected to MongoDB!");

        return mongoClient;
    } catch (error) {
        console.error("Connection to MongoDB failed!", error);
        
        return null;
    }
}
