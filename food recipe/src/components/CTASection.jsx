import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LeftImage from './../assets/images/knife.png';
import RightImage from './../assets/images/Pan.png';

function CTASection() {
  const [tick, setTick] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

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

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x, y });
  };

  const handleLeave = () => setParallax({ x: 0, y: 0 });

  const leftDriftX = Math.sin(tick * 1.1) * 10 - parallax.x * 24;
  const leftDriftY = Math.cos(tick * 0.9) * 12 - parallax.y * 18;
  const leftRotate = 12 + Math.sin(tick * 0.8) * 4;

  const rightDriftX = Math.cos(tick * 1.0) * 12 - parallax.x * 28;
  const rightDriftY = Math.sin(tick * 1.15) * 10 - parallax.y * 20;
  const rightRotate = -12 + Math.cos(tick * 0.85) * 4;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative overflow-hidden rounded-3xl border border-amber-100/90 bg-gradient-to-br from-emerald-50/75 via-orange-50/80 to-amber-50/90 px-6 py-20 text-center shadow-sm sm:px-12 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl animate-pulse"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-orange-200/45 blur-3xl animate-pulse"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 -left-10 w-44 opacity-35 sm:w-56 md:opacity-75 lg:-left-8 lg:bottom-4 lg:w-72 lg:opacity-100"
          style={{
            transform: `translate(${leftDriftX}px, ${leftDriftY}px) rotate(${leftRotate}deg)`,
          }}
        >
          <img
            src={LeftImage}
            alt=""
            className="h-full w-full object-contain drop-shadow-xl"
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-8 -right-10 w-44 opacity-35 sm:w-56 md:opacity-75 lg:-right-8 lg:top-4 lg:w-72 lg:opacity-100"
          style={{
            transform: `translate(${rightDriftX}px, ${rightDriftY}px) rotate(${rightRotate}deg)`,
          }}
        >
          <img
            src={RightImage}
            alt=""
            className="h-full w-full object-contain drop-shadow-2xl"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl">
          <span className="mb-4 inline-block rounded-full border border-orange-200/80 bg-orange-100/80 px-4 py-1 text-xs font-bold uppercase tracking-wider text-orange-700">
            Fresh Kitchen Inspiration
          </span>

          <h2 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-primary sm:text-5xl lg:text-7xl">
            Ready to{' '}
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-red-600 bg-clip-text text-transparent">
              Elevate Your Plate?
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-lg text-base font-medium text-secondary sm:text-lg">
            Explore wholesome recipes, save your favorites, and turn everyday ingredients into memorable meals.
          </p>

          <Link
            to="/recipes"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-400 via-red-500 to-red-600 px-10 py-4 text-lg font-bold text-white shadow-[0_12px_28px_rgba(239,68,68,0.32)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_16px_36px_rgba(239,68,68,0.48)] active:translate-y-0 active:scale-95 sm:px-12 sm:py-5 sm:text-xl"
          >
            <span className="relative z-10">Unlock Fresh Recipes</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTASection;