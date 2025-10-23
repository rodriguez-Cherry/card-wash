export function Services() {
  return (
    <section id="services" class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            Our Premium Services
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
              <h3 class="text-xl font-bold text-gray-900 mb-2">Basic Wash</h3>
              <p class="text-gray-600 mb-4">
                Exterior wash, wheel cleaning, and spot-free rinse for a clean
                finish.
              </p>
              <a
                href="#book"
                class="text-blue-500 font-semibold hover:text-blue-700 flex items-center"
              >
                Book Now <i data-feather="arrow-right" class="ml-2 h-4 w-4"></i>
              </a>
            </div>
          </div>

          {/* <!-- Service Card 2 --> */}
          <div class="service-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
            <div class="h-48 bg-gray-200 flex items-center justify-center">
              <i data-feather="wind" class="h-16 w-16 text-blue-500"></i>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Deluxe Wash</h3>
              <p class="text-gray-600 mb-4">
                Includes Basic Wash plus hand drying, tire dressing, and
                interior vacuum.
              </p>
              <a
                href="#book"
                class="text-blue-500 font-semibold hover:text-blue-700 flex items-center"
              >
                Book Now <i data-feather="arrow-right" class="ml-2 h-4 w-4"></i>
              </a>
            </div>
          </div>

          <div class="service-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
            <div class="h-48 bg-gray-200 flex items-center justify-center">
              <i data-feather="star" class="h-16 w-16 text-blue-500"></i>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Premium Detail
              </h3>
              <p class="text-gray-600 mb-4">
                Full interior and exterior detailing with wax, polish, and
                fabric protection.
              </p>
              <a
                href="#book"
                class="text-blue-500 font-semibold hover:text-blue-700 flex items-center"
              >
                Book Now <i data-feather="arrow-right" class="ml-2 h-4 w-4"></i>
              </a>
            </div>
          </div>

          <div class="service-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
            <div class="h-48 bg-gray-200 flex items-center justify-center">
              <i data-feather="shield" class="h-16 w-16 text-blue-500"></i>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Ceramic Coating
              </h3>
              <p class="text-gray-600 mb-4">
                Advanced paint protection that lasts for years with proper
                maintenance.
              </p>
              <a
                href="#book"
                class="text-blue-500 font-semibold hover:text-blue-700 flex items-center"
              >
                Book Now <i data-feather="arrow-right" class="ml-2 h-4 w-4"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
