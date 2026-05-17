import React from "react";
import Logo from "../assets/images/logo.gif";
import { Instagram, Twitter, Youtube, Twitch } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#FFDAB9] to-[#98FB98] py-8 shadow-inner">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
        
          <div className="text-center md:text-left">
            <img 
              src={Logo} 
              alt="Logo" 
              className="h-10 w-auto hover:scale-105 transition-transform duration-300" 
            />
          </div>

         
          <div className="flex items-center justify-center space-x-1 text-gray-700 font-semibold">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>and</span>
            <span className="text-orange-500">🍕</span>
          </div>

         
          <div className="flex items-center justify-center md:justify-end space-x-4">
          
            <a 
              href="#" 
              className="w-11 h-11 bg-white/60 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-sm hover:scale-110"
            >
              <Instagram className="h-5 w-5 text-[#E4405F]" />
            </a>

           
            <a 
              href="#" 
              className="w-11 h-11 bg-white/60 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-sm hover:scale-110"
            >
              <Twitch className="h-5 w-5 text-[#9146FF]" />
            </a>

          
            <a 
              href="#" 
              className="w-11 h-11 bg-white/60 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-sm hover:scale-110"
            >
              <Twitter className="h-5 w-5 text-[#1DA1F2]" />
            </a>

            
            <a 
              href="#" 
              className="w-11 h-11 bg-white/60 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-sm hover:scale-110"
            >
              <Youtube className="h-5 w-5 text-[#CD201F]" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;