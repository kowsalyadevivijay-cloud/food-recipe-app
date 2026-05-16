import React from 'react';
import Header from '../components/Header.jsx';
import HeroSection from '../components/HeroSection.jsx'; 
import FeaturesSection from "../components/FeaturesSection.jsx";
import AboutSection from '../components/AboutSection.jsx';
import CTASection from '../components/CTASection.jsx';


function HomePage() {
    return (
        <div className="min-h-screen bg-light-neutral-100 flex flex-col">
           
            <main className="flex-grow">
                <HeroSection />
                <FeaturesSection />
                <AboutSection />
                <CTASection />
            </main>
          
        </div>
    );
}

export default HomePage;
