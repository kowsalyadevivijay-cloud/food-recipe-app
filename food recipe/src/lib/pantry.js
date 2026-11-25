
export const ASSUMED = new Set([
  "salt", "sea salt", "pepper", "black pepper", "ground black pepper", "white pepper",
  "water", "cold water", "hot water", "warm water", "boiling water", "ice water",
]);

export const DEFAULT_FILTERS = {
  keyIngredients: [],
  excluded: [],
  categories: [],
  areas: [],
  diets: [],
  videoOnly: false,
  missingOne: false,
  canMakeOnly: false,
  maxIngredients: 0,
};

export const DIET_OPTIONS = ["Vegetarian", "Vegan"];

export const normalize = (name = "") => {
  const words = String(name).toLowerCase().replace(/[^a-z\s]/g, " ").trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "";
  let last = words[words.length - 1];
  if (last.length > 3) {
    if (last.endsWith("ies")) last = last.slice(0, -3) + "y";
    else if (last.endsWith("oes")) last = last.slice(0, -2);
    else if (last.endsWith("s") && !last.endsWith("ss") && !last.endsWith("us")) last = last.slice(0, -1);
  }
  words[words.length - 1] = last;
  return words.join(" ");
};

export const isAssumed = (name) => ASSUMED.has(normalize(name));

const nameMatches = (recipeIngredient, wanted) => recipeIngredient === wanted || recipeIngredient.startsWith(wanted + " ");

export const matchesPantry = (ingredientName, pantryNorm) => {
  const n = normalize(ingredientName);
  return pantryNorm.some((p) => p && nameMatches(n, p));
};

export const ingredientStatus = (name, pantryNorm) => {
  if (isAssumed(name)) return "assumed";
  return matchesPantry(name, pantryNorm) ? "have" : "missing";
};

export const analyzeRecipe = (recipe, pantryNorm) => {
  const have = [];
  const missing = [];
  (recipe.ingredientList || []).forEach(({ name }) => {
    const status = ingredientStatus(name, pantryNorm);
    if (status === "have") have.push(name);
    else if (status === "missing") missing.push(name);
  });
  return { have, missing, total: have.length + missing.length };
};

const MEAT_CATEGORIES = ["Beef", "Chicken", "Lamb", "Pork", "Seafood", "Goat"];
const MEAT_WORDS = [
  "chicken", "beef", "pork", "lamb", "mutton", "bacon", "sausage", "ham", "turkey", "duck", "goat",
  "veal", "fish", "salmon", "tuna", "cod", "prawn", "shrimp", "anchovy", "anchovies", "mackerel",
  "squid", "crab", "lobster", "mussel", "clam", "oyster", "haddock", "trout", "sardine", "gelatine",
  "gelatin", "lard", "steak", "mince", "chorizo", "salami", "pancetta", "prosciutto",
];
const NON_VEGAN_WORDS = ["milk", "cheese", "butter", "egg", "cream", "yogurt", "yoghurt", "honey", "ghee", "paneer", "mayonnaise"];
const PLANT_BASED = /coconut|almond|soy|oat|peanut|cocoa|cashew|rice milk/;

const hasWord = (text, words) => words.some((w) => new RegExp(`\\b${w}s?\\b`).test(text));

export const isVegetarian = (recipe) =>
  !MEAT_CATEGORIES.includes(recipe.category) &&
  !(recipe.ingredientList || []).some((i) => hasWord(i.name.toLowerCase(), MEAT_WORDS));

export const isVegan = (recipe) =>
  recipe.category === "Vegan" ||
  (isVegetarian(recipe) &&
    !(recipe.ingredientList || []).some((i) => {
      const n = i.name.toLowerCase();
      return !PLANT_BASED.test(n) && hasWord(n, NON_VEGAN_WORDS);
    }));

const matchesDiet = (recipe, diet) => (diet === "Vegan" ? isVegan(recipe) : diet === "Vegetarian" ? isVegetarian(recipe) : true);

export const collectIngredientNames = (recipes) => {
  const seen = new Map();
  recipes.forEach((r) =>
    (r.ingredientList || []).forEach(({ name }) => {
      const key = normalize(name);
      if (key && !isAssumed(name) && !seen.has(key)) seen.set(key, name);
    })
  );
  return [...seen.values()].sort((a, b) => a.localeCompare(b));
};

export const uniqueSorted = (recipes, field) =>
  [...new Set(recipes.map((r) => r[field]).filter(Boolean))].sort((a, b) => a.localeCompare(b));

export const filterAndRank = (recipes, { pantry = [], search = "", filters = DEFAULT_FILTERS } = {}) => {
  const f = { ...DEFAULT_FILTERS, ...filters };
  const pantryNorm = pantry.map(normalize).filter(Boolean);
  const hasPantry = pantryNorm.length > 0;
  const term = search.trim().toLowerCase();
  const keyNorm = f.keyIngredients.map(normalize);
  const excludedNorm = f.excluded.map(normalize);

  const base = [];
  for (const recipe of recipes) {
    const list = recipe.ingredientList || [];
    if (term) {
      const inText =
        recipe.title.toLowerCase().includes(term) ||
        (recipe.category || "").toLowerCase().includes(term) ||
        (recipe.area || "").toLowerCase().includes(term) ||
        list.some((i) => i.name.toLowerCase().includes(term));
      if (!inText) continue;
    }
    if (f.categories.length && !f.categories.includes(recipe.category)) continue;
    if (f.areas.length && !f.areas.includes(recipe.area)) continue;
    if (f.videoOnly && !recipe.youtube) continue;

    const names = list.map((i) => normalize(i.name));
    if (keyNorm.length && !keyNorm.every((k) => names.some((n) => nameMatches(n, k)))) continue;
    if (excludedNorm.length && excludedNorm.some((k) => names.some((n) => nameMatches(n, k)))) continue;
    if (f.maxIngredients && list.filter((i) => !isAssumed(i.name)).length > f.maxIngredients) continue;
    if (f.diets.length && !f.diets.every((d) => matchesDiet(recipe, d))) continue;

    base.push({ recipe, ...analyzeRecipe(recipe, pantryNorm) });
  }

  const canMakeCount = hasPantry ? base.filter((r) => r.missing.length === 0).length : 0;
  const oneMissingCount = hasPantry ? base.filter((r) => r.missing.length === 1).length : 0;

  const score = new Map();
  base.forEach((row) => {
    const weight = hasPantry ? (row.missing.length === 1 ? 3 : row.missing.length === 2 ? 1 : 0) : 1;
    if (!weight) return;
    (hasPantry ? row.missing : [...row.have, ...row.missing]).forEach((name) => {
      const key = normalize(name);
      const entry = score.get(key) || { name, score: 0 };
      entry.score += weight;
      score.set(key, entry);
    });
  });
  const suggestions = [...score.values()].sort((a, b) => b.score - a.score).slice(0, 10).map((s) => s.name);

  let rows = base;
  if (f.canMakeOnly && hasPantry) rows = rows.filter((r) => r.missing.length === 0);
  if (f.missingOne && hasPantry) rows = rows.filter((r) => r.missing.length === 1);

  rows = [...rows].sort((a, b) =>
    hasPantry
      ? a.missing.length - b.missing.length || b.have.length - a.have.length || a.recipe.title.localeCompare(b.recipe.title)
      : a.recipe.title.localeCompare(b.recipe.title)
  );

  return { rows, canMakeCount, oneMissingCount, suggestions };
};
