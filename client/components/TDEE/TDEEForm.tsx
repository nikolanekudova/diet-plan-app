import React from "react";
import {
    FormControl,
    InputAdornment,
    OutlinedInput,
    FormHelperText,
    Select,
    MenuItem,
    Divider,
} from "@mui/material";
import { ITDEEFormProps } from "@/types/types";

export function TDEEForm({ tdee, setTdee, TDEEerrors }: ITDEEFormProps) {
    return (
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
                                {TDEEerrors.age ? "Fill in your age" : "Age"}
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
                                Lightly active (sedantary job, ~ 50 mins walk
                                per day, housework)
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
                                        lowIntensity: Number(e.target.value),
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
                                        mediumIntensity: Number(e.target.value),
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
                                        highIntensity: Number(e.target.value),
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
    );
}
