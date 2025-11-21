import { useContext } from "react";
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
import { Button } from "@/components/ui/button";

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
  return (
    <div className="bg-white p-4 rounded shadow mt-4 ">
      <Table className="w-full h-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Servicio</TableHead>
            <TableHead className="text-right">Monto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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
      </Table>
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
        <TabsContent value="Editar">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Cancelar">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
