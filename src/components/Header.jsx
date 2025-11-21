import { useNavigate } from "react-router";

export function Header() {
  const navigate = useNavigate();

  function cerrarSession() {
    localStorage.clear();
    navigate('/')
  }
  return (
    <div className="w-full flex justify-between px-6 pt-4 text-xl">
      <p onClick={() => navigate("/")}>Car Wash</p>
      <button onClick={cerrarSession} className="text-white bg-dark box-border border border-transparent hover:bg-dark-strong focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
        Cerrar session
      </button>
    </div>
  );
}
