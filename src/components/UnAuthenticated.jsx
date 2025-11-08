import { Route, Routes, Navigate } from "react-router";
import { Landing } from "../pages/Landing";
import { SignupPage } from "../pages/SignupPage";
import { LoginPage } from "../pages/LoginPage";
import { Home } from "../pages/Home";

export function UnAuthenticated() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}
