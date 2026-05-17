import react from 'react'
import Header from './components/Header.jsx';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import RecipesPage from './pages/RecipesPage.jsx';
import Footer from './components/Footer.jsx';
function App() {
  return(
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50">
        <Header/>
         <main>
          <Routes>
           <Route path="/" element={<HomePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
        <Route path="/recipes" element={<RecipesPage/>}/>
          </Routes>
       </main>
           <Footer />
      </div>
    </Router>
  );
}
export default App;

