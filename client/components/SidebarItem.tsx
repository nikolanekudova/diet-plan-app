import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface SidebarItemProps {
    name: string,
    icon: any
}

export default function SidebarItem( props: SidebarItemProps ) {

    return (
        <div>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon
                        sx={{ color: "primary.main", minWidth: "35px" }}
                    >
                        {props.icon}
                        
                    </ListItemIcon>
                    <ListItemText primary={props.name} />
                </ListItemButton>
            </ListItem>
        </div>
    );
}
