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

export interface IIngredients {
    ingredients: Array<Ingredient>,
    setIngredients: Dispatch<SetStateAction<any>>,
    newIngredient: Ingredient,
    setNewIngredient: Dispatch<SetStateAction<any>>,
    getIngredients: Function;
}

export interface SidebarItemProps {
    name: string,
    icon: any
}

export interface IHeaderProps {
    colorMode: string,
    toggleColorMode: React.Dispatch<React.SetStateAction<any>>
}

export interface ITdee {
    height: number | null;
    weight: number | null;
    age: number | null;
    gender: "male" | "female" | string,
    bodyFat: number | null,
    lifestyle: "sedentary" | "lightlyActive" | "moderatelyActive" | "veryActive" | string,
}