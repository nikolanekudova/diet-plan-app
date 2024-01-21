import { Dispatch, SetStateAction } from "react";

export interface Ingredient {
    calories: number | null;
    carbohydrates: number | null;
    fats: number | null;
    name: string;
    proteins: number | null;
    _id?: string;
}

export interface IActivepage {
    activePage: string,
    setActivepage: Dispatch<SetStateAction<any>>;
}

export interface SidebarItemProps {
    name: string,
    icon: any
}