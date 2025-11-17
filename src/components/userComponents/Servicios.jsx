import { useData } from "../../util/useData";
import { Loading } from "../Loading";
export function Servicios() {
  const {
    data: servicios,
    isLoading,
    error,
  } = useData("/users/servicios", "get");
  return (
    <ul className="flex gap-4 mt-3 ">
      {isLoading && <Loading />}
      {servicios?.map((servicio) => (
        <li className="border rounded p-3 bg-white">
          <h1 className="h1 capitalize">{servicio.tipo}</h1>
          <p>{servicio.descripcion}</p>
          <p> ${servicio.precio}</p>
          <button
            type="button"
            class="bg-dark box-border border hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Agendar
          </button>
        </li>
      ))}
    </ul>
  );
}
