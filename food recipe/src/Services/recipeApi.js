const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const cache = new Map();

export const recipeApi = {
    // Search recipes by name
    searchByName: async (name) => {
        const cacheKey = `search-${name}`;
        if (cache.has(cacheKey)) return cache.get(cacheKey);

        try {
            const response = await fetch(`${API_BASE_URL}/search.php?s=${name}`);
            const data = await response.json();
            const result = data.meals || [];
            cache.set(cacheKey, result);
            return result;
        } catch (error) {
            console.error("Error searching recipes:", error);
            return [];
        }
    },
    

    // Get random recipes (fetches multiple unique random meals)
    getRandomRecipes: async (count = 8) => {
        const cacheKey = `random-${count}`;
        if (cache.has(cacheKey)) {return cache.get(cacheKey);}

        try {
            // Create an array of fetch promises
            const promises = Array.from({ length: count }, () =>
                fetch(`${API_BASE_URL}/random.php`).then((res) => res.json())
            );

            const results = await Promise.all(promises);
            // Map results to extract the meal object and filter out nulls
            const meals = results
                .map((result) => (result.meals ? result.meals[0] : null))
                .filter(Boolean);

            cache.set(cacheKey, meals);
            return meals;
        } catch (error) {
            console.error("Error fetching random recipes:", error);
            return [];
        }
    },

    // Get recipe details by ID
    getRecipeById: async (id) => {
        const cacheKey = `recipe-${id}`;
        if (cache.has(cacheKey)) return cache.get(cacheKey);

        try {
            const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
            const data = await response.json();
            const result = data.meals ? data.meals[0] : null;
            cache.set(cacheKey, result);
            return result;
        } catch (error) {
            console.error("Error fetching recipe by ID:", error);
            return null;
        }
    },

    // Get all categories
    getCategories: async () => {
        const cacheKey = 'categories';
        if (cache.has(cacheKey)) return cache.get(cacheKey);

        try {
            const response = await fetch(`${API_BASE_URL}/categories.php`);
            const data = await response.json();
            const result = data.categories || [];
            cache.set(cacheKey, result);
            return result;
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }
    },
};

// Transform API recipe to our internal application format
export const transformRecipe = (apiRecipe) => {
    if (!apiRecipe) return null;

    // Extract ingredients and measurements
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = apiRecipe[`strIngredient${i}`];
        const measure = apiRecipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure ? measure.trim() + " " : ""}${ingredient.trim()}`);
        }
    }

    // Split instructions into steps
    const instructions = apiRecipe.strInstructions
        ? apiRecipe.strInstructions.split(/\r?\n/).filter(step => step.trim())
        : [];

    // Estimate prep and cook times
    const estimatedPrepTime = Math.floor(Math.random() * 15) + 5; // 5-20 mins
    const estimatedCookTime = Math.floor(Math.random() * 25) + 10; // 10-35 mins

    // Determine category mapping
    let category = 'dinner';
    const mealCategory = apiRecipe.strCategory?.toLowerCase() || "";
    
    if (mealCategory.includes("breakfast") || mealCategory.includes("dessert")) {
        category = mealCategory.includes("breakfast") ? "breakfast" : "dessert";
    } else if (mealCategory.includes("side") || mealCategory.includes("starter")) {
        category = "lunch";
    }

    return {
        id: apiRecipe.idMeal,
        title: apiRecipe.strMeal,
        description: `Delicious ${apiRecipe.strMeal} from ${
            apiRecipe.strArea || 'international'
        } cuisine.`,
        image: apiRecipe.strMealThumb,
        category,
        cookTime: estimatedCookTime,
        prepTime: estimatedPrepTime,
        servings: Math.floor(Math.random() * 4) + 2, // 2-6 servings
        difficulty: estimatedCookTime > 25 ? "medium" : "easy",
        ingredients,
        instructions,
        tags: [
            apiRecipe.strArea?.toLowerCase(),
            apiRecipe.strCategory?.toLowerCase(),
            "api_recipe",
        ].filter(Boolean),
    };
};