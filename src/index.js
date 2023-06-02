import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import { Suspense } from "react";
import { IntlProvider } from "react-intl";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <IntlProvider locale="en">
      <React.StrictMode>
        <Suspense fallback={<div>Loading ...</div>}>
          <App />
        </Suspense>
      </React.StrictMode>
    </IntlProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
