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
  return <OrdenesTable ordenes={ordenes} />;
}

function OrdenesTable({ ordenes }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white p-4 rounded shadow mt-4  w-full border">
      {/* <Table className="w-[full]">
        <TableHeader>
          <TableRow className="w-[200px]">
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead className="w-[100px]">Estado</TableHead>
            <TableHead className="w-[100px]">Fecha</TableHead>
            <TableHead className="w-[100px]">Servicio</TableHead>
            <TableHead className="text-right">Monto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {ordenes?.length === 0 && (
            <h1 className="text-gray-400 w-full p-6">No hay ordenes por el momento</h1>
          )}
          {ordenes?.map((orden, index) => (
            <AlertDialogDemo className="w-full mt-4">
              <TableRow className="cursor-pointer" key={orden.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <Badge variant={estadoMap[orden.estado]}>
                    {orden.estado}
                  </Badge>
                </TableCell>
                <TableCell>
                  {" "}
                  {new Date(orden.fecha).toString().split("-")[0].toString()}
                </TableCell>
                <TableCell className="text-right">{orden.tipo}</TableCell>
                <TableCell className="text-right">$100</TableCell>
              </TableRow>
            </AlertDialogDemo>
          ))}
        </TableBody>
      </Table> */}

      <Modal open={open} setOpen={setOpen} />

      <table class="table-auto">
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
      </table>
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
            <Dialog.Body><TabsDemo /></Dialog.Body>
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
