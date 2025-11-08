import { useEffect, useState } from "react";
import { Authenticated } from "./components/Authenticated";
import { UnAuthenticated } from "./components/UnAuthenticated";
import { CarWashContext } from "./contex/Context";
import { useLocation } from "react-router";

export function App() {
  const location = useLocation();
  const [userAccess, setUserAccess] = useState(null);

  const usuario = {
    estaAutenticado: userAccess,
  };

  useEffect(() => {
    const verificarEstadoDeSession = () => {
      if (localStorage.getItem("token-value")) {
        setUserAccess(true);
        return;
      }
      setUserAccess(false);
      return;
    };

    verificarEstadoDeSession();
  }, [location.pathname]);

  console.log(userAccess)

  return (
    <CarWashContext.Provider value={{ data: usuario }}>
      <div>
        {userAccess ? (
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
