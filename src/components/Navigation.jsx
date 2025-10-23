export function Navigation() {
  return (
    <nav class="bg-white shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a href="#" class="flex-shrink-0 flex items-center">
              <i data-feather="droplet" class="h-8 w-8 text-blue-500"></i>
              <span class="ml-2 text-xl font-bold text-gray-900">
                Shine & Sparkle
              </span>
            </a>
          </div>
          <div class="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <a
              href="#"
              class="text-blue-600 border-b-2 border-blue-500 px-3 py-2 text-sm font-medium"
            >
              Home
            </a>
            <a
              href="#services"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Services
            </a>
            <a
              href="#pricing"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Pricing
            </a>

            <a
              href="#contact"
              class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Contact
            </a>
            <a
              href="#book"
              class="ml-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Book Now
            </a>
          </div>
          <div class="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <i data-feather="menu" class="h-6 w-6"></i>
            </button>
          </div>
        </div>
      </div>

      <div
        class="md:hidden"
        x-show="open"
        x-transition:enter="transition ease-out duration-100 transform"
        x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100"
        x-transition:leave="transition ease-in duration-75 transform"
        x-transition:leave-start="opacity-100 scale-100"
        x-transition:leave-end="opacity-0 scale-95"
      >
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <a
            href="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-blue-600 bg-blue-50"
          >
            Home
          </a>
          <a
            href="#services"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          >
            Services
          </a>
          <a
            href="#pricing"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          >
            Pricing
          </a>

          <a
            href="#contact"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          >
            Contact
          </a>
          <a
            href="#book"
            class="block w-full px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 text-center"
          >
            Book Now
          </a>
        </div>
      </div>
    </nav>
  );
}
