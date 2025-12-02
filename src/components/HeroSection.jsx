import { useContext } from "react";
import { Link } from "react-router";
import { CarWashContext } from "../contex/Context";
export function HeroSection() {
  const { sessionEstado } = useContext(CarWashContext);

  const reservarEnLineaRuta =
    sessionEstado === "autenticado" ? "/home" : "/login";

  return (
    <section

      className="text-white py-20 md:py-32"
    >
      <div       style={{ backgroundImage: `url('../assets/imgs/pantalla-inicio.jpg')` }} class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="md:w-2/3 lg:w-1/2">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Cuidado profesional del automóvil que brilla
          </h1>
          <p class="text-lg md:text-xl mb-8">
            Experimente lo último en limpieza de automóviles con nuestros
            paquetes de lavado premium y servicios de detallado.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <Link
              to={reservarEnLineaRuta}
              class="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-lg font-semibold text-center"
            >
              Reserva en línea
            </Link>
            <a
              href="#services"
              class="px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-md text-lg font-semibold text-center"
            >
              Nuestros Servicios
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
