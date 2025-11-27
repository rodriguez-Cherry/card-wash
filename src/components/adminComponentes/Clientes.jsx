import { useState } from "react";
import { useData } from "../../util/useData";
import { Modal } from "../Modal";
import { AgregarCliente } from "../AgregarCliente";

export function Clientes() {
  const {
    data: usuarios,
    isLoading,
    error,
  } = useData("/admin/clientes", "get");

  const [openModal, setOpenModal] = useState(false)
  return (
    <div class="relative bg-white  p-4 shadow rounded overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base  mt-5">
      
      <Modal setOpen={setOpenModal} open={openModal}>
        <AgregarCliente />
      </Modal>
      
      <div className="w-full text-right">
        <button onClick={() => setOpenModal(true)} className="bg-blue-300 p-1 border rounded text-white font-semibold text-sm">
          Agregar
        </button>
      </div>
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
