import { createContext } from "react";
import { IActivepage } from "../types/types"

export const ActivepageContext = createContext<IActivepage>({
    activePage: "Ingredients",
    setActivepage: () => {}
});