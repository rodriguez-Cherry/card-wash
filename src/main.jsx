import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router";
import { Authenticated } from "./components/Authenticated.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Authenticated />
    </BrowserRouter>
  </StrictMode>
);
