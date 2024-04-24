import React, { useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { ISnackbarContext } from "@/context/Context";
import { SnackbarContent } from "@mui/material";

export function IngredientSnackbar() {
    const { openSnackbar, setOpenSnackbar, snackbarMessage } = useContext(ISnackbarContext);

    function handleCloseSnackbar(event: React.SyntheticEvent | Event, reason?: string) {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    }

    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
        >
            <SnackbarContent
                sx={{bgcolor: "text.primary"}}
                message={snackbarMessage} 
            />
        </Snackbar>
    );
}