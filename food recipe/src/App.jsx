import React, { useState } from "react";
import RecipeGrid from "./components/RecipeGrid";
import RecipeModel from "./components/RecipeModel";

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample recipe data
  const recipes = [
    {
      id: 1,
      name: "Garden Fresh Pesto Pasta",
      description: "A vibrant, aromatic dish featuring hand-crushed basil, toasted pine nuts, and aged parmesan cheese.",
      image: "https://via.placeholder.com/400x300",
      prepTime: "15 Min",
      cookTime: "10 Min",
      servings: "4",
      ingredients: ["500g Penne Pasta", "2 cups Fresh Basil", "3 cloves Garlic", "1/2 cup Parmesan", "Extra Virgin Olive Oil"],
      instructions: [
        "Toast the pine nuts in a dry pan over medium heat for 2-3 minutes until fragrant.",
        "Pulse basil, garlic, and pine nuts in a food processor until coarsely chopped.",
        "Add parmesan and pulse again, then slowly drizzle in olive oil while pulsing."
      ],
      tags: ["Italian", "Vegetarian", "Quick Lunch"]
    },
    {
      id: 2,
      name: "Grilled Lemon Chicken",
      description: "Juicy, tender chicken breasts marinated in fresh lemon juice and herbs.",
      image: "https://via.placeholder.com/400x300",
      prepTime: "20 Min",
      cookTime: "15 Min",
      servings: "4",
      ingredients: ["4 Chicken Breasts", "3 Lemons", "4 cloves Garlic", "Olive Oil", "Fresh Rosemary"],
      instructions: [
        "Mix lemon juice, garlic, and herbs for the marinade.",
        "Coat chicken and marinate for at least 30 minutes.",
        "Grill over medium-high heat for 6-8 minutes per side."
      ],
      tags: ["Grilled", "Protein", "Healthy"]
    }
  ];

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-emerald-900 text-white p-6">
        <h1 className="text-4xl font-bold">🍽️ Recipe App</h1>
      </header>

      <main className="p-8">
        <RecipeGrid 
          recipes={recipes} 
          onViewRecipe={handleViewRecipe}
          isLoading={false}
        />
      </main>

      {/* Modal - Only render when open */}
      {isModalOpen && selectedRecipe && (
        <RecipeModel 
          recipe={selectedRecipe} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;

