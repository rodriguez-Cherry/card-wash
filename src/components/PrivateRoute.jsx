import { Navigate } from "react-router";

export function PrivateRoute({ estado, Component }) {
  if (estado === "checking") {
    return <div>Cargando</div>;
  }
  if (estado === "no-autenticado") {
    return <Navigate to="/login" />;
  }

  console.log(estado)

  return <Component />;
}
