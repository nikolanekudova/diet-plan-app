import express, { Express, Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";
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
    app.get("/ingredients", async (req: Request, res: Response) => {
        try {
            const collection = dbClient?.db("diet-plan-app").collection("test");

            let result = await collection?.find().toArray();

            res.json(result);
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.post("/ingredients", async (req: Request, res: Response) => {
        const newIngredient = req.body;

        try {
            const collection = dbClient?.db("diet-plan-app").collection("test");

            let result = await collection?.insertOne(newIngredient);

            res.json({
                insertedDocuments: result,
                message: "Ingredient sucessfully added! 😮‍💨",
            });
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.put("/ingredients", async (req: Request, res: Response) => {
        const updatedIngredient = req.body;
        const id = req.query.id as string;

        try {
            const collection = dbClient?.db("diet-plan-app").collection("test");

            let result = await collection?.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedIngredient }
            );

            res.json({
                updated: result,
                message: "Ingredient sucessfully updated! 😍",
            });
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.delete("/ingredients", async (req: Request, res: Response) => {
        try {
            const id = req.query.id as string;

            const collection = dbClient?.db("diet-plan-app").collection("test");

            let result = await collection?.deleteOne({ _id: new ObjectId(id) });

            res.json({
                deleted: result,
                message: "Ingredient sucessfully deleted! 👀",
            });
        } catch (err) {
            res.status(500).send(err);
        }
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
