import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './../assets/images/logo.gif';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Recipes', to: '/recipes' },
  { label: 'Favorites', to: '/recipes?view=favorites' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname, search } = useLocation();
  const currentFullPath = `${pathname}${search}`;

  const isLinkActive = (to) => {
    if (to.includes('?')) {
      return currentFullPath === to;
    }
    if (to === '/recipes') {
      return pathname === '/recipes' && !search.includes('view=favorites');
    }
    return pathname === to;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900/10 bg-light-neutral-100/90 shadow-[0_8px_30px_rgba(16,185,129,0.08)] backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3.5 sm:px-6">
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="group flex items-center space-x-3 focus:outline-none"
        >
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
            <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-400/50 via-amber-300/40 to-orange-400/50 opacity-65 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-lg" />
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-emerald-200/80 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img
                src={Logo}
                className="logo-img h-full w-full scale-125 object-cover"
                alt="Recipe app logo"
              />
            </div>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-emerald-950">
            Fresh
            <span className="text-emerald-600 drop-shadow-[0_0_10px_rgba(16,185,129,0.35)]">
              Recipes
            </span>
          </span>
        </Link>

        <nav className="hidden items-center space-x-7 md:flex">
          {navItems.map((item) => {
            const active = isLinkActive(item.to);

            return (
              <Link
                key={item.label}
                to={item.to}
                className={`group relative px-2 py-1.5 text-[15px] font-medium transition-all duration-300 ${
                  active
                    ? 'font-semibold text-emerald-700 drop-shadow-[0_0_8px_rgba(16,185,129,0.28)]'
                    : 'text-gray-600 hover:-translate-y-0.5 hover:text-gray-950'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`pointer-events-none absolute inset-x-0 -bottom-0.5 h-[2.5px] rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-orange-400 shadow-[0_0_10px_rgba(16,185,129,0.75)] transition-all duration-300 ${
                    active
                      ? 'w-full opacity-100'
                      : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          to="/recipes"
          className="group relative hidden items-center gap-2 overflow-hidden rounded-full bg-[#0f2922] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(16,185,129,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#14382e] hover:shadow-[0_0_24px_rgba(16,185,129,0.55)] active:translate-y-0 md:inline-flex"
        >
          <span className="relative z-10">Browse Recipes</span>
          <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-emerald-300/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full"
          />
        </Link>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-xs transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50/50 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-emerald-900/10 bg-light-neutral-0/95 px-4 py-4 shadow-lg backdrop-blur-md md:hidden">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const active = isLinkActive(item.to);

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-all ${
                    active
                      ? 'bg-emerald-50 font-semibold text-emerald-700 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                      : 'text-gray-700 hover:bg-emerald-50/50 hover:text-emerald-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              to="/recipes"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f2922] px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_6px_18px_rgba(16,185,129,0.28)] transition-all duration-300 hover:bg-[#14382e]"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Browse Recipes</span>
              <span>→</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;