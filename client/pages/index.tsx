/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ActivepageContext, IngredientsContext } from "../context/Context";
import { getTheme } from "../context/Theme";
import { Ingredient } from "../types/types";
import { Ingredients } from "@/components/Ingredients/Ingredients";
import CssBaseline from '@mui/material/CssBaseline';
import { Divider, PaletteMode } from "@mui/material";
import { TDEE } from "@/components/TDEE/TDEE";

function index() {
    const [activePage, setActivepage] = useState("Ingredients");
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [newIngredient, setNewIngredient] = useState<Ingredient>({
        name: "",
        calories: null,
        fats: null,
        carbohydrates: null,
        proteins: null,
    });
    const [mode, setMode] = useState("light");
    const customTheme = React.useMemo(() => createTheme(getTheme(mode as PaletteMode)), [mode]);

    function toggleColorMode() {
        setMode(prev => prev === "light" ? "dark" : "light")
    }

    function getIngredients() {
        fetch("http://localhost:8080/ingredients/")
            .then((res) => res.json())
            .then((data) => {
                setIngredients(data);
            });
    }

    useEffect(() => {
        getIngredients();
    }, []);

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <ThemeProvider theme={customTheme}>
                <CssBaseline />
                <ActivepageContext.Provider value={{ activePage, setActivepage }}>
                    <IngredientsContext.Provider value={{ ingredients, setIngredients, newIngredient, setNewIngredient, getIngredients }}>
                        <Sidebar />
                        <div className="page-wrapper">
                            <Header colorMode={mode} toggleColorMode={toggleColorMode}/>
                            <Divider />
                            <div className="page-header">{activePage}</div>
                            <div className="page-content-wrapper">
                                {activePage == "Ingredients" && <Ingredients /> }
                                {activePage == "TDEE" && <TDEE /> }
                            </div>
                        </div>
                    </IngredientsContext.Provider>
                </ActivepageContext.Provider>
            </ThemeProvider>
        </div>
    );
}

export default index;