import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ReactDOM from "react-dom";
import MainComponent from "./Components/Main/MainComponent";

// @ts-ignore
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainComponent />
    </Provider>
  </React.StrictMode>
);
