import { useState, useContext } from "react";
import { Link } from "react-router";
import { axiosClient } from "../api/ApiCliente";
import { CarWashContext } from "../contex/Context";

export function Signup() {
  const { setUserAccess } = useContext(CarWashContext);
  const [userInfo, setUserInfo] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    password: "",
  });
  const [error, setError] = useState("");

  const conseguirValores = (e) => {
    const { target } = e;
    setError("");
    setUserInfo({
      ...userInfo,
      [target.name]: target.value,
    });
  };

  const crearCliente = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosClient.post("/access/signup", {
        nombre: userInfo.nombre,
        email: userInfo.email,
        contrasena: userInfo.password,
        telefono: userInfo.telefono,
        direccion: userInfo.direccion,
      });
      localStorage.setItem("token-value", data.token);
      localStorage.setItem('userData', JSON.stringify(data.data))
      setUserAccess((prev) => ({
        ...prev,
        sessionEstado: "autenticado",
        userData: data.data,
      }));
      setError("");
      navigate("/home");
    } catch (error) {
      setError(error.response.data.data);
    }
  };

  console.log(userInfo);

  const estaDeshabilitado =
    !userInfo.email ||
    !userInfo.nombre ||
    !userInfo.password ||
    !userInfo.telefono ||
    !userInfo.direccion;

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
                onChange={conseguirValores}
                max={20}
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
                onChange={conseguirValores}
                max={20}
                required
                autocomplete="email"
                className="block w-full border rounded-md px-3 py-1.5  outline-1 -outline-offset-1  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label for="telefono" className="block text-sm/6 font-medium">
              Telefono
            </label>
            <div className="mt-2">
              <input
                id="telefono"
                type="tel"
                name="telefono"
                placeholder="8290003456"
                onChange={conseguirValores}
                max={20}
                required
                autocomplete="telefono"
                className="block w-full border rounded-md px-3 py-1.5  outline-1 -outline-offset-1  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>{" "}
          <div>
            <label for="direccion" className="block text-sm/6 font-medium">
              Direccion
            </label>
            <div className="mt-2">
              <input
                id="direccion"
                type="email"
                name="direccion"
                placeholder="C/ Juan, Santo Domingo Este"
                onChange={conseguirValores}
                max={20}
                required
                autocomplete="direccion"
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
                onChange={conseguirValores}
                max={20}
                required
                autocomplete="current-password"
                className="block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            {error.length > 0 && <p className="text-red-100 mt-4">{error}</p>}
          </div>
          <div>
            <button
              onClick={crearCliente}
              type="submit"
              disabled={estaDeshabilitado}
              className={`flex w-full justify-center rounded-md ${
                estaDeshabilitado
                  ? "bg-gray-50 text-black border"
                  : "bg-indigo-500 text-white hover:bg-indigo-400"
              } px-3 py-1.5 text-sm/6 font-semibold   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
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
