import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Bridge for OAuth callback when using HashRouter
// If Keycloak redirects to /backoffice?code=..., ensure the hash route mounts
(() => {
  const { origin, pathname, search, hash } = window.location;
  if (pathname === "/backoffice" && hash !== "#/backoffice") {
    // Preserve query (?code, ?state, ...) and append desired hash route
    const newUrl = `${origin}${pathname}${search}#/backoffice`;
    window.history.replaceState(null, "", newUrl);
  }
})();

const container = document.getElementById("root");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <App />
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
