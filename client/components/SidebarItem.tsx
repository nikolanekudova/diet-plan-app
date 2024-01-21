import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useContext } from "react";
import { ActivepageContext } from "../context/Context";
import { SidebarItemProps } from "@/types/types";

export default function SidebarItem( props: SidebarItemProps ) {
    const { activePage, setActivepage } = useContext(ActivepageContext);

    return (
        <div className={activePage == props.name ? "active" : ""} onClick={() => setActivepage(props.name)}>
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
