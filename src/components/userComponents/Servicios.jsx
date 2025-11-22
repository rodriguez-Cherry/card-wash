import { Tooltip } from "@/components/ui/tooltip";
import { useData } from "../../util/useData";
import { Loading } from "../Loading";
import { useContext, useState } from "react";
import { CarWashContext } from "../../contex/Context";
import { Modal } from "../Modal";
import { useNavigate } from "react-router";
import { axiosClient } from "../../api/ApiCliente";
import { toast } from "sonner";

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
          userData={userData}
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

const horasPermitidas = [
  {
    hora: "8:00 AM - 9:00 AM",
  },
  {
    hora: "9:00 AM - 10:00 AM",
  },
  {
    hora: "10:00 AM - 11:00 AM",
  },
  {
    hora: "11:00 AM - 12:00 AM",
  },
];

const horasMap = {
  "8:00 AM - 9:00 AM": 8,
  "9:00 AM - 10:00 AM": 9,
  "10:00 AM - 11:00 AM": 10,
  "11:00 AM - 12:00 AM": 11,
};

function AgendarCita({ servicio, userData, setOpen, carros }) {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(8);
  const [carro, setCarro] = useState(null);

  console.log({
    date,
    hour,
    carro,
  });

  const carrosAVer = [
    { id: 1, modelo: "Seleccione un carro", marca: "" },
    ...carros,
  ];
  const onAgendar = async () => {
    if (!hour || !carro || !date) return toast("Por favor agrega los campos");

    const newDate = new Date(`${date}, ${hour}:00:00`);

    console.log(newDate.toISOString());
    const payload = {
      fecha: newDate.toISOString().slice(0, 19).replace("T", " "),
      user_id: userData?.id,
      carro_id: carro,
      servicio_id: servicio.id,
    };
    try {
      await axiosClient.post("/users/agendar", payload);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

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
              <select
                onChange={(e) => setHour(e.target.value)}
                id="horas"
                className="border p-1 rounded"
              >
                {horasPermitidas.map((horas) => (
                  <option value={horasMap[horas.hora]}>{horas.hora}</option>
                ))}
              </select>
            </div>
            <div className="p-2 flex gap-2 items-center">
              <label id="carros" className="px-1 font-semibold">
                Selecciona tu vehiculo:
              </label>
              <select
                id="carros"
                onChange={(e) => setCarro(e.target.value)}
                className="border p-1 rounded"
              >
                {carrosAVer?.map((carro) => (
                  <option value={carro.id}>{carro.modelo}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-right">
            <button
              onClick={onAgendar}
              className="p-1 border rounded bg-blue-600 font-semibold text-white mt-4 text-center"
            >
              Agendar
            </button>
            <button
              onClick={() => setOpen(false)}
              className="p-1 border rounded bg-red-600 font-semibold text-white mt-4 ms-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
