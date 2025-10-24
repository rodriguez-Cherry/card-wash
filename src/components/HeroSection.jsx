export function HeroSection() {
  return (
    <section class="hero-bg text-white py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="md:w-2/3 lg:w-1/2">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Cuidado profesional del automóvil que brilla
          </h1>
          <p class="text-lg md:text-xl mb-8">
            Experimente lo último en limpieza de automóviles con nuestros paquetes de lavado premium y servicios de detallado.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a
              href="#book"
              class="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-lg font-semibold text-center"
            >
              Reserva en línea
            </a>
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
