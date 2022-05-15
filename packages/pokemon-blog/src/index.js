import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TopBarController from "./Layouts/Navigation/Controllers/TopBarController";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPost from "./Posts/IntroPost";
import ApiModulesPost from "./Posts/ApiModulesPost";
import OlderModulesPost from "./Posts/OlderModulesPost";
import NextFeaturesScreen from "./Screens/NextFeaturesScreen/NextFeaturesScreen";
import NewestPostCard from "./Components/NewestPostCard/NewestPostCard";
import { CssBaseline, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));

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

root.render(
  <React.StrictMode>
    <ThemeProvider theme={scizorTheme}>
      <CssBaseline />
      <BrowserRouter>
        {" "}
        <TopBarController>
          <Routes>
            <Route
              path="/"
              element={
                <Stack spacing={2}>
                  <NewestPostCard />
                  <IntroPost />
                </Stack>
              }
            />
            {/*posts*/}
            <Route path="intro" element={<IntroPost />} />
            <Route path="api-modules" element={<ApiModulesPost />} />
            <Route path="older-modules" element={<OlderModulesPost />} />
            {/*next-features*/}
            <Route path="next-features" element={<NextFeaturesScreen />} />
          </Routes>
        </TopBarController>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
