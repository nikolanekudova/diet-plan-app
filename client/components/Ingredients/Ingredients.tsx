import React, { useState } from "react";
import { IngredientsTable } from "./IngredientsTable";
import { IngredientForm } from "./IngredientForm";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

export function Ingredients() {
    const [showForm, setShowForm] = useState<boolean>(false);

    return (
        <div>
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
            >
                <DialogTitle>Add New Ingredient</DialogTitle>
                <DialogContent>
                    <IngredientForm setForm={setShowForm} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
