import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../../api/ApiCliente";
import { CarWashContext } from "../../contex/Context";
import { Badge } from "@chakra-ui/react";
import Select from "react-select";
import { toast } from "sonner";

export const OrdenDetalle = ({ info, setActualizado }) => {
  const carrosIds = info.carros_ids.split("|");
  const [carrosPorOrden, setCarrosPorOrden] = useState([]);
  const [cambio, setCambio] = useState("");

  const { userData } = useContext(CarWashContext);

  useEffect(() => {
    async function getCarros() {
      try {
        const promises = carrosIds.map(async (car) => {
          const { data } = await axiosClient.get("/users/car-por-id/" + car);
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
        id: info?.id,
        fecha: `${correctDate} ${hour}:00:00`,
        estado: cambio,
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
      {/* {date} {hour} */}
      <div>
        {/* <h1 className="text-lg font-semibold"> Tipo: {info?.tipo}</h1>

        <p> Tiempo estimado: {info?.tiempo_estimado}</p>
        <p className="mt-2">
          Estado: <Badge variant="outline">{info?.estado?.toUpperCase()}</Badge>
        </p>
        <div className="flex gap-4 mt-2">
          <p className="font-semibold">Vehiculos: </p>
          {carrosPorOrden.map((carro) => (
            <div className="flex gap-3" key={carro?.id}>
              <p>{carro?.marca}</p>
              <p>{carro?.modelo}</p>
            </div>
          ))}
        </div> */}
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Tipo: {info?.tipo}
          </h1>

          <p className="text-gray-600 text-base">
            Tiempo estimado:
            <span className="font-medium text-gray-800 ml-1">
              {info?.tiempo_estimado}
            </span>
          </p>

          <p className="mt-3 text-gray-600">
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
        </div>

        {userData?.rol === "cajero" && (
          <div className="border p-3">
            <h1>Cambiar estado de la orden </h1>
            <div className="mt-2">
              <Select
                onChange={(item) => setCambio(item.value)}
                options={[
                  { value: "En proceso", label: "En proceso" },
                  { value: "Completado", label: "Completado" },
                  { value: "Cancelado", label: "Cancelado" },
                ]}
              />

              <button
                onClick={cambiarEstado}
                className="border p-1 mt-2 rounded"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
