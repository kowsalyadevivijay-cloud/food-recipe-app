import React from "react";
import { Clock, X, Users, Utensils, Hash } from "lucide-react";

const RecipeModel = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-stone-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12">
          {/* Header Section */}
          <header className="mb-10 max-w-2xl">
            <h2 className="text-4xl font-extrabold text-stone-800 mb-4 tracking-tight">
              Garden Fresh Pesto Pasta
            </h2>
            <p className="text-lg text-stone-500 leading-relaxed">
              A vibrant, aromatic dish featuring hand-crushed basil, toasted pine nuts, and aged parmesan cheese.
            </p>
          </header>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-1 mb-12 bg-emerald-900 rounded-2xl overflow-hidden shadow-lg">
            <div className="flex flex-col items-center justify-center p-6 text-emerald-50">
              <Clock className="w-5 h-5 mb-2 opacity-80" />
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Prep</span>
              <span className="text-xl font-semibold">15 Min</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-emerald-800 text-emerald-50">
              <Utensils className="w-5 h-5 mb-2 opacity-80" />
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Cook</span>
              <span className="text-xl font-semibold">10 Min</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 text-emerald-50">
              <Users className="w-5 h-5 mb-2 opacity-80" />
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">Serves</span>
              <span className="text-xl font-semibold">4</span>
            </div>
          </div>

          {/* Main Content: Ingredients & Instructions */}
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Ingredients Column */}
            <section>
              <h3 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                <div className="w-2 h-8 bg-amber-500 rounded-full" />
                Ingredients
              </h3>
              <ul className="space-y-4">
                {["500g Penne Pasta", "2 cups Fresh Basil", "3 cloves Garlic", "1/2 cup Parmesan", "Extra Virgin Olive Oil"].map((ingredient, i) => (
                  <li key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100">
                    <div className="w-5 h-5 rounded-md border-2 border-emerald-500 flex-shrink-0" />
                    <span className="text-stone-700 font-medium">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructions Column */}
            <section>
              <h3 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                <div className="w-2 h-8 bg-emerald-600 rounded-full" />
                Preparation
              </h3>
              <div className="space-y-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex gap-4">
                    <span className="text-4xl font-black text-emerald-100 leading-none">
                      0{step}
                    </span>
                    <p className="text-stone-600 leading-relaxed pt-1">
                      Instruction
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Footer Tags */}
          <footer className="mt-16 pt-8 border-t border-stone-100">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1 text-sm font-bold text-stone-400 uppercase tracking-tighter mr-2">
                <Hash size={14} /> Meta Tags:
              </span>
              {["Italian", "Vegetarian", "Quick Lunch"].map((tag) => (
                <span 
                  key={tag} 
                  className="px-4 py-1.5 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default RecipeModel;