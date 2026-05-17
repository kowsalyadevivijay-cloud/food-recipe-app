const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const cache = new Map();

export const recipeApi = {
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
            return [];
        }
    },
    getRandomRecipes: async (count = 8) => {
        const cacheKey = `random-${count}`;
        if (cache.has(cacheKey)) {return cache.get(cacheKey);}

        try {
            const promises = Array.from({ length: count }, () =>
                fetch(`${API_BASE_URL}/random.php`).then((res) => res.json())
            );

            const results = await Promise.all(promises);
            const meals = results
                .map((result) => (result.meals ? result.meals[0] : null))
                .filter(Boolean);

            cache.set(cacheKey, meals);
            return meals;
        } catch (error) {
            return [];
        }
    },

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
            return null;
        }
    },

   
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
            return [];
        }
    },
};


export const transformRecipe = (apiRecipe) => {
    if (!apiRecipe) return null;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = apiRecipe[`strIngredient${i}`];
        const measure = apiRecipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure ? measure.trim() + " " : ""}${ingredient.trim()}`);
        }
    }

    const instructions = apiRecipe.strInstructions
        ? apiRecipe.strInstructions.split(/\r?\n/).filter(step => step.trim())
        : [];

    const estimatedPrepTime = Math.floor(Math.random() * 15) + 5;
    const estimatedCookTime = Math.floor(Math.random() * 25) + 10;

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
        servings: Math.floor(Math.random() * 4) + 2,
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