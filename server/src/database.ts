import { MongoClient } from "mongodb";

enum DatabaseCollections {
    INGREDIENTS = "test",
}

export class Database {
    private static DB_NAME = "diet-plan-app";
    private static URI = "mongodb://localhost:27017";
    private static dbClient: MongoClient;

    private constructor() {}

    public static async getDbClient(): Promise<MongoClient> {
        if (!Database.dbClient) {
            Database.dbClient = await Database.connectToDatabase();
        }

        return Database.dbClient;
    }

    private static async connectToDatabase(): Promise<MongoClient> {
        try {
            let mongoClient = new MongoClient(Database.URI);

            await mongoClient.connect();

            console.log("Successfully connected to MongoDB!");

            return mongoClient;
        } catch (error) {
            console.error("Connection to MongoDB failed!", error);

            throw new Error("mongo failed");
        }
    }

    public static async getIngredientsCollection() {
        return (await Database.getDbClient())
            .db(Database.DB_NAME)
            .collection(DatabaseCollections.INGREDIENTS);
    }
}
