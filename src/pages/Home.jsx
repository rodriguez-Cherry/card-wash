import { NavBar } from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKeyboard,
  faUserCircle,
  faCarTunnel,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { Servicios } from "../components/userComponents/Servicios";
import { Ordenes } from "../components/userComponents/Ordenes";
import { Perfil } from "../components/userComponents/Perfil";
import { CarWashContext } from "../contex/Context";

const options = [
  {
    id: 1,
    name: "Perfil",
    icon: <FontAwesomeIcon icon={faCarTunnel} color="#7dd3fc" />,
  },
  {
    id: 2,
    name: "Servicios",
    icon: <FontAwesomeIcon icon={faKeyboard} color="#7dd3fc" />,
  },
  {
    id: 3,
    name: "Ordenes",
    icon: <FontAwesomeIcon icon={faUserCircle} color="#7dd3fc" />,
  },
];

const componentes = {
  Servicios: <Servicios />,
  Ordenes: <Ordenes />,
  Perfil: <Perfil />,
};

export function Home() {

 const {setSelectedHome, selectedHome} =  useContext(CarWashContext)


  return (
    <div style={{ width: "100%" }} className="flex p-3 gap-5">
      <NavBar options={options} setSelected={setSelectedHome} />
      <div>{componentes[selectedHome]}</div>
    </div>
  );
}
