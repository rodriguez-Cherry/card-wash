import { useContext } from "react";
import { CarWashContext } from "../contex/Context";

export function Home() {
  const data = useContext(CarWashContext)
  console.log(data)
  return <h1>Welcome home</h1>;
}
