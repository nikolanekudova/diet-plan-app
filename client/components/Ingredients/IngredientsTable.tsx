import React, { useContext, useState } from "react";
import { ISnackbarContext, IngredientsContext } from "@/context/Context";
import { Ingredient } from "../../types/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
    Button,
    Dialog,
    DialogTitle,
} from "@mui/material";

// přidat validaci (jak FE, tak BE)

export function IngredientsTable() {
    const { ingredients, getIngredients } = useContext(IngredientsContext);
    const { setOpenSnackbar, setSnackbarMessage } =
        useContext(ISnackbarContext);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [ingredientIDToDelete, setIngredientIDToDelete] = useState<GridRowId>("");

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (
        params,
        event
    ) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    function handleEditClick(id: GridRowId) {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    }

    function handleSaveClick(id: GridRowId) {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    }

    function handleCancelClick(id: GridRowId) {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    }

    function handleDeleteClick(id: GridRowId) {
        setOpenDialog(true);
        setIngredientIDToDelete(id);
    }

    function handleConfirmDeleteClick() {
        deleteOnServer(ingredientIDToDelete)
        setOpenDialog(false);
    }

    function handleRowModesModelChange(newRowModesModel: GridRowModesModel) {
        setRowModesModel(newRowModesModel);
    }

    function deleteOnServer(id: GridRowId) {
        const request = {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        fetch(`http://localhost:8080/ingredients/?id=${id}`, request)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error))
            .then(() => getIngredients())
            .then(() => openSnackbar("Ingredient deleted 🫡"));
    }

    function saveEditOnServer(updatedRow: Ingredient, originalRow: Ingredient) {
        // _id can not be updated
        const dataToUpdate = { ...updatedRow };
        delete dataToUpdate._id;

        const request = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToUpdate),
        };

        fetch(
            `http://localhost:8080/ingredients/?id=${updatedRow._id}`,
            request
        )
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error))
            .then(() => getIngredients())
            .then(() => openSnackbar("Ingredient updated 🫡"));

        return updatedRow;
    }

    function openSnackbar(message: string) {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    }

    function handleProcessRowUpdateError(err: any) {
        console.log(err);
    }

    const columns: GridColDef[] = [
        { field: "name", headerName: "Ingredient", width: 300, editable: true },
        {
            field: "calories",
            headerName: "Calories",
            width: 100,
            editable: true,
        },
        {
            field: "carbohydrates",
            headerName: "Carbs",
            width: 100,
            editable: true,
        },
        {
            field: "proteins",
            headerName: "Proteins",
            width: 100,
            editable: true,
        },
        { field: "fats", headerName: "Fats", width: 100, editable: true },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }: any) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={() => handleSaveClick(id)}
                            key={id}
                        />,

                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={() => handleCancelClick(id)}
                            color="inherit"
                            key={id}
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={() => handleEditClick(id)}
                        color="inherit"
                        key={id}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleDeleteClick(id)}
                        color="inherit"
                        key={id}
                    />,
                ];
            },
        },
    ];

    return (
        <div className="ingredients-table">
            <DataGrid
                getRowId={(row) => row._id}
                rows={ingredients}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            page: 0,
                            pageSize: 20,
                        },
                    },
                }}
                pageSizeOptions={[10, 20, 50, 100]}
                rowHeight={35}
                processRowUpdate={(updatedRow, originalRow) =>
                    saveEditOnServer(updatedRow, originalRow)
                }
                onProcessRowUpdateError={handleProcessRowUpdateError}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                slotProps={{
                    toolbar: { setRowModesModel },
                }}
            />

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                sx={{ textAlign: "center" }}
            >
                <DialogTitle>Are you sure?</DialogTitle>
                <div className="btns-delete-ingredient-form">
                    <Button
                        variant="contained"
                        onClick={() => handleConfirmDeleteClick()}
                        className="btn-delete-ingredient"
                    >
                        Yes!
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => setOpenDialog(false)}
                        className="btn-cancel-ingredient"
                    >
                        Cancel
                    </Button>
                </div>
            </Dialog>
        </div>
    );
}
