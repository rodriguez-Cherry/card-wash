import { Tooltip } from "@/components/ui/tooltip";
import { useData } from "../../util/useData";
import { Loading } from "../Loading";
import { useState } from "react";
import { Modal } from "../Modal";
export function Servicios() {
  const {
    data: servicios,
    isLoading,
    error,
  } = useData("/users/servicios", "get");
  return (
    <div className="flex flex-wrap flex-row gap-4 mt-3 ">
      {isLoading && <Loading />}
      {servicios?.map((servicio) => (
        <Servicio {...servicio} />
      ))}
    </div>
  );
}

let tieneVehiculo = false;
function Servicio(props) {
  const { tipo, descripcion, precio, detalles, id } = props;

  const [open, setOpen] = useState(false);

  const detallesSplit = detalles
    .split(",")
    .map((t, i) => " " + t + "\n")
    .join(" ");

  return (
    <div style={{ height: "250px", position: "relative" }}>
      <Modal open={open} setOpen={setOpen}>
        <div>
          <h1 className="text-lg">{tipo}</h1>{" "}
          {!tieneVehiculo && <div> 
            <p>Por favor agregar un vehiculo</p> 
             <AgregarVehiculo />
            </div>}
        </div>
      </Modal>
      <Tooltip
        content={detallesSplit}
        contentProps={{ css: { "--tooltip-bg": "gray" } }}
      >
        <div className="border rounded p-3 bg-white w-60 h-full ">
          <h1 className="text-xl text-sky-300">{tipo}</h1>
          <p className="text-sm">{descripcion}</p>
          <p style={{ color: "#017BCA" }}> DOP {precio}</p>

          <div className="bottom-4 h-auto absolute">
            <button
              onClick={() => setOpen(true)}
              className="p-1 mt-4 text-sm bg-sky-300 rounded text-white"
            >
              Agendar
            </button>
          </div>
        </div>
      </Tooltip>
    </div>
  );
}

function AgregarVehiculo() {
  const [agregar, setAgregar] = useState(false);
  const [carInfo, setCarInfo] = useState({
    modelo: "",
    marca: "",
    año: "",
  });

  const conseguirValores = (e) => {
    const { target } = e;

    setCarInfo({
      ...carInfo,
      [target.name]: target.value,
    });
  };

  console.log(agregar)

  return (
    <div>
      <button onClick={() => setAgregar(true)}>+ Agregar</button>
      {agregar && (
        <div className="w-full">
          <input
            id="modelo"
            type="text"
            name="modelo"
            onChange={conseguirValores}
            required
            autocomplete="current-password"
            className="block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
          <input
            id="marca"
            type="text"
            name="marca"
            onChange={conseguirValores}
            required
            autocomplete="current-password"
            className="block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />
          <input
            id="año"
            type="number"
            name="año"
            onChange={conseguirValores}
            required
            autocomplete="current-password"
            className="block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
          />

          <button onClick={() => setAgregar(false)}>Guardar</button>
        </div>
      )}
    </div>
  );
}
