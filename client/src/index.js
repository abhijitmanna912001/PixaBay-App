import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import myReducer from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));

const myStore = configureStore({
  reducer: myReducer,
  devTools: process.env.NODE_ENV !== "production",
});

root.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
