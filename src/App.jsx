import { Outlet } from "react-router";
import { Navigation } from "./components/Navigation";
export function App() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
