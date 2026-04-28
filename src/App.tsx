import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AuthProvider } from './contexts/AuthContext';
import { CMSProvider } from './contexts/CMSContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import CategoryDetail from './pages/CategoryDetail';
import ProductsPage from './pages/Products';
import Categories from './pages/Categories';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import Quality from './pages/Quality';
import Sourcing from './pages/Sourcing';
import ProcurementCenter from './pages/ProcurementCenter';
import MeatSeafood from './pages/MeatSeafood';
import RiceSpices from './pages/RiceSpices';
import FruitsVegetables from './pages/FruitsVegetables';
import CannedGoods from './pages/CannedGoods';
import NutsFlavors from './pages/NutsFlavors';
import BakeryProducts from './pages/BakeryProducts';
import AllProducts from './pages/AllProducts';
import GlobalLogistics from './pages/GlobalLogistics';
import VendorLogin from './pages/VendorLogin';
import TradePolicy from './pages/TradePolicy';
import Certifications from './pages/Certifications';
import NewAdminDashboard from './pages/NewAdminDashboard';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    const lenis = {
      raf: () => {
        ScrollTrigger.update();
      }
    };

    requestAnimationFrame(lenis.raf);

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <CMSProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              {/* Public routes with full layout */}
              <Route path="/login" element={<Login />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/register" element={<Register />} />

              {/* Public routes - pages have their own Navigation and Footer */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:category" element={
                <>
                  <Navigation />
                  <main><ProductDetail /></main>
                  <Footer />
                </>
              } />
              <Route path="/products/meat-seafood" element={<MeatSeafood />} />
              <Route path="/products/rice-spices" element={<RiceSpices />} />
              <Route path="/products/fruits-vegetables" element={<FruitsVegetables />} />
              <Route path="/products/canned-goods" element={<CannedGoods />} />
              <Route path="/products/nuts-flavors" element={<NutsFlavors />} />
              <Route path="/products/bakery" element={<BakeryProducts />} />
              <Route path="/all-products" element={<AllProducts />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:categoryId" element={
                <>
                  <Navigation />
                  <main><CategoryDetail /></main>
                  <Footer />
                </>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/quality" element={<Quality />} />
              <Route path="/logistics" element={<GlobalLogistics />} />
              <Route path="/sourcing" element={<Sourcing />} />
              <Route path="/procurement" element={<ProcurementCenter />} />
              <Route path="/trade-policy" element={<TradePolicy />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/vendor-login" element={<VendorLogin />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin route - NewAdminDashboard handles auth internally */}
              <Route path="/admin" element={<NewAdminDashboard />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </CMSProvider>
  );
}

export default App;
