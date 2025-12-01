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
    try {
      const payload = {
        id: info?.id,
        fecha: info?.fecha,
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
      <div>
        <h1 className="text-lg font-semibold"> Tipo: {info?.tipo}</h1>

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
