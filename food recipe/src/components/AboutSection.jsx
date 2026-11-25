import React, { useState } from "react";
import cookingProcessImg from "./../assets/images/about.png";

const AboutSection = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 10, y: x * 10 });
  };

  const handleLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-[#faf9f6]">
      <div className="pointer-events-none absolute -left-24 top-12 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl animate-pulse" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 rounded-3xl border border-amber-100/80 bg-gradient-to-br from-white via-[#fcfbf8] to-orange-50/50 p-6 shadow-sm sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
          <div className="order-2 space-y-6 lg:order-1 lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              Our Philosophy
            </span>

            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:leading-[1.12]">
              Built for{" "}
              <span className="text-emerald-600">real life</span>
            </h2>

            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              Cooking shouldn&apos;t feel complicated—it should be a joyful part of your day.
            </p>

            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              With just{" "}
              <span className="inline-block rounded-lg bg-emerald-100/85 px-2.5 py-0.5 font-bold text-emerald-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-200">
                30 minutes
              </span>{" "}
              of active time, you can whip up fresh, wholesome meals for busy days.
            </p>

            <blockquote className="rounded-2xl border-l-4 border-emerald-500 bg-white px-5 py-4 text-sm italic leading-relaxed text-slate-700 shadow-xs transition-all duration-300 hover:translate-x-1.5 hover:border-orange-500 hover:shadow-md sm:text-base">
              &ldquo;Great meals come from fresh ideas and a willing heart, not fancy tools.&rdquo;
            </blockquote>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-stone-100 bg-white/90 p-4 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-sm">
                <p className="text-2xl font-extrabold text-emerald-600">30 Min</p>
                <p className="text-xs font-medium text-slate-500">Quick everyday prep</p>
              </div>
              <div className="rounded-2xl border border-stone-100 bg-white/90 p-4 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-sm">
                <p className="text-2xl font-extrabold text-orange-500">100%</p>
                <p className="text-xs font-medium text-slate-500">Fresh, simple ingredients</p>
              </div>
            </div>
          </div>

          <div
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="order-1 relative group [perspective:1000px] lg:order-2 lg:col-span-6"
          >
            <div className="pointer-events-none absolute -inset-3 rounded-[2.5rem] bg-gradient-to-tr from-emerald-400/25 via-amber-300/25 to-orange-400/30 opacity-70 blur-2xl transition-all duration-500 group-hover:opacity-100 group-hover:blur-3xl" />

            <div
              className="relative z-10 overflow-hidden rounded-[2rem] border border-white bg-white p-2.5 shadow-xl transition-transform duration-150 ease-out group-hover:shadow-2xl"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              <img
                src={cookingProcessImg}
                alt="Fresh healthy ingredients being prepared"
                className="h-[360px] w-full rounded-[1.5rem] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[440px] lg:h-[500px]"
              />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-lg backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-lg">
                    🥗
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Home-Cooked Joy</p>
                    <p className="text-xs text-slate-500">Stress-free healthy recipes</p>
                  </div>
                </div>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                  Fresh Daily
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;