import React, { useState } from "react";
import { Heart, Play, Sparkles, ArrowUpRight, CheckCircle2 } from "lucide-react";

function RecipeCard({ row, hasPantry, isFavorite, onToggleFavorite, onView }) {
  const { recipe, have, missing, total } = row;
  const { title, image, category, area, youtube } = recipe;

  const [spot, setSpot] = useState({ x: 50, y: 50, active: false });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [heartPop, setHeartPop] = useState(false);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;

    setSpot({
      x: (normX + 0.5) * 100,
      y: (normY + 0.5) * 100,
      active: true,
    });
    setTilt({
      x: -normY * 6,
      y: normX * 6,
    });
  };

  const handleLeave = () => {
    setSpot((prev) => ({ ...prev, active: false }));
    setTilt({ x: 0, y: 0 });
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setHeartPop(true);
    onToggleFavorite(recipe);
    window.setTimeout(() => setHeartPop(false), 320);
  };

  const matchPercent = total > 0 ? Math.round((have.length / total) * 100) : 0;
  const isReadyNow = hasPantry && missing.length === 0;

  let status;
  if (!hasPantry) {
    status = (
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200/70 bg-stone-50 px-3 py-1 text-xs font-semibold text-slate-600 transition-all duration-300 group-hover:border-emerald-200 group-hover:bg-emerald-50 group-hover:text-emerald-700">
          {total} {total === 1 ? "ingredient" : "ingredients"}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-extrabold text-orange-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-500">
          View recipe
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />
        </span>
      </div>
    );
  } else if (isReadyNow) {
    status = (
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-100/90 px-3 py-1 text-xs font-bold text-emerald-800 shadow-2xs">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            All {total} {total === 1 ? "ingredient" : "ingredients"} ready
          </span>
          <span className="inline-flex items-center gap-0.5 text-xs font-extrabold text-emerald-700 transition-transform duration-300 group-hover:translate-x-1">
            Cook now
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-emerald-100">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />
        </div>
      </div>
    );
  } else {
    status = (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700">
            {have.length} of {total} in pantry
          </span>
          <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 font-extrabold text-emerald-700">
            {matchPercent}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-orange-500 transition-all duration-500"
            style={{ width: `${matchPercent}%` }}
          />
        </div>
        <p className="line-clamp-1 text-xs font-semibold text-orange-600">
          Missing: {missing.slice(0, 3).join(", ")}
          {missing.length > 3 ? ` +${missing.length - 3} more` : ""}
        </p>
      </div>
    );
  }

  return (
    <div className="[perspective:900px]">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onView(recipe)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onView(recipe);
          }
        }}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        className={`group relative flex min-h-[168px] cursor-pointer overflow-hidden rounded-2xl border bg-white text-left shadow-xs transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(15,41,34,0.14)] focus:outline-none focus:ring-4 focus:ring-emerald-400/30 ${
          isReadyNow
            ? "border-emerald-300/90 ring-1 ring-emerald-500/15 hover:border-emerald-400"
            : "border-stone-200/80 hover:border-emerald-300/90"
        }`}
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-emerald-400/25 via-amber-300/15 to-orange-400/25 transition-opacity duration-300 ${
            spot.active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            maskImage: `radial-gradient(240px circle at ${spot.x}% ${spot.y}%, black, transparent)`,
            WebkitMaskImage: `radial-gradient(240px circle at ${spot.x}% ${spot.y}%, black, transparent)`,
          }}
        />

        <div className="relative w-36 shrink-0 overflow-hidden sm:w-48">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-90"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full"
          />

          {isReadyNow && (
            <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md">
              <Sparkles className="h-2.5 w-2.5 animate-pulse" />
              Ready Now
            </span>
          )}

          {youtube && (
            <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full border border-white/25 bg-black/75 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-red-600/90">
              <Play className="h-3 w-3 fill-white" />
              Video
            </span>
          )}
        </div>

        <div className="relative z-10 flex min-w-0 flex-1 flex-col p-4 pr-3.5 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-lg font-extrabold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-emerald-700">
              {title}
            </h3>

            <button
              type="button"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              aria-pressed={isFavorite}
              onClick={handleHeartClick}
              className={`relative -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-200 active:scale-90 ${
                isFavorite
                  ? "border-rose-200 bg-rose-50 text-rose-500 shadow-xs hover:scale-110"
                  : "border-stone-200/70 bg-stone-50/80 text-slate-400 hover:scale-110 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
              }`}
            >
              {isFavorite && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full bg-rose-400/25 animate-ping"
                />
              )}
              <Heart
                size={18}
                className={`relative z-10 transition-transform duration-300 ${
                  heartPop ? "scale-125" : isFavorite ? "scale-105" : ""
                } ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`}
              />
            </button>
          </div>

          <p className="mt-1 mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-slate-500">
            {[category, area].filter(Boolean).join(" · ")}
          </p>

          <div className="mt-auto">{status}</div>
        </div>

        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-emerald-500 via-amber-400 to-orange-500 transition-transform duration-500 group-hover:scale-x-100"
        />
      </div>
    </div>
  );
}

export default RecipeCard;