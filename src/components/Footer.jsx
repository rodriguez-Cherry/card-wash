export function Footer() {
  return (
    <footer class="bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-bold mb-4">Services</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-400 hover:text-white">
                  Basic Wash
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">
                  Deluxe Wash
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">
                  Premium Detail
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">
                  Ceramic Coating
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">Company</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">Support</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">Connect</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white">
                <i data-feather="facebook" class="h-6 w-6"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <i data-feather="instagram" class="h-6 w-6"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <i data-feather="twitter" class="h-6 w-6"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <i data-feather="youtube" class="h-6 w-6"></i>
              </a>
            </div>
            <div class="mt-6">
              <h4 class="text-sm font-bold mb-2">Download Our App</h4>
              <div class="flex space-x-2">
                <a
                  href="#"
                  class="bg-black text-white px-3 py-2 rounded flex items-center text-sm"
                >
                  <i data-feather="smartphone" class="h-4 w-4 mr-1"></i>
                  <span>App Store</span>
                </a>
                <a
                  href="#"
                  class="bg-black text-white px-3 py-2 rounded flex items-center text-sm"
                >
                  <i data-feather="smartphone" class="h-4 w-4 mr-1"></i>
                  <span>Google Play</span>
                </a>
              </div>
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
