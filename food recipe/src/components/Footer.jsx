import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.gif";
import { Instagram, Twitter, Youtube, Twitch } from "lucide-react";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "#instagram",
    Icon: Instagram,
    iconColor: "text-[#E4405F]",
    hoverStyle:
      "hover:border-rose-300 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white hover:shadow-[0_10px_22px_rgba(228,64,95,0.35)]",
  },
  {
    name: "Twitch",
    href: "#twitch",
    Icon: Twitch,
    iconColor: "text-[#9146FF]",
    hoverStyle:
      "hover:border-purple-300 hover:bg-[#9146FF] hover:text-white hover:shadow-[0_10px_22px_rgba(145,70,255,0.35)]",
  },
  {
    name: "Twitter",
    href: "#twitter",
    Icon: Twitter,
    iconColor: "text-[#1DA1F2]",
    hoverStyle:
      "hover:border-sky-300 hover:bg-[#1DA1F2] hover:text-white hover:shadow-[0_10px_22px_rgba(29,161,242,0.35)]",
  },
  {
    name: "YouTube",
    href: "#youtube",
    Icon: Youtube,
    iconColor: "text-[#CD201F]",
    hoverStyle:
      "hover:border-red-300 hover:bg-[#CD201F] hover:text-white hover:shadow-[0_10px_22px_rgba(205,32,31,0.35)]",
  },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-emerald-900/10 bg-gradient-to-r from-[#fff3e6] via-[#fcfaf5] to-[#e9f9ef] py-9 shadow-[0_-10px_30px_rgba(16,185,129,0.06)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 animate-pulse rounded-full bg-orange-300/30 blur-3xl [animation-duration:6s]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-16 h-60 w-60 animate-pulse rounded-full bg-emerald-400/25 blur-3xl [animation-delay:-3s] [animation-duration:7s]"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-orange-400/60 via-emerald-500/70 to-amber-400/60"
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3 md:gap-8">
          <div className="flex justify-center md:justify-start">
            <Link to="/" className="group flex items-center gap-3 focus:outline-none">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-tr from-orange-400/45 via-amber-300/35 to-emerald-400/45 opacity-60 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-lg" />
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <img src={Logo} alt="Logo" className="h-full w-full scale-125 object-cover" />
                </div>
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-800">
                  Fresh<span className="text-emerald-600">Recipes</span>
                </span>
                <p className="text-[11px] font-medium text-slate-500">
                  Wholesome meals, every day
                </p>
              </div>
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="group inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-5 py-2 text-sm font-semibold text-slate-700 shadow-2xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
              <span>Made with</span>
              <span
                className="inline-block animate-pulse text-base text-rose-500 transition-transform duration-300 group-hover:scale-125"
                aria-label="love"
              >
                ❤️
              </span>
              <span>and</span>
              <span
                className="inline-block animate-bounce text-base [animation-duration:2.5s]"
                aria-label="pizza"
              >
                🍕
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 md:justify-end">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.Icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  className={`group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/90 bg-white/80 shadow-xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-1.5 active:scale-95 ${link.hoverStyle}`}
                >
                  <Icon
                    className={`h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:text-white ${link.iconColor}`}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;