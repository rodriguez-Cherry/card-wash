import { axiosClient } from "../api/ApiCliente";
import { useNavigate } from "react-router";
import { useState, useContext, useEffect } from "react";
import { useData } from "../util/useData";
import Select from "react-select";
import { toast } from "sonner";
import { CarWashContext } from "../contex/Context";
import { conseguirHorasPermitidas } from "../util/conseguirHorasPermitidas";

const horasPermitidas = [
  {
    hora: "8:00 AM - 10:00 AM",
  },
  {
    hora: "10:00 AM - 12:00 PM",
  },
  {
    hora: "1:00 PM - 3:00 PM",
  },
  {
    hora: "3:00 PM - 5:00 PM",
  },
];

const horasMap = {
  "8:00 AM - 10:00 AM": 8,
  "10:00 AM - 12:00 PM": 9,
  "1:00 PM - 3:00 PM": 10,
  "3:00 PM - 5:00 PM": 11,
};

export function AgendarCita({ servicio, setOpen, userId }) {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(8);
  const [carrosSelect, setCarrosSelect] = useState([]);

  const { isLoading, data: carros } = useData("/users/car/" + userId, "get");
  const { isLoadingOrdenes, data: ordenesF } = useData("/admin/ordenes", "get");
  const { setSelectedHome } = useContext(CarWashContext);

  const onAgendar = async () => {
    if (!hour || !carrosSelect.length || !date)
      return toast("Por favor agrega los campos");

    const newDate = new Date(`${date}, ${hour}:00:00`);

    console.log(`${date} ${hour}:00:00`);

    const payload = {
      // fecha: newDate.toISOString().slice(0, 19).replace("T", " "),
      fecha: `${date} ${hour}:00:00`,
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

  // useEffect(() => {
  //   const ordenes = [
  //     {
  //       id: "9449ebfd-ce4f-11f0-9a7a-c03eba484fce",
  //       fecha: "2025-12-03T14:00:00.000Z",
  //       estado: "pendiente",
  //       user_id: "e9965bba-ccc6-11f0-b8da-c03eba484fce",
  //       servicio_id: "f4fc059e-bcd8-11f0-8583-c03eba484fce",
  //       carros_ids: "e87be5fa-cd36-11f0-9a7a-c03eba484fce",
  //       tipo: "Lavado Rápido Estandar",
  //       precio: 500,
  //       tiempo_estimado: 60,
  //     },
  //     {
  //       id: "9449ebfd-ce4f-11f0-9a7a-c03eba484fce",
  //       fecha: "2025-12-03T14:00:00.000Z",
  //       estado: "pendiente",
  //       user_id: "e9965bba-ccc6-11f0-b8da-c03eba484fce",
  //       servicio_id: "f4fc059e-bcd8-11f0-8583-c03eba484fce",
  //       carros_ids: "e87be5fa-cd36-11f0-9a7a-c03eba484fce",
  //       tipo: "Lavado Rápido Estandar",
  //       precio: 500,
  //       tiempo_estimado: 60,
  //     },
  //     {
  //       id: "9449ebfd-ce4f-11f0-9a7a-c03eba484fce",
  //       fecha: "2025-12-03T14:00:00.000Z",
  //       estado: "pendiente",
  //       user_id: "e9965bba-ccc6-11f0-b8da-c03eba484fce",
  //       servicio_id: "f4fc059e-bcd8-11f0-8583-c03eba484fce",
  //       carros_ids: "e87be5fa-cd36-11f0-9a7a-c03eba484fce",
  //       tipo: "Lavado Rápido Estandar",
  //       precio: 500,
  //       tiempo_estimado: 60,
  //     },
  //     {
  //       id: "9449ebfd-ce4f-11f0-9a7a-c03eba484fce",
  //       fecha: "2025-12-03T14:00:00.000Z",
  //       estado: "pendiente",
  //       user_id: "e9965bba-ccc6-11f0-b8da-c03eba484fce",
  //       servicio_id: "f4fc059e-bcd8-11f0-8583-c03eba484fce",
  //       carros_ids: "e87be5fa-cd36-11f0-9a7a-c03eba484fce",
  //       tipo: "Lavado Rápido Estandar",
  //       precio: 500,
  //       tiempo_estimado: 60,
  //     },
  //     {
  //       id: "9449ebfd-ce4f-11f0-9a7a-c03eba484fce",
  //       fecha: "2025-12-03T14:00:00.000Z",
  //       estado: "pendiente",
  //       user_id: "e9965bba-ccc6-11f0-b8da-c03eba484fce",
  //       servicio_id: "f4fc059e-bcd8-11f0-8583-c03eba484fce",
  //       carros_ids: "e87be5fa-cd36-11f0-9a7a-c03eba484fce",
  //       tipo: "Lavado Rápido Estandar",
  //       precio: 500,
  //       tiempo_estimado: 60,
  //     },
  //     {
  //       id: "9449ebfd-ce4f-11f0-9a7a-c03eba484fce",
  //       fecha: "2025-12-03T14:00:00.000Z",
  //       estado: "pendiente",
  //       user_id: "e9965bba-ccc6-11f0-b8da-c03eba484fce",
  //       servicio_id: "f4fc059e-bcd8-11f0-8583-c03eba484fce",
  //       carros_ids: "e87be5fa-cd36-11f0-9a7a-c03eba484fce",
  //       tipo: "Lavado Rápido Estandar",
  //       precio: 500,
  //       tiempo_estimado: 60,
  //     },
  //     {
  //       id: "9449ebfd-ce4f-11f0-9a7a-c03eba484fce",
  //       fecha: "2025-12-03T14:00:00.000Z",
  //       estado: "pendiente",
  //       user_id: "e9965bba-ccc6-11f0-b8da-c03eba484fce",
  //       servicio_id: "f4fc059e-bcd8-11f0-8583-c03eba484fce",
  //       carros_ids: "e87be5fa-cd36-11f0-9a7a-c03eba484fce",
  //       tipo: "Lavado Rápido Estandar",
  //       precio: 500,
  //       tiempo_estimado: 60,
  //     },
  //   ];

  //   const resultado = conseguirHorasPermitidas(ordenes);
  //   console.log(resultado);
  // }, []);
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
              setSelectedHome("Perfil");
            }}
          >
            Ir a Perfil
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
              <label htmlFor="date" className="px-1 font-semibold">
                Horas :
              </label>
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
              <label htmlFor="date" className="px-1 font-semibold">
                Vehiculos:
              </label>
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
                  label: c.marca + " " + c.modelo,
                }))}
                isDisabled={carrosSelect?.length > 2}
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
