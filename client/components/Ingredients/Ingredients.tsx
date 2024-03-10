import React, { useState } from "react";
import { IngredientsTable } from "./IngredientsTable";
import { IngredientForm } from "./IngredientForm";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { IngredientSnackbar } from "./IngredientSnackbar";
import { ISnackbarContext } from "@/context/Context";

export function Ingredients() {
    const [showForm, setShowForm] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("test");

    return (
        <div>
            <ISnackbarContext.Provider
                value={{
                    openSnackbar,
                    setOpenSnackbar,
                    snackbarMessage,
                    setSnackbarMessage,
                }}
            >
                <IngredientsTable />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 3 }}
                    onClick={() => setShowForm((showForm) => !showForm)}
                >
                    Add New Ingredient
                </Button>
                <Dialog
                    open={showForm}
                    onClose={() => setShowForm(false)}
                    PaperProps={{
                        component: "form",
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            setShowForm(false);
                        },
                    }}
                    fullWidth={true}
                    sx={{ textAlign: "center" }}
                >
                    <DialogTitle>Add New Ingredient</DialogTitle>
                    <DialogContent>
                        <IngredientForm setForm={setShowForm} />
                    </DialogContent>
                </Dialog>
                <IngredientSnackbar />
            </ISnackbarContext.Provider>
        </div>
    );
}
