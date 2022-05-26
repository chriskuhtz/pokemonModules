import { createTheme } from "@mui/material/styles";

export const scizorPrimary = "#ba4a4a";
export const scizorSecondary = "#1a1b1a";
export const scizorText = "#b3c1cb";

export const scizorTheme = createTheme({
  palette: {
    primary: {
      main: scizorPrimary,
    },
    secondary: {
      main: scizorSecondary,
    },
    textColor: {
      main: scizorText,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: scizorSecondary,
          color: scizorText,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: scizorSecondary,
          color: scizorText,
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          backgroundColor: scizorSecondary,
          color: scizorText,
        },
      },
    },
  },
});
