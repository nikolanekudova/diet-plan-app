import React, { useState } from "react";
import {
    FormControl,
    Input,
    InputLabel,
    Button,
    InputAdornment,
    OutlinedInput,
    FormHelperText,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { ITdee } from "@/types/types";

export function TDEE() {
    const [tdee, setTdee] = useState<ITdee>({
        height: null,
        weight: null,
        age: null,
        gender: "",
        bodyFat: null,
        lifestyle: "",
    });

    const [showCardio, setShowCardio] = useState<boolean>(false);

    console.log(showCardio)

    console.log(tdee);

    return (
        <div className="tdee-wrapper">
            <div>
                Fill in all the data and calculate your Total Daily Energy
                Expenditure (TDEE).
            </div>
            <div className="tdee-form-wrapper">
                <div className="tdee-form-row-wrapper">
                    <FormControl>
                        <OutlinedInput
                            id="height"
                            inputProps={{ type: "number" }}
                            onChange={(e) =>
                                setTdee({
                                    ...tdee,
                                    height: Number(e.target.value),
                                })
                            }
                            sx={{ width: "120px" }}
                            endAdornment={
                                <InputAdornment position="end">
                                    cm
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="height">Height</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <OutlinedInput
                            id="weight"
                            inputProps={{ type: "number" }}
                            onChange={(e) =>
                                setTdee({
                                    ...tdee,
                                    weight: Number(e.target.value),
                                })
                            }
                            sx={{ width: "120px" }}
                            endAdornment={
                                <InputAdornment position="end">
                                    kg
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="weight">Weight</FormHelperText>
                    </FormControl>
                </div>
                <div className="tdee-form-row-wrapper">
                    <FormControl>
                        <OutlinedInput
                            id="age"
                            inputProps={{ type: "number" }}
                            onChange={(e) =>
                                setTdee({
                                    ...tdee,
                                    age: Number(e.target.value),
                                })
                            }
                            sx={{ width: "120px" }}
                            endAdornment={
                                <InputAdornment position="end">
                                    years
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="age">Age</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Select
                            id="gender"
                            value={tdee.gender}
                            sx={{ width: "120px" }}
                            onChange={(e) =>
                                setTdee({
                                    ...tdee,
                                    gender: e.target.value,
                                })
                            }
                        >
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                        <FormHelperText id="gender">Gender</FormHelperText>
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
                        sx={{ width: "120px" }}
                        endAdornment={
                            <InputAdornment position="end">%</InputAdornment>
                        }
                    />
                    <FormHelperText id="bodyFat">Body fat</FormHelperText>
                </FormControl>
                <FormControl>
                    <Select
                        id="lifestyle"
                        value={tdee.lifestyle}
                        sx={{ width: "200px" }}
                        onChange={(e) =>
                            setTdee({
                                ...tdee,
                                lifestyle: e.target.value,
                            })
                        }
                    >
                        <MenuItem value={"sedentary"}>
                            Sedentary job (max 20 mins walk per day)
                        </MenuItem>
                        <MenuItem value={"lightlyActive"}>
                            Lightly active (sedantary job, ~ 50 mins walk per
                            day, housework)
                        </MenuItem>
                        <MenuItem value={"moderatelyActive"}>
                            Moderately active (manual work – waiter...)
                        </MenuItem>
                        <MenuItem value={"veryActive"}>
                            Very active (heavy manual work – construction...)
                        </MenuItem>
                    </Select>
                    <FormHelperText id="outlined-weight-helper-text">
                        Lifestyle
                    </FormHelperText>
                </FormControl>
                haha
                <FormControlLabel
                    control={<Checkbox value={showCardio} onChange={(value) => setShowCardio(!value)}/>}
                    label="I want to add activity"
                />
            </div>
        </div>
    );
}

// https://aktin.cz/chcete-hubnout-nabirat-svaly-nebo-jen-zdraveji-jist-spocitejte-si-makra-vzhledem-k-vasemu-cili
