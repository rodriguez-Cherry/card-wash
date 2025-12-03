import { useEffect, useState } from "react";
import { Authenticated } from "./components/Authenticated";

import { CarWashContext } from "./contex/Context";
import { axiosClient } from "./api/ApiCliente";
import { useNavigate } from "react-router";

export function App() {
  const userToken = localStorage.getItem("token-value");

  // checking - autenticado - no-autenticado
  const navigate = useNavigate();

  const userDataPersistent = localStorage.getItem("userData");

  const [userAccess, setUserAccess] = useState({
    sessionEstado: userToken?.length > 0 ? "autenticado" : "no-autenticado",
    userData: JSON.parse(userDataPersistent) || null,
  });

  const [selectedHome, setSelectedHome] = useState("Perfil");
    const [selectedAdmin, setSelectedAdmin] = useState("Clientes");
      const [selectedCajero, setSelectedCajero] = useState("Ordenes");


  useEffect(() => {
    async function checkAuth() {
      try {
        const { data } = await axiosClient.get("/access/verificar-token");
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
        navigate("/");
      }
    }
    checkAuth();
  }, []);

  const contexValues = {
    ...userAccess,
    setUserAccess,
    setSelectedHome,
    selectedHome,
    selectedAdmin,
    setSelectedAdmin,
    selectedCajero,
    setSelectedCajero
  };

  return (
    <div style={{ height:"100vh"}}>
      <CarWashContext.Provider value={{ ...contexValues }}>
        <Authenticated />
      </CarWashContext.Provider>
    </div>
  );
}
