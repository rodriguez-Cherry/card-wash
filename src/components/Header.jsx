import { useNavigate } from "react-router";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { CarWashContext } from "../contex/Context";

export function Header() {
  const navigate = useNavigate();
  const {setUserAccess} = useContext(CarWashContext);

  function cerrarSession() {
    localStorage.clear();
    setUserAccess({
      sessionEstado: "",
      userData: "",
    });
    navigate("/");
  }
  return (
    <div className="w-full flex justify-between px-6 pt-4 text-xl">
      <p onClick={() => navigate("/")}>Car Wash</p>
      <button
        onClick={cerrarSession}
        className="bg-dark box-border border border-transparent hover:bg-dark-strong focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
      >
        <FontAwesomeIcon icon={faLock} /> Cerrar session
      </button>
    </div>
  );
}
