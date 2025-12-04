import { useState } from "react";
import { axiosClient } from "../../api/ApiCliente";
import { toast } from "sonner";
import Select from "react-select";
import { useData } from "../../util/useData";

export function AgregarVehiculoCliente({ setOpenModal, setActualisado }) {
  const [carInfo, setCarInfo] = useState({
    modelo: "",
    marca: "",
    año: "",
    color: "",
    clienteId: "",
  });

  const { data: clientes, isLoading } = useData(
    "/admin/clientes-no-registrados",
    "get"
  );

  const conseguirValores = (e) => {
    const { target } = e;

    setCarInfo({
      ...carInfo,
      [target.name]: target.value,
    });
  };

  const opcionesSelect = clientes?.map((cliente) => ({
    value: cliente.id,
    label:
      cliente.id?.slice(0, 6) + " - " + cliente.nombre + " " + cliente.apellido,
  }));

  async function guardarVehiculo() {
    if (!carInfo.modelo || !carInfo.marca || !carInfo.año || !carInfo.color)
      return toast("Por favor llenar todos los campos");

    try {
      await axiosClient.post("/admin/add-car", {
        ...carInfo,
        user_id: carInfo.clienteId,
      });
      setCarInfo({
        modelo: "",
        marca: "",
        año: "",
        color: "",
        clienteId: "",
      });
      setActualisado((prev) => !prev);
      setOpenModal(false);
      toast("Carro agregado correctamnete!");
    } catch (error) {
      toast("No de pudo agregar el carro");
    }
  }

  const clienteSeleccionado = clientes?.find(
    (cliente) => cliente.id === carInfo.clienteId
  );

  return (
    <div className="w-full flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Agregue su vehiculo</h2>
      <label className="font-semibold">Marca</label>
      <input
        name="marca"
        value={carInfo.marca}
        onChange={conseguirValores}
        required
        className=" block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />
      <label className="font-semibold">Modelo</label>
      <input
        name="modelo"
        value={carInfo.modelo}
        onChange={conseguirValores}
        required
        className="block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />
      <label className="font-semibold">Color</label>
      <input
        name="color"
        value={carInfo.color}
        onChange={conseguirValores}
        required
        className="block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />

      <label className="font-semibold">Año</label>
      <input
        value={carInfo.año}
        name="año"
        onChange={conseguirValores}
        required
        className="block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />

      <Select
        onChange={(option) => {
          setCarInfo((car) => ({ ...car, clienteId: option.value }));
        }}
        options={opcionesSelect}
      />

      <div className="flex gap-2">
        <h2 className="font-semibold">Telefono: </h2>
        <p>{clienteSeleccionado?.telefono}</p>
      </div>

      <button
        className="p-1 border rounded bg-blue-600 text-white"
        onClick={() => {
          guardarVehiculo();
        }}
      >
        Guardar
      </button>
    </div>
  );
}
