import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/app";

import ContextProvider from "@/context";
import ReduxProvider from "@/redux";

import "@styles/index.scss";

const render = () => {
  const app = document.getElementById("app");

  if (app) ReactDOM.createRoot(app).render(
    <React.StrictMode>
      <ContextProvider>
        <ReduxProvider>
          <App/>
        </ReduxProvider>
      </ContextProvider>
    </React.StrictMode>
  );
};

render();