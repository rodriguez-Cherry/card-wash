import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import { App } from "./App";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/landing",
        Component: Landing,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: Signup,
      },
    ],
  },
]);
