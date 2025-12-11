import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../../api/ApiCliente";
import { CarWashContext } from "../../contex/Context";
import { Badge } from "@chakra-ui/react";
import Select from "react-select";
import { toast } from "sonner";

export const OrdenDetalle = ({ info, setActualizado }) => {
  const carrosIds = info?.carros_placas;
  const [carrosPorOrden, setCarrosPorOrden] = useState([]);
  const [cambio, setCambio] = useState("");

  console.log(info)
  const { userData, selectedCajero } = useContext(CarWashContext);

  useEffect(() => {
    async function getCarros() {
      try {
        const promises = carrosIds.map(async (car) => {
          const { data } = await axiosClient.get("/users/car-por-placa/" + car);
          return data.data;
        });

        const results = await Promise.all(promises);
        setCarrosPorOrden(results);
      } catch (error) {
        console.log(error);
      }
    }

    getCarros();
  }, []);

  const cambiarEstado = async () => {
    if (!cambio) return toast("Por favor seleccione una opcion");

    const hour = new Date(info?.fecha).getHours();

    const date = new Intl.DateTimeFormat("en-US")
      .format(new Date(info?.fecha))
      ?.split("T")[0];

    const splitDate = date.replaceAll("/", "-").split("-");
    const correctDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
    try {
      const payload = {
        id: info?.cita_id,
        fecha: `${correctDate} ${hour}:00:00`,
        estado: cambio?.toLocaleLowerCase(),
        user_id: info?.user_id,
        servicio_id: info?.servicio_id,
        carros_ids: info?.carros_ids,
      };

      await axiosClient.put("/admin/update-ordenes", payload);
      setActualizado((prev) => !prev);
      toast("Estado de orden cambiado exitosamente!");
    } catch (error) {
      toast("Hubo un error al cambiar el estado");
    }
  };

  return (
    <div>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Tipo: {info?.tipo}
        </h1>

        <p className="text-gray-600 text-base font-semibold">
          Tiempo estimado:
          <span className="font-medium text-gray-800 ml-1">
            {info?.tiempo_estimado} minutos
          </span>
        </p>

        <p className="mt-3 text-gray-600 font-semibold">
          Estado:{" "}
          <Badge
            variant="outline"
            className={`px-3 py-1 rounded-full text-sm font-semibold 
      ${info?.estado === "pendiente" ? "border-yellow-500 text-yellow-600" : ""}
      ${info?.estado === "completado" ? "border-green-600 text-green-700" : ""}
      ${info?.estado === "cancelado" ? "border-red-600 text-red-700" : ""}
    `}
          >
            {info?.estado?.toUpperCase()}
          </Badge>
        </p>

        <div className="mt-5">
          <p className="font-semibold text-gray-800 mb-2">Vehículos:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {carrosPorOrden.map((carro) => (
              <div
                key={carro.id}
                className="p-3 border rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition"
              >
                <p className="text-gray-800 font-semibold">{carro.marca}</p>
                <p className="text-gray-600 text-sm">{carro.modelo}</p>
              </div>
            ))}
          </div>
        </div>

        {userData?.rol === "cajero" && selectedCajero === "Ordenes" && (
          <div className="text-gray-800 font-semibold p-3">
            <h1>Cambiar estado de la orden </h1>
            <div className="mt-2">
              <Select
                className="font-normal"
                onChange={(item) => setCambio(item.value)}
                options={[
                  { value: "En proceso", label: "En proceso" },
                  { value: "Completado", label: "Completado" },
                  { value: "Cancelado", label: "Cancelado" },
                ]}
              />

              <button
                onClick={cambiarEstado}
                className="border p-1 mt-2 rounded font-normal"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        )}
      </div>
      {/* </div> */}
    </div>
  );
};
