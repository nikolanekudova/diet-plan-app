/* // because of custom theme with typescript
declare module "@mui/material/styles" {
    interface Theme {
        palette: {
            mode: string,
            primary: {
                main: string,
                light: string,
                dark: string,
            },
            secondary: {
                main: string,
                light: string,
                dark: string,
            },
            background: {
                default: string,
            },
        };
    }

    interface ThemeOptions {
        palette?: {
            mode?: string,
            primary?: {
                main?: string,
                light?: string,
                dark?: string,
            },
            secondary?: {
                main?: string,
                light?: string,
                dark?: string,
            },
            background?: {
                default?: string,
            },
        };
    }
} */

import { PaletteMode } from "@mui/material";

export const theme = {
    palette: {
        mode: "light" as PaletteMode,
        primary: {
            main: "#07393C",
            light: "#91ECF3",
            dark: "#063437",
        },
        secondary: {
            main: "#F3D768",
            light: "#F9EBB4",
            dark: "#EEC82F",
        },
        background: {
            default: "#F0EDEE",
        },
    },
};