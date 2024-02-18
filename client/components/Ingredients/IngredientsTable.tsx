import React, { useContext } from "react";
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
} from "@mui/x-data-grid";
import { IngredientsContext } from "@/context/Context";
import { Ingredient } from "../../types/types";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const columns: GridColDef[] = [
    { field: "name", headerName: "Ingredient", width: 300, editable: true },
    { field: "calories", headerName: "Calories", width: 100, editable: true },
    {
        field: "carbohydrates",
        headerName: "Carbohydrates",
        width: 120,
        editable: true,
    },
    { field: "proteins", headerName: "Proteins", width: 100, editable: true },
    { field: "fats", headerName: "Fats", width: 100, editable: true },
    { field: "actions", headerName: "Actions", width: 100, getActions: ({ id }) => {
        //const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        const isInEditMode = true;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              key={id}
              onClick={() => console.log("click")}
              //onClick={handleSaveClick(id)}
            />,

            <GridActionsCellItem
              icon={<DeleteOutlineIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() => console.log("click")} //handleCancelClick(id
              color="inherit"
              key={id}
            />,
          ];
        }

        return [
            // eslint-disable-next-line react/jsx-key
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            //onClick={handleEditClick(id)}
            color="inherit"
          />,
          // eslint-disable-next-line react/jsx-key
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            //onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
    }},
];

export function IngredientsTable() {
    const { ingredients, getIngredients } = useContext(IngredientsContext);

    function saveEditOnServer(updatedRow: Ingredient, originalRow: Ingredient) {
        // _id can not be updated
        const dataToUpdate = { ...updatedRow};
        delete dataToUpdate._id;
    
        const request = {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToUpdate),
        };
    
        fetch(`http://localhost:8080/ingredients/?id=${updatedRow._id}`, request)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error))
            .then(() => getIngredients())

        return updatedRow;
    }
    
    function handleProcessRowUpdateError(err: any) {
        console.log(err)
    }

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
            />
        </div>
    );
}
