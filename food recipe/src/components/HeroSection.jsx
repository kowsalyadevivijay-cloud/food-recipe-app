import React from 'react';
import HeroImage from '../assets/images/hero.png'; 
function HeroSection() {
    return (
        
        <div className="container mx-auto px-4 py-4">
            <div className="px-4 py-20 bg-orange-50 rounded-lg shadow-lg text-center">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                    <span className="text-gray-900">Healthy Food, </span>
                    <span className="text-green-600">Happier You.</span>
                </h1>
                <p className="text-2xl lg:text-3xl font-medium text-red-600 mb-10">
                    Nourish Your Body, Feed Your Soul.
                </p>
                <button className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-orange-500 via-red-500 to-red-600 rounded-xl hover:shadow-[0_10px_20px_rgba(229,62,62,0.3)] hover:scale-105 active:scale-95 shadow-lg">
  <span className="relative">Start Exploring</span>
  
  <div className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
</button>
<div className="mt-16 flex justify-center px-4 md:px-10">
                    <div className="w-full max-w-5xl"> 
                      <img src={HeroImage} className="hero-img" alt="Main Banner" />
                    </div>
                </div>
</div>
            </div>
    );
}
export default HeroSection;