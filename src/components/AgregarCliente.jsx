export function AgregarCliente() {
  return (
    <div>
      <div>
        <h1>Ingrese la informacion del usuario</h1>
      </div>
      <label className="font-semibold" id="marca">
        Nombre
      </label>
      <input
        id="nombre"
        type="text"
        name="nombre"
        required
        className=" block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />
      {/* <label className="font-semibold" id="modelo">
        Modelo
      </label>
      <input
        id="modelo"
        type="text"
        name="modelo"
        // onChange={conseguirValores}
        required
        className="block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />
      <div></div> */}
    </div>
  );
}
