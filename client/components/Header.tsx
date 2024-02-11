import * as React from "react";
import { IconButton, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IHeaderProps } from "@/types/types";

export default function Header({colorMode, toggleColorMode}: IHeaderProps) {
    return (
        <div className="header-wrapper">
            <div className="search-wrapper">
                <TextField
                    label="search"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    sx={{ width: "300px" }}
                />
                <div className="icon-search-wrapper">
                    <Search sx={{ color: "text.primary" }} />
                </div>
            </div>
            <div className="toggle-dark-wrapper">
                 <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                    {colorMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon color="primary" />}
                </IconButton>
            </div>
        </div>
    );
}
