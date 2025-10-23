import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, RouterProvider } from "react-router";
import { router } from "./Router.jsx";
import { Authenticated } from "./components/Authenticated.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <RouterProvider router={router}/> */}
    <BrowserRouter>
      <Authenticated />
    </BrowserRouter>
  </StrictMode>
);
