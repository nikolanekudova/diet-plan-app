import React, { useContext, useState } from "react";
import {
    FormControl,
    Input,
    Button,
    FormHelperText,
    InputAdornment,
} from "@mui/material";
import { ISnackbarContext, IngredientsContext } from "@/context/Context";
import { INewIngredientErrors, Ingredient } from "@/types/types";

export function IngredientForm({ setForm }: any) {
    const { newIngredient, setNewIngredient, getIngredients } =
        useContext(IngredientsContext);
    const { setOpenSnackbar, setSnackbarMessage } =
        useContext(ISnackbarContext);
    const [newIngredientErrors, setNewIngredientErrors] =
        useState<INewIngredientErrors>({
            calories: false,
            carbohydrates: false,
            fats: false,
            name: false,
            proteins: false,
        });

    function validateInputs() {
        const updatedIngredientserrors = {
            calories: false,
            carbohydrates: false,
            fats: false,
            name: false,
            proteins: false,
        };

        for (const [key, value] of Object.entries(newIngredientErrors)) {
            const inputValue = newIngredient[key as keyof Ingredient];

            if (inputValue == null || inputValue === "") {
                updatedIngredientserrors[key as keyof INewIngredientErrors] =
                    true;
            } else {
                updatedIngredientserrors[key as keyof INewIngredientErrors] =
                    false;
            }

            setNewIngredientErrors(updatedIngredientserrors);
        }

        return updatedIngredientserrors;
    }

    function handleAddNewIngredient() {
        let errors = validateInputs();
        let allFalse = Object.values(errors).every((value) => value === false);

        if (allFalse) {
            addNewIngredient();
        }

        return;
    }

    function addNewIngredient() {
        const request = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newIngredient),
        };

        fetch("http://localhost:8080/ingredients/", request)
            .then((response) => response.json())
            .catch((error) => console.error(error))
            .then(() => getIngredients())
            .then(() => setForm(false))
            .then(() => openSnackbarAfterAdd())
            .then(() => nullNewIngredient());
    }

    function nullNewIngredient() {
        setNewIngredient({
            name: "",
            calories: null,
            fats: null,
            carbohydrates: null,
            proteins: null,
        });
    }

    function openSnackbarAfterAdd() {
        const message = "Ingredient added! 🔥";

        setSnackbarMessage(message);
        setOpenSnackbar(true);
    }

    function cancelAddingIngredient() {
        setForm(false);
    }

    return (
        <div className="ingredient-form-wrapper">
            <div className="ingredient-inputs-wrapper">
                <div className="ingredient-row-wrapper">
                    <FormControl>
                        <FormHelperText id="ingredient">
                            {newIngredientErrors.name ? "Fill in name" : "Name"}
                        </FormHelperText>
                        <Input
                            id="ingredient"
                            onChange={(e) =>
                                setNewIngredient({
                                    ...newIngredient,
                                    name: e.target.value,
                                })
                            }
                            sx={{ width: "320px" }}
                            required
                            error={newIngredientErrors.name}
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText id="calories">
                            {newIngredientErrors.calories
                                ? "Fill in calories"
                                : "Calories"}
                        </FormHelperText>
                        <Input
                            id="calories"
                            inputProps={{
                                type: "number",
                                min: "0",
                                step: "1",
                            }}
                            onChange={(e) =>
                                setNewIngredient({
                                    ...newIngredient,
                                    calories: Number(e.target.value),
                                })
                            }
                            sx={{ width: "150px" }}
                            error={newIngredientErrors.calories}
                            endAdornment={
                                <InputAdornment position="end">
                                    kcal
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
                <div className="ingredient-row-wrapper">
                    <FormControl>
                        <FormHelperText id="fats">
                            {newIngredientErrors.fats ? "Fill in fats" : "Fats"}
                        </FormHelperText>
                        <Input
                            id="fats"
                            inputProps={{
                                type: "number",
                                min: "0",
                                step: "1",
                            }}
                            onChange={(e) =>
                                setNewIngredient({
                                    ...newIngredient,
                                    fats: Number(e.target.value),
                                })
                            }
                            sx={{ width: "150px" }}
                            error={newIngredientErrors.fats}
                            endAdornment={
                                <InputAdornment position="end">
                                    g
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText id="carbohydrates">
                            {newIngredientErrors.carbohydrates
                                ? "Fill in carbohydrates"
                                : "Carbohydrates"}
                        </FormHelperText>
                        <Input
                            id="carbohydrates"
                            inputProps={{
                                type: "number",
                                min: "0",
                                step: "1",
                            }}
                            onChange={(e) =>
                                setNewIngredient({
                                    ...newIngredient,
                                    carbohydrates: Number(e.target.value),
                                })
                            }
                            sx={{ width: "150px" }}
                            error={newIngredientErrors.carbohydrates}
                            endAdornment={
                                <InputAdornment position="end">
                                    g
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText id="proteins">
                            {newIngredientErrors.proteins
                                ? "Fill in proteins"
                                : "Proteins"}
                        </FormHelperText>
                        <Input
                            id="proteins"
                            inputProps={{
                                type: "number",
                                min: "0",
                                step: "1",
                            }}
                            onChange={(e) =>
                                setNewIngredient({
                                    ...newIngredient,
                                    proteins: Number(e.target.value),
                                })
                            }
                            sx={{ width: "150px" }}
                            error={newIngredientErrors.proteins}
                            endAdornment={
                                <InputAdornment position="end">
                                    g
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
            </div>
            <div className="btns-ingredient-form">
                <Button
                    variant="contained"
                    onClick={handleAddNewIngredient}
                    className="btn-add-ingredient"
                >
                    Add
                </Button>
                <Button
                    variant="outlined"
                    onClick={cancelAddingIngredient}
                    className="btn-cancel-ingredient"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}
