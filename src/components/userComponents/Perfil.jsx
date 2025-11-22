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
import { useContext, useState } from "react";
import { CarWashContext } from "../../contex/Context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVoicemail,
  faTowerCell,
  faDirections,
} from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../util/useData";
import { Modal } from "../Modal";
import { AgregarVehiculo } from "../AgregarVehiculo";

export function Perfil() {
  const { userData } = useContext(CarWashContext);
  const [openModal, setOpenModal] = useState(false);
  const { isLoading, data } = useData("/users/car/" + userData.id, "get", openModal);
  return (
    <div className="flex flex-col gap-4 w-full">
      {openModal && (
        <Modal open={openModal} setOpen={setOpenModal}>
          <AgregarVehiculo setOpenModal={setOpenModal} />
        </Modal>
      )}
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
          <h1 className="text-xl text-blue-900">Datos personales</h1>
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
      <Card>
        <CardHeader>
          <div className="flex justify-between gap-5">
            <h1 className="text-xl text-blue-900">Mis vehiculos</h1>
            <button className="border rounded p-1 bg-blue-600 text-white" onClick={() => setOpenModal(true)}>
              Agregar
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            {data?.length === 0 && (
              <p>
                {" "}
                Por el momento no posee vehiculos, puede agregar un vehiculo{" "}
              </p>
            )}

            {data?.length > 0 && (
              <>
                <div className="flex gap-5 ">
                  <p>#</p>
                  <p>Color</p>
                  <p>Marca</p>
                  <p>Modelo</p>
                </div>
                <div>
                  {data?.map((carro, index) => {
                    return (
                      <div
                        className="flex gap-5"
                        style={{ borderBottom: " 2px solid gray" }}
                        key={carro.id}
                      >
                        <p>{index + 1}</p>
                        <p> {carro.color} </p>
                        <p> {carro.marca} </p>
                        <p> {carro.modelo} </p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
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
      <h2 className="text-xl text-sky-600">{titulo}</h2>
      <p className="text-cyan-900"> {data}</p>
    </div>
  </div>
);
