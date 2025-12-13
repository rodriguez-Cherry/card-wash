import { useState } from "react";
import { useData } from "../../util/useData";
import { Modal } from "../Modal";
import { AgregarCliente } from "./AgregarCliente";
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
   //filtrar clientes
  const resultados = clientes?.filter((cliente) =>
    cliente?.nombre?.toLowerCase().includes(search?.toLowerCase())
  );
  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md overflow-x-auto border">
      {openModal && (
        <Modal setOpen={setOpenModal} open={openModal}>
          <AgregarCliente
            setOpenModal={setOpenModal}
            setActualizado={setActualizado}
          />
        </Modal>
      )}

      {/* Header */}
      <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
        <h1 className="font-semibold text-lg text-blue-900 ms-2">Clientes</h1>

        <div className="flex gap-3 items-center">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Buscar por nombre"
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
            <th className="px-6 py-3 font-semibold">Nombre</th>
            <th className="px-6 py-3 font-semibold">Telefono</th>
            <th className="px-6 py-3 font-semibold">Registrado</th>
            <th className="px-6 py-3 font-semibold">Tiempo Creado</th>
            <th className="px-6 py-3 font-semibold text-right">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {resultados?.map((usuario) => (
            <tr
              key={usuario.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 font-medium">
                {usuario.nombre + " " + usuario.apellido}
              </td>
              <td className="px-6 py-4 font-medium">{usuario.telefono}</td>

              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded text-white text-xs font-semibold 
              ${usuario.logueado ? "bg-green-500" : "bg-red-500"}`}
                >
                  {usuario.logueado ? "Sí" : "No"}
                </span>
              </td>

              <td className="px-6 py-4">
                {new Date(usuario.creado_en).toString().slice(0, 15)}
              </td>

              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => eliminarCliente(usuario)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm shadow"
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
