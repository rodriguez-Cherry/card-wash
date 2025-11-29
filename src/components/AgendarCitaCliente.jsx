import { axiosClient } from "../api/ApiCliente";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { useData } from "../util/useData";
import Select from "react-select";
import { toast } from "sonner";
import { CarWashContext } from "../contex/Context";

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

export function AgendarCitaCliente({ setOpenModal, setActualizado }) {
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(8);
  const [carrosSelect, setCarrosSelect] = useState([]);
  const [clienteIdSeleccionado, setClienteIdSeleccionado] = useState("");

  const [servicioIdSeleccionado, setServicioIdSeleccionado] = useState("");

  const { data: clientes, isLoading } = useData(
    "/admin/clientes-no-registrados",
    "get"
  );

  const { data: carros, isLoadingCarros } = useData(
    "/users/car/" + clienteIdSeleccionado,
    "get",
    clienteIdSeleccionado
  );
  const { data: servicios, isLoadingServicios } = useData(
    "/users/servicios/",
    "get"
  );

  const clientesNoRegistrados = clientes?.map((cliente) => ({
    value: cliente?.id,
    label: cliente?.nombre,
  }));
  const carrosDelUserSeleccionado = carros?.map((carro) => ({
    value: carro?.id,
    label: carro?.marca + " " + carro?.modelo,
  }));
  const serviciosSeleccionado = servicios?.map((servicio) => ({
    value: servicio?.id,
    label: servicio?.tipo + " " + servicio?.precio,
  }));


 const {setSelectedAdmin } =  useContext(CarWashContext)

  console.log()

  const onResetValues = () => {
    setOpenModal(false);
    setDate(null);
    setHour(8);
    setCarrosSelect([]);
    setClienteIdSeleccionado("");
    setServicioIdSeleccionado("");
  };

  const onAgendar = async () => {
    if (
      !hour ||
      !carrosSelect.length ||
      !date ||
      !clienteIdSeleccionado ||
      !servicioIdSeleccionado
    )
      return toast("Por favor agrega los campos");

    const newDate = new Date(`${date}, ${hour}:00:00`);

    const payload = {
      fecha: newDate.toISOString().slice(0, 19).replace("T", " "),
      user_id: clienteIdSeleccionado,
      carros_id: carrosSelect?.join("|"),
      servicio_id: servicioIdSeleccionado,
    };
    try {
      await axiosClient.post("/users/agendar", payload);

      setActualizado((prev) => !prev);
      onResetValues();
      toast("La cita ha sido agendada!");
    } catch (error) {
      onResetValues();
      toast(error.response.data);
    }
    setOpenModal(false);
  };

  const onCancel = () => {
    onResetValues();
  };
  return (
    <div>
      <h1 className="text-lg font-semibold mb-3">Agendar cita</h1>
      <div>
        <label>Clientes:</label>
        <Select
          valueOf={clienteIdSeleccionado || ""}
          options={clientesNoRegistrados}
          onChange={(option) => setClienteIdSeleccionado(option.value)}
        />
      </div>

      {!clienteIdSeleccionado && !carros?.length && (
        <div>Seleccione un cliente</div>
      )}
      {clienteIdSeleccionado && !carros?.length && (
        <div className="font-semibold text-sm mt-4">
        <p>  Este cliente no posee vehiculos por favor agregue vehiculo para este
          cliente en la seccion de vehiculos</p>
          <button className="border rounded mt-2 p-2" onClick={() => setSelectedAdmin('Vehiculos')}>Ir a Vehiculos</button>
        </div>
      )}
      {carros?.length > 0 && (
        <>
          <div className="flex flex-col gap-2">
            <label className="mt-4">Carros:</label>
            <Select
              isMulti={true}
              options={carrosDelUserSeleccionado}
              onChange={(options) => {
                setCarrosSelect(options.map((option) => option.value));
              }}
              isDisabled={carrosSelect?.length > 2}
            />
            <label>Servicios:</label>
            <Select
              options={serviciosSeleccionado}
              onChange={(option) => setServicioIdSeleccionado(option.value)}
            />
          </div>

          <div>
            <div className="flex flex-col gap-3 relative border rounded mt-3">
              <div className="flex gap-4 p-2 items-center">
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
            </div>
            <div className="text-right">
              <button
                // disabled={isAgendarHabilitado}
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
        </>
      )}
    </div>
  );
}
