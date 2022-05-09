import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TopBarController from "./Layouts/Navigation/Controllers/TopBarController";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPost from "./Posts/IntroPost";
import ApiModulesPost from "./Posts/ApiModulesPost";
import OlderModulesPost from "./Posts/OlderModulesPost";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      <TopBarController>
        <Routes>
          <Route path="/" element={<IntroPost />} />
          <Route path="intro" element={<IntroPost />} />
          <Route path="api-modules" element={<ApiModulesPost />} />
          <Route path="older-modules" element={<OlderModulesPost />} />
        </Routes>
      </TopBarController>
    </BrowserRouter>
  </React.StrictMode>
);
