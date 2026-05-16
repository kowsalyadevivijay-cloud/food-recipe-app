import { useEffect, useState} from "react";
import { recipeApi, transformRecipe } from "../Services/recipeApi";

export const useRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRandomRecipes = async () => {
        try{
            setLoading(true);
            setError(null);
            const apiRecipes = await recipeApi.getRandomRecipes(8);
            const transformedRecipes = apiRecipes.map(transformRecipe).filter(Boolean);
            setRecipes(transformedRecipes);
        }catch (error) {
            setError("Failed to fetch recipes")
            console.error("Error fetching recipes:", error)
        } finally {
            setLoading(false)
        }
    };
    const searchRecipes = async (searchTerm) => {
       if (!searchTerm.trim()) {
        await fetchRandomRecipes();
        return;
       }
    try{  
        setLoading(true);
        setError(null);
        const apiRecipes = await recipeApi.searchByName(searchTerm);
        const transformedRecipes = apiRecipes.map(transformRecipe).filter(Boolean);
        setRecipes(transformedRecipes);
    }
    catch (error) {
        setError("Failed to fetch recipes");
        console.error("Error fetching recipes:", error);
    } finally {
        setLoading(false);
    }
};
const fetchRecipeByCategory = async (category) => {
    try {
        setLoading(true);
        setError(null);
        const apiRecipes = await recipeApi.getCategories(category);
        const detailedRecipes = await Promise.all(apiRecipes.slice(0,8).map(async(recipe) => {
            const detailed = await recipeApi.getRecipeById(recipe.idMeal);
            return  transformRecipe(detailed);
        })
        );
        setRecipes(detailedRecipes.filter(Boolean));
    } catch (error) {
        setError("Failed to fetch recipes ");
        console.error("Error fetching recipes :", error);
    } finally{
        setLoading(false);
    }
};
const getCategories = async () => {
    try {
        const categories = await recipeApi.getCategories();
        return categories.map(cat => cat.strCategory);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};
useEffect(() => {
    fetchRandomRecipes();
},[]);
return {
    recipes,
     loading, 
     error,
     searchRecipes, 
     fetchRecipeByCategory,
     getCategories,
     refetch: fetchRandomRecipes,
    };
};