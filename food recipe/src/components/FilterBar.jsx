import { ChevronDown } from "lucide-react";
import { Search } from "lucide-react";

import React from "react";

function FilterBar({ categories = [], onCategoryChange, onPrepTimeChange, onCookTimeChange, onSearch }) {
  const prepTimeOptions = ["Any", "5", "10", "15", "20"];
  const cookTimeOptions = ["Any", "10", "20", "30", "40"];

  return (
    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-xl mb-12 border border-orange-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Category
          </label>
          <div className="relative">
            <select
              className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 appearance-none bg-white shadow-sm hover:shadow-md font-medium"
              onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Max Prep Time
          </label>
          <div className="relative">
            <select
              className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 appearance-none bg-white shadow-sm hover:shadow-md font-medium"
              onChange={(e) => onPrepTimeChange && onPrepTimeChange(e.target.value)}
            >
              {prepTimeOptions.map((time) => (
                <option key={time} value={time}>
                  {time} min
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Max Cook Time
          </label>
          <div className="relative">
            <select
              className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 appearance-none bg-white shadow-sm hover:shadow-md font-medium"
              onChange={(e) => onCookTimeChange && onCookTimeChange(e.target.value)}
            >
              {cookTimeOptions.map((time) => (
                <option key={time} value={time}>
                  {time} min
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
        </div>
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or ingredient...."
              className="w-full px-5 py-4 pl-12 border border-gray-300 rounded-2xl focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300 shadow-sm hover:shadow-md font-medium"
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;