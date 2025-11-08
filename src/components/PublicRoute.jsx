import { Navigate } from "react-router";

export function PublicRoute({ estado, Component }) {
  if (estado === "checking") {
    return <div>Cargando</div>;
  }
  if (estado === "autenticado") {
    return <Navigate to="/home" />;
  }

  return <Component />;
}
