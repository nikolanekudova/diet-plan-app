import express, { Express, Request, Response } from "express";
import cors from "cors";
const app = express();

const PORT = 8080;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.status(200);
    res.send({"message": "Hello world!"});
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
