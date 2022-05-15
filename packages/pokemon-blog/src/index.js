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
import { Stack, ThemeProvider } from "@mui/material";
import { scizorTheme } from "pokemon-mui-themes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={scizorTheme}>
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
