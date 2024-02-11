import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useContext } from "react";
import { ActivepageContext } from "../context/Context";
import { SidebarItemProps } from "@/types/types";
import { Box } from "@mui/material";

export default function SidebarItem(props: SidebarItemProps) {
    const { activePage, setActivepage } = useContext(ActivepageContext);

    return (
        <Box
            onClick={() => setActivepage(props.name)}
            sx={{ bgcolor: activePage == props.name ? "secondary.forActiveMenu" : "" }}
        >
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon
                        sx={{ color: "text.primary", minWidth: "35px" }}
                    >
                        {props.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={props.name}
                        sx={{ color: "text.primary" }}
                    />
                </ListItemButton>
            </ListItem>
        </Box>
    );
}
