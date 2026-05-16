import React from 'react';

// 1. In a real project, we store this data outside the component 
// to keep the logic clean and easy to edit later.
const FEATURES_DATA = [
    {
        title: "Fresh Ingredients",
        text: "We source everything locally to ensure your body gets the nutrients it deserves.",
        emoji: "🌱",
        accentColor: "bg-green-100"
    },
    {
        title: "Under 30 Minutes",
        text: "Cooking shouldn't be a chore. Our recipes are designed for your busy lifestyle.",
        emoji: "⏱️",
        accentColor: "bg-orange-100"
    },
    {
        title: "Joyful Kitchens",
        text: "We believe a happy life starts with a simple, home-cooked meal shared with love.",
        emoji: "👨‍🍳",
        accentColor: "bg-blue-100"
    }
];

function FeaturesSection() {
    return (
        <section className="features-wrapper py-24 bg-light-neutral-100">
            <div className="container mx-auto px-6 max-w-7xl">
                
                {/* Header Section: Centered and meaningful */}
                <header className="text-center mb-20">
                    <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">
                        Why Choose Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-primary mt-3 mb-6">
                        What will you get?
                    </h2>
                    <p className="text-secondary text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                        Beyond just recipes, we provide a lifestyle built on simplicity, 
                        freshness, and the joy of a home-cooked meal.
                    </p>
                    {/* A "man-made" design touch: a small centered divider */}
                    <div className="mt-8 flex justify-center">
                        <div className="h-1.5 w-16 bg-green-500 rounded-full"></div>
                    </div>
                </header>

                {/* The Grid: Responsive and clean */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURES_DATA.map((item, i) => (
                        <FeatureCard key={`feature-${i}`} data={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
const FeatureCard = ({ data }) => {
    const { title, text, emoji, accentColor } = data;
    
    return (
        <div className="group bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-green-100">
            <div className="flex flex-col items-center text-center">
                
                {/* Icon Box with dynamic accent colors */}
                <div className={`w-20 h-20 ${accentColor} rounded-3xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform duration-300`}>
                    <span className="text-4xl" role="img" aria-label={title}>
                        {emoji}
                    </span>
                </div>

                <h3 className="text-primary text-2xl font-bold mb-4">
                    {title}
                </h3>
                
                <p className="text-secondary leading-relaxed font-medium">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default FeaturesSection;