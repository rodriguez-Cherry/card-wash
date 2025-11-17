import { useEffect, useState } from "react";
import { axiosClient } from "../api/ApiCliente";

export function useData(url, method, payload) {
  const [isLoading, setIsloading] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  console.log(url, method)

  useEffect(() => {
    async function solicitar() {
      try {
        setIsloading(true);
        const axiosOpciones = payload
          ? {
              method: method,
              url: url,
              data: payload,
            }
          : {
              method: method,
              url: url,
            };

        const { data } = await axiosClient(axiosOpciones);
        console.log(data)
        setData(data.data);
        setIsloading(false);
        setError(null);
      } catch (error) {
        setData(null);
        setIsloading(false);
        setError(error);
      }
    }

    solicitar();
  }, [method, url]);

  return { data, isLoading, error };
}
