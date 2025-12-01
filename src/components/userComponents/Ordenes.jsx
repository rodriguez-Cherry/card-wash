import { useContext, useEffect, useState } from "react";
import { useData } from "../../util/useData";
import { CarWashContext } from "../../contex/Context";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosClient } from "../../api/ApiCliente";
import { toast } from "sonner";
import { Modal } from "../Modal";
import { OrdenDetalle } from "./OrdenDetalle";

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
  const eliminar = async (orderId) => {
    try {
      await axiosClient.delete("/users/eliminar-cita/" + orderId);
      setEliminadoOrden((prev) => !prev);
    } catch (error) {
      toast(error.response.data);
    }
  };

  return (
    <div
      style={{ width: "100%" }}
      className="bg-white p-4 rounded shadow mt-4  w-full border"
    >
      {ordenes?.length === 0 && (
        <>
          <p>Por el momento no hay ordenes </p>
        </>
      )}

      {open && (
        <Modal setOpen={setOpen} open={open}>
          <OrdenDetalle info={orderSeleccionada} />
        </Modal>
      )}
    
      {ordenes?.length > 0 && (
        <div style={{ width: "100%" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderBottom: "2px solid #ddd",
                    fontWeight: "400",
                    fontSize: "14px",
                    color: "#4d4d4d",
                    width: "16%",
                  }}
                >
                  <div className="flex items-center">
                    {" "}
                    <span className="font-semibold">#</span>
                  </div>
                </th>

                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderBottom: "2px solid #ddd",
                    fontWeight: "400",
                    fontSize: "14px",
                    color: "#4d4d4d",
                    width: "16%",
                  }}
                >
                  <div className="flex items-center">
                    <span className="font-semibold">Estado</span>
                  </div>
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderBottom: "2px solid #ddd",
                    fontWeight: "400",
                    fontSize: "14px",
                    color: "#4d4d4d",
                    width: "16%",
                  }}
                >
                  <div className="flex items-center">
                    <span className="font-semibold">Fecha</span>
                  </div>
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderBottom: "2px solid #ddd",
                    fontWeight: "400",
                    fontSize: "14px",
                    color: "#4d4d4d",
                    width: "16%",
                  }}
                >
                  <div className="flex items-center">
                    <span className="font-semibold">Servicio</span>
                  </div>
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    borderBottom: "2px solid #ddd",
                    fontWeight: "400",
                    fontSize: "14px",
                    color: "#4d4d4d",
                    width: "16%",
                  }}
                >
                  <div>
                    <span className="font-semibold">Monto</span>
                  </div>
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "right",
                    borderBottom: "2px solid #ddd",
                    fontWeight: "400",
                    fontSize: "14px",
                    color: "#4d4d4d",
                    width: "16%",
                  }}
                >
                  <div>
                    <span className="font-semibold">Acciones</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {ordenes?.map((orden, index) => {
                return (
                  <tr key={orden.id}>
                    <td
                      style={{
                        height: "3rem",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                        fontWeight: "400",
                        fontSize: "14px",
                        color: "#4d4d4d",
                      }}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{
                        height: "3rem",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                        fontWeight: "400",
                        fontSize: "14px",
                        color: "#4d4d4d",
                      }}
                    >
                      {" "}
                      <Badge variant={estadoMap[orden.estado]}>
                        {orden.estado}
                      </Badge>{" "}
                    </td>
                    <td
                      style={{
                        height: "3rem",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                        fontWeight: "400",
                        fontSize: "14px",
                        color: "#4d4d4d",
                      }}
                    >
                      {" "}
                      {new Date(orden.fecha)
                        .toString()
                        .split("-")[0]
                        .toString()
                        .slice(0, 15)}
                    </td>
                    <td
                      style={{
                        height: "3rem",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                        fontWeight: "400",
                        fontSize: "14px",
                        color: "#4d4d4d",
                      }}
                    >
                      {" "}
                      {orden.tipo}{" "}
                    </td>
                    <td
                      style={{
                        height: "3rem",
                        textAlign: "rigth",
                        borderBottom: "1px solid #ddd",
                        fontWeight: "400",
                        fontSize: "14px",
                        color: "#4d4d4d",
                      }}
                    >
                      ${orden.precio}
                    </td>
                    <td
                      style={{
                        height: "3rem",
                        textAlign: "right",
                        borderBottom: "1px solid #ddd",
                        fontWeight: "400",
                        fontSize: "14px",
                        color: "#4d4d4d",
                      }}
                    >
                      <button
                        className="border mr-2"
                        onClick={() => {
                          setOrdenSeleccionada(orden);
                          setOpen(true);
                        }}
                      >
                        Ver
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          eliminar(orden.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function AlertDialogDemo({ children }) {
  return (
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <TabsDemo />

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
