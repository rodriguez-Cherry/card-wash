import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
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
import { axiosClient } from "../../api/ApiCliente";
import { EditarVehiculo } from "../EditarVehiculo";

export function Perfil() {
  const { userData } = useContext(CarWashContext);
  const [openModal, setOpenModal] = useState(false);
  const [carroSeleccionado, setCarroSeleccionado] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [actualisado, setActualisado] = useState(false);
  const { isLoading, data } = useData(
    "/users/car/" + userData.id,
    "get",
    actualisado
  );

  const eliminarVehiculo = async (carro) => {
    try {
      await axiosClient.post("/users/eliminar/" + carro.id);
      setActualisado(!actualisado);
    } catch (error) {}
  };

  const editarCarro = (carro) => {
    setCarroSeleccionado(carro);
    setOpenModalEditar(true);
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      {openModal && (
        <Modal open={openModal} setOpen={setOpenModal}>
          <AgregarVehiculo
            key={"agregado"}
            setOpenModal={setOpenModal}
            setActualisado={() => setActualisado(!actualisado)}
          />
        </Modal>
      )}
      {openModalEditar && (
        <Modal open={openModalEditar} setOpen={setOpenModalEditar}>
          <EditarVehiculo
            setOpenModal={setOpenModalEditar}
            setActualisado={() => setActualisado(!actualisado)}
            carroSeleccionado={carroSeleccionado}
          />
        </Modal>
      )}
      <p className="text-xl font-semibold">Mi Perfil</p>
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
              <h1 className="text-xl">
                {userData.nombre} {userData.apellido}
              </h1>
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
            <button
              className="border rounded p-1 bg-blue-600 text-white"
              onClick={() => setOpenModal(true)}
            >
              Agregar
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            {data?.length === 0 && (
              <p className="text-zinc-400">
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
                  <p>año</p>
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
                        <p> {carro.año} </p>
                        <button
                          onClick={() => editarCarro(carro)}
                          className="bg-blue-300 border rounded p-1"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => eliminarVehiculo(carro)}
                          className="bg-red-300 border rounded p-1"
                        >
                          Eliminar
                        </button>
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
