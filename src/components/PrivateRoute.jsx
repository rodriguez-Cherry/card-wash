import { Navigate } from "react-router";
import { Header } from "./Header";

const roles = {
  cliente: "/home",
  admin: "/admin",
};

export function PrivateRoute({ estado, Component, correctRole, rol }) {
  if (estado === "checking") {
    return <div>Cargando</div>;
  }
  if (estado === "no-autenticado" || !estado) {
    return <Navigate to="/login" />;
  }

  if (!correctRole) {
    return <Navigate to={roles[rol]} />;
  }

  return (
    <div id="private" style={{ backgroundColor: "#EFF5FC"}}>
      <Header />
      <Component />;
    </div>
  );
}
