import { useEffect, useState } from "react";
import { axiosClient } from "../../api/ApiCliente";

export const OrdenDetalle = ({ info }) => {
  const carrosIds = info.carros_ids.split("|");
  const [carrosPorOrden, setCarrosPorOrden] = useState([]);

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

  return (
    <div>
      <div>
        <h1 className="text-lg font-semibold"> Tipo: {info?.tipo}</h1>

        <p> Tiempo estimado: {info?.tiempo_estimado}</p>
        <p>Estado: {info?.estado}</p>
        <div className="flex gap-4">
          <p className="font-semibold">Vehiculos: </p>
          {carrosPorOrden.map((carro) => (
            <div className="flex gap-3" key={carro?.id}>
              <p>{carro?.marca}</p>
              <p>{carro?.modelo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
