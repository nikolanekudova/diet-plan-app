import React, { useState } from "react";
import {
    FormControl,
    Button,
    InputAdornment,
    OutlinedInput,
    FormHelperText,
    Select,
    MenuItem,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import { ITDEEErrors, ITdee } from "@/types/types";

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
        const updatedTDEEerrors = {};

        for (const [key, value] of Object.entries(TDEEerrors)) {
            const inputValue = tdee[key];

            if (inputValue === 0 || inputValue === "") {
                updatedTDEEerrors[key] = true;
            } else {
                updatedTDEEerrors[key] = false;
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
            <div className="tdee-wrapper">
                <div className="tdee-left-wrapper">
                    Fill in all the data and calculate your TDEE. 📊
                    <div className="tdee-form-wrapper">
                        <div className="tdee-form-row-wrapper">
                            <FormControl>
                                <OutlinedInput
                                    id="height"
                                    inputProps={{
                                        type: "number",
                                        min: "0",
                                        step: "1",
                                    }}
                                    onChange={(e) =>
                                        setTdee({
                                            ...tdee,
                                            height: Number(e.target.value),
                                        })
                                    }
                                    sx={{ width: "150px" }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            cm
                                        </InputAdornment>
                                    }
                                    required
                                    error={TDEEerrors.height}
                                />
                                <FormHelperText id="height">
                                    {TDEEerrors.height
                                        ? "Fill in your height"
                                        : "Height"}
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <OutlinedInput
                                    id="weight"
                                    inputProps={{
                                        type: "number",
                                        min: "0",
                                        step: "1",
                                    }}
                                    onChange={(e) =>
                                        setTdee({
                                            ...tdee,
                                            weight: Number(e.target.value),
                                        })
                                    }
                                    sx={{ width: "150px" }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            kg
                                        </InputAdornment>
                                    }
                                    required
                                    error={TDEEerrors.weight}
                                />
                                <FormHelperText id="weight">
                                    {TDEEerrors.weight
                                        ? "Fill in your weight"
                                        : "Weight"}
                                </FormHelperText>
                            </FormControl>
                        </div>
                        <div className="tdee-form-row-wrapper">
                            <FormControl>
                                <OutlinedInput
                                    id="age"
                                    inputProps={{
                                        type: "number",
                                        min: "0",
                                        step: "1",
                                    }}
                                    onChange={(e) =>
                                        setTdee({
                                            ...tdee,
                                            age: Number(e.target.value),
                                        })
                                    }
                                    sx={{ width: "150px" }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            years
                                        </InputAdornment>
                                    }
                                    required
                                    error={TDEEerrors.age}
                                />
                                <FormHelperText id="age">
                                    {TDEEerrors.age
                                        ? "Fill in your age"
                                        : "Age"}
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <Select
                                    id="gender"
                                    value={tdee.gender}
                                    sx={{ width: "150px" }}
                                    onChange={(e) =>
                                        setTdee({
                                            ...tdee,
                                            gender: e.target.value,
                                        })
                                    }
                                    required
                                    error={TDEEerrors.gender}
                                >
                                    <MenuItem value={"male"}>Male</MenuItem>
                                    <MenuItem value={"female"}>Female</MenuItem>
                                </Select>
                                <FormHelperText id="gender">
                                    {TDEEerrors.gender
                                        ? "Fill in your gender"
                                        : "Gender"}
                                </FormHelperText>
                            </FormControl>
                        </div>
                        <FormControl>
                            <OutlinedInput
                                id="bodyFat"
                                inputProps={{ type: "number" }}
                                onChange={(e) =>
                                    setTdee({
                                        ...tdee,
                                        bodyFat: Number(e.target.value),
                                    })
                                }
                                sx={{ width: "150px" }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        %
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText id="bodyFat">
                                Body fat (optional)
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <Select
                                id="lifestyle"
                                value={tdee.lifestyle}
                                sx={{ width: "340px" }}
                                onChange={(e) =>
                                    setTdee({
                                        ...tdee,
                                        lifestyle: e.target.value,
                                    })
                                }
                                required
                                error={TDEEerrors.lifestyle}
                            >
                                <MenuItem value={"sedentary"}>
                                    Sedentary job (max 20 mins walk per day)
                                </MenuItem>
                                <MenuItem value={"lightlyActive"}>
                                    Lightly active (sedantary job, ~ 50 mins
                                    walk per day, housework)
                                </MenuItem>
                                <MenuItem value={"moderatelyActive"}>
                                    Moderately active (manual work – waiter...)
                                </MenuItem>
                                <MenuItem value={"veryActive"}>
                                    Very active (heavy manual work –
                                    construction...)
                                </MenuItem>
                            </Select>
                            <FormHelperText id="outlined-weight-helper-text">
                                {TDEEerrors.lifestyle
                                    ? "Please choose your lifestyle"
                                    : "Lifestyle"}
                            </FormHelperText>
                        </FormControl>
                    </div>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className="tdee-right-wrapper">
                    <div>How many hours per week do you work out? 💪</div>
                    <div className="activity-wrapper">
                        <div className="activity-row-wrapper">
                            <FormControl>
                                <OutlinedInput
                                    id="lowIntensity"
                                    inputProps={{
                                        type: "number",
                                        min: "0",
                                        step: "1",
                                    }}
                                    onChange={(e) =>
                                        setTdee({
                                            ...tdee,
                                            lowIntensity: Number(
                                                e.target.value
                                            ),
                                        })
                                    }
                                    sx={{ width: "120px" }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            hours
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            of low intensity (&lt;130 bpm) 🚶🚴
                        </div>
                        <div className="activity-row-wrapper">
                            <FormControl>
                                <OutlinedInput
                                    id="mediumIntensity"
                                    inputProps={{
                                        type: "number",
                                        min: "0",
                                        step: "1",
                                    }}
                                    onChange={(e) =>
                                        setTdee({
                                            ...tdee,
                                            mediumIntensity: Number(
                                                e.target.value
                                            ),
                                        })
                                    }
                                    sx={{ width: "120px" }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            hours
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            of medium intensity (130–150 bpm) 🚴🏊
                        </div>
                        <div className="activity-row-wrapper">
                            <FormControl>
                                <OutlinedInput
                                    id="highIntensity"
                                    inputProps={{
                                        type: "number",
                                        min: "0",
                                        step: "1",
                                    }}
                                    onChange={(e) =>
                                        setTdee({
                                            ...tdee,
                                            highIntensity: Number(
                                                e.target.value
                                            ),
                                        })
                                    }
                                    sx={{ width: "120px" }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            hours
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            of high intensity (&gt;150 bpm) 🚴🏊🏃
                        </div>
                        <div className="activity-row-wrapper">
                            <FormControl>
                                <OutlinedInput
                                    id="strengthTraining"
                                    inputProps={{
                                        type: "number",
                                        min: "0",
                                        step: "1",
                                    }}
                                    onChange={(e) =>
                                        setTdee({
                                            ...tdee,
                                            strengthTraining: Number(
                                                e.target.value
                                            ),
                                        })
                                    }
                                    sx={{ width: "120px" }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            hours
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            of strength training 🏋️
                        </div>
                        <FormControl>
                            <Select
                                id="intensityStrength"
                                value={tdee.intensityStrength}
                                sx={{ width: "340px" }}
                                onChange={(e) =>
                                    setTdee({
                                        ...tdee,
                                        intensityStrength: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value={"low"}>
                                    Recreational training, little effort
                                </MenuItem>
                                <MenuItem value={"medium"}>
                                    Strenuous strength training
                                </MenuItem>
                                <MenuItem value={"high"}>
                                    Circuit training, CrossFit
                                </MenuItem>
                            </Select>
                            <FormHelperText id="intensityStrength">
                                How intensive your strength training is?
                            </FormHelperText>
                        </FormControl>
                    </div>
                </div>
            </div>
            <Button
                variant="contained"
                sx={{ marginTop: "30px" }}
                onClick={handleCalculate}
            >
                Calculate!
            </Button>

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                fullWidth={true}
                sx={{ textAlign: "center" }}
            >
                <DialogTitle>Here you go! 🔥</DialogTitle>
                <DialogContent>
                    Your TDEE (Total Daily Energy Expenditure) is:
                    <br />
                    <h2>{resultTdee} kcal</h2>
                    <Button
                        variant="outlined"
                        onClick={() => setOpenDialog(false)}
                    >
                        OK
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// https://aktin.cz/chcete-hubnout-nabirat-svaly-nebo-jen-zdraveji-jist-spocitejte-si-makra-vzhledem-k-vasemu-cili
