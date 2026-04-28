import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-stone-100/10">
      <div className="flex justify-between items-center px-4 sm:px-8 py-4 max-w-screen-2xl mx-auto">
        <Link to="/" className="text-xl font-bold tracking-tighter text-[#00450d] font-headline">
          Pareeza Enterprises
        </Link>

        {/* Desktop Menu - Center */}
        <div className="hidden md:flex items-center gap-8 font-headline font-semibold tracking-tight">
          {/* Home */}
          <Link to="/" className={`text-stone-600 hover:text-[#00450d] transition-colors ${isActive('/') ? 'text-[#00450d] border-b-2 border-[#00450d] pb-1' : ''}`}>
            Home
          </Link>

          {/* Products Dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-1 py-2 ${isActive('/products') ? 'text-[#00450d] border-b-2 border-[#00450d] pb-1' : 'text-stone-600 hover:text-[#00450d]'} transition-colors`}>
              Products
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
              <div className="py-2">
                <Link to="/products/meat-seafood" className="block px-4 py-2 text-sm text-stone-700 hover:bg-[#f4f4ef] hover:text-[#00450d] transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00450d]"></span>
                    Meat & Seafood
                  </span>
                </Link>
                <Link to="/products/rice-spices" className="block px-4 py-2 text-sm text-stone-700 hover:bg-[#f4f4ef] hover:text-[#00450d] transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#7a5649]"></span>
                    Rice & Spices
                  </span>
                </Link>
                <Link to="/products/fruits-vegetables" className="block px-4 py-2 text-sm text-stone-700 hover:bg-[#f4f4ef] hover:text-[#00450d] transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#503600]"></span>
                    Fruits & Vegetables
                  </span>
                </Link>
                <Link to="/products/canned-goods" className="block px-4 py-2 text-sm text-stone-700 hover:bg-[#f4f4ef] hover:text-[#00450d] transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ffdeac]"></span>
                    Canned Goods
                  </span>
                </Link>
                <Link to="/products/nuts-flavors" className="block px-4 py-2 text-sm text-stone-700 hover:bg-[#f4f4ef] hover:text-[#00450d] transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ffba38]"></span>
                    Nuts & Flavors
                  </span>
                </Link>
                <Link to="/products/bakery" className="block px-4 py-2 text-sm text-stone-700 hover:bg-[#f4f4ef] hover:text-[#00450d] transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#91d78a]"></span>
                    Bakery Products
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* About Dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-1 py-2 ${isActive('/about') ? 'text-[#00450d] border-b-2 border-[#00450d] pb-1' : 'text-stone-600 hover:text-[#00450d]'} transition-colors`}>
              About
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
              <div className="py-2">
                <Link to="/about" className="block px-4 py-2 text-sm text-stone-700 hover:bg-[#f4f4ef] hover:text-[#00450d] transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00450d]"></span>
                    About Us
                  </span>
                </Link>
                <Link to="/quality" className="block px-4 py-2 text-sm text-stone-700 hover:bg-[#f4f4ef] hover:text-[#00450d] transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#91d78a]"></span>
                    Quality & Certifications
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Services Dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-1 py-2 ${isActive('/services') ? 'text-[#00450d] border-b-2 border-[#00450d] pb-1' : 'text-stone-600 hover:text-[#00450d]'} transition-colors`}>
              Services
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
              <div className="py-2">
                <Link to="/logistics" className="block px-4 py-2 text-sm text-stone-700 hover:bg-[#f4f4ef] hover:text-[#00450d] transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00450d]"></span>
                    Global Logistics
                  </span>
                </Link>
                <Link to="/sourcing" className="block px-4 py-2 text-sm text-stone-700 hover:bg-[#f4f4ef] hover:text-[#00450d] transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#7a5649]"></span>
                    Sourcing
                  </span>
                </Link>
                <Link to="/procurement" className="block px-4 py-2 text-sm text-stone-700 hover:bg-[#f4f4ef] hover:text-[#00450d] transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#503600]"></span>
                    Procurement Center
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Contact */}
          <Link to="/contact" className={`text-stone-600 hover:text-[#00450d] transition-colors ${isActive('/contact') ? 'text-[#00450d] border-b-2 border-[#00450d] pb-1' : ''}`}>
            Contact
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="hidden lg:flex items-center bg-[#f4f4ef] px-4 py-2 rounded-full border border-[#c0c9bb]/20">
            <Search className="w-4 h-4 text-[#41493e] mr-2" />
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-48 font-sans"
              placeholder="Search Produce..."
              type="text"
            />
          </div>

          {/* Enquire Now - Desktop */}
          <Link to="/procurement" className="hidden md:block bg-[#00450d] text-white px-6 py-2.5 rounded-md hover:opacity-90 transition-all duration-300 font-headline font-semibold text-sm">
            Enquire Now
          </Link>

          {/* Partner - Desktop */}
          <Link to="/vendor-login" className="hidden lg:flex items-center gap-2 bg-[#fafaf5] text-[#00450d] px-4 py-2.5 rounded-md hover:bg-[#f4f4ef] transition-all duration-300 font-headline font-semibold text-sm border border-[#00450d]/20">
            <span className="material-symbols-outlined text-sm">storefront</span>
            Partner
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#00450d]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden lg:hidden bg-white border-t border-stone-100/10 px-4 py-4 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-4">
            {/* Home */}
            <Link
              to="/"
              className={`font-headline font-semibold tracking-tight ${isActive('/') ? 'text-[#00450d]' : 'text-stone-600'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full font-headline font-semibold tracking-tight text-stone-600 py-2"
                onClick={() => setOpenDropdown(openDropdown === 'products' ? null : 'products')}
              >
                Products
                <span className={`material-symbols-outlined text-sm transition-transform ${openDropdown === 'products' ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              {openDropdown === 'products' && (
                <div className="mt-2 ml-4 flex flex-col gap-2">
                  <Link to="/products/meat-seafood" className="text-sm text-stone-700 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                    Meat & Seafood
                  </Link>
                  <Link to="/products/rice-spices" className="text-sm text-stone-700 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                    Rice & Spices
                  </Link>
                  <Link to="/products/fruits-vegetables" className="text-sm text-stone-700 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                    Fruits & Vegetables
                  </Link>
                  <Link to="/products/canned-goods" className="text-sm text-stone-700 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                    Canned Goods
                  </Link>
                  <Link to="/products/nuts-flavors" className="text-sm text-stone-700 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                    Nuts & Flavors
                  </Link>
                  <Link to="/products/bakery" className="text-sm text-stone-700 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                    Bakery Products
                  </Link>
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full font-headline font-semibold tracking-tight text-stone-600 py-2"
                onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')}
              >
                About
                <span className={`material-symbols-outlined text-sm transition-transform ${openDropdown === 'about' ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              {openDropdown === 'about' && (
                <div className="mt-2 ml-4 flex flex-col gap-2">
                  <Link to="/about" className="text-sm text-stone-700 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                    About Us
                  </Link>
                  <Link to="/quality" className="text-sm text-stone-700 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                    Quality & Certifications
                  </Link>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full font-headline font-semibold tracking-tight text-stone-600 py-2"
                onClick={() => setOpenDropdown(openDropdown === 'services' ? null : 'services')}
              >
                Services
                <span className={`material-symbols-outlined text-sm transition-transform ${openDropdown === 'services' ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              {openDropdown === 'services' && (
                <div className="mt-2 ml-4 flex flex-col gap-2">
                  <Link to="/logistics" className="text-sm text-stone-700 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                    Global Logistics
                  </Link>
                  <Link to="/sourcing" className="text-sm text-stone-700 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                    Sourcing
                  </Link>
                  <Link to="/procurement" className="text-sm text-stone-700 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                    Procurement Center
                  </Link>
                </div>
              )}
            </div>

            {/* Contact */}
            <Link
              to="/contact"
              className={`font-headline font-semibold tracking-tight ${isActive('/contact') ? 'text-[#00450d]' : 'text-stone-600'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile Search */}
            <div className="flex items-center bg-[#f4f4ef] px-4 py-2 rounded-full border border-[#c0c9bb]/20 mt-2">
              <Search className="w-4 h-4 text-[#41493e] mr-2" />
              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-full font-sans"
                placeholder="Search Produce..."
                type="text"
              />
            </div>

            {/* Mobile Buttons */}
            <Link
              to="/procurement"
              className="bg-[#00450d] text-white px-6 py-2.5 rounded-md hover:opacity-90 transition-all duration-300 font-headline font-semibold text-sm text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Enquire Now
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
