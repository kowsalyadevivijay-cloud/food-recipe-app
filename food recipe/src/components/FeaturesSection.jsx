import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES_DATA = [
  {
    step: '01',
    title: 'Fresh Ingredients',
    text: 'We source everything locally to ensure your body gets the nutrients it deserves.',
    tag: 'Farm-to-Table Quality',
    emoji: '🌱',
    accentColor: 'bg-emerald-100/90',
    ringColor: 'group-hover:ring-emerald-300/70',
    glowColor: 'from-emerald-400/25 via-teal-300/15 to-transparent',
    barColor: 'from-emerald-500 via-green-400 to-teal-400',
    pillStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
    phase: 0,
  },
  {
    step: '02',
    title: 'Under 30 Minutes',
    text: "Cooking shouldn't be a chore. Our recipes are designed for your busy lifestyle.",
    tag: 'Quick Weeknight Prep',
    emoji: '⏱️',
    accentColor: 'bg-orange-100/90',
    ringColor: 'group-hover:ring-orange-300/70',
    glowColor: 'from-orange-400/25 via-amber-300/15 to-transparent',
    barColor: 'from-orange-500 via-amber-400 to-red-400',
    pillStyle: 'bg-orange-50 text-orange-700 border-orange-200/70',
    phase: 1.6,
  },
  {
    step: '03',
    title: 'Joyful Kitchens',
    text: 'We believe a happy life starts with a simple, home-cooked meal shared with love.',
    tag: 'Stress-Free Cooking',
    emoji: '👨‍🍳',
    accentColor: 'bg-amber-100/90',
    ringColor: 'group-hover:ring-amber-300/70',
    glowColor: 'from-amber-400/25 via-emerald-300/15 to-transparent',
    barColor: 'from-amber-500 via-orange-400 to-emerald-400',
    pillStyle: 'bg-amber-50 text-amber-800 border-amber-200/70',
    phase: 3.2,
  },
];

function FeaturesSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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

  return (
    <section
      ref={sectionRef}
      className="features-wrapper relative overflow-hidden bg-[#faf9f6] py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl animate-pulse"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-orange-200/35 blur-3xl animate-pulse"
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <header
          className={`mb-16 text-center transition-all duration-700 ease-out sm:mb-20 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/80 bg-orange-100/85 px-4 py-1 text-xs font-bold uppercase tracking-widest text-orange-600">
            <Sparkles className="h-3.5 w-3.5" />
            Why Choose Us
          </span>
          <h2 className="mt-4 mb-5 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            What will you{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-orange-500 bg-clip-text text-transparent">
              get?
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
            Beyond just recipes, we provide a lifestyle built on simplicity,
            freshness, and the joy of a home-cooked meal.
          </p>

          <div className="mt-7 flex justify-center">
            <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-orange-500" />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES_DATA.map((item, i) => (
            <FeatureCard
              key={item.step}
              data={item}
              index={i}
              visible={visible}
              tick={tick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const FeatureCard = ({ data, index, visible, tick }) => {
  const {
    step,
    title,
    text,
    tag,
    emoji,
    accentColor,
    ringColor,
    glowColor,
    barColor,
    pillStyle,
    phase,
  } = data;

  const [spot, setSpot] = useState({ x: 50, y: 20, active: false });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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
      x: -normY * 9,
      y: normX * 9,
    });
  };

  const handleLeave = () => {
    setSpot((prev) => ({ ...prev, active: false }));
    setTilt({ x: 0, y: 0 });
  };

  const floatY = Math.sin(tick * 1.8 + phase) * 4;
  const floatRotate = Math.cos(tick * 1.4 + phase) * 4;

  return (
    <div
      className={`[perspective:1000px] transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 130}ms` }}
    >
      <div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2.25rem] border border-stone-200/80 bg-white p-9 shadow-xs transition-all duration-300 ease-out hover:-translate-y-2.5 hover:border-emerald-200 hover:shadow-[0_24px_48px_rgba(15,41,34,0.12)]"
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-px rounded-[2.25rem] bg-gradient-to-br ${glowColor} transition-opacity duration-500 ${
            spot.active ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            maskImage: `radial-gradient(260px circle at ${spot.x}% ${spot.y}%, black, transparent)`,
            WebkitMaskImage: `radial-gradient(260px circle at ${spot.x}% ${spot.y}%, black, transparent)`,
          }}
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-6 right-7 select-none text-4xl font-black tracking-tighter text-stone-100 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-100"
        >
          {step}
        </span>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-7">
            <div
              className={`absolute -inset-2.5 rounded-3xl ${accentColor} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-90`}
            />
            <div
              style={{
                transform: `translateY(${floatY}px) rotate(${floatRotate}deg)`,
              }}
              className={`relative flex h-20 w-20 items-center justify-center rounded-3xl ${accentColor} ring-4 ring-transparent ${ringColor} shadow-xs transition-shadow duration-300 group-hover:scale-110`}
            >
              <span
                className="text-4xl transition-transform duration-300 group-hover:scale-110"
                role="img"
                aria-label={title}
              >
                {emoji}
              </span>
            </div>
          </div>

          <h3 className="mb-3 text-2xl font-extrabold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-emerald-700">
            {title}
          </h3>

          <p className="font-medium leading-relaxed text-slate-600">{text}</p>
        </div>

        <div className="relative z-10 mt-8 flex items-center justify-between border-t border-stone-100 pt-5">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-bold ${pillStyle}`}
          >
            {tag}
          </span>

          <Link
            to="/recipes"
            className="inline-flex items-center gap-1 text-xs font-extrabold text-slate-500 transition-colors duration-200 group-hover:text-orange-600"
          >
            <span>Explore</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div
          aria-hidden="true"
          className={`absolute inset-x-8 bottom-0 h-1 rounded-t-full bg-gradient-to-r ${barColor} scale-x-0 transition-transform duration-500 group-hover:scale-x-100`}
        />
      </div>
    </div>
  );
};

export default FeaturesSection;