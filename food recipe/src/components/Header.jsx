import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './../assets/images/logo.gif';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-light-neutral-100 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-light-neutral-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300">
          <img src={Logo} className="logo-img" alt="Company Logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="relative text-gray-600 font-medium px-3 py-2 transition-all duration-300 hover:text-primary group"
          >
            Home
            <span className="absolute left-0 -bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/about"
            className="relative text-gray-600 font-medium px-3 py-2 transition-all duration-300 hover:text-primary group"
          >
            About
            <span className="absolute left-0 -bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/recipes"
            className="relative text-gray-600 font-medium px-3 py-2 transition-all duration-300 hover:text-primary group"
          >
            Recipes
            <span className="absolute left-0 -bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Browse Recipes Button (Desktop Only) */}
        <Link
          to="/recipes"
          className="hidden md:block bg-primary text-light-neutral-0 px-6 py-3 rounded-xl 
          hover:bg-secondary transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Browse Recipes
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-800 transition-all"
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-light-neutral-0 border-t border-light-neutral-200 shadow-sm">
          <nav className="flex flex-col space-y-3 px-4 py-4">

            <Link
              to="/"
              className="text-gray-700 hover:text-primary transition-all text-left font-medium border-b border-transparent hover:border-primary pb-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-gray-700 hover:text-primary transition-all text-left font-medium border-b border-transparent hover:border-primary pb-1"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            <Link
              to="/recipes"
              className="text-gray-700 hover:text-primary transition-all text-left font-medium border-b border-transparent hover:border-primary pb-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Recipes
            </Link>

            <Link
              to="/recipes"
              className="bg-primary text-light-neutral-0 px-6 py-3 rounded-xl 
              hover:bg-secondary transition-all duration-300 font-semibold shadow-lg hover:shadow-xl text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Recipes
            </Link>

          </nav>
        </div>
      )}
    </div>
  );
}

export default Header;

