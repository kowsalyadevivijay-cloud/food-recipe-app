import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Heart,
  RefreshCw,
  Search,
  Sparkles,
  Plus,
  X,
  SlidersHorizontal,
  UtensilsCrossed,
} from "lucide-react";
import IngredientInput from "../components/IngredientInput.jsx";
import PantryPanel from "../components/PantryPanel.jsx";
import FilterBar from "../components/FilterBar.jsx";
import RecipeGrid from "../components/RecipeGrid.jsx";
import RecipeModel from "../components/RecipeModel.jsx";
import { useRecipes } from "../hooks/useRecipes.js";
import { useFavorites } from "../hooks/useFavorites.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import {
  DEFAULT_FILTERS,
  collectIngredientNames,
  filterAndRank,
  normalize,
  uniqueSorted,
} from "../lib/pantry.js";

function RecipesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const showFavorites = searchParams.get("view") === "favorites";

  const { recipes: catalog, loading, error, refetch } = useRecipes();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const [storedPantry, setPantry] = useLocalStorage("recipe-app-pantry", []);
  const [storedFilters, setFilters] = useLocalStorage("recipe-app-filters", DEFAULT_FILTERS);

  const pantry = useMemo(
    () => (Array.isArray(storedPantry) ? storedPantry : []),
    [storedPantry]
  );
  const filters = useMemo(
    () => ({ ...DEFAULT_FILTERS, ...(storedFilters || {}) }),
    [storedFilters]
  );

  const [search, setSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [pantryOpen, setPantryOpen] = useState(false);

  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(toastTimer.current);
  }, []);

  const hideToast = () => {
    clearTimeout(toastTimer.current);
    setToast((prev) => (prev ? { ...prev, visible: false } : prev));
  };

  const showToast = (recipe, type) => {
    clearTimeout(toastTimer.current);
    setToast({ recipe, type, visible: true });
    toastTimer.current = setTimeout(hideToast, 4000);
  };

  const handleToggleFavorite = (recipe) => {
    const wasFavorite = isFavorite(recipe.id);
    toggleFavorite(recipe);
    showToast(recipe, wasFavorite ? "removed" : "added");
  };

  const handleUndo = () => {
    if (!toast) return;
    toggleFavorite(toast.recipe);
    hideToast();
  };

  const ingredientOptions = useMemo(() => collectIngredientNames(catalog), [catalog]);
  const categories = useMemo(() => uniqueSorted(catalog, "category"), [catalog]);
  const areas = useMemo(() => uniqueSorted(catalog, "area"), [catalog]);

  const addIngredient = (name) =>
    setPantry((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      return list.some((p) => normalize(p) === normalize(name)) ? list : [...list, name];
    });

  const removeIngredient = (name) =>
    setPantry((prev) =>
      (Array.isArray(prev) ? prev : []).filter((p) => normalize(p) !== normalize(name))
    );

  const toggleIngredient = (name) =>
    pantry.some((p) => normalize(p) === normalize(name))
      ? removeIngredient(name)
      : addIngredient(name);

  const source = showFavorites ? favorites : catalog;
  const { rows, canMakeCount, oneMissingCount, suggestions } = useMemo(
    () => filterAndRank(source, { pantry, search, filters }),
    [source, pantry, search, filters]
  );

  const hasPantry = pantry.length > 0;

  const setView = (view) => {
    const next = new URLSearchParams(searchParams);
    if (view === "favorites") next.set("view", "favorites");
    else next.delete("view");
    setSearchParams(next);
  };

  const resetAllFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setSearch("");
  };

  let heading;
  let subheading = "";
  if (showFavorites) {
    heading =
      favorites.length > 0 && rows.length !== favorites.length
        ? `Showing ${rows.length} of ${favorites.length} favorites`
        : `Your Favorites (${rows.length})`;
    subheading =
      favorites.length > 0 && rows.length === 0
        ? "Your saved recipes are hidden by active filters."
        : "Your personal collection of saved dishes.";
  } else if (hasPantry) {
    heading = `You can make ${canMakeCount} recipe${canMakeCount === 1 ? "" : "s"}`;
    subheading = oneMissingCount
      ? `${oneMissingCount} more need just one extra ingredient`
      : "Sorted by best ingredient match from your pantry.";
  } else {
    heading = `${rows.length} recipes to explore`;
    subheading = "Tap ingredients on the left to unlock dishes you can cook right now.";
  }

  const isRemovedToast = toast?.type === "removed";

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800">
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2922] via-[#163d32] to-[#112e26] p-6 text-white shadow-[0_18px_45px_rgba(15,41,34,0.18)] sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl animate-pulse"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-orange-400/15 blur-3xl animate-pulse"
          />

          <div className="relative z-10 grid items-end gap-6 lg:grid-cols-[380px_1fr] lg:gap-8">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Pantry</h1>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-200">
                  {pantry.length} item{pantry.length === 1 ? "" : "s"}
                </span>
              </div>
              <p className="mb-4 text-sm text-emerald-100/75">
                {hasPantry
                  ? `Matching recipes with your ${pantry.length} ingredient${pantry.length === 1 ? "" : "s"}`
                  : "Add what's in your kitchen"}
              </p>
              <IngredientInput
                id="pantry-input"
                options={ingredientOptions}
                selected={pantry}
                onAdd={addIngredient}
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Recipe Finder
                </h2>
                <span className="hidden items-center gap-1.5 text-xs font-medium text-emerald-200/80 sm:inline-flex">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  Instant Smart Match
                </span>
              </div>
              <p className="mb-4 text-sm text-emerald-100/75">
                {showFavorites
                  ? "Search across your saved favorites"
                  : hasPantry
                  ? `You can make ${canMakeCount} recipe${canMakeCount === 1 ? "" : "s"} right now`
                  : "Search by dish name, ingredient, category, or cuisine"}
              </p>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  placeholder="Find pasta, avocado toast, spicy curry..."
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-white/15 bg-white py-3.5 pl-12 pr-11 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-md outline-none transition-all duration-200 focus:ring-4 focus:ring-emerald-400/30 sm:py-4 sm:text-base"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-3.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[380px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1">
          <button
            type="button"
            onClick={() => setPantryOpen((o) => !o)}
            className="mb-4 flex w-full items-center justify-between rounded-2xl border border-stone-200/80 bg-white px-5 py-3.5 text-sm font-bold text-slate-800 shadow-xs transition hover:border-emerald-300 lg:hidden"
          >
            <span className="flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4 text-emerald-600" />
              {pantryOpen ? "Hide My Pantry" : "Open My Pantry"}
            </span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-extrabold text-emerald-800">
              {pantry.length}
            </span>
          </button>

          <div className={`${pantryOpen ? "block" : "hidden"} lg:block`}>
            <PantryPanel
              pantry={pantry}
              onToggle={toggleIngredient}
              onRemove={removeIngredient}
              onClear={() => setPantry([])}
            />
          </div>
        </aside>

        <main className="min-w-0">
          <div className="mb-7 rounded-3xl border border-stone-200/80 bg-white p-4 shadow-2xs sm:p-5">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <SlidersHorizontal className="h-3.5 w-3.5 text-emerald-600" />
              <span>Filter &amp; Refine</span>
            </div>
            <FilterBar
              filters={filters}
              onChange={setFilters}
              categories={categories}
              areas={areas}
              ingredientOptions={ingredientOptions}
              hasPantry={hasPantry}
            />
          </div>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {heading}
              </h2>
              {subheading && (
                <p className="mt-1 text-sm font-medium text-slate-500 sm:text-base">
                  {subheading}
                </p>
              )}
            </div>

            <div className="inline-flex rounded-full border border-stone-200/90 bg-white p-1.5 shadow-2xs">
              <button
                type="button"
                onClick={() => setView("all")}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 ${
                  !showFavorites
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Recipes
              </button>
              <button
                type="button"
                onClick={() => setView("favorites")}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 ${
                  showFavorites
                    ? "bg-gradient-to-r from-[#0f2922] to-[#1a4337] text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Heart
                  size={16}
                  className={showFavorites ? "fill-rose-400 text-rose-400" : "fill-rose-500 text-rose-500"}
                />
                <span>Favorites ({favorites.length})</span>
              </button>
            </div>
          </div>

          {showFavorites && favorites.length > 0 && rows.length === 0 && (
            <div className="my-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/80 px-5 py-3.5 text-sm">
              <span className="font-medium text-amber-900">
                None of your {favorites.length} favorite{favorites.length === 1 ? "" : "s"} match the
                current filter selection.
              </span>
              <button
                type="button"
                onClick={resetAllFilters}
                className="rounded-xl bg-white px-4 py-1.5 text-xs font-bold text-orange-600 shadow-2xs transition hover:bg-orange-50"
              >
                Reset Filters
              </button>
            </div>
          )}

          {!showFavorites && suggestions.length > 0 && !loading && (
            <div className="my-6 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50/80 via-white to-orange-50/60 p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-orange-500" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                  Do you also have?
                </h3>
                <span className="text-xs font-medium text-slate-500">
                  (Unlocks more dishes)
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => addIngredient(name)}
                    className="group inline-flex items-center gap-1.5 rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    <Plus className="h-3.5 w-3.5 text-emerald-600 transition-transform duration-200 group-hover:rotate-90" />
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && !showFavorites && (
            <div className="my-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-red-200 bg-red-50/90 p-6 sm:flex-row sm:items-center">
              <div>
                <p className="font-extrabold text-red-700">Unable to load recipes</p>
                <p className="mt-0.5 text-sm text-red-600">{error}</p>
              </div>
              <button
                type="button"
                onClick={refetch}
                className="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </button>
            </div>
          )}

          <div className="mt-6">
            {loading && !showFavorites && (
              <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-800">
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-600" />
                <span>Preparing fresh recipes...</span>
              </div>
            )}

            <RecipeGrid
              rows={rows}
              loading={loading && !showFavorites}
              hasPantry={hasPantry}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              onView={setSelectedRecipe}
              emptyTitle={
                showFavorites && favorites.length === 0
                  ? "No Favorites Yet"
                  : "No Recipes Found"
              }
              emptyMessage={
                showFavorites && favorites.length === 0
                  ? "Tap the heart on any recipe to save it here. Your favorites stay saved in this browser."
                  : "Try removing a filter, or add a few more ingredients to your pantry."
              }
            />
          </div>
        </main>
      </div>

      {selectedRecipe && (
        <RecipeModel
          key={selectedRecipe.id}
          recipe={selectedRecipe}
          pantry={pantry}
          onClose={() => setSelectedRecipe(null)}
          isFavorite={isFavorite(selectedRecipe.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 transition-all duration-300 ${
          toast?.visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        {toast && (
          <div className="flex items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-[#0f2922] px-4 py-3 text-white shadow-2xl">
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                isRemovedToast ? "bg-white/10" : "bg-rose-500/20"
              }`}
            >
              <Heart
                size={18}
                className={isRemovedToast ? "text-rose-300" : "fill-rose-400 text-rose-400"}
              />
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">
                {isRemovedToast ? "Removed from favorites" : "Added to favorites"}
              </p>
              <p className="truncate text-xs text-emerald-100/70">{toast.recipe.title}</p>
            </div>

            <button
              type="button"
              onClick={handleUndo}
              className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-amber-300 transition hover:bg-white/20"
            >
              Undo
            </button>

            <button
              type="button"
              onClick={hideToast}
              aria-label="Close"
              className="rounded-full p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipesPage;