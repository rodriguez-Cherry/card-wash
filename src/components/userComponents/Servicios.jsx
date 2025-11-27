import { Tooltip } from "@/components/ui/tooltip";
import { useData } from "../../util/useData";
import { Loading } from "../Loading";
import { useContext, useState } from "react";
import { CarWashContext } from "../../contex/Context";
import { Modal } from "../Modal";
import { AgendarCita } from "../AgendarCita";

export function Servicios() {
  const { userData } = useContext(CarWashContext);
  const {
    data: servicios,
    isLoading,
    error,
  } = useData("/users/servicios", "get");
  const {
    data: carros,
    isLoading: carrosLoading,
    error: carrosError,
  } = useData("/users/car/" + userData.id, "get");

  const [servicioSeleccionado, setServicioSeleccionado] = useState({});
  const [open, setOpen] = useState(false);

  const onAgendar = (servicio) => {
    setServicioSeleccionado(servicio);
    setOpen(true);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Servicios</h1>
      <div className="flex flex-wrap flex-row gap-4 mt-3 ">
        <Modal open={open} setOpen={setOpen}>
          <AgendarCita
            userId={userData?.id}
            servicio={servicioSeleccionado}
            setOpen={setOpen}
          />
        </Modal>
        {isLoading && <Loading />}
        {servicios?.map((servicio) => (
          <Servicio {...servicio} setServicioSeleccionado={onAgendar} />
        ))}
      </div>
    </div>
  );
}

function Servicio(props) {
  const {
    tipo,
    descripcion,
    precio,
    detalles,
    id,
    carros,
    setServicioSeleccionado,
  } = props;

  const detallesSplit = detalles
    .split(",")
    .map((t, i) => " " + t + "\n")
    .join(" ");

  return (
    <div style={{ height: "250px", position: "relative" }}>
      <Tooltip
        content={detallesSplit}
        contentProps={{ css: { "--tooltip-bg": "gray" } }}
      >
        <div className="border rounded p-3 bg-white w-60 h-full ">
          <h1 className="text-xl text-sky-300">{tipo}</h1>
          <p className="text-sm">{descripcion}</p>
          <p style={{ color: "#017BCA" }}> DOP {precio}</p>

          <div className="bottom-4 h-auto absolute">
            <button
              onClick={() => setServicioSeleccionado(props)}
              className="p-1 mt-4 text-sm bg-sky-300 rounded text-white"
            >
              Agendar
            </button>
          </div>
        </div>
      </Tooltip>
    </div>
  );
}


