export function Services() {
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
          {/* <!-- Service Card 1 --> */}
          <div class="service-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
            <div class="h-48 bg-gray-200 flex items-center justify-center">
              <i data-feather="shower" class="h-16 w-16 text-blue-500"></i>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Lavado Básico</h3>
              <p class="text-gray-600 mb-4">
                Lavado exterior, limpieza de ruedas y enjuague sin manchas para un acabado impecable.
              </p>
              <a
                href="#book"
                class="text-blue-500 font-semibold hover:text-blue-700 flex items-center"
              >
                Reserva ahora <i data-feather="arrow-right" class="ml-2 h-4 w-4"></i>
              </a>
            </div>
          </div>

          {/* <!-- Service Card 2 --> */}
          <div class="service-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
            <div class="h-48 bg-gray-200 flex items-center justify-center">
              <i data-feather="wind" class="h-16 w-16 text-blue-500"></i>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Lavado de lujo</h3>
              <p class="text-gray-600 mb-4">
                Incluye lavado básico más secado a mano, abrillantado de neumáticos y aspirado interior.
              </p>
              <a
                href="#book"
                class="text-blue-500 font-semibold hover:text-blue-700 flex items-center"
              >
                Reserva ahora  <i data-feather="arrow-right" class="ml-2 h-4 w-4"></i>
              </a>
            </div>
          </div>

          <div class="service-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
            <div class="h-48 bg-gray-200 flex items-center justify-center">
              <i data-feather="star" class="h-16 w-16 text-blue-500"></i>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Detalle premium
              </h3>
              <p class="text-gray-600 mb-4">
                Detallado completo interior y exterior con cera, pulimento y protección de telas.
              </p>
              <a
                href="#book"
                class="text-blue-500 font-semibold hover:text-blue-700 flex items-center"
              >
                Reserva ahora <i data-feather="arrow-right" class="ml-2 h-4 w-4"></i>
              </a>
            </div>
          </div>

          <div class="service-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
            <div class="h-48 bg-gray-200 flex items-center justify-center">
              <i data-feather="shield" class="h-16 w-16 text-blue-500"></i>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Revestimiento cerámico
              </h3>
              <p class="text-gray-600 mb-4">
                Protección avanzada de pintura que dura años con el mantenimiento adecuado.
              </p>
              <a
                href="#book"
                class="text-blue-500 font-semibold hover:text-blue-700 flex items-center"
              >
                Reserva ahora  <i data-feather="arrow-right" class="ml-2 h-4 w-4"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
