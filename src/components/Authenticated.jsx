import { Route, Routes, Navigate } from "react-router";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { Home } from "../pages/Home";
import { Landing } from "../pages/Landing";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { useContext } from "react";
import { CarWashContext } from "../contex/Context";
import { AdminPage } from "../pages/AdminPage";

export function Authenticated() {
  const data = useContext(CarWashContext);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <PrivateRoute
              estado={data?.sessionEstado}
              rol={data?.userData?.rol}
              correctRole={data?.userData?.rol === "cliente"}
              Component={Home}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute
              estado={data?.sessionEstado}
              rol={data?.userData?.rol}
              correctRole={data?.userData?.rol === "admin"}
              Component={AdminPage}
            />
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute estado={data?.sessionEstado} Component={LoginPage} />
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute estado={data?.sessionEstado} Component={SignupPage} />
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
