import React, { useContext } from "react";
import { FormControl, Input, InputLabel, Button } from "@mui/material";
import { IngredientsContext } from "@/context/Context";

export function IngredientForm({ setForm }: any) {
    const { newIngredient, setNewIngredient, getIngredients } =
        useContext(IngredientsContext);

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
            .then((data) => console.log(data))
            .catch((error) => console.error(error))
            .then(() => getIngredients())
            .then(() => setForm(false));
    }

    function cancelAddingIngredient() {
        setForm(false);
    }

    return (
        <div className="ingredient-form-wrapper">
            <div className="ingredient-inputs-wrapper">
                <div className="ingredient-row-wrapper">
                    <FormControl>
                        <InputLabel htmlFor="ingredient">name</InputLabel>
                        <Input
                            id="ingredient"
                            onChange={(e) =>
                                setNewIngredient({
                                    ...newIngredient,
                                    name: e.target.value,
                                })
                            }
                            sx={{ width: "320px" }}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="calories">calories</InputLabel>
                        <Input
                            id="calories"
                            inputProps={{ type: "number" }}
                            onChange={(e) =>
                                setNewIngredient({
                                    ...newIngredient,
                                    calories: Number(e.target.value),
                                })
                            }
                            sx={{ width: "150px" }}
                        />
                    </FormControl>
                </div>
                <div className="ingredient-row-wrapper">
                    <FormControl>
                        <InputLabel htmlFor="fats">fats</InputLabel>
                        <Input
                            id="fats"
                            inputProps={{ type: "number" }}
                            onChange={(e) =>
                                setNewIngredient({
                                    ...newIngredient,
                                    fats: Number(e.target.value),
                                })
                            }
                            sx={{ width: "150px" }}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="carbohydrates">
                            carbohydrates
                        </InputLabel>
                        <Input
                            id="carbohydrates"
                            inputProps={{ type: "number" }}
                            onChange={(e) =>
                                setNewIngredient({
                                    ...newIngredient,
                                    carbohydrates: Number(e.target.value),
                                })
                            }
                            sx={{ width: "150px" }}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="proteins">proteins</InputLabel>
                        <Input
                            id="proteins"
                            inputProps={{ type: "number" }}
                            onChange={(e) =>
                                setNewIngredient({
                                    ...newIngredient,
                                    proteins: Number(e.target.value),
                                })
                            }
                            sx={{ width: "150px" }}
                        />
                    </FormControl>
                </div>
            </div>
            <div className="btns-ingredient-form">
                <Button
                    variant="contained"
                    onClick={addNewIngredient}
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
