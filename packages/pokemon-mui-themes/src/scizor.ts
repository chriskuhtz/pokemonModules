import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    backgroundColor: Palette["primary"];
    textColor: Palette["primary"];
  }
  interface PaletteOptions {
    backgroundColor: PaletteOptions["primary"];
    textColor: PaletteOptions["primary"];
  }
}

export const scizorTheme = createTheme({
  palette: {
    primary: {
      main: "#ba4a4a",
    },
    secondary: {
      main: "#1a1b1a",
    },
    backgroundColor: {
      main: "#1a1b1a",
    },
    textColor: {
      main: "#b3c1cb",
    },
  },
  //   components: {
  //     // Name of the component
  //     MuiButton: {
  //       styleOverrides: {
  //         // Name of the slot
  //         root: {
  //           // Some CSS
  //           fontSize: "1rem",
  //         },
  //       },
  //     },
  //   },
});
