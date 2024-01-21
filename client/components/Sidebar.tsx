import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import {
    TableChartRounded,
    LunchDiningRounded,
    RestaurantMenuRounded,
    CalculateRounded,
    SettingsRounded,
    AccountCircleRounded,
    HelpRounded,
} from "@mui/icons-material";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
    return (
        <div>
            <Box
                sx={{
                    width: "20vw",
                    maxWidth: 230,
                    height: "100%",
                    bgcolor: "secondary.light",
                }}
            >
                <div className="sidebar-header">DIET PLAN APP</div>
                <List sx={{ color: "primary.main", paddingLeft: "20px" }}>
                    <div className="sidebar-subtitle">MENU</div>

                    <SidebarItem name={"Diet Plans"} icon={<TableChartRounded />} />
                    <SidebarItem name={"Ingredients"} icon={<LunchDiningRounded />} />
                    <SidebarItem name={"Meals"} icon={<RestaurantMenuRounded />} />
                    <SidebarItem name={"TDEE"} icon={<CalculateRounded />} />

                    <div className="sidebar-subtitle">OTHERS</div>
                    
                    <SidebarItem name={"Settings"} icon={<SettingsRounded />} />
                    <SidebarItem name={"Account"} icon={<AccountCircleRounded />} />
                    <SidebarItem name={"Help"} icon={<HelpRounded />} />
                </List>
            </Box>
        </div>
    );
}
