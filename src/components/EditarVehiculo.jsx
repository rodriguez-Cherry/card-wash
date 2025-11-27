import { useContext, useState } from "react";
import { axiosClient } from "../api/ApiCliente";
import { CarWashContext } from "../contex/Context";
import { toast } from "sonner";

export function EditarVehiculo({
  setOpenModal,
  setActualisado,
  carroSeleccionado,
}) {
  console.log(carroSeleccionado);
  const { userData } = useContext(CarWashContext);
  const [carInfo, setCarInfo] = useState({
    id: carroSeleccionado?.id,
    modelo: carroSeleccionado?.modelo || "",
    marca: carroSeleccionado?.marca || "",
    año: carroSeleccionado?.año || "",
    color: carroSeleccionado?.color || "",
  });

  const conseguirValores = (e) => {
    const { target } = e;

    setCarInfo({
      ...carInfo,
      [target.name]: target.value,
    });
  };

  async function actualizarVehiculo() {
    if (!carInfo.modelo || !carInfo.marca || !carInfo.año || !carInfo.color)
      return toast("Por favor llenar todos los campos");

    try {
      const { data } = await axiosClient.put("/users/update-car/" + carInfo.id, {
        ...carInfo,
        user_id: userData.id,
      });
      setActualisado();
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Agregue su vehiculo</h2>
      <label className="font-semibold" id="marca">
        Marca
      </label>
      <input
        id="marca"
        type="text"
        name="marca"
        value={carInfo?.marca}
        onChange={conseguirValores}
        required
        className=" block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />
      <label className="font-semibold" id="modelo">
        Modelo
      </label>
      <input
        id="modelo"
        type="text"
        name="modelo"
        value={carInfo?.modelo}
        onChange={conseguirValores}
        required
        className="block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />
      <label className="font-semibold" id="color">
        Color
      </label>
      <input
        id="color"
        type="text"
        name="color"
        value={carInfo?.color}
        onChange={conseguirValores}
        required
        className="block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />

      <label className="font-semibold" id="año">
        Año
      </label>
      <input
        id="año"
        type="number"
        name="año"
        value={carInfo?.año}
        onChange={conseguirValores}
        required
        className="block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />

      <button
        className="p-1 border rounded bg-blue-600 text-white"
        onClick={() => {
          actualizarVehiculo();
        }}
      >
        Actualizar
      </button>
    </div>
  );
}
