import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router";
import { App } from "./App.jsx";
import { Toaster } from "sonner";
import './App.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Toaster />
      <App />
    </BrowserRouter>
  </StrictMode>
);
