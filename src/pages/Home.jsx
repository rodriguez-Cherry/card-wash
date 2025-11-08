import { useContext } from "react";
import { CarWashContext } from "../contex/Context";
import { Navigate } from "react-router";

export function Home() {
  const { data } = useContext(CarWashContext);

  if (!data.estaAutenticado) {
    return <Navigate to="/" />;
  }
  return <h1>Welcome home</h1>;
}
