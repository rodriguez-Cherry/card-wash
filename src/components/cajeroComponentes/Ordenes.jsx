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

  // const resultados = ordenes?.filter((orden) =>
  //   orden.nombre.toLowerCase().includes(search.toLowerCase())
  // );

    const ordenesActivas = ordenes?.filter((orden) =>
    ["pendiente", "en proceso"].includes(orden.estado.toLowerCase())
  );
  const resultados = ordenesActivas?.filter((orden) =>
    orden.nombre.toLowerCase().includes(search.toLowerCase())
  );
  return (
    // <div class="relative bg-white  p-4 shadow rounded overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base">
    //   {open && (
    //     <Modal setOpen={setOpen} open={open}>
    //       <OrdenDetalle info={orderSeleccionada} setActualizado={setActualizado} />
    //     </Modal>
    //   )}

    //   <div className="w-full flex justify-between ">
    //     <h1 className="font-semibold ms-6">Ordenes</h1>
    //     <div className="flex">
    //       <input
    //         onChange={(e) => setSearch(e.target.value)}
    //         type="search"
    //         id="search"
    //         className="block w-full p-2 rounded ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm  focus:ring-brand focus:border-brand shadow-xs placeholder:text-body me-2"
    //         placeholder="Search"
    //       />
    //     </div>
    //   </div>
    //   <table className="w-full text-sm text-left rtl:text-right text-body ">
    //     <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
    //       <tr>
    //         <th scope="col" className="px-6 py-3 font-medium">
    //           #
    //         </th>
    //         <th scope="col" className="px-6 py-3 font-medium">
    //           Fecha
    //         </th>
    //         <th scope="col" className="px-6 py-3 font-medium">
    //           Estado
    //         </th>
    //         <th scope="col" className="px-6 py-3 font-medium">
    //           Pertenece a
    //         </th>
    //         <th scope="col" className="px-6 py-3 font-medium">
    //           Acciones
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {resultados?.map((orden, index) => (
    //         <tr
    //           id={orden.id}
    //           className="bg-neutral-primary border-b border-default"
    //         >
    //           <th
    //             scope="row"
    //             className="px-6 py-4 font-medium text-heading whitespace-nowrap"
    //           >
    //             {index + 1}
    //           </th>
    //           <td className="px-6 py-4 text-sm">
    //             {new Intl.DateTimeFormat("en-US").format(
    //               new Date(orden?.fecha)
    //             )}
    //           </td>
    //           <td className="px-6 py-4">
    //             {" "}
    //             <Badge variant="surface">{orden.estado.toUpperCase()}</Badge>
    //           </td>
    //           <td className="px-6 py-4">{orden.nombre}</td>
    //           <td className="flex gap-4 items-center">
    //             <button
    //               style={{ cursor: "pointer" }}
    //               onClick={() => verDetalles(orden)}
    //               className="bg-blue-600 text-white p-1 border rounded font-semibold mt-2"
    //             >
    //               Ver
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //       {resultados?.length === 0 && <div>No hay orden</div>}
    //     </tbody>
    //   </table>
    // </div>
    <div className="relative w-full bg-white p-6 rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
      {open && (
        <Modal setOpen={setOpen} open={open}>
          <OrdenDetalle
            info={orderSeleccionada}
            setActualizado={setActualizado}
          />
        </Modal>
      )}

      {/* HEADER */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h1 className="font-semibold text-xl text-gray-800 mb-3 sm:mb-0 ms-2">
          Órdenes
        </h1>

        <div className="flex w-full sm:w-auto ms-2">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            id="search"
            placeholder="Buscar"
            className="block w-full sm:w-64 px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800 text-sm focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          />
        </div>
      </div>

      {/* TABLE WRAPPER - RESPONSIVE */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-700">
          {/* TABLE HEADER */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 font-semibold">#</th>
              <th className="px-6 py-3 font-semibold">Fecha</th>
              <th className="px-6 py-3 font-semibold">Estado</th>
              <th className="px-6 py-3 font-semibold">Pertenece a</th>
              <th className="px-6 py-3 font-semibold text-right">Acciones</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {resultados?.map((orden, index) => (
              <tr
                key={orden.id}
                className="bg-white border-b hover:bg-blue-50 transition "
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {index + 1}
                </td>

                <td className="px-6 py-4">
                  {new Intl.DateTimeFormat("en-US").format(
                    new Date(orden?.fecha)
                  )}
                </td>

                <td className="px-6 py-4">
                  <Badge
                    variant="surface"
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                  ${
                    orden.estado === "pendiente"
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      : ""
                  }
                  ${
                    orden.estado === "completado"
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : ""
                  }
                  ${
                    orden.estado === "cancelado"
                      ? "bg-red-100 text-red-700 border border-red-300"
                      : ""
                  }
                `}
                  >
                    {orden.estado.toUpperCase()}
                  </Badge>
                </td>

                <td className="px-6 py-4">{orden.nombre}</td>

                <td className="px-6 py-4 flex justify-end">
                  <button
                    onClick={() => verDetalles(orden)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}

            {resultados?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No hay órdenes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
