import { Tooltip } from "@/components/ui/tooltip";
import { useData } from "../../util/useData";
import { Loading } from "../Loading";
import { useContext, useState } from "react";
import { CarWashContext } from "../../contex/Context";
import { Modal } from "../Modal";
import { useNavigate } from "react-router";

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
    <div className="flex flex-wrap flex-row gap-4 mt-3 ">
      <Modal open={open} setOpen={setOpen}>
        <AgendarCita
          carros={carros}
          servicio={servicioSeleccionado}
          setOpen={setOpen}
        />
      </Modal>
      {isLoading && <Loading />}
      {servicios?.map((servicio) => (
        <Servicio {...servicio} setServicioSeleccionado={onAgendar} />
      ))}
    </div>
  );
}

let tieneVehiculo = false;
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

function AgendarCita({ servicio, carros, setOpen }) {
  const [date, setDate] = useState(null);

  console.log(carros);

  const navigate = useNavigate();
  return (
    <div>
      {carros?.length === 0 && (
        <div>
          {" "}
          <p className="mt-8">
            No posee vehiculos por el momento, por favor dirijase a su perfil y
            agregue uno y despues podra agendar su cita
          </p>
          <button
            className="border rounded p-1 mt-4 bg-blue-300 text-white font-semibold shadow"
            onClick={() => {
              setOpen(false);
              navigate("/home");
            }}
          >
            Cerrar
          </button>
        </div>
      )}
      {carros?.length > 0 && (
        <div>
          <Calendar22 date={date} setDate={setDate} carros={carros} />
        </div>
      )}
    </div>
  );
}

export function Calendar22({ setDate, date, carros }) {
  const horasPermitidas = [
    "8:00 AM- 9:00 AM",
    "9:00 AM- 10:00 AM",
    " 10:00 AM- 11:00 AM",
    "11:00 AM- 12:00 AM",
  ];

  return (
    <div>
      <h1 className="font-semibold text-xl text-center">Agenda tu cita</h1>
      <div className="flex flex-col gap-3 relative border rounded mt-3">
        <div className="flex gap-8 p-2 items-center">
          <label htmlFor="date" className="px-1 font-semibold">
            Fecha:
          </label>
          <input
            className="border p-1 rounded"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="p-2 flex gap-2 items-center">
          <label id="horas" className="px-1 font-semibold">
            Selecciona la hora:
          </label>
          <select id="horas" className="border p-1 rounded">
            {horasPermitidas.map((horas) => (
              <option value={horas}>{horas}</option>
            ))}
          </select>
        </div>
        <div className="p-2 flex gap-2 items-center">
          <label id="carros" className="px-1 font-semibold">
            Selecciona tu vehiculo:
          </label>
          <select id="carros" className="border p-1 rounded">
            {carros?.map((carro) => (
              <option value={carro.marca + " " + carro.modelo}>
                {carro.marca + " " + carro.modelo}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="text-right">

        <button className="p-1 border rounded bg-blue-600 font-semibold text-white mt-4 text-center">
          Agendar
        </button>
        <button className="p-1 border rounded bg-red-600 font-semibold text-white mt-4 ms-2">
          Cancelar
        </button>
      </div>
    </div>
  );
}
