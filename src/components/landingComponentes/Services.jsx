import { useData } from "../../util/useData";

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

export function Services() {
  const { data } = useData("/users/servicios/", "get");

  console.log(data);

  return (
    <section id="services" class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            Nuestros servicios premium
          </h2>
          <div class="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   {data?.map((servicio, index) => (
            <ServicioCaja index={index + 1} {...servicio} />
          ))}
          
        </div>
      </div>
    </section>
  );
}

const ServicioCaja = ({ tipo, descripcion, index }) => {
  return (
    <div class="service-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
      <div class="h-48 bg-gray-200 flex items-center justify-center">
        <img style={{ height:"100%", width:"100%"}} src={imagenesMap[index]} />
      </div>
      <div class="p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-2">{tipo}</h3>
        <p class="text-gray-600 mb-4">{descripcion}</p>
      </div>
    </div>
  );
};
