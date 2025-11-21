import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "@/components/ui/provider";
import { BrowserRouter } from "react-router";
import { App } from "./App.jsx";
import { Toaster } from "sonner";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
