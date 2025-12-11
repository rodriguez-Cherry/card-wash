import { useContext, useEffect, useState } from "react";
import { useData } from "../../util/useData";
import { CarWashContext } from "../../contex/Context";
import { Badge } from "@/components/ui/badge";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosClient } from "../../api/ApiCliente";
import { toast } from "sonner";
import { Modal } from "../Modal";
import { OrdenDetalle } from "./OrdenDetalle";
import { conseguirFecha } from "../../util/conseguirFecha";

const estadoMap = {
  pendiente: "secondary",
  proceso: "secondary",
  completado: "outline",
};

export function Ordenes() {
  const { userData } = useContext(CarWashContext);
  const [eliminadoOrden, setEliminadoOrden] = useState(false);
  const userId = userData?.id;
  const {
    isLoading,
    data: ordenes,
    error,
  } = useData(`/users/citas/${userId}`, "get", eliminadoOrden);

  console.log(ordenes);

  return (
    <div style={{ width: "100%" }}>
      <h1 className="text-xl font-semibold"> Mis ordenes</h1>
      <OrdenesTable ordenes={ordenes} setEliminadoOrden={setEliminadoOrden} />
    </div>
  );
}

function OrdenesTable({ ordenes, setEliminadoOrden }) {
  const [orderSeleccionada, setOrdenSeleccionada] = useState(null);
  const [open, setOpen] = useState(false);
  const [openModalOrden, setOpenModalOrden] = useState(false);

  const eliminarOrden = async (orden) => {
    const result = confirm("Esta seguro de eliminar esta orden ?");

    if (!result) return null;
    // const hour = new Date(orden?.fecha).getHours();

    // const date = new Intl.DateTimeFormat("en-US")
    //   .format(new Date(orden?.fecha))
    //   ?.split("T")[0];

    // const splitDate = date.replaceAll("/", "-").split("-");
    // const correctDate = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
    // const payload = {
    //   id: orden?.id,
    //   fecha: `${correctDate} ${hour}:00:00`,
    //   estado: "cancelado",
    //   user_id: orden?.user_id,
    //   servicio_id: orden?.servicio_id,
    //   carros_ids: orden?.carros_ids,
    // };

    try {
      await axiosClient.delete("/users/eliminar-cita/" + orden.cita_id);
      toast("Orden cancelada!");
      setEliminadoOrden((prev) => !prev);
    } catch (error) {
      toast("Error al cancelar la orden");
    }
  };

  const ordenesActivas = ordenes?.filter((orden) =>
    ["pendiente", "en proceso"].includes(orden?.estado?.toLowerCase())
  );



  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-md border border-neutral-200 mt-4">
      {open && (
        <Modal setOpen={setOpen} open={open}>
          <OrdenDetalle info={orderSeleccionada} setOpen={setOpen} />
        </Modal>
      )}

      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-neutral-100 border-b border-neutral-300">
              <th className="px-4 py-3 font-semibold text-neutral-700 text-left">
                #
              </th>
              <th className="px-4 py-3 font-semibold text-neutral-700 text-left">
                Estado
              </th>
              <th className="px-4 py-3 font-semibold text-neutral-700 text-left">
                Fecha
              </th>
              <th className="px-4 py-3 font-semibold text-neutral-700 text-left">
                Servicio
              </th>
              <th className="px-4 py-3 font-semibold text-neutral-700 text-left">
                Monto
              </th>
              <th className="px-4 py-3 font-semibold text-neutral-700 text-right">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {ordenesActivas?.map((orden, index) => (
              <tr
                key={orden.servicio_id}
                className="border-b border-neutral-200 hover:bg-neutral-50 transition"
              >
                <td className="px-4 py-3 text-neutral-700">{index + 1}</td>

                <td className="px-4 py-3">
                  <Badge variant={estadoMap[orden.estado]}>
                    {orden.estado}
                  </Badge>
                </td>

                <td className="px-4 py-3 text-neutral-700">
                  {conseguirFecha(orden.fecha)}
                </td>

                <td className="px-4 py-3 text-neutral-700">{orden.tipo}</td>

                <td className="px-4 py-3 text-neutral-700 font-medium">
                  ${orden.precio}
                </td>

                {/* Botones */}
                <td className="px-4 py-3 text-right flex items-center gap-3 justify-end">
                  <button
                    onClick={() => {
                      setOrdenSeleccionada(orden);
                      setOpen(true);
                    }}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                  >
                    Ver
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      eliminarOrden(orden);
                    }}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}

            {ordenesActivas?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-body">
                  No hay órdenes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* )} */}
    </div>
  );
}
