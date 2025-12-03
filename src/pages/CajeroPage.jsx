import { NavBar } from "../components/NavBar";
import { Ordenes } from "../components/cajeroComponentes/Ordenes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase , faKeyboard} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CarWashContext } from "../contex/Context";
import { HistorialOrdenes } from "../components/adminComponentes/HistorialOrdenes";

const componentes = {
  Ordenes: <Ordenes />,
  "Historial Ordenes": <HistorialOrdenes />,
};

const options = [
  {
    id: 1,
    name: "Ordenes",
    icon: <FontAwesomeIcon icon={faDatabase} />,
  },
  {
    id: 2,
    name: "Historial Ordenes",
    icon: <FontAwesomeIcon icon={faKeyboard} />,
  },
];

export const CarejoPage = () => {
  const { selectedCajero, setSelectedCajero } = useContext(CarWashContext);
  return (
    <div className="flex gap-2 p-8">
      <NavBar options={options} selected={selectedCajero} setSelected={setSelectedCajero} />
      <div style={{ width: "100%" }}>
        <div>{componentes[selectedCajero]}</div>
      </div>
    </div>
  );
};
