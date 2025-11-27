import { useContext, useState } from "react";
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

const estadoMap = {
  pendiente: "secondary",
  proceso: "secondary",
  completado: "outline",
};

export function Ordenes() {
  const { userData } = useContext(CarWashContext);
  const userId = userData?.id;
  console.log(userData);
  const {
    isLoading,
    data: ordenes,
    error,
  } = useData(`/users/citas/${userId}`, "get");
  return (
    <div style={{ width:"100%" }}>
      <h1 className="text-xl font-semibold"> Mis ordenes</h1>
      <OrdenesTable ordenes={ordenes} />
    </div>
  );
}

function OrdenesTable({ ordenes }) {
  return (
    <div style={{ width: "100%" }} className="bg-white p-4 rounded shadow mt-4  w-full border">
      {ordenes?.length === 0 && (
        <>
          <p>Por el momento no hay ordenes </p>
        </>
      )}

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
                <tr key={orden.id}>
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
                    <td>$100</td>
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
