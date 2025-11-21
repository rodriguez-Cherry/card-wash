import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useContext } from "react";
import { CarWashContext } from "../../contex/Context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVoicemail,
  faTowerCell,
  faDirections,
} from "@fortawesome/free-solid-svg-icons";

export function Perfil() {
  const { userData } = useContext(CarWashContext);
  return (
    <div className="flex flex-col gap-4 w-full">
      <Card>
        <div className="flex">
          <CardHeader>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <h1 className="text-xl">{userData.nombre}</h1>
              <p className="text-sm">{userData.email}</p>
            </div>
          </CardContent>
        </div>
      </Card>
      <Card>
        <CardHeader>
          <h1>Datos personales</h1>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            <Info
              titulo="Correo Electronico"
              icon={faVoicemail}
              data={userData.email}
            />
            <Info
              titulo="Telefono Celular"
              icon={faTowerCell}
              data={userData.telefono}
            />
            <Info
              titulo="Direccion fisica"
              icon={faDirections}
              data={userData.direccion}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const Info = ({ icon, titulo, data }) => (
  <div className="flex gap-3">
    <div>
      <FontAwesomeIcon icon={icon} />
    </div>
    <div>
      <h2 className="text-xl text-teal-600 underline">{titulo}</h2>
      <p className="text-cyan-900"> {data}</p>
    </div>
  </div>
);
