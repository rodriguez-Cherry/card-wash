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
        <h1 className="text-lg font-semibold">{info?.tipo}</h1>
        <p>{info?.descripcion}</p>

        <p>{info?.tiempo_estimado}</p>
        <p>{info?.estado}</p>
        <div>
          {carrosPorOrden.map((carro) => (
            <div className="flex gap-3" key={carro.id}>
              <p>{carro.marca}</p>
              <p>{carro.modelo}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
