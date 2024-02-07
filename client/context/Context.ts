import { createContext } from "react";
import { IActivepage, IIngredients } from "../types/types";

export const ActivepageContext = createContext<IActivepage>({
    activePage: "Ingredients",
    setActivepage: () => {},
});

export const IngredientsContext = createContext<IIngredients>({
    ingredients: [],
    setIngredients: () => {},
    newIngredient: {
        name: "",
        calories: null,
        fats: null,
        carbohydrates: null,
        proteins: null,
    },
    setNewIngredient: () => {},
    getIngredients: Function,
});