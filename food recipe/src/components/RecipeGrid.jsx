import React, { useEffect, useState } from "react";
import { ChevronDown, ChefHat } from "lucide-react";
import RecipeCard from "./RecipeCard";

const PAGE_SIZE = 24;

function RecipeGrid({
  rows,
  loading,
  hasPantry,
  isFavorite,
  onToggleFavorite,
  onView,
  emptyTitle,
  emptyMessage,
}) {
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setLimit(PAGE_SIZE);
    setRevealed(false);
    const frameId = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(frameId);
  }, [rows]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex min-h-[164px] overflow-hidden rounded-2xl border border-stone-200/70 bg-white shadow-2xs"
          >
            <div className="relative w-36 shrink-0 overflow-hidden bg-stone-100 sm:w-48">
              <div className="h-full w-full animate-pulse bg-gradient-to-r from-stone-100 via-stone-200/80 to-stone-100" />
            </div>
            <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
              <div className="space-y-2.5">
                <div className="h-5 w-3/4 animate-pulse rounded-lg bg-stone-200/80" />
                <div className="h-3.5 w-1/3 animate-pulse rounded-md bg-stone-100" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-2 w-full animate-pulse rounded-full bg-stone-100" />
                <div className="h-3.5 w-1/2 animate-pulse rounded-md bg-stone-200/70" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="mx-auto my-6 max-w-md rounded-3xl border border-amber-100/90 bg-gradient-to-br from-emerald-50/70 via-white to-orange-50/70 px-6 py-14 text-center shadow-2xs">
        <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center">
          <div className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-tr from-emerald-300/40 to-orange-300/40 blur-lg animate-pulse" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-200/80 bg-white text-emerald-600 shadow-sm">
            <ChefHat className="h-9 w-9" />
          </div>
        </div>
        <h3 className="mb-2 text-xl font-extrabold text-slate-900">{emptyTitle}</h3>
        <p className="text-sm font-medium leading-relaxed text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  const visibleRows = rows.slice(0, limit);
  const remaining = rows.length - limit;

  return (
    <>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {visibleRows.map((row, index) => {
          const staggerDelay = Math.min(index % PAGE_SIZE, 11) * 45;

          return (
            <div
              key={row.recipe.id}
              className={`transition-all duration-500 ease-out ${
                revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: `${staggerDelay}ms` }}
            >
              <RecipeCard
                row={row}
                hasPantry={hasPantry}
                isFavorite={isFavorite(row.recipe.id)}
                onToggleFavorite={onToggleFavorite}
                onView={onView}
              />
            </div>
          );
        })}
      </div>

      {remaining > 0 && (
        <div className="mt-10 flex flex-col items-center gap-2 text-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE_SIZE)}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 px-8 py-3.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(16,185,129,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:from-emerald-500 hover:to-teal-500 hover:shadow-[0_12px_28px_rgba(16,185,129,0.45)] active:translate-y-0"
          >
            <span className="relative z-10">
              Show more ({remaining} {remaining === 1 ? "recipe" : "recipes"} left)
            </span>
            <ChevronDown className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full"
            />
          </button>
          <span className="text-xs font-medium text-slate-400">
            Showing {visibleRows.length} of {rows.length} recipes
          </span>
        </div>
      )}
    </>
  );
}

export default RecipeGrid;