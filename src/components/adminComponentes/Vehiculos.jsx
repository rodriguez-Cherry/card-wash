import { useState } from "react";
import { useData } from "../../util/useData";
import { Modal } from "../Modal";
import { axiosClient } from "../../api/ApiCliente";
import { toast } from "sonner";
import { AgregarVehiculoCliente } from "./AgregarVehiculoCliente";

export function Vehiculos() {
  const [actualizadoS, setActualizadoS] = useState(false);
  const [search, setSearch] = useState("");
  const {
    data: carros,
    isLoading,
    error,
  } = useData("/admin/carros", "get", actualizadoS);

  const [openModal, setOpenModal] = useState(false);

  const eliminarVehiculo = async (carro) => {
    let result = window.confirm("Estas seguro de eliminar este carro ?");
    if (!result) return null;

    try {
      await axiosClient.delete("/users/eliminar-carro/" + carro.placa);
      toast("Carro eliminado!");
      setActualizadoS((prev) => !prev);
    } catch (error) {
      toast("Error al eliminar el carro");
    }
  };

  const resultados = carros?.filter((carro) => {
    return carro.marca.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md overflow-x-auto border">
      {openModal && (
        <Modal setOpen={setOpenModal} open={openModal}>
          <AgregarVehiculoCliente
            setOpenModal={setOpenModal}
            setActualisado={setActualizadoS}
            key={"Actualisado"}
          />
        </Modal>
      )}

      {/* Header */}
      <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
        <h1 className="font-semibold text-lg text-blue-900 ms-2">Vehículos</h1>

        <div className="flex gap-3 items-center">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Buscar por marca"
          />
          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-white font-semibold text-sm shadow"
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Tabla */}
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 border-b text-gray-600">
          <tr>
            <th className="px-6 py-3 font-semibold">Modelo</th>
            <th className="px-6 py-3 font-semibold">Marca</th>
            <th className="px-6 py-3 font-semibold">Color</th>
            <th className="px-6 py-3 font-semibold">Pertenece a</th>
            <th className="px-6 py-3 font-semibold">Telefono</th>
            <th className="px-6 py-3 font-semibold text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {resultados?.map((vehiculo) => (
            <tr
              key={vehiculo.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 font-medium">{vehiculo.modelo}</td>
              <td className="px-6 py-4">{vehiculo.marca}</td>
              <td className="px-6 py-4">{vehiculo.color}</td>
              <td className="px-6 py-4">
                {vehiculo.nombre + " " + vehiculo.apellido}
              </td>
              <td className="px-6 py-4">{vehiculo.telefono}</td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => eliminarVehiculo(vehiculo)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm shadow"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

          {resultados?.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="text-center py-6 text-gray-500 font-medium"
              >
                No hay vehículos agregados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
