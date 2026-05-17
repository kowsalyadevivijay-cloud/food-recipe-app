import React, { useState } from "react";
import { Clock, X, Users, Utensils, Hash, ChevronDown } from "lucide-react";

const RecipeModel = ({ recipe, onClose }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  if (!recipe) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full z-20"
        >
          <X size={24} />
        </button>

        {/* Recipe Image */}
        {recipe.image && (
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-80 object-cover rounded-t-3xl"
          />
        )}

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-3">{recipe.title}</h1>
          <p className="text-gray-600 mb-8">{recipe.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 bg-emerald-900 text-white p-6 rounded-lg">
            <div className="text-center">
              <Clock size={20} className="mx-auto mb-2" />
              <p className="text-sm">Prep: {recipe.prepTime}</p>
            </div>
            <div className="text-center">
              <Utensils size={20} className="mx-auto mb-2" />
              <p className="text-sm">Cook: {recipe.cookTime}</p>
            </div>
            <div className="text-center">
              <Users size={20} className="mx-auto mb-2" />
              <p className="text-sm">Serves: {recipe.servings}</p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients?.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructions */}
            <section>
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="w-full flex items-center justify-between bg-emerald-100 hover:bg-emerald-200 p-4 rounded-lg mb-4 font-bold"
              >
                <span>Preparation Instructions</span>
                <ChevronDown 
                  size={20}
                  className={`transform transition ${showInstructions ? 'rotate-180' : ''}`}
                />
              </button>

              {showInstructions && (
                <div className="space-y-4">
                  {recipe.instructions?.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-2xl font-bold text-emerald-600 flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Tags */}
          {recipe.tags && (
            <footer className="border-t pt-4">
              <p className="text-sm font-bold text-gray-500 mb-2">TAGS:</p>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span key={tag} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModel;