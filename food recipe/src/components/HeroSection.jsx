import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroImage from '../assets/images/hero.png';

const floatingItems = [
  {
    id: 'carrot',
    icon: '🥕',
    pos: 'top-6 left-4 sm:top-8 sm:left-[7%]',
    size: 'text-2xl sm:text-4xl',
    depth: 26,
    speed: 1.1,
    rangeX: 16,
    rangeY: 14,
    phase: 0,
  },
  {
    id: 'tomato',
    icon: '🍅',
    pos: 'top-8 right-5 sm:top-10 sm:right-[8%]',
    size: 'text-3xl sm:text-5xl',
    depth: 38,
    speed: 0.9,
    rangeX: 18,
    rangeY: 16,
    phase: 1.4,
  },
  {
    id: 'avocado',
    icon: '🥑',
    pos: 'bottom-36 left-3 sm:bottom-28 sm:left-[4%]',
    size: 'text-3xl sm:text-4xl',
    depth: 32,
    speed: 1.25,
    rangeX: 14,
    rangeY: 18,
    phase: 2.7,
  },
  {
    id: 'lemon',
    icon: '🍋',
    pos: 'top-[46%] right-3 sm:top-[48%] sm:right-[4%]',
    size: 'text-2xl sm:text-4xl',
    depth: 24,
    speed: 1.05,
    rangeX: 15,
    rangeY: 15,
    phase: 4.1,
  },
];

const bokehDots = [
  { pos: 'top-12 left-[18%]', size: 'h-3 w-3', color: 'bg-emerald-400/35', speed: 0.8, rx: 14, ry: 10, phase: 0.5 },
  { pos: 'top-28 left-[28%]', size: 'h-2 w-2', color: 'bg-orange-300/45', speed: 1.1, rx: 10, ry: 14, phase: 1.8 },
  { pos: 'top-20 right-[24%]', size: 'h-2.5 w-2.5', color: 'bg-lime-400/35', speed: 0.95, rx: 12, ry: 12, phase: 3.1 },
  { pos: 'bottom-24 right-[18%]', size: 'h-3 w-3', color: 'bg-amber-400/40', speed: 1.2, rx: 15, ry: 11, phase: 4.4 },
  { pos: 'bottom-36 left-[22%]', size: 'h-2 w-2', color: 'bg-emerald-500/30', speed: 0.85, rx: 11, ry: 13, phase: 5.2 },
];

function HeroSection() {
  const navigate = useNavigate();
  const [tick, setTick] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frameId;
    const start = performance.now();

    const animate = (now) => {
      setTick((now - start) / 1000);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleStart = () => {
    window.scrollTo(0, 0);
    navigate('/recipes');
  };

  const handleHeroMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x, y });
  };

  const handleHeroLeave = () => setParallax({ x: 0, y: 0 });

  const handleImageMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -y * 10, y: x * 10 });
  };

  const handleImageLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section className="w-full px-3 py-4 sm:px-6 lg:px-10">
      <div
        onMouseMove={handleHeroMove}
        onMouseLeave={handleHeroLeave}
        className="relative overflow-hidden rounded-3xl border border-amber-100/90 bg-gradient-to-br from-emerald-50/80 via-orange-50/75 to-amber-50/90 px-6 py-14 text-center shadow-sm sm:px-12 sm:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-200/45 blur-3xl animate-pulse"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-orange-200/50 blur-3xl animate-pulse"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -right-12 h-96 w-[34rem] rounded-tl-[100%] bg-gradient-to-tl from-orange-200/55 via-amber-100/45 to-transparent blur-xl"
          style={{
            transform: `translate(${Math.sin(tick * 0.7) * 14 - parallax.x * 16}px, ${Math.cos(tick * 0.6) * 10 - parallax.y * 12}px)`,
          }}
        />

        {bokehDots.map((dot, index) => {
          const driftX = Math.sin(tick * dot.speed + dot.phase) * dot.rx;
          const driftY = Math.cos(tick * dot.speed * 0.9 + dot.phase) * dot.ry;

          return (
            <span
              key={index}
              aria-hidden="true"
              className={`pointer-events-none absolute rounded-full blur-[1px] ${dot.pos} ${dot.size} ${dot.color}`}
              style={{
                transform: `translate(${driftX - parallax.x * (18 + index * 5)}px, ${driftY - parallax.y * (18 + index * 5)}px)`,
              }}
            />
          );
        })}

        {floatingItems.map((item) => {
          const driftX = Math.sin(tick * item.speed + item.phase) * item.rangeX;
          const driftY = Math.cos(tick * item.speed * 1.15 + item.phase) * item.rangeY;
          const rotateDeg = Math.sin(tick * item.speed * 0.8 + item.phase) * 10;

          return (
            <div
              key={item.id}
              aria-hidden="true"
              className={`pointer-events-none absolute ${item.pos}`}
              style={{
                transform: `translate(${driftX - parallax.x * item.depth}px, ${driftY - parallax.y * item.depth}px) rotate(${rotateDeg}deg)`,
              }}
            >
              <span className={`inline-block select-none opacity-90 drop-shadow-md ${item.size}`}>
                {item.icon}
              </span>
            </div>
          );
        })}

        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="mb-5 inline-block rounded-full border border-emerald-200/80 bg-emerald-100/85 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Fresh &amp; Wholesome Recipes
          </span>

          <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            <span className="inline-block transition-transform duration-300 hover:-translate-y-0.5">
              Healthy Food,{' '}
            </span>
            <span className="inline-block text-emerald-600 transition-transform duration-300 hover:scale-[1.03]">
              Happier You.
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg font-medium text-amber-800/85 sm:text-2xl">
            Nourish Your Body, Feed Your Soul.
          </p>

          <button
            type="button"
            onClick={handleStart}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-red-600 px-9 py-4 text-base font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(229,62,62,0.3)] active:translate-y-0 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Exploring
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </span>

            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full"
            />
          </button>
        </div>

        <div className="relative z-10 mx-auto mt-12 max-w-4xl [perspective:1000px] sm:mt-16">
          <div
            onMouseMove={handleImageMove}
            onMouseLeave={handleImageLeave}
            className="group relative"
          >
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-emerald-400/20 via-orange-400/20 to-red-400/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <div
              className="relative overflow-hidden rounded-2xl border border-white/90 bg-white p-2 shadow-lg transition-transform duration-150 ease-out group-hover:shadow-2xl"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            >
              <img
                src={HeroImage}
                alt="Main Banner"
                className="hero-img h-64 w-full rounded-xl object-cover sm:h-80 lg:h-96"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;