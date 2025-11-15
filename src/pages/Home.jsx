import { useContext, useEffect } from "react";
import { CarWashContext } from "../contex/Context";
import { NavBar } from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faKeyboard,
  faUserCircle,
  faCarTunnel,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { axiosClient } from "../api/ApiCliente";

const options = [
  {
    id: 1,
    name: "Servicios",
    icon: <FontAwesomeIcon icon={faKeyboard} />,
  },
  {
    id: 2,
    name: "Ordenes",
    icon: <FontAwesomeIcon icon={faUserCircle} />,
  },
  {
    id: 3,
    name: "Perfil",
    icon: <FontAwesomeIcon icon={faCarTunnel} />,
  },
];
export function Home() {
  const data = useContext(CarWashContext);
  const [selected, setSelected] = useState("Servicios");
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    async function getServicios() {
      try {
        const { data } = await axiosClient.get("/users/servicios");
        setServicios(data.data);
      } catch (error) {}
    }
    getServicios();
  }, []);
  return (
    <div className="flex p-6 gap-5">
      <NavBar options={options} setSelected={setSelected} />
      <div>
        <h1 className="text-xl underline">Bienvendo home</h1>
        <ul className="flex gap-4 mt-3 ">
          {servicios.map((servicio) => (
            <li className="border rounded p-3 bg-white">
              <h1 className="h1 capitalize">{servicio.tipo}</h1>
              <p>{servicio.descripcion}</p>
              <p> ${servicio.precio}</p>
              <button
                type="button"
                class="bg-dark box-border border hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
              >
                Agendar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
