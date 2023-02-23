/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { FronteggProvider } from "@frontegg/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const contextOptions = {
  baseUrl: "https://app-5omj9h9oozk4.frontegg.com",
  clientId: "b85b111c-47f0-4ce8-bcc9-e2fed2085d8e",
};

root.render(
  <React.StrictMode>
    {/* <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}> */}
    <App />
    {/* </FronteggProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
