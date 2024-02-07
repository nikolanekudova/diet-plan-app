import { PaletteMode } from "@mui/material";

export const getTheme = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                  primary: {
                      main: "#07393C",
                      light: "#91ECF3",
                      dark: "#063437",
                      contrastText: "#f5f5f5",
                  },
                  secondary: {
                      main: "#F3D768",
                      light: "#F9EBB4",
                      dark: "#EEC82F",
                      contrastText: "#063437",
                  },
                  background: {
                      default: "#F0EDEE",
                  },
              }
            : {
                  primary: {
                      main: "#07393C",
                      light: "#91ECF3",
                      dark: "#063437",
                      contrastText: "#f5f5f5",
                  },
                  secondary: {
                      main: "#0A090C",
                      light: "#0A090C",
                      dark: "#0A090C",
                      contrastText: "#f5f5f5",
                  },
                  background: {
                      default: "#0A090C",
                  },
              }),
    },
});
