import React from "react";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { ITDEEDialogProps } from "@/types/types";

export function TDEEDialog({ openDialog, setOpenDialog, resultTdee }: ITDEEDialogProps) {
    return (
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
                <Button variant="outlined" onClick={() => setOpenDialog(false)}>
                    OK
                </Button>
            </DialogContent>
        </Dialog>
    );
}
