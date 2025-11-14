import { useState } from "react";
import { NavBar } from "../components/NavBar";
import { Tablero } from "../components/adminComponentes/Tablero";
import { Clientes } from "../components/adminComponentes/Clientes";
import { Vehiculos } from "../components/adminComponentes/Vehiculos";
import { Servicios } from "../components/adminComponentes/Servicios";
import { Ordenes } from "../components/adminComponentes/Ordenes";

const componentes = {
  Tablero: <Tablero />,
  Clientes: <Clientes />,
  Vehiculos: <Vehiculos />,
  Servicios: <Servicios />,
  Ordenes: <Ordenes />,
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
