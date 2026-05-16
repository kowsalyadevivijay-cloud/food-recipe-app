import React from "react";
import RecipeCard from "./RecipeCard";

function RecipeGrid({ recipes, onViewRecipe, isLoading }) {

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div  className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="space-y-3 p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="flex justify-between"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          </div>
        
        );
      }
        
      if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">🍽️</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Fresh Recipes Found</h3>
        <p className="text-gray-600">Try adjusting your search to discover something delicious!</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard 
          recipe={recipe}                 // Pass the recipe data
          onViewRecipe={onViewRecipe}/>          // Pass the click handler/>
      ))}
    </div>
  );
}
export default RecipeGrid;