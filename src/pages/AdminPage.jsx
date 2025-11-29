import { useContext, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Tablero } from "../components/adminComponentes/Tablero";
import { Clientes } from "../components/adminComponentes/Clientes";
import { Vehiculos } from "../components/adminComponentes/Vehiculos";
import { Servicios } from "../components/adminComponentes/Servicios";
import { Ordenes } from "../components/adminComponentes/Ordenes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, faUserCircle, faCarTunnel, faSquareRootVariable, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { CarWashContext } from "../contex/Context";

const componentes = {
  // Tablero: <Tablero />,
  Clientes: <Clientes />,
  Vehiculos: <Vehiculos />,
  // Servicios: <Servicios />,
  Ordenes: <Ordenes />,
};
  const options = [
    // {
    //   id: 1,
    //   name: "Tablero",
    //   icon: <FontAwesomeIcon icon={faKeyboard} />,
    // },
    {
      id: 2,
      name: "Clientes",
      icon: <FontAwesomeIcon icon={faUserCircle} />,
    },
    {
      id: 3,
      name: "Vehiculos",
      icon: <FontAwesomeIcon icon={faCarTunnel} />,
    },
    // {
    //   id: 4,
    //   name: "Servicios",
    //   icon: <FontAwesomeIcon icon={faSquareRootVariable} />,
    // },
    {
      id: 5,
      name: "Ordenes",
      icon: <FontAwesomeIcon icon={faDatabase} />,
    },
  ];


export const AdminPage = () => {

   const {selectedAdmin, setSelectedAdmin } = useContext(CarWashContext)


  return (
    <div className="flex gap-2 p-8">
      <NavBar options={options} selected={selectedAdmin} setSelected={setSelectedAdmin} />
      <div style={{ width:"100%"}}>
        <div>{componentes[selectedAdmin]}</div>
      </div>
    </div>
  );
};
