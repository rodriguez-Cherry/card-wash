import { useState } from "react";
import { useData } from "../../util/useData";
import { Modal } from "../Modal";
import { AgendarCitaCliente } from "../AgendarCitaCliente";
import { axiosClient } from "../../api/ApiCliente";
import { OrdenDetalle } from "../userComponents/OrdenDetalle";
import { toast } from "sonner";
import { Badge } from "@chakra-ui/react";

export function Ordenes() {
  const [actualizado, setActualizado] = useState(false);
  const [search, setSearch] = useState("");
  const {
    data: ordenes,
    isLoading,
    error,
  } = useData("/admin/ordenes", "get", actualizado);
  const [orderSeleccionada, setOrdenSeleccionada] = useState(null);
  const [open, setOpen] = useState(false);

  const verDetalles = (orden) => {
    setOrdenSeleccionada(orden);
    setOpen(true);
  };

  const resultados = ordenes?.filter((orden) =>
    orden.nombre.toLowerCase().includes(search.toLowerCase())
  );

  console.log(resultados);
  return (
    <div class="relative bg-white  p-4 shadow rounded overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base">
      {/* {openModal && (
        <Modal setOpen={setOpenModal} open={openModal}>
          <AgendarCitaCliente
            setOpenModal={setOpenModal}
            setActualizado={setActualizado}
          />
        </Modal>
      )} */}
      {open && (
        <Modal setOpen={setOpen} open={open}>
          <OrdenDetalle info={orderSeleccionada} setActualizado={setActualizado} />
        </Modal>
      )}

      <div className="w-full flex justify-between ">
        <h1 className="font-semibold ms-6">Ordenes</h1>
        <div className="flex">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            id="search"
            className="block w-full p-2 rounded ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm  focus:ring-brand focus:border-brand shadow-xs placeholder:text-body me-2"
            placeholder="Search"
          />
          {/* <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-300 p-1 border rounded text-white font-semibold text-sm"
          >
            Agregar
          </button> */}
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-body ">
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
              <td className="px-6 py-4 text-sm">
                {new Intl.DateTimeFormat("en-US").format(
                  new Date(orden?.fecha)
                )}
              </td>
              <td className="px-6 py-4">
                {" "}
                <Badge variant="surface">{orden.estado.toUpperCase()}</Badge>
              </td>
              <td className="px-6 py-4">{orden.nombre}</td>
              <td className="flex gap-4 items-center">
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
