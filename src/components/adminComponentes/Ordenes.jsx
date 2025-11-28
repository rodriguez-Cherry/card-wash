import { useState } from "react";
import { useData } from "../../util/useData";
import { Modal } from "../Modal";
import { AgendarCitaCliente } from "../AgendarCitaCliente";
import { axiosClient } from "../../api/ApiCliente";
import { OrdenDetalle } from "../userComponents/OrdenDetalle";
import { toast } from "sonner";

export function Ordenes() {
  const [actualizado, setActualizado] = useState(false);
  const [search, setSearch] = useState("");
  const {
    data: ordenes,
    isLoading,
    error,
  } = useData("/admin/ordenes", "get", actualizado);
  const [orderSeleccionada, setOrdenSeleccionada] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);

  const eliminarOrden = async (orden) => {
    let result = window.confirm("Estas seguro de eliminar esta orden ?");
    if (!result) return null;

    try {
      await axiosClient.delete("/admin/eliminar-cita/" + orden.id);
      toast("Orden eliminada");
      setActualizado((prev) => !prev);
    } catch (error) {
      toast("Error al eliminar la orden");
    }
  };

  const verDetalles = (orden) => {
    setOrdenSeleccionada(orden);
    setOpen(true);
  };

  console.log(orderSeleccionada);

  const resultados = ordenes?.filter((orden) =>
    orden.nombre.toLowerCase().includes(search.toLowerCase())
  );

  console.log(resultados);
  return (
    <div class="relative bg-white  p-4 shadow rounded overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base  mt-5">
      {openModal && (
        <Modal setOpen={setOpenModal} open={openModal}>
          <AgendarCitaCliente
            setOpenModal={setOpenModal}
            setActualizado={setActualizado}
          />
        </Modal>
      )}
      {open && (
        <Modal setOpen={setOpen} open={open}>
          <OrdenDetalle info={orderSeleccionada} />
        </Modal>
      )}

      <div className="w-full flex justify-between mb-3">
        <h1 className="font-semibold">Ordenes</h1>
        <div className="flex">
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
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium">
              #
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Estado
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Pertenece a
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {resultados?.map((orden, index) => (
            <tr
              id={orden.id}
              className="bg-neutral-primary border-b border-default"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                {index + 1}
              </th>
              <td className="px-6 py-4">
                {" "}
                {new Date(orden.fecha).toString().split("-")[0].toString()}
              </td>
              <td className="px-6 py-4"> {orden.estado}</td>
              <td className="px-6 py-4">{orden.nombre}</td>
              <td className="flex gap-4 items-center">
                <button
                  onClick={() => eliminarOrden(orden)}
                  style={{ cursor: "pointer" }}
                  className="bg-red-600 text-white p-1 border rounded font-semibold mt-2"
                >
                  Eliminar
                </button>
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => verDetalles(orden)}
                  className="bg-blue-600 text-white p-1 border rounded font-semibold mt-2"
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
          {resultados?.length === 0 && <div>No hay orden</div>}
        </tbody>
      </table>
    </div>
  );
}
