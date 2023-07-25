import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./globalStyles/app.scss";
import { worker } from "@/mocks/browser.ts";
import Providers from "./providers";

worker.start();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
      <div id="modals" />
    </Providers>
  </React.StrictMode>
);
