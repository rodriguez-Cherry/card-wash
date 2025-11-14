import { useState } from "react";
import { NavBar } from "../components/NavBar";

const componentes = {
  Tablero: <div>Tablero</div>,
  Clientes: <div>Clientes</div>,
  Vehiculos: <div>Vehiculos</div>,
  Servicios: <div>Servicios</div>,
  Ordenes: <div>Ordenes</div>,
};

export const AdminPage = () => {
  const [selected, setSelected] = useState("Tablero");

  return (
    <div className="flex gap-2 p-8">
      <NavBar selected={selected} setSelected={setSelected} />
      <div>
        <h1>Bienvenido Administrador</h1>
        <div>{componentes[selected]}</div>
      </div>
    </div>
  );
};
