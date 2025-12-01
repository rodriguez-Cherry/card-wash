import { NavBar } from "../components/NavBar";
import { Ordenes } from "../components/cajeroComponentes/Ordenes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

const options = [
  {
    id: 5,
    name: "Ordenes",
    icon: <FontAwesomeIcon icon={faDatabase} />,
  },
];

export const CarejoPage = () => {
  return (
    <div className="flex gap-2 p-8">
      <NavBar
        options={options}
      />
      <div style={{ width: "100%" }}>
        <div>
          <Ordenes />
        </div>
      </div>
    </div>
  );
};
