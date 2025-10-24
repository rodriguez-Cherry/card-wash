import { Link } from "react-router";

export function Signup() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className=" text-center text-2xl/9 font-bold tracking-tight">
          Crear cuenta
        </h2>
      </div>
      <div className=" sm:mx-auto sm:w-full sm:max-w-sm  p-6">
        <form className="space-y-6">
          <div>
            <label for="nombre" className="block text-sm/6 font-medium">
              Nombre
            </label>
            <div className="mt-2">
              <input
                id="nombre"
                type="text"
                name="nombre"
                placeholder="Juan"
                required
                className="block w-full border rounded-md px-3 py-1.5  outline-1 -outline-offset-1  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label for="email" className="block text-sm/6 font-medium">
              Correo Electronico
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="ejemplo@gmail.com"
                required
                autocomplete="email"
                className="block w-full border rounded-md px-3 py-1.5  outline-1 -outline-offset-1  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label for="password" className="block text-sm/6 font-medium">
                Contraseña
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                required
                autocomplete="current-password"
                className="block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Crear cuenta
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Ya tienes cuenta{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Iniciar sesion
          </Link>
        </p>
      </div>
    </div>
  );
}