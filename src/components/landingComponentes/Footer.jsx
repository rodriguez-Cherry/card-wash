export function Footer() {
  return (
    <footer class="bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="w-full">
            <h3 class="text-lg font-bold mb-4">Soporte</h3>
            <div class="">
              <li>Para mas informacion contactenos al numero debajo</li>
              <li>Contactenos: 809-909-8080</li>
              <li>Terminos de seguridad</li>
            </div>
          </div>
        </div>
        <div class="mt-12 pt-8 border-t border-gray-800 text-center">
          <p class="text-gray-400">
            &copy; 2023 Shine & Sparkle Car Wash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
