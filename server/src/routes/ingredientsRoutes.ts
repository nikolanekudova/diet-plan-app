import { Express } from "express";
import {
    getAllIngredients,
    addNewIngredient,
    updateIngredient,
    deleteIngredient,
} from "../controllers/ingredientsControllers";

export async function addRoutes(app: Express) {
    app.get("/ingredients", getAllIngredients);
    app.post("/ingredients", addNewIngredient);
    app.put("/ingredients", updateIngredient);
    app.delete("/ingredients", deleteIngredient);
}