import { axiosClient } from "../api/ApiCliente";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useData } from "../util/useData";
import Select from "react-select";
import { toast } from "sonner";

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

export function AgendarCita({ servicio, setOpen, userId }) {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(8);
  const [carrosSelect, setCarrosSelect] = useState([]);

  const { isLoading, data: carros } = useData("/users/car/" + userId, "get");

  const onAgendar = async () => {
    if (!hour || !carrosSelect.length || !date)
      return toast("Por favor agrega los campos");

    const newDate = new Date(`${date}, ${hour}:00:00`);

    const payload = {
      fecha: newDate.toISOString().slice(0, 19).replace("T", " "),
      user_id: userId,
      carros_id: carrosSelect.join("|"),
      servicio_id: servicio.id,
    };
    try {
      await axiosClient.post("/users/agendar", payload);
      setOpen(false);
      setDate(null);
      setCarrosSelect([]);
      toast("Su cita ha sido agendada!");
    } catch (error) {
      setDate(null);
      setCarrosSelect([]);
      toast(error.response.data);
    }
  };

  const onCancel = () => {
    setOpen(false);
    setDate(null);
    setCarrosSelect([]);
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
              <Select
                onChange={(rangoHora) => {
                  setHour(rangoHora.value);
                }}
                options={horasPermitidas?.map((hora) => ({
                  value: horasMap[hora.hora],
                  label: hora.hora,
                }))}
              />
            </div>
            <div className="p-2 flex gap-2 items-center">
              <Select
                isMulti={true}
                onChange={(carrosSelected) => {
                  let carrosId = carrosSelected.map(
                    (selecionado) => selecionado.value
                  );
                  setCarrosSelect(carrosId);
                }}
                options={carros?.map((c) => ({
                  value: c.id,
                  label: c.marca + " " + c.modelo ,
                }))}
              />
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
              onClick={onCancel}
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
