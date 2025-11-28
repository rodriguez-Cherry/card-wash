import { useState } from "react";
import { useData } from "../../util/useData";
import { Modal } from "../Modal";
import { axiosClient } from "../../api/ApiCliente";
import { toast } from "sonner";
import { AgregarVehiculoCliente } from "../AgregarVehiculoCliente";

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
      await axiosClient.delete("/admin/eliminar-carro/" + carro.id);
      toast("Carro eliminado!");
      setActualizadoS((prev) => !prev);
    } catch (error) {
      toast("Error al eliminar el carro");
    }
  };

  const resultados = carros?.filter((carro) => {
    return (
      carro.nombre.toLowerCase().includes(search.toLowerCase()) ||
      carro.modelo.toLowerCase().includes(search.toLowerCase())
    );
  });
  return (
    <div class="relative bg-white  p-4 shadow rounded overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base  mt-5">
      <Modal key={"normal"} setOpen={setOpenModal} open={openModal}>
        <AgregarVehiculoCliente
          setOpenModal={setOpenModal}
          setActualisado={setActualizadoS}
          key={"Actualisado"}
        />
      </Modal>

      <div className="w-full text-right">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded me-3"
          placeholder="Buscar por modelo"
        />
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-300 p-1 border rounded text-white font-semibold text-sm"
        >
          Agregar
        </button>
      </div>
      <table class="w-full text-sm text-left rtl:text-right text-body">
        <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
          <tr>
            <th scope="col" class="px-6 py-3 font-medium">
              Modelo
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Marca
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Color
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Pertenece a
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {resultados?.map((vehiculo) => (
            <tr
              id={vehiculo.id}
              class="bg-neutral-primary border-b border-default"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                {vehiculo.modelo}
              </th>
              <td className="px-6 py-4"> {vehiculo.marca}</td>
              <td className="px-6 py-4"> {vehiculo.color}</td>
              <td className="px-6 py-4"> {vehiculo.nombre}</td>
              <td>
                <button
                  onClick={() => eliminarVehiculo(vehiculo)}
                  className="bg-red-600 text-white p-1 aling-right"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {resultados?.length === 0 && (
            <div className="w-full mt-5 flex justify-center">
              No hay carros agregados
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
}
