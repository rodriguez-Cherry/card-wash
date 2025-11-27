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
import js from "@eslint/js";
import { useEditable } from "@chakra-ui/react";
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
      <OrdenesTable
        ordenes={ordenes}
        setEliminadoOrden={setEliminadoOrden}
      />
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

  // useEffect(() => {

  //   if(open && orderSeleccionada) {

  //  const carIds = orderSeleccionada?.carros_ids.split('|');



  //   }

  // },[orderSeleccionada])
 
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

      <Modal setOpen={setOpen} open={open}>
       <OrdenDetalle info={orderSeleccionada} />
      </Modal>

      {ordenes?.length > 0 && (
        <table className="table-auto">
          <thead>
            <tr>
              <div className="p-3 flex justify-between">
                <th className="">#</th>
                <th className=" font-semibold">Estado</th>
                <th className="font-semibold">Fecha</th>
                <th className="font-semibold">Servicio</th>
                <th className="font-semibold">Monto</th>
              </div>
            </tr>
          </thead>
          <tbody>
            {ordenes?.map((orden, index) => {
              return (
                <tr
                  key={orden.id}
                  onClick={() => {
                    setOrdenSeleccionada(orden);
                    setOpen(true);
                  }}
                >
                  <div className="p-2 flex justify-between gap-4">
                    <td>{index + 1}</td>
                    <td>
                      {" "}
                      <Badge variant={estadoMap[orden.estado]}>
                        {orden.estado}
                      </Badge>{" "}
                    </td>
                    <td>
                      {" "}
                      {new Date(orden.fecha)
                        .toString()
                        .split("-")[0]
                        .toString()
                        .slice(0, 15)}
                    </td>
                    <td> {orden.tipo} </td>
                    <td>${orden.precio}</td>
                    <button onClick={(e) => {
                      e.stopPropagation()

                      eliminar(orden.id)
                    }}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </tr>
              );
            })}
          </tbody>
        </table>
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
