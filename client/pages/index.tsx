/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FormControl, Input, InputLabel } from "@mui/material";

// because of custom theme with typescript
declare module "@mui/material/styles" {
    interface Theme {
        status: {
            danger: string;
        };
    }

    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#07393C",
            light: "#91ECF3",
            dark: "#063437",
        },
        secondary: {
            main: "#F3D768",
            light: "#F9EBB4",
            dark: "#EEC82F",
        },
        background: {
            default: "#F0EDEE",
        },
    },
});

interface Ingredient {
    calories: number | null;
    carbohydrates: number | null;
    fats: number | null;
    name: string;
    proteins: number | null;
    _id?: string;
}

const columns: GridColDef[] = [
    { field: "name", headerName: "Ingredient", width: 200 },
    { field: "calories", headerName: "Calories", width: 100 },
    { field: "carbohydrates", headerName: "Carbohydrates", width: 120 },
    { field: "proteins", headerName: "Proteins", width: 100 },
    { field: "fats", headerName: "Fats", width: 100 },
];

function index() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [newIngredient, setNewIngredient] = useState<Ingredient>({
        name: "",
        calories: null,
        fats: null,
        carbohydrates: null,
        proteins: null,
    });

    useEffect(() => {
        fetch("http://localhost:8080/ingredients/")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setIngredients(data);
            });
    }, []);

    function addNewIngredient() {
        console.log(newIngredient);
        console.log(JSON.stringify(newIngredient));

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
            .catch((error) => console.error(error));
    }

    return (
        <div style={{ display: "flex" }}>
            <ThemeProvider theme={theme}>
                <Sidebar />
                <div className="page-wrapper">
                    <Header />
                    <div className="page-content-wrapper">
                    <div style={{ height: "auto", width: 700 }}>
                        <DataGrid
                            getRowId={(row) => row._id}
                            rows={ingredients}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10, 20, 50]}
                            checkboxSelection
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <FormControl>
                            <InputLabel htmlFor="ingredient">
                                Ingredient
                            </InputLabel>
                            <Input
                                id="ingredient"
                                aria-describedby="my-helper-text"
                                onChange={(e) =>
                                    setNewIngredient({
                                        ...newIngredient,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="calories">calories</InputLabel>
                            <Input
                                id="calories"
                                aria-describedby="my-helper-text"
                                onChange={(e) =>
                                    setNewIngredient({
                                        ...newIngredient,
                                        calories: Number(e.target.value),
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="fats">fats</InputLabel>
                            <Input
                                id="fats"
                                aria-describedby="my-helper-text"
                                onChange={(e) =>
                                    setNewIngredient({
                                        ...newIngredient,
                                        fats: Number(e.target.value),
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="carbohydrates">
                                carbohydrates
                            </InputLabel>
                            <Input
                                id="carbohydrates"
                                aria-describedby="my-helper-text"
                                onChange={(e) =>
                                    setNewIngredient({
                                        ...newIngredient,
                                        carbohydrates: Number(e.target.value),
                                    })
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="proteins">proteins</InputLabel>
                            <Input
                                id="proteins"
                                aria-describedby="my-helper-text"
                                onChange={(e) =>
                                    setNewIngredient({
                                        ...newIngredient,
                                        proteins: Number(e.target.value),
                                    })
                                }
                            />
                        </FormControl>
                    </div>
                    <Button variant="outlined" onClick={addNewIngredient}>
                        Add New Ingredient
                    </Button>
                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default index;
