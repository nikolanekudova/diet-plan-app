import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Database } from "../database";

export async function getAllIngredients(req: Request, res: Response) {
    try {
        const collection = await Database.getIngredientsCollection();

        let result = await collection.find().toArray();

        res.json(result);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function addNewIngredient(req: Request, res: Response) {
    const newIngredient = req.body;
    console.log(newIngredient);

    try {
        const collection = await Database.getIngredientsCollection();

        let result = await collection?.insertOne(newIngredient);

        res.json({
            insertedDocuments: result,
            message: "Ingredient sucessfully added! 😮‍💨",
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function updateIngredient(req: Request, res: Response) {
    const updatedIngredient = req.body;
    const id = req.query.id as string;

    try {
        const collection = await Database.getIngredientsCollection();

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
}

export async function deleteIngredient(req: Request, res: Response) {
    try {
        const id = req.query.id as string;

        const collection = await Database.getIngredientsCollection();

        let result = await collection?.deleteOne({ _id: new ObjectId(id) });

        res.json({
            deleted: result,
            message: "Ingredient sucessfully deleted! 👀",
        });
    } catch (err) {
        res.status(500).send(err);
    }
}