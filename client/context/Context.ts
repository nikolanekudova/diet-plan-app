import { createContext } from "react";
import { IActivepage, IIngredientSnackbar, IIngredients } from "../types/types";

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

export const ISnackbarContext = createContext<IIngredientSnackbar>({
    openSnackbar: false,
    setOpenSnackbar: () => {},
    snackbarMessage: "test",
    setSnackbarMessage: () => {}
})