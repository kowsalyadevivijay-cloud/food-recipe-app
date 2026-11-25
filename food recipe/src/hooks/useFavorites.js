import { useLocalStorage } from "./useLocalStorage";

export const useFavorites = () => {
  const [stored, setStored] = useLocalStorage("recipe-app-favorites", []);
  const favorites = Array.isArray(stored) ? stored : [];

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  const toggleFavorite = (recipe) =>
    setStored((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      return list.some((fav) => fav.id === recipe.id)
        ? list.filter((fav) => fav.id !== recipe.id)
        : [...list, recipe];
    });

  return { favorites, isFavorite, toggleFavorite };
};
