import React, { useState } from "react";
import { Button } from "@mui/material";
import { ITDEEErrors, ITdee } from "@/types/types";
import { TDEEForm } from "./TDEEForm";
import { TDEEDialog } from "./TDEEDialog";

export function TDEE() {
    const [tdee, setTdee] = useState<ITdee>({
        height: 0,
        weight: 0,
        age: 0,
        gender: "",
        bodyFat: 0,
        lifestyle: "",
        lowIntensity: 0,
        mediumIntensity: 0,
        highIntensity: 0,
        strengthTraining: 0,
        intensityStrength: "",
    });

    const [TDEEerrors, setTDEEErrors] = useState<ITDEEErrors>({
        height: false,
        weight: false,
        age: false,
        gender: false,
        lifestyle: false,
    });

    const [resultTdee, setResultTdee] = useState<number>(0);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    function calculateBMR() {
        let BMR = 0;

        if (tdee.bodyFat) {
            let weightWithoutFat = (1 - tdee.bodyFat / 100) * tdee.weight;

            BMR = 21.6 * weightWithoutFat + 370;
        } else if (tdee.gender === "male") {
            BMR = 9.99 * tdee.weight + 6.25 * tdee.height - 4.92 * tdee.age + 5;
        } else {
            BMR =
                9.99 * tdee.weight + 6.25 * tdee.height - 4.92 * tdee.age - 161;
        }

        return BMR;
    }

    function getStrengthTrainingPAL() {
        let strengthTrainingPAL = 0;

        switch (tdee.intensityStrength) {
            case "low":
                strengthTrainingPAL = 0.15;
                break;
            case "medium":
                strengthTrainingPAL = 0.225;
                break;
            case "high":
                strengthTrainingPAL = 0.275;
                break;
        }

        return strengthTrainingPAL;
    }

    function getLifestylePAL() {
        let lifestylePAL = 0;

        switch (tdee.lifestyle) {
            case "sedentary":
                lifestylePAL = 1.35;
                break;
            case "lightlyActive":
                lifestylePAL = 1.45;
                break;
            case "moderatelyActive":
                lifestylePAL = 1.65;
                break;
            case "veryActive":
                lifestylePAL = 2;
                break;
        }

        return lifestylePAL;
    }

    function validateInputs() {
        const updatedTDEEerrors: ITDEEErrors = {
            height: false,
            weight: false,
            age: false,
            gender: false,
            lifestyle: false,
        };

        for (const [key, value] of Object.entries(TDEEerrors)) {
            const inputValue = tdee[key as keyof ITdee];

            if (inputValue === 0 || inputValue === "") {
                updatedTDEEerrors[key as keyof ITDEEErrors] = true;
            } else {
                updatedTDEEerrors[key as keyof ITDEEErrors] = false;
            }

            setTDEEErrors(updatedTDEEerrors);
        }

        return updatedTDEEerrors;
    }

    function calculateTdee() {
        let TDEE = 0;
        let BMR = calculateBMR();
        let activityPAL = 0;
        let lifestylePAL = getLifestylePAL();
        let strengthTrainingPAL = getStrengthTrainingPAL();

        activityPAL =
            (tdee.lowIntensity * 0.17 +
                tdee.mediumIntensity * 0.25 +
                tdee.highIntensity * 0.35 +
                tdee.strengthTraining * strengthTrainingPAL) /
            7;

        TDEE = BMR * (activityPAL + lifestylePAL) * 1.1;

        setResultTdee(Math.round(TDEE));
        setOpenDialog(true);
    }

    function handleCalculate() {
        let errors = validateInputs();
        let allFalse = Object.values(errors).every((value) => value === false);

        if (allFalse) {
            calculateTdee();
        }

        return;
    }

    return (
        <div>
            <TDEEForm tdee={tdee} setTdee={setTdee} TDEEerrors={TDEEerrors} />
            <Button
                variant="contained"
                sx={{ marginTop: "30px" }}
                onClick={handleCalculate}
            >
                Calculate!
            </Button>
            <TDEEDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                resultTdee={resultTdee}
            />
        </div>
    );
}
