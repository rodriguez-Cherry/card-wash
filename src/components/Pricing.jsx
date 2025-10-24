export function Pricing() {
  return (
    <section id="pricing" class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            Precios simples y transparentes
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Elige el paquete perfecto para tu vehículo y presupuesto
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* <!-- Basic Package --> */}
          <div class="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div class="bg-gray-100 p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-1">Lavado Básico</h3>
              <p class="text-gray-600 mb-4">Perfecto para mantenimiento regular</p>
              <div class="flex items-baseline">
                <span class="text-4xl font-bold text-blue-500">$15</span>
                <span class="ml-1 text-gray-500">/lavado</span>
              </div>
            </div>
            <div class="p-6">
              <ul class="space-y-3 mb-8">
                <li class="flex items-center">
                  <i
                    data-feather="check"
                    class="h-5 w-5 text-green-500 mr-2"
                  ></i>
                  <span>Lavado exterior</span>
                </li>
                <li class="flex items-center">
                  <i
                    data-feather="check"
                    class="h-5 w-5 text-green-500 mr-2"
                  ></i>
                  <span>Limpieza de ruedas</span>
                </li>
                <li class="flex items-center">
                  <i
                    data-feather="check"
                    class="h-5 w-5 text-green-500 mr-2"
                  ></i>
                  <span>Enjuague sin manchas</span>
                </li>
                <li class="flex items-center text-gray-400">
                  <i data-feather="x" class="h-5 w-5 mr-2"></i>
                  <span>Limpieza de interiores</span>
                </li>
              </ul>
              <a
                href="#book"
                class="block w-full py-3 px-4 text-center bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
              >
                Empezar
              </a>
            </div>
          </div>

          {/* <!-- Popular Package --> */}
          <div class="border-2 border-blue-500 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-lg">
            <div class="bg-blue-500 p-6 text-white">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-xl font-bold mb-1">Lavado de lujo</h3>
                  <p class="opacity-90 mb-4">Nuestro paquete más popular</p>
                </div>
                <span class="bg-white text-blue-500 text-xs font-bold px-2 py-1 rounded-full">
                  MEJOR VALOR
                </span>
              </div>
              <div class="flex items-baseline">
                <span class="text-4xl font-bold">$25</span>
                <span class="ml-1 opacity-90">/Lavado</span>
              </div>
            </div>
            <div class="p-6 bg-white">
              <ul class="space-y-3 mb-8">
                <li class="flex items-center">
                  <i
                    data-feather="check"
                    class="h-5 w-5 text-green-500 mr-2"
                  ></i>
                  <span>Todo lo Básico</span>
                </li>
                <li class="flex items-center">
                  <i
                    data-feather="check"
                    class="h-5 w-5 text-green-500 mr-2"
                  ></i>
                  <span>Secado de manos</span>
                </li>
                <li class="flex items-center">
                  <i
                    data-feather="check"
                    class="h-5 w-5 text-green-500 mr-2"
                  ></i>
                  <span>Revestimiento de neumáticos</span>
                </li>
                <li class="flex items-center">
                  <i
                    data-feather="check"
                    class="h-5 w-5 text-green-500 mr-2"
                  ></i>
                  <span>vacío de interior</span>
                </li>
              </ul>
              <a
                href="#book"
                class="block w-full py-3 px-4 text-center bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
              >
                Empezar
              </a>
            </div>
          </div>

          {/* <!-- Premium Package --> */}
          <div class="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div class="bg-gray-100 p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-1">
                Detalle premium
              </h3>
              <p class="text-gray-600 mb-4">Acabado de calidad de sala de exposición.</p>
              <div class="flex items-baseline">
                <span class="text-4xl font-bold text-blue-500">$120</span>
                <span class="ml-1 text-gray-500">/detalle</span>
              </div>
            </div>
            <div class="p-6">
              <ul class="space-y-3 mb-8">
                <li class="flex items-center">
                  <i
                    data-feather="check"
                    class="h-5 w-5 text-green-500 mr-2"
                  ></i>
                  <span>Todo en Deluxe</span>
                </li>
                <li class="flex items-center">
                  <i
                    data-feather="check"
                    class="h-5 w-5 text-green-500 mr-2"
                  ></i>
                  <span>cera de manos</span>
                </li>
                <li class="flex items-center">
                  <i
                    data-feather="check"
                    class="h-5 w-5 text-green-500 mr-2"
                  ></i>
                  <span>Champú para interiores</span>
                </li>
                <li class="flex items-center">
                  <i
                    data-feather="check"
                    class="h-5 w-5 text-green-500 mr-2"
                  ></i>
                  <span>Acondicionamiento del cuero</span>
                </li>
              </ul>
              <a
                href="#book"
                class="block w-full py-3 px-4 text-center bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
              >
                Empezar
              </a>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center">
          <a
            href="#"
            class="text-blue-500 font-semibold hover:text-blue-700 flex items-center justify-center"
          >
            Ver todos los paquetes y precios{" "}
            <i data-feather="arrow-right" class="ml-2 h-4 w-4"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
