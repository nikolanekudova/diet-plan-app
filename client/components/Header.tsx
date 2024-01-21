import * as React from "react";
import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function Header() {
    return (
        <div className="header-wrapper">
            <div className="search-wrapper">
                <TextField
                    label="search"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    sx={{ width: "300px"}}
                />
                <div className="icon-search-wrapper">
                    <Search />
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}
