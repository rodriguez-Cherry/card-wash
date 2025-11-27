import { axiosClient } from "../api/ApiCliente";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useData } from "../util/useData";
import Select from "react-select";

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

export function AgendarCita({ servicio, userData, setOpen, userId }) {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(8);
  const [carro, setCarro] = useState(null);

  const { isLoading, data: carros } = useData("/users/car/" + userId, "get");

  const onAgendar = async () => {
    if (!hour || !carro || !date) return toast("Por favor agrega los campos");

    const newDate = new Date(`${date}, ${hour}:00:00`);

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
      {isLoading && <div> Loading cars</div>}
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
              <Select
                options={carros?.map((c) => ({
                  value: c.id,
                  label: c.modelo,
                }))}
              />
              {/* <label id="carros" className="px-1 font-semibold">
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
              </select> */}
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
