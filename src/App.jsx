import { useEffect, useState } from "react";
import { Authenticated } from "./components/Authenticated";


import { CarWashContext } from "./contex/Context";
import { axiosClient } from "./api/ApiCliente";

export function App() {
  const userToken = localStorage.getItem("token-value");

  // checking - autenticado - no-autenticado

  const userDataPersistent = localStorage.getItem("userData");

  const [userAccess, setUserAccess] = useState({
    sessionEstado: userToken?.length > 0 ? "autenticado" : "no-autenticado",
    userData: JSON.parse(userDataPersistent) || null,
  });

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data } = await axiosClient.get("/access/verificar-token");
        console.log(data);
        setUserAccess({
          ...userAccess,
          sessionEstado: "autenticado",
        });
      } catch (error) {
        setUserAccess({
          ...userAccess,
          sessionEstado: "no-autenticado",
        });
        localStorage.clear();
      }
    }
    checkAuth();
  }, []);

  const contexValues = {
    ...userAccess,
    setUserAccess,
  };
  console.log(contexValues);

  return (
    <CarWashContext.Provider value={{ ...contexValues }}>
        <Authenticated />
    </CarWashContext.Provider>
  );
}
