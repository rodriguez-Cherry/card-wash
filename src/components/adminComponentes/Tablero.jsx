import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons/faVolumeHigh";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "../../util/useData";

export function Tablero() {
  const {
    data: cars,
    isLoadingCars,
    error: errorcars,
  } = useData("/admin/cars", "get");
  const {
    data: clientes,
    isLoadingClientes,
    error: errorClientes,
  } = useData("/admin/clientes", "get");

  return (
    <div>
      <div className="flex gap-5">
        <div
          id="box-1"
          className=" flex gap-3 border rounded p-4  bg-white shadow-md"
        >
          <div>
            <FontAwesomeIcon icon={faVolumeHigh} />
          </div>
          <div className="">
            <h1>Clientes</h1>
            <p>{clientes?.length}</p>
          </div>
        </div>
        <div
          id="box-2"
          className=" flex gap-3 border rounded p-4  bg-white shadow-md"
        >
          <div>
            {" "}
            <FontAwesomeIcon icon={faVolumeHigh} />
          </div>
          <div className="">
            <h1>Vehiculos</h1>
            <p>{cars?.length}</p>
          </div>
        </div>
        <div
          id="box-3"
          className=" flex gap-3 border rounded p-4  bg-white shadow-md"
        >
          <div>
            {" "}
            <FontAwesomeIcon icon={faVolumeHigh} />
          </div>
          <div className="">
            <h1>Ingresos</h1>
            <p>${cars?.length * 10}</p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
