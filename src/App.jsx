import { useState } from "react";
import { Authenticated } from "./components/Authenticated";

import { CarWashContext } from "./contex/Context";

export function App() {
  const userToken = localStorage.getItem("token-value");

  // checking - autenticado - no-autenticado

  const [userAccess, setUserAccess] = useState({
    sessionEstado: userToken?.length > 0 ? "autenticado" : "no-autenticado",
    userData: null,
  });


  const contexValues = {
    ...userAccess,
    setUserAccess,
  };
  console.log(contexValues)

  return (
    <CarWashContext.Provider value={{ ...contexValues }}>
      <div>
        <>
          <Authenticated />
        </>
      </div>
    </CarWashContext.Provider>
  );
}
