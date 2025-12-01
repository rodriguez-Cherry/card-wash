import { useNavigate } from "react-router";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { CarWashContext } from "../contex/Context";

export function Header() {
  const navigate = useNavigate();
  const { setUserAccess } = useContext(CarWashContext);

  function cerrarSession() {
    localStorage.clear();
    setUserAccess({
      sessionEstado: "",
      userData: "",
    });
    navigate("/");
  }
  return (
    // <div className="w-full flex justify-between px-6 pt-4 text-xl">
    //   <p onClick={() => navigate("/")}>Car Wash</p>
    //   <button
    //     onClick={cerrarSession}
    //     className="bg-dark box-border border border-transparent hover:bg-dark-strong focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
    //   >
    //     <FontAwesomeIcon icon={faLock} /> Cerrar session
    //   </button>
    // </div>
    <div className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      {/* LOGO / TÍTULO */}
      <p
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-[#017BCA] cursor-pointer hover:text-[#0EA5E9] transition"
      >
        Car Wash
      </p>

      {/* BOTÓN DE CERRAR SESIÓN */}
      <button
        onClick={cerrarSession}
        className="flex items-center gap-2 bg-[#017BCA] hover:bg-[#0EA5E9] text-white font-semibold rounded-xl px-4 py-2 shadow-md transition focus:ring-2 focus:ring-[#38BDF8]"
      >
        <FontAwesomeIcon icon={faLock} />
        Cerrar sesión
      </button>
    </div>
  );
}
