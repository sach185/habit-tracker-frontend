import React from "react";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
