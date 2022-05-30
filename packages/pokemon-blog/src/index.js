import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TopBarController from "./Layouts/Navigation/Controllers/TopBarController";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPost from "./Posts/IntroPost";
import ApiModulesPost from "./Posts/ApiModulesPost";
import PokedexModulePost from "./Posts/PokedexModulePost";
import OlderModulesPost from "./Posts/OlderModulesPost";
import NextFeaturesScreen from "./Screens/NextFeaturesScreen/NextFeaturesScreen";
import NewestPostCard from "./Components/NewestPostCard/NewestPostCard";
import { CssBaseline, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { scizorTheme } from "./Theme/scizor";
import ArchitectureDiagramScreen from "./Screens/ArchitectureDiagramScreen/ArchitectureDiagram";

const root = ReactDOM.createRoot(document.getElementById("root"));

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
            <Route path="pokedex-module" element={<PokedexModulePost />} />
            <Route path="older-modules" element={<OlderModulesPost />} />
            {/*next-features*/}
            <Route path="next-features" element={<NextFeaturesScreen />} />
            <Route
              path="architecture-diagram"
              element={<ArchitectureDiagramScreen />}
            />
          </Routes>
        </TopBarController>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
