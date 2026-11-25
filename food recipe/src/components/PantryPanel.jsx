import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { normalize } from "../lib/pantry";

const GROUPS = [
  { title: "Pantry Essentials", icon: "🧺", items: ["Butter", "Eggs", "Garlic", "Milk", "Onion", "Sugar", "Flour", "Olive Oil", "Vegetable Oil", "Garlic Powder", "Rice", "Cinnamon", "Ketchup", "Soy Sauce", "Mayonnaise", "Honey", "Vinegar", "Baking Powder"] },
  { title: "Vegetables & Greens", icon: "🥦", items: ["Tomatoes", "Potatoes", "Carrots", "Spinach", "Mushrooms", "Ginger", "Chilli", "Cucumber", "Cabbage", "Peas", "Broccoli", "Celery", "Aubergine", "Spring Onions", "Red Pepper", "Green Pepper", "Sweet Potato"] },
  { title: "Meat & Seafood", icon: "🍗", items: ["Chicken", "Chicken Breast", "Beef", "Minced Beef", "Lamb", "Pork", "Bacon", "Sausages", "Salmon", "Prawns", "Tuna"] },
  { title: "Dairy & Cheese", icon: "🧀", items: ["Cheese", "Cheddar Cheese", "Parmesan", "Yogurt", "Double Cream", "Feta", "Mozzarella", "Cream Cheese"] },
  { title: "Fruits", icon: "🍋", items: ["Lemon", "Lime", "Banana", "Apple", "Orange", "Coconut Milk", "Raisins", "Strawberries"] },
  { title: "Spices & Herbs", icon: "🌿", items: ["Cumin", "Paprika", "Turmeric", "Coriander", "Oregano", "Basil", "Parsley", "Thyme", "Chilli Powder", "Garam Masala", "Bay Leaf", "Nutmeg", "Cayenne Pepper"] },
  { title: "Pasta, Grains & Bread", icon: "🍝", items: ["Spaghetti", "Pasta", "Basmati Rice", "Bread", "Noodles", "Oats", "Couscous", "Breadcrumbs"] },
];

function PantryPanel({ pantry, onToggle, onRemove, onClear }) {
  const [openGroup, setOpenGroup] = useState(GROUPS[0].title);
  const [showNote, setShowNote] = useState(true);
  const pantryNorm = pantry.map(normalize);
  const isIn = (name) => pantryNorm.includes(normalize(name));

  return (
    <div className="space-y-5">
      {showNote && (
        <div className="relative bg-white border border-gray-300 rounded-lg p-4 pr-10 text-gray-700">
          The only ingredients we assume you have are salt, pepper and water
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setShowNote(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg">Your ingredients ({pantry.length})</h3>
          {pantry.length > 0 && (
            <button type="button" onClick={onClear} className="text-sm font-semibold text-orange-600 hover:underline">
              Clear all
            </button>
          )}
        </div>
        {pantry.length === 0 ? (
          <p className="text-gray-500 text-sm">Nothing yet. Type above or tap the ingredients below.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {pantry.map((name) => (
              <span key={name} className="inline-flex items-center gap-1 bg-emerald-500 text-white pl-3 pr-1 py-1 rounded-lg font-semibold">
                {name}
                <button
                  type="button"
                  aria-label={`Remove ${name}`}
                  onClick={() => onRemove(name)}
                  className="p-1 rounded hover:bg-white/20"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {GROUPS.map((group) => {
        const count = group.items.filter(isIn).length;
        const open = openGroup === group.title;
        return (
          <div key={group.title} className="bg-white rounded-2xl shadow overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenGroup(open ? "" : group.title)}
              className="w-full flex items-center gap-4 p-5 text-left"
              aria-expanded={open}
            >
              <span className="text-4xl">{group.icon}</span>
              <span className="flex-1">
                <span className="block font-bold text-lg">{group.title}</span>
                <span className="block text-sm text-gray-500">
                  {count}/{group.items.length} Ingredients
                </span>
              </span>
              <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div className="flex flex-wrap gap-2 px-5 pb-5 border-t border-gray-100 pt-4">
                {group.items.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => onToggle(name)}
                    aria-pressed={isIn(name)}
                    className={`px-3 py-2 rounded-lg font-semibold transition ${
                      isIn(name) ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PantryPanel;
