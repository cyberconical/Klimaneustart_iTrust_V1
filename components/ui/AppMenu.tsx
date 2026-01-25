import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import LanguageToggle from "./LanguageToggle.tsx";
import axios from "../authentication/axios.tsx";
import { useAuthStore } from "../authentication/authStore.tsx";

const AppMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await axios.post(
                "/users/logout",
                { },
                {
                    headers: {
                        withCredentials: true,
                        "Content-Type": "application/json",
                    },
                }
            );

            useAuthStore.getState().clearTokens();
            useAuthStore.getState().setUsername(null);
            window.location.href = "/login";

        } catch (error) {
            console.log("Logout failed:", error);
        }
    };

    return (
        <React.Fragment>
            <IconButton
                aria-label="menu"
                onClick={handleMenuClick}
                sx={{ position: "fixed", top: 16, right: 16, zIndex: 1300 }}
                size="large"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem>
                    <LanguageToggle />
                </MenuItem>
                <MenuItem
                    onClick={() => { handleLogout(); handleMenuClose();}}>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};
export default AppMenu;
