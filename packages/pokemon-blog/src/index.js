import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TopBarController from "./Layouts/Navigation/Controllers/TopBarController";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApiModulesPost from "./Posts/ApiModulesPost";
import ApiModulesPost2 from "./Posts/OlderModulesPost";
import ApiModulesPost3 from "./Posts/WhyPokemonPost";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      <TopBarController>
        <Routes>
          <Route path="/" element={<ApiModulesPost />} />
          <Route path="why-monorepo" element={<ApiModulesPost3 />} />
          <Route path="api-modules" element={<ApiModulesPost2 />} />
          <Route path="older-modules" element={<ApiModulesPost2 />} />
          <Route path="why-pokemon" element={<ApiModulesPost3 />} />
        </Routes>
      </TopBarController>
    </BrowserRouter>
  </React.StrictMode>
);
