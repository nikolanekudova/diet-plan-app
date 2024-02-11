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
                  },
                  secondary: {
                      main: "#C53055",
                      light: "#F2F4F3",
                      dark: "#832039",
                      forActiveMenu: "#e3e3e3",
                  },
                  background: {
                      default: "#FFFFFF",
                  },
                  text: {
                      primary: "#063437",
                  },
              }
            : {
                  primary: {
                      main: "#07393C",
                      light: "#91ECF3",
                      dark: "#063437",
                  },
                  secondary: {
                      main: "#0A090C",
                      light: "#131314",
                      dark: "#0A090C",
                      forActiveMenu: "#414142",
                  },
                  background: {
                      default: "#0A090C",
                  },
                  text: {
                      primary: "#f5f5f5",
                  },
              }),
    },
});
