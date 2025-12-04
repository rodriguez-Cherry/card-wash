import { toast } from "sonner";
import { useState } from "react";
import { axiosClient } from "../../api/ApiCliente";

export function AgregarCliente({ setOpenModal, setActualizado }) {
  const [userInfo, setUserInfo] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
  });

  const conseguirValores = (e) => {
    const { target } = e;

    setUserInfo({
      ...userInfo,
      [target.name]: target.value,
    });
  };

  const agregarCliente = async () => {
    if (
      !userInfo.nombre ||
      !userInfo.telefono ||
      !userInfo.direccion ||
      !userInfo.apellido
    )
      return toast("Por favor llene los campos");
    try {
      const payload = {
        nombre: userInfo.nombre,
        apellido: userInfo.apellido,
        telefono: userInfo.telefono,
        direccion: userInfo.direccion,
        rol: "cliente",
      };

      await axiosClient.post("/admin/agregar-cliente", payload);
      setActualizado((prev) => !prev);
      toast("Cliente agregado exitosamente!");
    } catch (error) {
      toast("Error al agregar el cliente");
    }
    setOpenModal(false);
  };

  return (
    <div>
      <div>
        <h1 className="font-semibold text-xl mb-3">
          Ingrese la informacion del usuario
        </h1>
      </div>
      <label className="font-semibold" id="nombre">
        Nombre
      </label>
      <input
        id="nombre"
        type="text"
        name="nombre"
        onChange={conseguirValores}
        required
        className=" block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />
      <label className="font-semibold" id="apellido">
        Apellido
      </label>
      <input
        id="apellido"
        type="text"
        name="apellido"
        onChange={conseguirValores}
        required
        className=" block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />
      <label className="font-semibold" id="telefono">
        Telefono
      </label>
      <input
        id="telefono"
        type="text"
        name="telefono"
        onChange={conseguirValores}
        required
        className=" block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />
      <label className="font-semibold" id="direccion">
        Direccion
      </label>
      <input
        id="direccion"
        type="text"
        name="direccion"
        onChange={conseguirValores}
        required
        className=" block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />
      <button
        className="p-1 border rounded bg-blue-600 text-white mt-4"
        onClick={agregarCliente}
      >
        Agregar
      </button>
    </div>
  );
}
