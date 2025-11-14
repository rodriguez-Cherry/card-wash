import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, faUserCircle, faCarTunnel, faSquareRootVariable, faDatabase } from "@fortawesome/free-solid-svg-icons";

export const NavBar = ({ setSelected }) => {
  const options = [
    {
      id: 1,
      name: "Tablero",
      icon: <FontAwesomeIcon icon={faKeyboard} />,
    },
    {
      id: 2,
      name: "Clientes",
      icon: <FontAwesomeIcon icon={faUserCircle} />,
    },
    {
      id: 3,
      name: "Vehiculos",
      icon: <FontAwesomeIcon icon={faCarTunnel} />,
    },
    {
      id: 4,
      name: "Servicios",
      icon: <FontAwesomeIcon icon={faSquareRootVariable} />,
    },
    {
      id: 5,
      name: "Ordenes",
      icon: <FontAwesomeIcon icon={faDatabase} />,
    },
  ];

  return (
    <div className="border rounded w-40 p-4 flex flex-col gap-3">
      {options.map((item) => (
        <div onClick={() => setSelected(item.name)} className="flex gap-2 border rounded items-center cursor-pointer" id={item.id}>
          {item.icon}
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};
