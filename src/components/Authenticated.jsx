import { Route, Routes, Navigate } from "react-router";
import Landing from "../pages/Landing";
import { PrivateRoute } from "./PrivateRoute";
import { Home } from "../pages/Home";
import { SignupPage } from "../pages/SignupPage";
import { LoginPage } from "../pages/LoginPage";

export function Authenticated() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/home"
        element={<PrivateRoute isAuthenticated={false} Component={Home} />}
      />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}
