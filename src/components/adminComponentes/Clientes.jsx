import { useState } from "react";
import { useData } from "../../util/useData";
import { Modal } from "../Modal";
import { AgregarCliente } from "../AgregarCliente";
import { axiosClient } from "../../api/ApiCliente";
import { toast } from "sonner";

export function Clientes() {
  const [actualizado, setActualizado] = useState(false);
  const [search, setSearch] = useState("");
  const {
    data: clientes,
    isLoading,
    error,
  } = useData("/admin/clientes", "get", actualizado);

  const [openModal, setOpenModal] = useState(false);

  const eliminarCliente = async (cliente) => {
    let result = window.confirm("Estas seguro de eliminar este cliente ?");
    if (!result) return null;

    try {
      await axiosClient.delete("/admin/eliminar-cliente/" + cliente.id);
      toast("Cliente eliminado");
      setActualizado((prev) => !prev);
    } catch (error) {
      toast("Error al eliminar el cliente");
    }
  };

  const resultados = clientes?.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div class="relative bg-white  p-4 shadow rounded overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base  mt-5">
      <Modal setOpen={setOpenModal} open={openModal}>
        <AgregarCliente
          setOpenModal={setOpenModal}
          setActualizado={setActualizado}
        />
      </Modal>

      <div className="w-full text-right">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded me-3"
          placeholder="Buscar por nombre"
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
              Nombre
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Cantidad de vehiculo
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Registrado
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Tiempo Creado
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {resultados?.map((usuario) => (
            <tr
              id={usuario.id}
              class="bg-neutral-primary border-b border-default"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                {usuario.nombre}
              </th>
              <td className="px-6 py-4"> {5}</td>
              <td className="px-6 py-4"> {usuario.logueado ? "Si" : "NO"}</td>
              <td className="px-6 py-4">
                {" "}
                {new Date(usuario.creado_en)
                  .toString()
                  .split("-")[0]
                  .toString()}
              </td>
              <td>
                <button
                  onClick={() => eliminarCliente(usuario)}
                  className="bg-red-600 text-white p-1"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
