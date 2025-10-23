

export function Pricing() {

    return (
            <section id="pricing" class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900 mb-2">Simple, Transparent Pricing</h2>
                <p class="text-gray-600 max-w-2xl mx-auto">Choose the perfect package for your vehicle and budget</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* <!-- Basic Package --> */}
                <div class="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div class="bg-gray-100 p-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-1">Basic Wash</h3>
                        <p class="text-gray-600 mb-4">Perfect for regular maintenance</p>
                        <div class="flex items-baseline">
                            <span class="text-4xl font-bold text-blue-500">$15</span>
                            <span class="ml-1 text-gray-500">/wash</span>
                        </div>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-3 mb-8">
                            <li class="flex items-center">
                                <i data-feather="check" class="h-5 w-5 text-green-500 mr-2"></i>
                                <span>Exterior wash</span>
                            </li>
                            <li class="flex items-center">
                                <i data-feather="check" class="h-5 w-5 text-green-500 mr-2"></i>
                                <span>Wheel cleaning</span>
                            </li>
                            <li class="flex items-center">
                                <i data-feather="check" class="h-5 w-5 text-green-500 mr-2"></i>
                                <span>Spot-free rinse</span>
                            </li>
                            <li class="flex items-center text-gray-400">
                                <i data-feather="x" class="h-5 w-5 mr-2"></i>
                                <span>Interior cleaning</span>
                            </li>
                        </ul>
                        <a href="#book" class="block w-full py-3 px-4 text-center bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md">Get Started</a>
                    </div>
                </div>
                
                {/* <!-- Popular Package --> */}
                <div class="border-2 border-blue-500 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <div class="bg-blue-500 p-6 text-white">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="text-xl font-bold mb-1">Deluxe Wash</h3>
                                <p class="opacity-90 mb-4">Our most popular package</p>
                            </div>
                            <span class="bg-white text-blue-500 text-xs font-bold px-2 py-1 rounded-full">BEST VALUE</span>
                        </div>
                        <div class="flex items-baseline">
                            <span class="text-4xl font-bold">$25</span>
                            <span class="ml-1 opacity-90">/wash</span>
                        </div>
                    </div>
                    <div class="p-6 bg-white">
                        <ul class="space-y-3 mb-8">
                            <li class="flex items-center">
                                <i data-feather="check" class="h-5 w-5 text-green-500 mr-2"></i>
                                <span>Everything in Basic</span>
                            </li>
                            <li class="flex items-center">
                                <i data-feather="check" class="h-5 w-5 text-green-500 mr-2"></i>
                                <span>Hand drying</span>
                            </li>
                            <li class="flex items-center">
                                <i data-feather="check" class="h-5 w-5 text-green-500 mr-2"></i>
                                <span>Tire dressing</span>
                            </li>
                            <li class="flex items-center">
                                <i data-feather="check" class="h-5 w-5 text-green-500 mr-2"></i>
                                <span>Interior vacuum</span>
                            </li>
                        </ul>
                        <a href="#book" class="block w-full py-3 px-4 text-center bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md">Get Started</a>
                    </div>
                </div>
                
                {/* <!-- Premium Package --> */}
                <div class="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div class="bg-gray-100 p-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-1">Premium Detail</h3>
                        <p class="text-gray-600 mb-4">Showroom quality finish</p>
                        <div class="flex items-baseline">
                            <span class="text-4xl font-bold text-blue-500">$120</span>
                            <span class="ml-1 text-gray-500">/detail</span>
                        </div>
                    </div>
                    <div class="p-6">
                        <ul class="space-y-3 mb-8">
                            <li class="flex items-center">
                                <i data-feather="check" class="h-5 w-5 text-green-500 mr-2"></i>
                                <span>Everything in Deluxe</span>
                            </li>
                            <li class="flex items-center">
                                <i data-feather="check" class="h-5 w-5 text-green-500 mr-2"></i>
                                <span>Hand wax</span>
                            </li>
                            <li class="flex items-center">
                                <i data-feather="check" class="h-5 w-5 text-green-500 mr-2"></i>
                                <span>Interior shampoo</span>
                            </li>
                            <li class="flex items-center">
                                <i data-feather="check" class="h-5 w-5 text-green-500 mr-2"></i>
                                <span>Leather conditioning</span>
                            </li>
                        </ul>
                        <a href="#book" class="block w-full py-3 px-4 text-center bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md">Get Started</a>
                    </div>
                </div>
            </div>
            
            <div class="mt-12 text-center">
                <a href="#" class="text-blue-500 font-semibold hover:text-blue-700 flex items-center justify-center">
                    View all packages and pricing <i data-feather="arrow-right" class="ml-2 h-4 w-4"></i>
                </a>
            </div>
        </div>
    </section>
    )

}
