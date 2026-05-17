import React, { useState, useMemo, useEffect } from "react";
import FilterBar from "../components/FilterBar.jsx";
import RecipeGrid from "../components/RecipeGrid.jsx";
import { RefreshCw } from "lucide-react";
import RecipeModel from "../components/RecipeModel.jsx";
import { useRecipes } from "../hooks/useRecipes.js";
import { transformRecipe } from "../Services/recipeApi";

function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrepTime, setMaxPrepTime] = useState("Any");
  const [maxCookTime, setMaxCookTime] = useState("Any");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const {
    recipes,
    loading,
    error,
    fetchRandomRecipes,
    searchRecipes,
    fetchRecipeByCategory,
    getCategories,
    refetch,
  } = useRecipes();

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.trim()) {
      await searchRecipes(term);
    } else {
      await refetch();
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchByCategory = async () => {
      try {
        const isAll = !selectedCategory || selectedCategory === "All";
        const endpoint = isAll
          ? `https://www.themealdb.com/api/json/v1/1/search.php?s=`
          : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
              selectedCategory
            )}`;
        const res = await fetch(endpoint);
        const data = await res.json();
        const meals = data.meals || [];
        const transformed = meals.map(transformRecipe).filter(Boolean);
        setFetchedRecipes(transformed);
      } catch (err) {
        setFetchedRecipes([]);
      }
    };

    fetchByCategory();
  }, [selectedCategory]);

  const handlePrepTimeChange = (value) => {
    setMaxPrepTime(value);
  };

  const handleCookTimeChange = (value) => {
    setMaxCookTime(value);
  };

  const handleViewRecipe = async (recipe) => {
    try {
      const hasDetails = recipe && (recipe.instructions?.length || recipe.ingredients?.length);
      if (!hasDetails) {
        const id = recipe.idMeal || recipe.id;
        if (id) {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await res.json();
          const detailed = data.meals ? data.meals[0] : null;
          const transformed = transformRecipe(detailed) || recipe;
          setSelectedRecipe(transformed);
          setIsModelOpen(true);
          return;
        }
      }

      setSelectedRecipe(recipe);
      setIsModelOpen(true);
    } catch (err) {
      setSelectedRecipe(recipe);
      setIsModelOpen(true);
    }
  };

  const handleCloseModel = () => {
    setIsModelOpen(false);
    setSelectedRecipe(null);
  };

  const handleToggleFavorite = (recipe) => {
    const recipeId = recipe.id || recipe.idMeal;
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => (fav.id || fav.idMeal) === recipeId)
        ? prevFavorites.filter((fav) => (fav.id || fav.idMeal) !== recipeId)
        : [...prevFavorites, recipe]
    );
  };

  const filteredRecipes = useMemo(() => {
    const source = selectedCategory ? fetchedRecipes : recipes;
    return source.filter((recipe) => {
      const matchesPrepTime = maxPrepTime === "Any" || (recipe.prepTime <= parseInt(maxPrepTime));
      const matchesCookTime = maxCookTime === "Any" || (recipe.cookTime <= parseInt(maxCookTime));
      return matchesPrepTime && matchesCookTime;
    });
  }, [recipes, fetchedRecipes, selectedCategory, maxPrepTime, maxCookTime]);

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight">
          Explore our{" "}
          <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-orange-500 bg-clip-text text-transparent">
            Simple & Fresh
          </span>{" "}
          Recipes
        </h1>

        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
          Fuel your day with{" "}
          <span className="text-orange-600 font-semibold">
            chef-crafted meals
          </span>{" "}
          that don't demand hours in the kitchen. Join a global community of
          home cooks celebrating{" "}
          <span className="text-green-600 font-semibold">real food</span> and raw
          ingredients.
        </p>

        <div className="w-24 h-1 bg-green-500 mx-auto rounded-full mb-10"></div>

        {error && (
          <div className="mt-8 p-8 bg-red-50 border border-red-200 rounded-2xl inline-block">
            <p className="text-red-600 font-bold">Error</p>
            <button
              onClick={refetch}
              className="mt-4 inline-flex items-center px-6 py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-all duration-300 font-semibold"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </button>
          </div>
        )}
      </div>

     
      <div className="py-6">
        <div className="container mx-auto px-4">
          <FilterBar
            categories={categories}
            onCategoryChange={handleCategoryChange}
            onPrepTimeChange={handlePrepTimeChange}
            onCookTimeChange={handleCookTimeChange}
            onSearch={handleSearch}
          />
        </div>
      </div>

    
      <div className="container mx-auto px-4 py-12">
        <RecipeGrid
          recipes={filteredRecipes}
          onViewRecipe={handleViewRecipe}
          onToggleFavorite={handleToggleFavorite}
          favorites={favorites}
          isLoading={loading}
        />
      </div>

     
      {isModelOpen && selectedRecipe && (
        <RecipeModel
          recipe={selectedRecipe}
          onClose={handleCloseModel}
        />
      )}
    </div>
  );
}

export default RecipesPage;