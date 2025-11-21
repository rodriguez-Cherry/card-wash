import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { axiosClient } from "../api/ApiCliente";
import { useContext } from "react";
import { CarWashContext } from "../contex/Context";
import { toast } from "sonner";

const roles = {
  cliente: "/home",
  admin: "/admin",
};

export function Login() {
  const navigate = useNavigate();
  const { setUserAccess } = useContext(CarWashContext);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const conseguirValores = (e) => {
    const { target } = e;

    setUserInfo({
      ...userInfo,
      [target.name]: target.value,
    });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosClient.post("/access/login", {
        email: userInfo.email,
        contrasena: userInfo.password,
      });

      localStorage.setItem("token-value", data.token);
      setUserAccess((prev) => ({
        ...prev,
        sessionEstado: "autenticado",
        userData: data.data,
      }));

      localStorage.setItem("userData", JSON.stringify(data.data));
      const ruta = roles[data?.data?.rol];
      navigate(ruta);
    } catch (error) {
      console.log(error);
      toast(error.response.data.data);
    }
  };
  const estaDeshabilitado = !userInfo.email || !userInfo.password;

  console.log(userInfo);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className=" text-center text-2xl/9 font-bold tracking-tight">
          Iniciar sesion
        </h2>
      </div>
      <div className=" sm:mx-auto sm:w-full sm:max-w-sm  p-6">
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium">
              Correo Electronico
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="ejemplo@gmail.com"
                onChange={conseguirValores}
                required
                autocomplete="email"
                className="block w-full border rounded-md px-3 py-1.5  outline-1 -outline-offset-1  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium">
                Contraseña
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                // type="password"
                name="password"
                onChange={conseguirValores}
                required
                autocomplete="current-password"
                className="block border w-full rounded-md bg-white/5 px-3 py-1.5 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={estaDeshabilitado}
              onClick={iniciarSesion}
              className={`flex w-full justify-center rounded-md toast-button ${
                estaDeshabilitado
                  ? "bg-gray-50 text-black border"
                  : "bg-indigo-500 text-white hover:bg-indigo-400"
              } px-3 py-1.5 text-sm/6 font-semibold  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
            >
              Iniciar sesion
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          No tienes cuenta?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}
