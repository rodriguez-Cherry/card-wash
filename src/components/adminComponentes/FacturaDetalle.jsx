import { Badge } from "@chakra-ui/react";

export const FacturaDetalle = ({ info }) => {
  const carros = info?.carros;

   const hora_fin = parseInt(info?.hora) + 1 ;

  return (
    <div>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Tipo: {info?.servicio_nombre}
        </h1>

        <p className="mt-3 text-gray-600 font-semibold">
          Precio: {info?.precio}
        </p>
        <p className="mt-3 text-gray-600 font-semibold">
          Descripcion: {info?.descripcion}
        </p>
        <p className="mt-3 text-gray-600 font-semibold">
          A nombre de: {info?.nombre} {info?.apellido}
        </p>
        <p className="mt-3 text-gray-600 font-semibold">
          Fecha: {info?.fecha} {info?.hora + ":00 - " + hora_fin + ":00"}
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
            {carros?.map((carro) => (
              <div
                key={carro.placa}
                className="p-3 border rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition"
              >
                <p className="text-gray-800 font-semibold">{carro.marca}</p>
                <p className="text-gray-600 text-sm">{carro.modelo}</p>
                <p className="text-gray-600 text-sm">{carro.placa}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
