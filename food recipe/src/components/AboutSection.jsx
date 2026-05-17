import React from "react";
import cookingProcessImg from './../assets/images/about.png';
const AboutSection = () => {
    return (
        <section className="py-24 bg-light-neutral-100">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-4xl lg:text-6xl font-extrabold text-primary mb-8 leading-tight">
                            Built for real life
                        </h2>
                        <div className="space-y-6 text-lg lg:text-xl text-secondary leading-relaxed">
                            <p>
                                Cooking shouldn't be complicated; it should be a joy. 
                                Our platform is designed to make your culinary journey 
                                enjoyable and stress-free.
                            </p>
                            
                            <p>
                                With just <span className="text-primary font-bold border-b-2 border-green-200">30 minutes</span> of 
                                active time, you can create delicious, healthy meals that 
                                fit into even the busiest schedules.
                            </p>

                           
                            <div className="mt-10 border-l-4 border-green-500 pl-6 italic text-primary/80">
                                "The most delicious meals aren't made with fancy tools, 
                                but with fresh ideas and a willing heart."
                            </div>
                        </div>
                    </div>
                   
                    <div className="order-1 lg:order-2 relative group">

                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl">
                            <img 
                                src={cookingProcessImg}
                                alt="Fresh healthy ingredients being prepared" 
                                className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default AboutSection;
