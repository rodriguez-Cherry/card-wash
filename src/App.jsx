import { Authenticated } from "./components/Authenticated";
import { UnAuthenticated } from "./components/UnAuthenticated";
import { CarWashContext } from "./contex/Context";

export function App() {
  const verificarEstadoDeSession = () => {
    if (localStorage.getItem("token-value")) {
      return true;
    }

    return false;
  };

  const usuario = {
    estaAutenticado: false,
    nombre: "juan",
  };

  const valor = verificarEstadoDeSession();
  console.log(valor);

  return (
    <CarWashContext.Provider value={{ data: usuario }}>
      <div>
        {valor ? (
          <>
            <Authenticated />
          </>
        ) : (
          <>
            <UnAuthenticated />
          </>
        )}
      </div>
    </CarWashContext.Provider>
  );
}
