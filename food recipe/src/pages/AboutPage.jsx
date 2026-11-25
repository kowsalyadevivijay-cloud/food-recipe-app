import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Utensils,
  Users,
  Clock,
  Award,
  Heart,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import KitchenImage from "./../assets/images/Kitchen.jpg";

const STATS_DATA = [
  { number: "10K+", label: "Happy Cooks", icon: Users, color: "from-emerald-500 to-teal-600" },
  { number: "500+", label: "Tested Recipes", icon: Utensils, color: "from-orange-500 to-amber-500" },
  { number: "30m", label: "Avg. Prep Time", icon: Clock, color: "from-emerald-600 to-green-500" },
  { number: "4.9", label: "Community Rating", icon: Award, color: "from-amber-500 to-red-500" },
];

const CRAFT_STEPS = [
  {
    id: "source",
    step: "01",
    label: "Market-First Sourcing",
    title: "Real ingredients you already recognize",
    description:
      "Every recipe starts at local produce stalls—never specialty aisles. If you cannot find an ingredient within ten minutes of home, we redesign the dish.",
    highlight: "100% everyday pantry & fresh produce",
    metric: "12 avg. ingredients",
  },
  {
    id: "test",
    step: "02",
    label: "30-Minute Clock Test",
    title: "Engineered for weeknight momentum",
    description:
      "We time every chop, simmer, and plating step in real home kitchens so you spend less time washing pans and more time around the table.",
    highlight: "Single-pan & parallel prep steps",
    metric: "26 min median cook time",
  },
  {
    id: "balance",
    step: "03",
    label: "Flavor & Fuel Balance",
    title: "Nourishing without feeling restrictive",
    description:
      "Vibrant herbs, toasted spices, and whole-food textures do the heavy lifting—delivering bold comfort food that leaves you energized.",
    highlight: "Whole-food macros & bright aromatics",
    metric: "3x kitchen taste-tested",
  },
];

const VALUES_DATA = [
  {
    icon: Heart,
    title: "Bio-Available Nutrition",
    description:
      "We pair complementary whole ingredients so your body absorbs more nutrients naturally—going far beyond empty calorie counts.",
    accent: "bg-emerald-50 text-emerald-600 border-emerald-100",
    glow: "from-emerald-400/20 via-teal-300/10 to-transparent",
    bar: "from-emerald-500 to-teal-400",
  },
  {
    icon: Zap,
    title: "Kitchen Performance",
    description:
      "Our recipes are thoughtfully sequenced—smart prep workflows that take you from cutting board to warm plate in record time.",
    accent: "bg-orange-50 text-orange-600 border-orange-100",
    glow: "from-orange-400/20 via-amber-300/10 to-transparent",
    bar: "from-orange-500 to-amber-400",
  },
  {
    icon: Globe,
    title: "Seasonal Sustainability",
    description:
      "By celebrating seasonal vegetables, grains, and local staples, every meal lowers waste while maximizing peak harvest flavor.",
    accent: "bg-amber-50 text-amber-700 border-amber-100",
    glow: "from-amber-400/20 via-emerald-300/10 to-transparent",
    bar: "from-amber-500 to-emerald-500",
  },
];

const TEAM_DATA = [
  {
    name: "Sarah Johnson",
    role: "Executive Chef",
    specialty: "15-Min Herb & Grain Bowls",
    quote: "Acidity and fresh herbs turn five simple ingredients into magic.",
    img: "https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Michael Chen",
    role: "Culinary Product Lead",
    specialty: "Step-by-Step Kitchen UX",
    quote: "A great recipe reads like a calm friend cooking right beside you.",
    img: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Emma Rodriguez",
    role: "Nutrition & Recipe Analyst",
    specialty: "Balanced Plant-Forward Comforts",
    quote: "Healthy food only sticks when you genuinely crave tomorrow's lunch.",
    img: "https://images.pexels.com/photos/3768997/pexels-photo-3768997.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

function PillarCard({ item }) {
  const [spot, setSpot] = useState({ x: 50, y: 20, active: false });
  const Icon = item.icon;

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => setSpot((prev) => ({ ...prev, active: false }))}
      className="group relative overflow-hidden rounded-[2.25rem] border border-stone-200/80 bg-white p-9 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-px bg-gradient-to-br ${item.glow} transition-opacity duration-500 ${
          spot.active ? "opacity-100" : "opacity-0"
        }`}
        style={{
          maskImage: `radial-gradient(240px circle at ${spot.x}% ${spot.y}%, black, transparent)`,
          WebkitMaskImage: `radial-gradient(240px circle at ${spot.x}% ${spot.y}%, black, transparent)`,
        }}
      />

      <div className="relative z-10">
        <div
          className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border ${item.accent} shadow-2xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
        >
          <Icon size={26} />
        </div>
        <h3 className="mb-3 text-2xl font-extrabold text-slate-900 transition-colors group-hover:text-emerald-700">
          {item.title}
        </h3>
        <p className="font-medium leading-relaxed text-slate-600">{item.description}</p>
      </div>

      <div
        aria-hidden="true"
        className={`absolute inset-x-8 bottom-0 h-1 rounded-t-full bg-gradient-to-r ${item.bar} scale-x-0 transition-transform duration-500 group-hover:scale-x-100`}
      />
    </div>
  );
}

function AboutPage() {
  const [activeCraft, setActiveCraft] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleKitchenMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 10, y: x * 10 });
  };

  const currentStep = CRAFT_STEPS[activeCraft];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-amber-100/90 bg-gradient-to-br from-emerald-50/85 via-orange-50/75 to-amber-50 px-6 py-20 text-center shadow-sm sm:px-12 lg:py-28">
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-200/45 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-orange-200/45 blur-3xl animate-pulse" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-100/85 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              Inside FreshRecipes
            </span>

            <h1 className="mb-6 text-5xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Our Flavor{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-orange-500 bg-clip-text text-transparent">
                Legacy
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg font-medium leading-relaxed text-slate-600 sm:text-xl">
              We’re redefining the art of everyday home cooking—turning fresh, market-simple
              ingredients into soul-warming meals built for modern schedules.
            </p>

            <div className="mx-auto h-1.5 w-24 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-orange-500" />
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-10 max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {STATS_DATA.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group rounded-3xl border border-white bg-white/90 p-6 shadow-[0_10px_30px_rgba(15,41,34,0.06)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-200 hover:shadow-xl sm:p-7"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.color} shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <p className="mb-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  {stat.number}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 space-y-6 lg:order-1 lg:col-span-6">
            <span className="inline-block rounded-full bg-orange-100/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-700">
              Our Origin Story
            </span>

            <h2 className="text-4xl font-black leading-tight text-slate-900 lg:text-5xl">
              A Kitchen Born{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-orange-500 bg-clip-text italic text-transparent">
                From Curiosity
              </span>
            </h2>

            <p className="text-lg font-medium leading-relaxed text-slate-600">
              We started with a simple question: why do healthy recipes online often require
              twenty obscure jars and an hour of cleanup? FreshRecipes bridges gourmet flavor
              with effortless weeknight practicality.
            </p>

            <blockquote className="rounded-2xl border-l-4 border-emerald-500 bg-white px-6 py-5 italic text-slate-700 shadow-xs transition-all duration-300 hover:translate-x-1.5 hover:border-orange-500 hover:shadow-md">
              &ldquo;If you can&apos;t find it at your neighborhood market, it doesn&apos;t belong on
              our table.&rdquo;
            </blockquote>
          </div>

          <div
            onMouseMove={handleKitchenMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            className="order-1 relative group flex justify-center [perspective:1000px] lg:order-2 lg:col-span-6"
          >
            <div className="pointer-events-none absolute -inset-3 rounded-[2.5rem] bg-gradient-to-tr from-emerald-400/30 via-amber-300/25 to-orange-400/30 opacity-65 blur-2xl transition-all duration-500 group-hover:opacity-100" />

            <div
              className="relative w-full max-w-[480px] overflow-hidden rounded-[2.25rem] border border-white bg-white p-2.5 shadow-xl transition-transform duration-150 ease-out group-hover:shadow-2xl"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              <img
                src={KitchenImage}
                alt="Our Kitchen"
                className="block h-auto w-full rounded-[1.75rem] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-md backdrop-blur-md">
                <span className="text-xs font-bold text-slate-800">
                  Tested in Real Home Kitchens
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700">
                  Zero Fluff
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Interactive Test Kitchen
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                How We Craft Every Recipe
              </h2>
            </div>
            <p className="max-w-md text-sm font-medium text-slate-500">
              Select a stage below to see how every dish earns its spot in our collection.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            <div className="flex flex-col gap-3 lg:col-span-5">
              {CRAFT_STEPS.map((item, idx) => {
                const isSelected = idx === activeCraft;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveCraft(idx)}
                    className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                      isSelected
                        ? "border-emerald-500/50 bg-gradient-to-r from-emerald-50 to-orange-50/60 shadow-sm"
                        : "border-stone-200/80 bg-[#faf9f6] hover:border-emerald-200 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-colors ${
                          isSelected
                            ? "bg-emerald-600 text-white"
                            : "bg-white text-slate-500 border border-stone-200"
                        }`}
                      >
                        {item.step}
                      </span>
                      <span
                        className={`font-bold ${
                          isSelected ? "text-slate-900" : "text-slate-600"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <ArrowRight
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isSelected
                          ? "translate-x-1 text-emerald-600"
                          : "text-slate-400"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col justify-between rounded-3xl border border-amber-100 bg-gradient-to-br from-emerald-50/70 via-[#fcfbf8] to-orange-50/70 p-7 sm:p-9 lg:col-span-7">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 text-xs font-bold text-orange-600 shadow-2xs">
                  <span>Stage {currentStep.step}</span>
                  <span>•</span>
                  <span>{currentStep.metric}</span>
                </div>
                <h3 className="mb-4 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  {currentStep.title}
                </h3>
                <p className="text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
                  {currentStep.description}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2.5 border-t border-amber-200/60 pt-5 text-sm font-bold text-emerald-800">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                <span>{currentStep.highlight}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f4f3ee]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600">
              What Guides Us
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              The Three Pillars
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {VALUES_DATA.map((item) => (
              <PillarCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            Culinary &amp; Design Crew
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            The Makers
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {TEAM_DATA.map((member) => (
            <div
              key={member.name}
              className="group rounded-3xl border border-stone-200/70 bg-white p-7 text-center shadow-xs transition-all duration-500 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl"
            >
              <div className="relative mx-auto mb-6 h-52 w-44">
                <div className="absolute -inset-2 rounded-[2.25rem] bg-gradient-to-tr from-emerald-400/30 to-orange-400/30 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
                <img
                  src={member.img}
                  alt={member.name}
                  className="relative z-10 h-full w-full rounded-[2rem] object-cover grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0 shadow-md"
                />
              </div>

              <h4 className="text-xl font-extrabold text-slate-900">{member.name}</h4>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600">
                {member.role}
              </p>

              <div className="mt-4 rounded-2xl bg-[#faf9f6] px-4 py-3 transition-colors duration-300 group-hover:bg-emerald-50/70">
                <p className="text-xs font-bold text-orange-600">{member.specialty}</p>
                <p className="mt-1 text-xs italic text-slate-500">&ldquo;{member.quote}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2922] via-[#13352c] to-[#1a2e26] px-6 py-20 text-center shadow-xl sm:px-12">
          <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl animate-pulse" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="mb-4 inline-block rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
              Your Next Favorite Meal
            </span>

            <h2 className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Taste the{" "}
              <span className="bg-gradient-to-r from-emerald-300 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                Unexpected
              </span>
            </h2>

            <p className="mx-auto mb-10 max-w-lg text-base text-emerald-100/80 sm:text-lg">
              A quiet revolution in your everyday cooking—browse 500+ tested recipes ready in 30
              minutes or less.
            </p>

            <Link
              to="/recipes"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-red-500 to-red-600 px-10 py-4 text-lg font-bold text-white shadow-[0_12px_28px_rgba(239,68,68,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_16px_36px_rgba(239,68,68,0.5)]"
            >
              <span className="relative z-10">Explore Recipes</span>
              <ArrowRight
                size={20}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;