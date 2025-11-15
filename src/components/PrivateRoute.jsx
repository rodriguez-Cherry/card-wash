import { Navigate } from "react-router";
import { Header } from "./Header";

export function PrivateRoute({ estado, Component }) {
  if (estado === "checking") {
    return <div>Cargando</div>;
  }
  if (estado === "no-autenticado") {
    return <Navigate to="/login" />;
  }

  return (
    <div id="private" style={{ backgroundColor: "#e1f1fd", height: "100vh" }}>
      <Header />
      <Component />;
    </div>
  );
}
