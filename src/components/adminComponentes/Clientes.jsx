import { useData } from "../../util/useData";

export function Clientes() {
  const {
    data: usuarios,
    isLoading,
    error,
  } = useData("/admin/clientes", "get");

  return (
    <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-5 rounded">
      <table class="w-full text-sm text-left rtl:text-right text-body">
        <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
          <tr>
            <th scope="col" class="px-6 py-3 font-medium">
              Nombre
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Email
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Rol
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Registrado
            </th>
            <th scope="col" class="px-6 py-3 font-medium">
              Tiempo Creado
            </th>
          </tr>
        </thead>
        <tbody>
          {usuarios?.map((usuario) => (
            <tr
              id={usuario.id}
              class="bg-neutral-primary border-b border-default"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                {usuario.nombre}
              </th>
              <td class="px-6 py-4"> {usuario.email}</td>
              <td class="px-6 py-4"> {usuario.rol}</td>
              <td class="px-6 py-4"> {usuario.logueado ? "Si" : "NO"}</td>
              <td class="px-6 py-4">
                {" "}
                {new Date(usuario.creado_en)
                  .toString()
                  .split("-")[0]
                  .toString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
