# 🍲 Recipe App

A responsive recipe browsing app built with **React** and **Tailwind CSS**. Recipes come from the public [TheMealDB API](https://www.themealdb.com/api.php). Users can search, filter, view full recipes and save their favourites.

🔗 **Live demo:** https://food-recipesforeveryone.netlify.app

## ✨ Features

- **Pantry** – add the ingredients you have (type, paste a comma separated list, or tap the quick-add groups). The app shows **"You can make N recipes"**, ranks recipes by how few ingredients you are missing, and tells you exactly what is missing. Salt, pepper and water are assumed.
- **"Do you have?" suggestions** – ingredients that unlock the most extra recipes.
- **Search** – find recipes by dish name, ingredient, category or cuisine.
- **Filters** – Key ingredient(s), Exclude, Meal type, Cuisines, Diet (approximate), Video only, Missing one ingredient, Can make now, Max ingredients. All filters work together with search and pantry.
- **Recipe details** – ingredients (✓ in pantry / ✗ need to buy), step-by-step instructions, tags, YouTube video link and a "Back to recipes" button.
- **Favorites** – tap the ❤️ on any recipe. Favorites open in their own tab (and from the navbar) and search / filters work there too.
- **Everything is saved in localStorage** – favorites, pantry, filters and the downloaded recipe catalog stay after a refresh or closing the browser.
- Loading skeletons, empty states, error message with **Retry**, fully responsive layout.

## 🛠️ Tech Stack

| Purpose | Tool |
| --- | --- |
| UI library | React 19 |
| Build tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router |
| Icons | lucide-react |
| Data | TheMealDB public API (fetch) + localStorage |
| Hosting | Netlify |

## 🚀 Getting Started

> The React project lives inside the **`food recipe`** folder of this repository.

```bash
# 1. Clone the repository
git clone https://github.com/kowsalyadevivijay-cloud/food-recipe-app.git

# 2. Go into the project folder (quotes are needed because of the space)
cd food-recipe-app/"food recipe"

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build     # production build
npm run preview   # preview the production build
```

## 📁 Project Structure

```
food recipe/
├── public/
│   └── _redirects          # Netlify SPA routing
└── src/
    ├── components/         # Header, Footer, FilterBar, RecipeCard, RecipeGrid, RecipeModel ...
    ├── hooks/
    │   ├── useRecipes.js      # loads the full recipe catalog (cached in localStorage)
    │   ├── useFavorites.js    # favorites
    │   └── useLocalStorage.js # useState that persists in localStorage
    ├── lib/
    │   └── pantry.js          # pantry matching, filtering, ranking, suggestions
    ├── pages/              # HomePage, AboutPage, RecipesPage
    ├── Services/
    │   └── recipeApi.js    # TheMealDB API calls + data transform
    ├── App.jsx             # routes
    └── main.jsx
```

## 🌐 API

Data comes from [TheMealDB](https://www.themealdb.com/api.php). On the first visit the app loads the whole catalog with `search.php?f=a` ... `search.php?f=z`  and keeps it in localStorage for a week. After that, searching, filtering and pantry matching run instantly in the browser.

## ☁️ Deployment

Deployed on Netlify. `public/_redirects` contains `/* /index.html 200` so page refreshes on routes like `/recipes` work.
