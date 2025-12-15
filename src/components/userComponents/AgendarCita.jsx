import { axiosClient } from "../../api/ApiCliente";
import { useState, useContext, useEffect } from "react";
import { useData } from "../../util/useData";
import Select from "react-select";
import { toast } from "sonner";
import { CarWashContext } from "../../contex/Context";

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
    hora: "1:00 PM - 2:00 PM",
  },
    {
    hora: "2:00 PM - 3:00 PM",
  },
  {
    hora: "3:00 PM - 4:00 PM",
  },
    {
    hora: "4:00 PM - 5:00 PM",
  },
];

const horasMap = {
  "8:00 AM - 9:00 AM": 8,
  "9:00 AM - 10:00 AM": 9,
  "10:00 AM - 11:00 AM": 10,
  "1:00 PM - 2:00 PM": 1,
  "2:00 PM - 3:00 PM": 2,
  "3:00 PM - 4:00 PM": 3,
  "4:00 PM - 5:00 PM": 4,
};

export function AgendarCita({ servicio, setOpen, userId }) {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  const [permitirCita, setPermitirCita] = useState(1);
  const [carrosSelect, setCarrosSelect] = useState([]);
  const [existeUnoAgendado, setExisteUnoAgendado] = useState(null);

  const { isLoading, data: carros } = useData("/users/car/" + userId, "get");
  const { setSelectedHome } = useContext(CarWashContext);

  const today = new Date();
  const todayDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const onAgendar = async () => {
    if (!hour || !carrosSelect.length || !date)
      return toast("Por favor agrega los campos");

    if (existeUnoAgendado) {
      return toast("Por favor seleccione otro vehiculo");
    }

    const payload = {
      fecha: `${date}`,
      hora_inicio: hour + "",
      hora_fin: hour + 1 + "",
      estado: "pendiente",
      carro_placas: carrosSelect,
      servicio_id: servicio.servicio_id,
    };
    try {
      await axiosClient.post("/users/agendar", payload);
      setOpen(false);
      toast("Su cita ha sido agendada!");
    } catch (error) {
      toast(error.response.data);
    }
  };

  const onCancel = () => {
    setOpen(false);
    setDate(null);
    setCarrosSelect([]);
  };

  useEffect(() => {
    async function getHorasPermitidas() {
      try {
        const payload = {
          fecha: date,
          hora_inicio: hour + "",
          hora_fin: hour + 1 + "",
        };

        const { data } = await axiosClient.post(
          "/users/horarios-disponibles",
          payload
        );
        setPermitirCita(data?.canditad);
      } catch (error) {
        console.log("error");
      }
    }

    if (hour && date) {
      getHorasPermitidas();
    }
  }, [hour, date]);

  useEffect(() => {
    const verificarCarrosAgendados = async () => {
      let payload = {
        fecha: date,
        placas: carrosSelect,
      };
      const data = await axiosClient.post(
        "/users/verificar-placas-disponible",
        payload
      );

      setExisteUnoAgendado(data?.data?.unoEstaAgendado);
    };

    if (date || carrosSelect.length) {
      verificarCarrosAgendados();
    }
  }, [date, carrosSelect.length]);

  const puedeAgendar = permitirCita === 0;
  const elUsuarioHaSeleccionadoFecha = date && hour;

  console.log("hour", hour)

  const estaDeshabilitado =
    elUsuarioHaSeleccionadoFecha && permitirCita >= 3
      ? carrosSelect?.length > 2
      : carrosSelect?.length >= permitirCita;
  return (
    <div className="w-full">
      {isLoading && (
        <div className="text-center py-6">Cargando vehículos...</div>
      )}

      {carros?.length === 0 && (
        <div className="text-center p-6 bg-white rounded-xl shadow">
          <p className="mt-4 text-gray-700 text-lg">
            No posee vehículos por el momento. Diríjase a su perfil y agregue
            uno para poder agendar su cita.
          </p>

          <button
            className="mt-5 bg-[#017BCA] hover:bg-[#0EA5E9] text-white font-semibold px-4 py-2 rounded-xl shadow transition"
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
        <div className="w-full p-4">
          <h1 className="font-semibold text-2xl text-center mb-4 text-[#017BCA]">
            Agenda tu cita
          </h1>

          {/* CONTENEDOR DE FORMULARIO */}
          <div className="flex flex-col gap-4 border rounded-xl bg-white shadow p-4">
            {/* Fecha */}
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <label className="font-semibold min-w-[80px] text-gray-700">
                Fecha:
              </label>
              <input
                className="border rounded-lg p-2 w-full md:w-auto focus:ring-2 focus:ring-[#38BDF8]"
                type="date"
                min={todayDate}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Horas */}
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <label className="font-semibold min-w-[80px] text-gray-700">
                Horas:
              </label>
              <div className="w-full md:w-60">
                <Select
                  onChange={(rangoHora) => {
                    console.log(rangoHora, "rangoHora")
                    setHour(rangoHora.value);
                  }}
                  options={horasPermitidas?.map((hora) => ({
                    value: horasMap[hora.hora],
                    label: hora.hora,
                  }))}
                />
              </div>
            </div>

            {/* Vehículos */}
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <label className="font-semibold min-w-[80px] text-gray-700">
                Vehículos:
              </label>
              {permitirCita < 3 && elUsuarioHaSeleccionadoFecha && (
                <div>
                  <p>Puede agendar hasta {permitirCita} vehiculos</p>
                </div>
              )}
              <div className="w-full md:w-80">
                <Select
                  isMulti
                  onChange={(carrosSelected) => {
                    let carrosPlaca = carrosSelected.map(
                      (selecionado) => selecionado.value
                    );
                    setCarrosSelect(carrosPlaca);
                  }}
                  options={carros?.map((c) => ({
                    value: c.placa,
                    label: `${c.marca} ${c.modelo} - ${c.placa}`,
                  }))}
                  isDisabled={estaDeshabilitado}
                  isClearable
                />
              </div>
            </div>

            {existeUnoAgendado && (
              <div>
                <p>
                  Uno de sus vehiculos esta agendado el dia de hoy, no puede
                  agendar el dia de hoy
                </p>
              </div>
            )}

            {puedeAgendar && elUsuarioHaSeleccionadoFecha && (
              <div>
                <p>
                  Lo lamentamos nuestros servicios no estan disponibles en esta
                  fecha, seleccione otra hora o fecha
                </p>
              </div>
            )}
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onAgendar}
              className="px-5 py-2 bg-[#017BCA] hover:bg-[#0EA5E9] text-white font-semibold rounded-xl shadow transition"
            >
              Agendar
            </button>

            <button
              onClick={onCancel}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
