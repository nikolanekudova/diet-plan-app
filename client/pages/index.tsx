/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ActivepageContext, IngredientsContext } from "../context/Context";
import { getTheme } from "../context/Theme";
import { Ingredient } from "../types/types";
import { Ingredients } from "@/components/Ingredients/Ingredients";

function index() {
    const [mode, setMode] = useState("dark");
    function toggleColorMode() {
        setMode(prev => prev === "light" ? "dark" : "light")
    }
    let customTheme = React.useMemo(() => createTheme(getTheme(mode)), [mode]);
    
    const [activePage, setActivepage] = useState("Ingredients");
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [newIngredient, setNewIngredient] = useState<Ingredient>({
        name: "",
        calories: null,
        fats: null,
        carbohydrates: null,
        proteins: null,
    });

    function getIngredients() {
        fetch("http://localhost:8080/ingredients/")
            .then((res) => res.json())
            .then((data) => {
                //console.log(data);
                setIngredients(data);
            });
    }

    useEffect(() => {
        getIngredients();
    }, []);

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <ThemeProvider theme={customTheme}>
                <ActivepageContext.Provider value={{ activePage, setActivepage }}>
                    <IngredientsContext.Provider value={{ ingredients, setIngredients, newIngredient, setNewIngredient, getIngredients }}>
                        <Sidebar />
                        <div className="page-wrapper">
                            <Header />
                            <div className="page-header">{activePage}</div>
                            <div className="page-content-wrapper">
                                {activePage == "Ingredients" &&
                                    <Ingredients />
                                }
                            </div>
                        </div>
                    </IngredientsContext.Provider>
                </ActivepageContext.Provider>
            </ThemeProvider>
        </div>
    );
}

export default index;
