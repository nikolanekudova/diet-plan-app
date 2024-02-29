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
    height: number;
    weight: number;
    age: number;
    gender: "male" | "female" | string,
    bodyFat: number,
    lifestyle: "sedentary" | "lightlyActive" | "moderatelyActive" | "veryActive" | string,
    lowIntensity: number,
    mediumIntensity: number,
    highIntensity: number,
    strengthTraining: number,
    intensityStrength: "low" | "medium" | "high" | string,
}

export interface ITDEEErrors {
    height: boolean;
    weight: boolean;
    age: boolean;
    gender: boolean,
    lifestyle: boolean,
}

export interface ITDEEFormProps {
    tdee: ITdee;
    setTdee: React.Dispatch<React.SetStateAction<ITdee>>;
    TDEEerrors: ITDEEErrors;
}

export interface ITDEEDialogProps {
    openDialog: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
    resultTdee: number;
}