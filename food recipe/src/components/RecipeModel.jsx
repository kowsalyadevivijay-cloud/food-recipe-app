import React, { useEffect, useState } from "react";
import {
  X,
  Heart,
  ArrowLeft,
  Users,
  Play,
  Check,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";
import { ingredientStatus, normalize } from "../lib/pantry";

const BASE_SERVINGS = 4;

const FRACTION_MAP = {
  "¼": 0.25,
  "½": 0.5,
  "¾": 0.75,
  "⅓": 1 / 3,
  "⅔": 2 / 3,
  "⅛": 0.125,
  "⅜": 0.375,
  "⅝": 0.625,
  "⅞": 0.875,
};

function parseLeadingNumber(str) {
  if (!str) return null;
  let text = str.trim();

  for (const [glyph, val] of Object.entries(FRACTION_MAP)) {
    text = text.replace(new RegExp(glyph, "g"), ` ${val} `);
  }

  const mixedMatch = text.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)(.*)$/);
  if (mixedMatch) {
    const whole = Number(mixedMatch[1]);
    const num = Number(mixedMatch[2]);
    const den = Number(mixedMatch[3]);
    if (den) {
      return { value: whole + num / den, rest: mixedMatch[4].trim() };
    }
  }

  const fracMatch = text.match(/^(\d+)\s*\/\s*(\d+)(.*)$/);
  if (fracMatch) {
    const num = Number(fracMatch[1]);
    const den = Number(fracMatch[2]);
    if (den) {
      return { value: num / den, rest: fracMatch[3].trim() };
    }
  }

  const numMatch = text.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (numMatch) {
    return { value: Number(numMatch[1]), rest: numMatch[2].trim() };
  }

  return null;
}

function formatScaledAmount(amount) {
  if (!Number.isFinite(amount) || amount <= 0) return "";
  const rounded = Math.round(amount * 100) / 100;
  const whole = Math.floor(rounded);
  const frac = rounded - whole;

  const vulgarFractions = [
    { target: 0.25, label: "¼" },
    { target: 0.33, label: "⅓" },
    { target: 0.5, label: "½" },
    { target: 0.67, label: "⅔" },
    { target: 0.75, label: "¾" },
  ];

  const matched = vulgarFractions.find((item) => Math.abs(frac - item.target) < 0.04);
  if (matched) {
    return whole > 0 ? `${whole} ${matched.label}` : matched.label;
  }

  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace(/\.0$/, "");
}

function scaleMeasureText(measure, multiplier) {
  if (!measure || !measure.trim()) return "";
  const clean = measure.trim();
  const parsed = parseLeadingNumber(clean);
  if (!parsed || multiplier === 1) return clean;

  const scaledValue = parsed.value * multiplier;
  const formatted = formatScaledAmount(scaledValue);
  return parsed.rest ? `${formatted} ${parsed.rest}` : formatted;
}

function RecipeModel({ recipe, pantry = [], onClose, isFavorite, onToggleFavorite }) {
  const [servings, setServings] = useState(BASE_SERVINGS);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!recipe) return null;

  const hasPantry = pantry.length > 0;
  const pantryNorm = pantry.map(normalize);
  const multiplier = servings / BASE_SERVINGS;

  const toggleStep = (index) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-3 backdrop-blur-sm sm:p-5"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-amber-100/80 bg-[#faf9f6] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="fixed top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-red-500 hover:text-white sm:absolute sm:top-4 sm:right-4"
        >
          <X size={20} />
        </button>

        {recipe.image && (
          <div className="relative h-64 w-full overflow-hidden rounded-t-3xl sm:h-76">
            <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center gap-2">
              {recipe.category && (
                <span className="rounded-full bg-emerald-600/95 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
                  {recipe.category}
                </span>
              )}
              {recipe.area && (
                <span className="rounded-full bg-white/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900 shadow-xs backdrop-blur-xs">
                  {recipe.area}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 border-b border-stone-200/80 pb-6 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {recipe.title}
              </h1>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Change the servings to scale the ingredient quantities.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => onToggleFavorite(recipe)}
                aria-pressed={isFavorite}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all duration-200 ${
                  isFavorite
                    ? "border-rose-200 bg-rose-50 text-rose-600 shadow-2xs"
                    : "border-stone-200 bg-white text-slate-700 hover:border-rose-200 hover:bg-rose-50/70 hover:text-rose-600"
                }`}
              >
                <Heart
                  size={18}
                  className={isFavorite ? "fill-rose-500 text-rose-500" : "text-slate-400"}
                />
                <span>{isFavorite ? "Saved" : "Save"}</span>
              </button>

              {recipe.youtube && (
                <a
                  href={recipe.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Play size={15} className="fill-white" />
                  <span>Watch Video</span>
                </a>
              )}
            </div>
          </div>

          <div className="mb-8 max-w-sm rounded-2xl border border-orange-100 bg-white p-4 shadow-2xs">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700">
                <Users className="h-4 w-4 text-orange-600" />
                <span>Servings</span>
              </span>
              {servings !== BASE_SERVINGS && (
                <button
                  type="button"
                  onClick={() => setServings(BASE_SERVINGS)}
                  className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-bold text-orange-600 transition hover:bg-orange-100"
                >
                  <RotateCcw className="h-3 w-3" />
                  {BASE_SERVINGS}
                </button>
              )}
            </div>
            <div className="mt-1 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setServings((s) => Math.max(1, s - 1))}
                aria-label="Decrease servings"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-stone-200 bg-[#faf9f6] text-slate-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[4.5rem] text-center text-xl font-black text-slate-900">
                {servings} {servings === 1 ? "person" : "people"}
              </span>
              <button
                type="button"
                onClick={() => setServings((s) => Math.min(12, s + 1))}
                aria-label="Increase servings"
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-stone-200 bg-[#faf9f6] text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mb-8 grid gap-8 md:grid-cols-12">
            <section className="rounded-2xl border border-stone-200/70 bg-white p-5 shadow-2xs md:col-span-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-slate-900">Ingredients</h2>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                  For {servings}
                </span>
              </div>

              <ul className="space-y-2.5">
                {recipe.ingredientList?.map(({ name, measure }, i) => {
                  const status = ingredientStatus(name, pantryNorm);
                  const scaledMeasure = scaleMeasureText(measure, multiplier);

                  return (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl bg-[#faf9f6] px-3 py-2 text-sm"
                    >
                      {hasPantry && status === "have" && (
                        <span className="mt-0.5 font-bold text-emerald-600">✓</span>
                      )}
                      {hasPantry && status === "missing" && (
                        <span className="mt-0.5 font-bold text-orange-500">✗</span>
                      )}
                      {(!hasPantry || status === "assumed") && (
                        <span className="mt-0.5 font-bold text-emerald-500">•</span>
                      )}
                      <span
                        className={
                          hasPantry && status === "missing"
                            ? "font-semibold text-orange-700"
                            : "font-medium text-slate-700"
                        }
                      >
                        {scaledMeasure ? (
                          <strong className="font-extrabold text-slate-900">{scaledMeasure}</strong>
                        ) : null}{" "}
                        {name}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {hasPantry && (
                <p className="mt-3 text-xs font-medium text-slate-500">
                  ✓ in your pantry · ✗ you need to buy
                </p>
              )}
            </section>

            <section className="rounded-2xl border border-stone-200/70 bg-white p-5 shadow-2xs md:col-span-7">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-slate-900">Instructions</h2>
                {recipe.instructions?.length > 0 && (
                  <span className="text-xs font-bold text-slate-400">
                    {completedSteps.length}/{recipe.instructions.length} done
                  </span>
                )}
              </div>

              <div className="space-y-3.5">
                {recipe.instructions?.map((step, i) => {
                  const done = completedSteps.includes(i);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => toggleStep(i)}
                      className={`flex w-full gap-4 rounded-2xl border p-3.5 text-left transition-all duration-200 ${
                        done
                          ? "border-emerald-200/80 bg-emerald-50/50 opacity-75"
                          : "border-stone-100 bg-[#faf9f6] hover:border-emerald-200 hover:bg-white"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black transition-colors ${
                          done ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {done ? <Check className="h-4 w-4" /> : i + 1}
                      </span>
                      <p
                        className={`text-sm leading-relaxed ${
                          done ? "text-slate-500 line-through" : "text-slate-700"
                        }`}
                      >
                        {step}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {recipe.tags?.length > 0 && (
            <footer className="mb-6 border-t border-stone-200/80 pt-4">
              <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-amber-200/70 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </footer>
          )}

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <ArrowLeft size={18} />
            <span>Back to recipes</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeModel;