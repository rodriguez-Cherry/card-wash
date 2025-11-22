import { useContext, useState } from "react";
import { useData } from "../../util/useData";
import { CarWashContext } from "../../contex/Context";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  return <div>
    <h1 className="text-xl font-semibold"> Mis ordenes</h1>
     <OrdenesTable ordenes={ordenes} />
  </div>;
}

function OrdenesTable({ ordenes }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white p-4 rounded shadow mt-4  w-full border">
      <Modal open={open} setOpen={setOpen} />

      {
        ordenes?.length === 0 && 
        <>
           <p>Por el momento no hay ordenes </p>
        </>
      }

      {ordenes?.length > 0 && (
        <>
          <div className="flex gap-5 ">
            <p>#</p>
            <p className="font-semibold">Estado</p>
            <p className="font-semibold">Fecha</p>
            <p className="font-semibold">Servicio</p>
            <p className="font-semibold">Monto</p>
          </div>
          <div>
            {ordenes?.map((orden, index) => {
              return (
                <div
                  className="flex gap-5"
                  style={{ borderBottom: " 2px solid gray" }}
                  key={orden.id}
                >
                  <p>{index + 1}</p>
                  <p>
                    {" "}
                    <Badge variant={estadoMap[orden.estado]}>
                      {orden.estado}
                    </Badge>{" "}
                  </p>
                  <p>
                    {" "}
                    {new Date(orden.fecha).toString().split("-")[0].toString()}
                  </p>
                  <p> {orden.tipo} </p>
                  <td>$100</td>
                </div>
              );
            })}
          </div>
        </>
      )}
      {/* <table className="table-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Servicio</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {ordenes?.map((orden, index) => (
            <tr className="p-4" key={orden.id} onClick={(e) => setOpen(!open)}>
              <td>{index + 1}</td>
              <td>
                {" "}
                <Badge variant={estadoMap[orden.estado]}>{orden.estado}</Badge>
              </td>
              <td>
                {" "}
                {new Date(orden.fecha).toString().split("-")[0].toString()}
              </td>
              <td>{orden.tipo}</td>
              <td>$100</td>
            </tr>
          ))}
        </tbody>
      </table> */}
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

function TabsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="Editar">
        <TabsList>
          <TabsTrigger value="Editar">Editar</TabsTrigger>
          <TabsTrigger value="Cancelar">Cancelar</TabsTrigger>
        </TabsList>
        <TabsContent value="Editar"></TabsContent>
        <TabsContent value="Cancelar">
          <h1>Estas seguro que deseas cancelar esta cita?</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

const Modal = ({ open, setOpen }) => {
  return (
    <Dialog.Root lazyMount open={open}>
      <Dialog.Backdrop />
      <Portal>
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body>
              <TabsDemo />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button onClick={() => setOpen(false)} variant="outline">
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
