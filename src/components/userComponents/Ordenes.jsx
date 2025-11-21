import { useContext } from "react";
import { useData } from "../../util/useData";
import { CarWashContext } from "../../contex/Context";

export function Ordenes() {


  const {userData} = useContext(CarWashContext)
  const userId = userData?.id;
  console.log(userData)
  const { isLoading, data: ordenes, error } = useData(`/users/citas/${userId}`, "get");
  return (
      <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-5 rounded">
      <table class="w-full text-sm text-left rtl:text-right text-body">
        <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
          <tr>
            <th scope="col" class="px-6 py-3 font-medium">
              #
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Fecha
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Servicio
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Estado
            </th>
                 <th scope="col" class="px-6 py-3 font-medium">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {ordenes?.map((orden, index) => (
            <tr
              id={orden.id}
              class="bg-neutral-primary border-b border-default"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                {index + 1}
              </th>
              <td class="px-6 py-4">    {new Date(orden.fecha)
                  .toString()
                  .split("-")[0]
                  .toString()}</td>
              <td class="px-6 py-4"> Lavado {orden.tipo}</td>
              <td class="px-6 py-4"> {orden.estado }</td>
              <td class="px-6 py-4 flex gap-4">
              <button>Editar</button>
              <button>Cancelar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
