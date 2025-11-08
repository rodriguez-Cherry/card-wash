import { Route, Routes, Navigate } from "react-router";
import { PrivateRoute } from "./PrivateRoute";
import { Home } from "../pages/Home";
import { Landing } from "../pages/Landing";

export function Authenticated() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/home"
        element={<PrivateRoute Component={Home} />}
      />

      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
}
