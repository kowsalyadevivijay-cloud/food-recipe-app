import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import IngredientInput from "./IngredientInput";
import { DEFAULT_FILTERS, DIET_OPTIONS } from "../lib/pantry";

const chipClass = (active) =>
  `px-4 py-2 rounded-full border font-semibold transition whitespace-nowrap ${
    active
      ? "bg-primary text-white border-primary"
      : "bg-white text-primary border-emerald-700/40 hover:bg-emerald-50"
  }`;

function CheckList({ options, selected, onChange }) {
  const toggle = (opt) =>
    onChange(selected.includes(opt) ? selected.filter((o) => o !== opt) : [...selected, opt]);
  return (
    <div className="max-h-64 overflow-y-auto space-y-1">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 accent-emerald-600" checked={selected.includes(opt)} onChange={() => toggle(opt)} />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
}

function IngredientTokens({ options, values, onChange, placeholder }) {
  return (
    <div className="space-y-3">
      <IngredientInput
        options={options}
        selected={values}
        placeholder={placeholder}
        onAdd={(name) => !values.includes(name) && onChange([...values, name])}
      />
      <div className="flex flex-wrap gap-2">
        {values.map((name) => (
          <span key={name} className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 pl-3 pr-1 py-1 rounded-lg font-semibold">
            {name}
            <button type="button" aria-label={`Remove ${name}`} onClick={() => onChange(values.filter((v) => v !== name))} className="p-1 hover:bg-emerald-200 rounded">
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

function FilterBar({ filters, onChange, categories, areas, ingredientOptions, hasPantry }) {
  const [openKey, setOpenKey] = useState(null);
  const barRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => barRef.current && !barRef.current.contains(e.target) && setOpenKey(null);
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const set = (patch) => onChange({ ...filters, ...patch });
  const anyActive = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  const popoverChip = (key, label, count, content) => (
    <div className="relative" key={key}>
      <button type="button" className={chipClass(count > 0)} onClick={() => setOpenKey(openKey === key ? null : key)} aria-expanded={openKey === key}>
        {label}
        {count > 0 && ` · ${count}`}
      </button>
      {openKey === key && (
        <div className="absolute z-30 left-0 mt-2 w-72 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-100 p-4">{content}</div>
      )}
    </div>
  );

  return (
    <div ref={barRef} className="flex flex-wrap gap-3 items-center">
      {hasPantry && (
        <button type="button" className={chipClass(filters.canMakeOnly)} onClick={() => set({ canMakeOnly: !filters.canMakeOnly, missingOne: false })}>
          Can make now
        </button>
      )}

      {popoverChip(
        "key", "Key Ingredient(s)", filters.keyIngredients.length,
        <IngredientTokens options={ingredientOptions} values={filters.keyIngredients} onChange={(v) => set({ keyIngredients: v })} placeholder="Must contain..." />
      )}
      {popoverChip(
        "exclude", "Exclude", filters.excluded.length,
        <IngredientTokens options={ingredientOptions} values={filters.excluded} onChange={(v) => set({ excluded: v })} placeholder="Must not contain..." />
      )}
      {popoverChip("meal", "Meal type", filters.categories.length, <CheckList options={categories} selected={filters.categories} onChange={(v) => set({ categories: v })} />)}

      {hasPantry && (
        <button type="button" className={chipClass(filters.missingOne)} onClick={() => set({ missingOne: !filters.missingOne, canMakeOnly: false })}>
          Missing one ingredient
        </button>
      )}

      <button type="button" className={chipClass(filters.videoOnly)} onClick={() => set({ videoOnly: !filters.videoOnly })}>
        Video only
      </button>

      {popoverChip("cuisine", "Cuisines", filters.areas.length, <CheckList options={areas} selected={filters.areas} onChange={(v) => set({ areas: v })} />)}
      {popoverChip("diet", "Diet", filters.diets.length, (
        <div>
          <CheckList options={DIET_OPTIONS} selected={filters.diets} onChange={(v) => set({ diets: v })} />
          <p className="text-xs text-gray-500 mt-2 px-2">Approximate, based on the listed ingredients.</p>
        </div>
      ))}
      {popoverChip("max", "Max Ingredients", filters.maxIngredients ? 1 : 0, (
        <div>
          <label htmlFor="max-ingredients" className="block font-semibold mb-3">
            {filters.maxIngredients ? `Up to ${filters.maxIngredients} ingredients` : "Any number of ingredients"}
          </label>
          <input
            id="max-ingredients"
            type="range"
            min="0"
            max="20"
            value={filters.maxIngredients}
            onChange={(e) => set({ maxIngredients: Number(e.target.value) })}
            className="w-full accent-emerald-600"
          />
          <p className="text-xs text-gray-500 mt-1">Move to 0 for any. Salt, pepper and water are not counted.</p>
        </div>
      ))}

      {anyActive && (
        <button type="button" onClick={() => onChange(DEFAULT_FILTERS)} className="text-sm font-semibold text-orange-600 hover:underline">
          Clear filters
        </button>
      )}
    </div>
  );
}

export default FilterBar;
