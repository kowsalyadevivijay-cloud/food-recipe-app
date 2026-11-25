import { useEffect, useState } from "react";
import { recipeApi } from "../Services/recipeApi";

const CACHE_KEY = "recipe-app-catalog-v1";
const MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const readCache = () => {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY));
    return cache && Array.isArray(cache.recipes) && cache.recipes.length ? cache : null;
  } catch {
    return null;
  }
};

export const useRecipes = () => {
  const [cache] = useState(readCache);
  const [recipes, setRecipes] = useState(cache ? cache.recipes : []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const fresh = cache && Date.now() - cache.savedAt < MAX_AGE && reloadKey === 0;
    if (fresh) return;

    let cancelled = false;
    const load = async () => {
      if (reloadKey > 0) setLoading(true);
      setError(null);
      try {
        const { recipes: list, complete } = await recipeApi.getAllRecipes();
        if (cancelled) return;
        setRecipes(list);
        if (complete) {
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), recipes: list }));
          } catch {
          }
        }
      } catch {
        if (!cancelled && !cache) setError("Could not load recipes. Please check your internet connection and try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [cache, reloadKey]);

  return { recipes, loading, error, refetch: () => setReloadKey((k) => k + 1) };
};
