import React from "react";
import { Utensils, Users, Clock, Award, Heart, Leaf, ChevronRight, Zap, Globe } from "lucide-react";
import KitchenImage from "./../assets/images/Kitchen.jpg";
import { ArrowRight } from "lucide-react";


/**
 * AboutPage - Light & Bright "Morning Harvest" Theme
 * Primary Colors: Emerald-600, Amber-500, Sky-400
 * Background: Pearl White / Soft Sand
 */
function AboutPage() {
  const stats = [
    { number: "10K+", label: "Happy Cooks", icon: Users, color: "from-emerald-400 to-teal-500" },
    { number: "500+", label: "Recipes", icon: Utensils, color: "from-orange-400 to-amber-500" },
    { number: "30m", label: "Avg. Time", icon: Clock, color: "from-sky-400 to-blue-500" },
    { number: "4.9", label: "User Stars", icon: Award, color: "from-rose-400 to-pink-500" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Bio-Available Nutrition",
      description: "We focus on ingredients your body actually absorbs. Health is deeper than a calorie count.",
      accent: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      icon: Zap,
      title: "Kitchen Performance",
      description: "Our recipes are 'engineered'—optimized workflows that get you from prep to plate in record time.",
      accent: "bg-amber-50 text-amber-600 border-amber-100"
    },
    {
      icon: Globe,
      title: "Global Sustainability",
      description: "We prioritize ingredients that have a low carbon footprint and high local impact.",
      accent: "bg-sky-50 text-sky-600 border-sky-100"
    },
  ];

  const team = [
    { name: "Sarah Johnson", role: "Executive Chef", img: "https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { name: "Michael Chen", role: "Product Designer", img: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { name: "Emma Rodriguez", role: "Recipe Analyst", img: "https://images.pexels.com/photos/3768997/pexels-photo-3768997.jpeg?auto=compress&cs=tinysrgb&w=400" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFB] text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* HERO SECTION - Updated to Emerald/Orange Gradient */}

<section className="relative py-24 lg:py-36 overflow-hidden bg-gradient-to-br from-emerald-50 via-orange-50 to-emerald-100">

<div className="container mx-auto px-4 text-center relative z-10">

<h1 className="text-6xl lg:text-8xl font-black mb-6 tracking-tight">

<span className="bg-gradient-to-r from-emerald-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">

Our Flavor Legacy

</span>

</h1>

<p className="text-xl lg:text-2xl text-slate-800 max-w-3xl mx-auto leading-relaxed mb-10 font-medium">

We’re redefining the art of home cooking. Just pure, soul-warming food designed for the modern lifestyle.

</p>

<div className="w-24 h-2 bg-emerald-600 mx-auto rounded-full shadow-lg"></div>

</div>

</section> 
      {/* 2. STATS - Floating Glass Style */}
      <section className="px-6 -mt-8 relative z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-md border border-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-emerald-100 transition-all group">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform`}>
                <stat.icon size={22} className="text-white" />
              </div>
              <p className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{stat.number}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MISSION - Warm Asymmetry */}
       {/* MISSION SECTION */}

<section className="py-24 lg:py-32 bg-stone-50">

<div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

<div className="order-2 lg:order-1">

<h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight">

A Kitchen Born <br/>

<span className="bg-gradient-to-r from-emerald-500 to-orange-500 bg-clip-text text-transparent italic">From Curiosity</span>

</h2>

<div className="space-y-6 text-lg text-slate-700 leading-relaxed font-medium">

<p>We bridge the gap between gourmet excellence and everyday convenience.</p>

<p className="border-l-4 border-orange-400 pl-6 italic text-slate-600 bg-orange-50/50 py-4 rounded-r-xl">

"Our philosophy is simple: If you can't find it at your market, it doesn't belong on our table."

</p>

</div>

</div>

<div className="order-1 lg:order-2 relative group flex justify-center">

{/* Dynamic Glow updated to Emerald/Orange */}

<div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-orange-400 rounded-[2.5rem] blur-2xl opacity-30"></div>

<div className="relative rounded-[2rem] overflow-hidden shadow-2xl p-1.5 bg-gradient-to-tr from-emerald-500 via-yellow-400 to-orange-500 max-w-[450px] w-full">

<div className="bg-white rounded-[calc(2rem-6px)] overflow-hidden">

<img src={KitchenImage} alt="Our Kitchen" className="w-full h-auto object-contain block" />

</div>

</div>

</div>

</div>

</section> 

      {/* 4. VALUES - Card Bento Grid */}
      <section className="py-24 bg-[#F7F7F2]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-3xl font-black text-slate-900 mb-16 tracking-tight">The Three Pillars</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className={`p-10 rounded-[2.5rem] border-2 transition-all hover:-translate-y-2 bg-white ${v.accent}`}>
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                  <v.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{v.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TEAM - Simple & Transparent */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-20 tracking-tight">The Makers</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {team.map((m, i) => (
              <div key={i} className="group">
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-0 bg-emerald-500 rounded-[2rem] rotate-6 scale-95 opacity-0 group-hover:opacity-10 transition-all duration-500" />
                  <img 
                    src={m.img} 
                    alt={m.name} 
                    className="w-48 h-56 rounded-[2.5rem] object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-500 shadow-lg shadow-slate-200"
                  />
                </div>
                <h4 className="text-xl font-bold text-slate-900">{m.name}</h4>
                <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     <section className="relative py-28 bg-gradient-to-br from-zinc-900 via-neutral-900 to-stone-950 text-center overflow-hidden">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25),transparent_60%)] blur-2xl"></div>

  <div className="container mx-auto px-6 max-w-3xl relative z-10">

    <h2 className="text-5xl font-light text-white mb-6 tracking-tight">
      Taste the <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Unexpected</span>
    </h2>

    <p className="text-zinc-400 mb-12 text-base">
      A quiet revolution in your everyday cooking.
    </p>

   <button className="bg-white text-rose-500 
hover:bg-rose-50 hover:text-rose-600
px-12 py-5 rounded-2xl font-black text-lg 
hover:scale-105 transition-all duration-300 
flex items-center gap-3 mx-auto shadow-lg">
  Explore now <ArrowRight size={20} />
</button>

  </div>
</section>




    </div>
  );
}

export default AboutPage;