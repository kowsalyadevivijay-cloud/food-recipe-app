const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
};

export const transformRecipe = (apiRecipe) => {
  if (!apiRecipe) return null;

  const ingredientList = [];
  for (let i = 1; i <= 20; i++) {
    const name = apiRecipe[`strIngredient${i}`];
    const measure = apiRecipe[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredientList.push({ name: name.trim(), measure: measure ? measure.trim() : "" });
    }
  }

  const instructions = (apiRecipe.strInstructions || "")
    .split(/\r?\n/)
    .map((step) => step.trim())
    .filter((step) => step && !/^(step\s*)?\d+[.)]?$/i.test(step));

  return {
    id: apiRecipe.idMeal,
    title: apiRecipe.strMeal,
    image: apiRecipe.strMealThumb,
    category: apiRecipe.strCategory || "",
    area: apiRecipe.strArea || "",
    ingredientList,
    instructions,
    youtube: apiRecipe.strYoutube || "",
    source: apiRecipe.strSource || "",
    tags: apiRecipe.strTags ? apiRecipe.strTags.split(",").map((t) => t.trim()).filter(Boolean) : [],
  };
};

export const recipeApi = {
  getAllRecipes: async () => {
    let failed = 0;
    const results = await Promise.all(
      LETTERS.map((letter) =>
        fetchJson(`${API_BASE_URL}/search.php?f=${letter}`).catch(() => {
          failed += 1;
          return { meals: null };
        })
      )
    );
    if (failed === LETTERS.length) throw new Error("Could not reach the recipe service");

    const meals = results.flatMap((r) => (Array.isArray(r.meals) ? r.meals : []));
    const unique = [...new Map(meals.map((m) => [m.idMeal, m])).values()];
    return { recipes: unique.map(transformRecipe).filter(Boolean), complete: failed === 0 };
  },
};
