import { Tooltip } from "@/components/ui/tooltip";
import { useData } from "../../util/useData";
import { useContext, useState } from "react";
import { CarWashContext } from "../../contex/Context";
import { Modal } from "../Modal";
import { AgendarCita } from "./AgendarCita";

import imagen1 from "../../assets/imgs/1.jpg";
import imagen2 from "../../assets/imgs/2.jpg";
import imagen3 from "../../assets/imgs/3.jpg";
import imagen4 from "../../assets/imgs/4.jpg";
import imagen5 from "../../assets/imgs/5.jpg";
import imagen6 from "../../assets/imgs/6.jpg";

const imagenesMap = {
  1: imagen1,
  2: imagen2,
  3: imagen3,
  4: imagen4,
  5: imagen5,
  6: imagen6,
};

// export function Servicios() {
//   const { userData } = useContext(CarWashContext);
//   const {
//     data: servicios,
//     isLoading,
//     error,
//   } = useData("/users/servicios", "get");

//   const [servicioSeleccionado, setServicioSeleccionado] = useState({});
//   const [open, setOpen] = useState(false);

//   const onAgendar = (servicio) => {
//     setServicioSeleccionado(servicio);
//     setOpen(true);
//   };

//   return (
//     <div>
//       <h1 className="text-xl font-semibold">Servicios</h1>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "3fr 3fr 2fr",
//           gap: "20px",
//         }}
//       >
//         {open && (
//           <Modal open={open} setOpen={setOpen}>
//             <AgendarCita
//               key={servicioSeleccionado.id}
//               userId={userData?.id}
//               servicio={servicioSeleccionado}
//               setOpen={setOpen}
//             />
//           </Modal>
//         )}
//         {isLoading && <Loading />}
//         {servicios?.map((servicio, index) => (
//           <Servicio
//             {...servicio}
//             setServicioSeleccionado={onAgendar}
//             index={index + 1}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// old

// function Servicio(props) {
//   const {
//     tipo,
//     descripcion,
//     precio,
//     detalles,
//     setServicioSeleccionado,
//     index,
//   } = props;

//   const imagen = imagenesMap[index];
//   const detallesSplit = detalles
//     .split(",")
//     .map((t, i) => " " + t + "\n")
//     .join(" ");

//   return (
//     <div className="rounded w-full">
//       <Tooltip
//         content={detallesSplit}
//         contentProps={{ css: { "--tooltip-bg": "gray" } }}
//       >
//         <div className="border rounded w-full bg-white w-60 h-full ">
//           <img
//             style={{ height: "200px", width: "100%" }}
//             src={imagen}
//             alt="imagen"
//           />

//           <div className="p-3">
//             <h1 className="text-lg font-semibold mt-2">{tipo}</h1>
//             <p style={{ color: "#017BCA" }}> DOP {precio}</p>
//             <div>
//               <button
//                 onClick={() => setServicioSeleccionado(props)}
//                 className="p-1 mt-4 text-sm bg-sky-300 rounded text-white"
//               >
//                 Agendar
//               </button>
//             </div>
//           </div>
//         </div>
//       </Tooltip>
//     </div>
//   );
// }

// new
export function Servicios() {
  const { userData } = useContext(CarWashContext);
  const {
    data: servicios,
    isLoading,
    error,
  } = useData("/users/servicios", "get");

  const [servicioSeleccionado, setServicioSeleccionado] = useState({});
  const [open, setOpen] = useState(false);

  const onAgendar = (servicio) => {
    setServicioSeleccionado(servicio);
    setOpen(true);
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold mb-4 text-blue-900">Servicios</h1>

      {/* Grid Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ms-6 w-full">
        
        {open && (
          <Modal open={open} setOpen={setOpen}>
            <AgendarCita
              key={servicioSeleccionado.id}
              userId={userData?.id}
              servicio={servicioSeleccionado}
              setOpen={setOpen}
            />
          </Modal>
        )}

        {servicios?.map((servicio, index) => (
          <Servicio
            {...servicio}
            setServicioSeleccionado={onAgendar}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
}


function Servicio(props) {
  const {
    tipo,
    descripcion,
    precio,
    detalles,
    setServicioSeleccionado,
    index,
  } = props;

  const imagen = imagenesMap[index];
  const detallesSplit = detalles
    .split(",")
    .map((t) => "• " + t.trim())
    .join("\n");

  return (
    <div className="rounded-xl w-full">
      <Tooltip
        content={detallesSplit}
        contentProps={{ css: { "--tooltip-bg": "gray" } }}
      >
        <div className="bg-white border border-neutral-200 rounded-xl shadow hover:shadow-lg transition p-0 overflow-hidden">
          <img
            className="h-48 w-full object-cover"
            src={imagen}
            alt="servicio"
          />

          <div className="p-4 flex flex-col gap-2">
            <h1 className="text-lg font-semibold text-blue-900">{tipo}</h1>

            <p className="text-blue-600 font-medium">DOP {precio}</p>

            <button
              onClick={() => setServicioSeleccionado(props)}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-sm 
                         hover:bg-blue-700 transition font-semibold shadow"
            >
              Agendar
            </button>
          </div>
        </div>
      </Tooltip>
    </div>
  );
}
