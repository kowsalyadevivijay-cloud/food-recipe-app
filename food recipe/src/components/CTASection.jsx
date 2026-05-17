import React from 'react';
import { Link } from 'react-router-dom';
import LeftImage from './../assets/images/knife.png';
import RightImage from './../assets/images/Pan.png';

function CTASection() {
  return (
    <section className="py-28 lg:py-40 bg-light-neutral-100 relative overflow-hidden">
    
      <div className="absolute -left-20 top-10 w-64 h-64 lg:w-96 lg:h-96 opacity-30 lg:opacity-100 pointer-events-none">
        <img src={LeftImage} alt="" className="w-full h-full object-contain rotate-12" />
      </div>

      <div className="absolute -right-10 bottom-10 w-64 h-64 lg:w-96 lg:h-96 opacity-30 lg:opacity-100 pointer-events-none">
        <img src={RightImage} alt="" className="w-full h-full object-contain -rotate-12" />
      </div>

     
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl lg:text-7xl font-extrabold text-primary mb-8 leading-tight">
          Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Elevate Your Plate?</span>
        </h2>
        
        <Link 
          to="/recipes" 
          className="inline-block bg-gradient-to-r from-orange-400 to-red-600 text-white px-12 py-5 rounded-2xl font-bold shadow-2xl hover:scale-105 transition-all duration-300 text-xl"
        >
          Unlock Fresh Recipes
        </Link>
      </div>
    </section>
  );
}

export default CTASection;