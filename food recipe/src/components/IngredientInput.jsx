import React, { useMemo, useState } from "react";
import { Search, Plus, X, Check } from "lucide-react";
import { normalize } from "../lib/pantry";

function IngredientInput({
  options = [],
  selected = [],
  onAdd,
  placeholder = "Add or paste ingredients (e.g., egg, milk, flour)...",
  id,
}) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [pastedCount, setPastedCount] = useState(0);

  const suggestions = useMemo(() => {
    const term = value.trim().toLowerCase();
    if (!term) return [];
    const taken = new Set(selected.map(normalize));
    const free = options.filter((name) => !taken.has(normalize(name)));
    const starts = free.filter((n) => n.toLowerCase().startsWith(term));
    const contains = free.filter(
      (n) => !n.toLowerCase().startsWith(term) && n.toLowerCase().includes(term)
    );
    return [...starts, ...contains].slice(0, 8);
  }, [value, options, selected]);

  const formatTitleCase = (text) =>
    text
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const addText = (text) => {
    const clean = text.trim();
    if (!clean) return false;
    const exact = options.find((o) => o.toLowerCase() === clean.toLowerCase());
    onAdd(exact || formatTitleCase(clean));
    return true;
  };

  const submit = () => {
    if (suggestions.length) {
      onAdd(suggestions[Math.min(highlight, suggestions.length - 1)]);
    } else {
      addText(value);
    }
    setValue("");
    setHighlight(0);
  };

  const renderHighlightedMatch = (name, query) => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return name;
    const idx = name.toLowerCase().indexOf(cleanQuery.toLowerCase());
    if (idx === -1) return name;

    const before = name.slice(0, idx);
    const match = name.slice(idx, idx + cleanQuery.length);
    const after = name.slice(idx + cleanQuery.length);

    return (
      <>
        {before}
        <span className="font-extrabold text-emerald-700 underline decoration-emerald-300 decoration-2 underline-offset-2">
          {match}
        </span>
        {after}
      </>
    );
  };

  const activeIndex = Math.min(highlight, Math.max(suggestions.length - 1, 0));

  return (
    <div className="relative">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          id={id}
          type="text"
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={open && suggestions.length > 0}
          aria-autocomplete="list"
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
            setHighlight(0);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onPaste={(e) => {
            const text = e.clipboardData.getData("text");
            if (/[,\n]/.test(text)) {
              e.preventDefault();
              let added = 0;
              text.split(/[,\n]/).forEach((item) => {
                if (addText(item)) added += 1;
              });
              setValue("");
              setOpen(false);
              if (added > 0) {
                setPastedCount(added);
                window.setTimeout(() => setPastedCount(0), 2200);
              }
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            } else if (e.key === "Escape") {
              setOpen(false);
            } else if (e.key === "ArrowDown" && suggestions.length > 0) {
              e.preventDefault();
              setHighlight((h) => (h + 1) % suggestions.length);
            } else if (e.key === "ArrowUp" && suggestions.length > 0) {
              e.preventDefault();
              setHighlight((h) => (h - 1 + suggestions.length) % suggestions.length);
            }
          }}
          className="w-full rounded-2xl border border-white/15 bg-white py-3.5 pl-12 pr-11 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-md outline-none transition-all duration-200 focus:ring-4 focus:ring-emerald-400/30 sm:py-4 sm:text-base"
        />

        {value && (
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              setValue("");
              setHighlight(0);
            }}
            aria-label="Clear ingredient input"
            className="absolute right-3.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {pastedCount > 0 && (
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-200">
          <Check className="h-3.5 w-3.5" />
          <span>
            Added {pastedCount} ingredient{pastedCount === 1 ? "" : "s"} to pantry
          </span>
        </div>
      )}

      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 z-40 mt-2 overflow-hidden rounded-2xl border border-stone-200/90 bg-white py-1.5 text-slate-800 shadow-[0_18px_40px_rgba(15,41,34,0.18)]"
        >
          {suggestions.map((name, i) => {
            const isActive = i === activeIndex;
            return (
              <li key={name} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onMouseEnter={() => setHighlight(i)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onAdd(name);
                    setValue("");
                    setHighlight(0);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-50 to-orange-50/70 text-slate-950"
                      : "text-slate-700 hover:bg-stone-50"
                  }`}
                >
                  <span>{renderHighlightedMatch(name, value)}</span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-bold transition-all ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "bg-stone-100 text-slate-500"
                    }`}
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default IngredientInput;