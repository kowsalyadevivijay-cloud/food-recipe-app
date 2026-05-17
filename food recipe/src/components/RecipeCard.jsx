import React from "react";
import { Clock, Users } from "lucide-react";

function RecipeCard({ recipe, onViewRecipe, isFavorite, onToggleFavorite }) {
  const {
    title = "Untitled recipe",
    description = "No description available",
    servings = "--",
    prepTime = "--",
    cookTime = "--",
    image,
  } = recipe;

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:scale-105">
      <div className="relative">
        <img
          src={image || "/default-recipe.jpg"}
          alt={title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite && onToggleFavorite(recipe);
          }}
          className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-gray-500" />
              <span>Servings: {servings}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Prep: {prepTime} min</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Cook: {cookTime} min</span>
          </div>
        </div>
        <button
          className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-orange-200/50 hover:shadow-xl hover:-translate-y-1 active:scale-95"
          onClick={() => onViewRecipe && onViewRecipe(recipe)}
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;