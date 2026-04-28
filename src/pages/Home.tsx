import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-black md:bg-[#fafaf5] font-body text-on-surface antialiased">
      <style>{`
        .hero-image-mobile {
          width: 100vw !important;
          height: 100vh !important;
          object-fit: cover !important;
          object-position: center !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
        }
        @media (min-width: 768px) {
          .hero-image-mobile {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
          }
        }
      `}</style>
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative h-[800px] md:h-[900px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Premium Sindhri Mangoes"
              className="w-full h-full object-cover scale-105"
              src="/products/bannermango.png"
            />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 w-full">
            <div className="max-w-3xl">
              <div className="bg-black/20 backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl border border-blue-400/20">
                <span className="font-label text-yellow-400 uppercase tracking-[0.2em] text-xs sm:text-sm mb-3 sm:mb-4 block">
                  Premium Quality
                </span>
                <h1 className="font-headline font-extrabold text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-4 sm:mb-6 tracking-tight">
                  PREMIUM <br/><span className="text-yellow-400">SINDHRI MANGOES</span>
                </h1>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-2xl leading-relaxed">
                  Experience Golden Perfection - Finest Sindhri mangoes sourced directly from the orchards of Pakistan.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    to="/all-products"
                    className="bg-yellow-500 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-md font-headline font-bold text-sm sm:text-base hover:bg-yellow-400 transition-all"
                  >
                    Order Now
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-white/10 text-white border border-yellow-400/30 px-4 sm:px-6 py-2 sm:py-3 rounded-md font-headline font-bold text-sm sm:text-base hover:bg-white/20 transition-all"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Indicator */}
          <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-6 md:right-8 lg:right-12 flex gap-2 sm:gap-4 items-center">
            <div className="w-8 sm:w-12 h-1 bg-yellow-400"></div>
            <div className="w-6 sm:w-8 h-1 bg-white/30"></div>
            <div className="w-6 sm:w-8 h-1 bg-white/30"></div>
            <span className="text-white font-headline font-bold text-xs sm:text-sm ml-2 sm:ml-4">01 / 03</span>
          </div>
        </section>

        {/* Content Sections */}
        <div className="relative bg-[#fafaf5]">
          {/* Our Curated Portfolios Section */}
          <section className="py-24 bg-[#fafaf5]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-primary font-label font-bold tracking-[0.2em] text-xs mb-2 uppercase block">
                  The Global Selection
                </span>
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface">
                  Our Curated Portfolios
                </h2>
                <div className="mt-4 h-1.5 w-24 bg-primary"></div>
              </div>
              <Link
                to="/all-products"
                className="inline-flex items-center gap-2 text-primary font-headline font-bold text-sm border-b-2 border-primary/20 hover:border-primary transition-all pb-1 group"
              >
                Explore Full Range
                <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>

            {/* Desktop Grid - Hidden on Mobile */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Rice & Spices */}
              <Link
                to="/products/rice-spices"
                className="group bg-[#ffffff] rounded-2xl overflow-hidden editorial-shadow transition-all hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    alt="Rice & Spices"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="/products/home-rice-spices.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-white text-2xl font-headline font-bold">Rice & Spices</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-[#41493e] text-sm mb-6 leading-relaxed">
                    Aromatic long-grain basmati, rare whole spices, and export-grade pantry essentials sourced from volcanic soils.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-headline font-bold text-sm group/btn">
                    Explore Category
                    <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                </div>
              </Link>

              {/* Fruits & Vegetables */}
              <Link
                to="/products/fruits-vegetables"
                className="group bg-[#ffffff] rounded-2xl overflow-hidden editorial-shadow transition-all hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    alt="Fruits & Vegetables"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="/products/home-fruits-vegetables.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-white text-2xl font-headline font-bold">Fruits & Vegetables</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-[#41493e] text-sm mb-6 leading-relaxed">
                    24-hour farm-to-shipping logistics for seasonal produce, curated for brix levels and flavor profile integrity.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-headline font-bold text-sm group/btn">
                    Explore Category
                    <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                </div>
              </Link>

              {/* Nuts & Flavors */}
              <Link
                to="/products/nuts-flavors"
                className="group bg-[#ffffff] rounded-2xl overflow-hidden editorial-shadow transition-all hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    alt="Nuts & Flavors"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="/products/home-nuts-hero.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-white text-2xl font-headline font-bold">Nuts & Flavors</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-[#41493e] text-sm mb-6 leading-relaxed">
                    Macadamias, walnuts, and rare flavors. Sustainably sourced and handled with precision for maximum oil retention.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-headline font-bold text-sm group/btn">
                    Explore Category
                    <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                </div>
              </Link>

              {/* Canned Foods */}
              <Link
                to="/products/canned-goods"
                className="group bg-[#ffffff] rounded-2xl overflow-hidden editorial-shadow transition-all hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    alt="Canned Foods"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="/products/home-canned-foods.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-white text-2xl font-headline font-bold">Canned Foods</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-[#41493e] text-sm mb-6 leading-relaxed">
                    Preserving freshness through advanced canning techniques. Grade-A legumes, vegetables, and fruit preserves.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-headline font-bold text-sm group/btn">
                    Explore Category
                    <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                </div>
              </Link>

              {/* Meat & Seafood */}
              <Link
                to="/products/meat-seafood"
                className="group bg-[#ffffff] rounded-2xl overflow-hidden editorial-shadow transition-all hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    alt="Meat & Seafood"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="/products/home-meat-seafood.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-white text-2xl font-headline font-bold">Meat & Seafood</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-[#41493e] text-sm mb-6 leading-relaxed">
                    Pasture-raised cuts and sustainable oceanic catch, supported by an unbroken temperature-controlled cold chain.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-headline font-bold text-sm group/btn">
                    Explore Category
                    <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                </div>
              </Link>

              {/* Bakery Products */}
              <Link
                to="/products/bakery"
                className="group bg-[#ffffff] rounded-2xl overflow-hidden editorial-shadow transition-all hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    alt="Bakery Products"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="/products/home-bakery.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-white text-2xl font-headline font-bold">Bakery Products</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-[#41493e] text-sm mb-6 leading-relaxed">
                    Par-baked solutions and artisanal flours. High-stability products designed for global food service consistency.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-headline font-bold text-sm group/btn">
                    Explore Category
                    <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Mobile Horizontal Carousel - Visible only on mobile */}
            <div className="md:hidden flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4">
              <Link
                to="/products/rice-spices"
                className="min-w-[280px] bg-[#ffffff] rounded-2xl overflow-hidden editorial-shadow flex-shrink-0"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    alt="Rice & Spices"
                    className="w-full h-full object-cover"
                    src="/products/home-rice-spices.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-headline font-bold">Rice & Spices</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#41493e] text-sm mb-4 leading-relaxed line-clamp-2">
                    Aromatic long-grain basmati, rare whole spices, and export-grade pantry essentials.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-headline font-bold text-sm">
                    Explore
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </span>
                </div>
              </Link>

              <Link
                to="/products/fruits-vegetables"
                className="min-w-[280px] bg-[#ffffff] rounded-2xl overflow-hidden editorial-shadow flex-shrink-0"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    alt="Fruits & Vegetables"
                    className="w-full h-full object-cover"
                    src="/products/home-fruits-vegetables.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-headline font-bold">Fruits & Vegetables</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#41493e] text-sm mb-4 leading-relaxed line-clamp-2">
                    24-hour farm-to-shipping logistics for seasonal produce.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-headline font-bold text-sm">
                    Explore
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </span>
                </div>
              </Link>

              <Link
                to="/products/nuts-flavors"
                className="min-w-[280px] bg-[#ffffff] rounded-2xl overflow-hidden editorial-shadow flex-shrink-0"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    alt="Nuts & Flavors"
                    className="w-full h-full object-cover"
                    src="/products/home-nuts-hero.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-headline font-bold">Nuts & Flavors</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#41493e] text-sm mb-4 leading-relaxed line-clamp-2">
                    Macadamias, walnuts, and rare flavors.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-headline font-bold text-sm">
                    Explore
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </span>
                </div>
              </Link>

              <Link
                to="/products/canned-goods"
                className="min-w-[280px] bg-[#ffffff] rounded-2xl overflow-hidden editorial-shadow flex-shrink-0"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    alt="Canned Foods"
                    className="w-full h-full object-cover"
                    src="/products/home-canned-foods.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-headline font-bold">Canned Foods</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#41493e] text-sm mb-4 leading-relaxed line-clamp-2">
                    Preserving freshness through advanced canning techniques.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-headline font-bold text-sm">
                    Explore
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </span>
                </div>
              </Link>

              <Link
                to="/products/meat-seafood"
                className="min-w-[280px] bg-[#ffffff] rounded-2xl overflow-hidden editorial-shadow flex-shrink-0"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    alt="Meat & Seafood"
                    className="w-full h-full object-cover"
                    src="/products/home-meat-seafood.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-headline font-bold">Meat & Seafood</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#41493e] text-sm mb-4 leading-relaxed line-clamp-2">
                    Pasture-raised cuts and sustainable oceanic catch.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-headline font-bold text-sm">
                    Explore
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </span>
                </div>
              </Link>

              <Link
                to="/products/bakery"
                className="min-w-[280px] bg-[#ffffff] rounded-2xl overflow-hidden editorial-shadow flex-shrink-0"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    alt="Bakery Products"
                    className="w-full h-full object-cover"
                    src="/products/home-bakery.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-headline font-bold">Bakery Products</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[#41493e] text-sm mb-4 leading-relaxed line-clamp-2">
                    Par-baked solutions and artisanal flours.
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-headline font-bold text-sm">
                    Explore
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Product Categories: Horizontal Scrollers */}
        <section className="py-24 space-y-32 bg-[#fafaf5]">
          {/* Category: Rice & Spices */}
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-[#7a5649] font-label font-bold tracking-widest text-xs uppercase mb-2 block">
                  Pantry Essentials
                </span>
                <h2 className="text-4xl font-headline font-bold text-on-surface">Rice & Spices</h2>
              </div>
              <Link
                to="/products/rice-spices"
                className="text-primary font-headline font-bold text-sm border-b-2 border-primary/20 hover:border-primary transition-all pb-1"
              >
                Explore Full Range
              </Link>
            </div>

            <div className="flex gap-8 overflow-x-auto hide-scrollbar pb-8 -mx-4 px-4">
              {/* Product Card - Basmati */}
              <div className="min-w-[300px] flex-shrink-0 group cursor-pointer">
                <div className="aspect-[4/5] bg-[#eeeee9] overflow-hidden rounded-xl mb-6 relative">
                  <img
                    alt="Basmati Rice"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="/products/home-basmati.jpg"
                  />
                  <div className="absolute top-4 right-4 bg-[#ffdeac] px-3 py-1 rounded-full">
                    <span className="text-[10px] font-bold text-[#281900] uppercase">Export Grade</span>
                  </div>
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface mb-2">Premium Basmati</h3>
                <p className="text-[#41493e] text-sm mb-4">Aromatic extra-long grain, aged 2 years.</p>
                <Link
                  to="/contact"
                  className="w-full py-3 border border-[#c0c9bb] text-primary font-bold text-sm rounded-md hover:bg-primary hover:text-white transition-all"
                >
                  Enquire Now
                </Link>
              </div>

              {/* Product Card - Spices */}
              <div className="min-w-[300px] flex-shrink-0 group cursor-pointer">
                <div className="aspect-[4/5] bg-[#eeeee9] overflow-hidden rounded-xl mb-6 relative">
                  <img
                    alt="Whole Spices"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="/products/home-spices.jpg"
                  />
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface mb-2">Artisan Spice Mix</h3>
                <p className="text-[#41493e] text-sm mb-4">Direct sourced, non-irradiated organic spices.</p>
                <Link
                  to="/contact"
                  className="w-full py-3 border border-[#c0c9bb] text-primary font-bold text-sm rounded-md hover:bg-primary hover:text-white transition-all"
                >
                  Enquire Now
                </Link>
              </div>

              {/* Product Card - Cumin */}
              <div className="min-w-[300px] flex-shrink-0 group cursor-pointer">
                <div className="aspect-[4/5] bg-[#eeeee9] overflow-hidden rounded-xl mb-6 relative">
                  <img
                    alt="Cumin Seeds"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="/products/home-cumin.jpg"
                  />
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface mb-2">Toasted Cumin</h3>
                <p className="text-[#41493e] text-sm mb-4">High oil content, volcanic soil grown.</p>
                <Link
                  to="/contact"
                  className="w-full py-3 border border-[#c0c9bb] text-primary font-bold text-sm rounded-md hover:bg-primary hover:text-white transition-all"
                >
                  Enquire Now
                </Link>
              </div>
            </div>
          </div>

          {/* Category: Fruits & Vegetables (Asymmetric Layout) */}
          <div className="bg-[#f4f4ef] py-24">
            <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row gap-16">
              <div className="w-full md:w-1/3">
                <span className="text-primary font-label font-bold tracking-widest text-xs uppercase mb-2 block">
                  The Fresh Harvest
                </span>
                <h2 className="text-4xl font-headline font-bold text-on-surface mb-6">
                  Fruits & Vegetables
                </h2>
                <p className="text-[#41493e] leading-relaxed mb-8">
                  We pride ourselves on 24-hour farm-to-shipping logistics. Our seasonal produce is selected for flavor profiles, brix levels, and visual perfection.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                    <span className="text-on-surface font-medium">Global GAP Certified</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                    <span className="text-on-surface font-medium">Temperature Controlled Transit</span>
                  </li>
                </ul>
                <Link
                  to="/contact"
                  className="bg-[#7a5649] text-white px-8 py-3 rounded-md font-headline font-bold text-sm hover:bg-[#603f33] transition-all"
                >
                  Enquire for Seasonal List
                </Link>
              </div>

              <div className="w-full md:w-2/3 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-64 rounded-xl overflow-hidden relative group">
                    <img
                      alt="Avocados"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      src="/products/home-avocados.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-4">
                      <span className="text-white font-headline font-bold">Avocados</span>
                    </div>
                  </div>
                  <div className="h-96 rounded-xl overflow-hidden relative group">
                    <img
                      alt="Carrots"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      src="/products/home-carrots.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-4">
                      <span className="text-white font-headline font-bold">Root Vegetables</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  <div className="h-96 rounded-xl overflow-hidden relative group">
                    <img
                      alt="Citrus"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      src="/products/home-citrus.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-4">
                      <span className="text-white font-headline font-bold">Citrus Varieties</span>
                    </div>
                  </div>
                  <div className="h-64 rounded-xl overflow-hidden relative group">
                    <img
                      alt="Tropical"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      src="/products/home-tropical.jpg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-4">
                      <span className="text-white font-headline font-bold">Exotic Fruits</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Grid: Nuts, Flavors & Seafood */}
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
              {/* Meat & Seafood - Large Card */}
              <div className="md:col-span-2 md:row-span-2 bg-[#ffffff] rounded-2xl overflow-hidden group relative editorial-shadow p-10 flex flex-col justify-between">
                <div>
                  <span className="text-[#503600] font-label font-bold tracking-widest text-xs uppercase mb-2 block">
                    Oceanic Selection
                  </span>
                  <h3 className="text-3xl font-headline font-bold text-on-surface mb-4">
                    Meat & Seafood
                  </h3>
                  <p className="text-[#41493e] max-w-sm">
                    From deep-sea catch to premium pasture-raised cuts, our protein logistics are secondary to none.
                  </p>
                </div>
                <div className="relative h-64 mt-6 overflow-hidden rounded-lg">
                  <img
                    alt="Seafood"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    src="/products/home-seafood-bento.jpg"
                  />
                </div>
                <Link
                  to="/contact"
                  className="mt-6 bg-primary text-white py-4 rounded-md font-bold transition-all hover:bg-primary"
                >
                  Enquire for Wholesale
                </Link>
              </div>

              {/* Nuts & Flavors */}
              <div className="md:col-span-2 bg-[#7a5649]/10 rounded-2xl overflow-hidden flex items-center p-8 border border-[#7a5649]/20">
                <div className="w-1/2">
                  <h3 className="text-2xl font-headline font-bold text-[#7a5649] mb-2">Nuts & Flavors</h3>
                  <p className="text-[#41493e] text-sm mb-4">Macadamias, Walnuts, and Vanilla Beans.</p>
                  <Link
                    to="/products/nuts-flavors"
                    className="text-[#7a5649] font-bold text-sm underline underline-offset-4"
                  >
                    Browse Collection
                  </Link>
                </div>
                <div className="w-1/2 h-full">
                  <img
                    alt="Nuts"
                    className="w-full h-full object-cover rounded-xl"
                    src="/products/home-nuts-hero.jpg"
                  />
                </div>
              </div>

              {/* Bakery Products */}
              <div className="md:col-span-1 bg-[#e3e3de] rounded-2xl p-6 flex flex-col justify-center text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-4">bakery_dining</span>
                <h4 className="font-headline font-bold mb-2">Bakery Products</h4>
                <p className="text-xs text-[#41493e] mb-4">Par-baked and artisanal flours.</p>
                <Link
                  to="/products/bakery"
                  className="text-primary font-bold text-xs uppercase tracking-widest"
                >
                  Enquire
                </Link>
              </div>

              {/* Canned Foods */}
              <div className="md:col-span-1 bg-primary rounded-2xl p-6 flex flex-col justify-center text-center">
                <span className="material-symbols-outlined text-4xl text-[#604100] mb-4">inventory_2</span>
                <h4 className="font-headline font-bold text-white mb-2">Canned Foods</h4>
                <p className="text-xs text-white/70 mb-4">Preserving freshness for the long haul.</p>
                <Link
                  to="/products/canned-goods"
                  className="text-[#604100] font-bold text-xs uppercase tracking-widest"
                >
                  Enquire
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-32 bg-[#2f312e] text-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <span className="text-[#604100] font-label font-bold tracking-[0.3em] text-xs uppercase mb-4 block">
                Our Operations
              </span>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-6">
                Expert Logistics, Global Reach.
              </h2>
              <div className="h-1 w-24 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Service 1 - Global Logistics */}
              <div className="group">
                <div className="mb-8 overflow-hidden rounded-xl h-48">
                  <img
                    alt="Global Logistics"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    src="/products/home-service-logistics.jpg"
                  />
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#604100]">public</span>
                  Global Logistics
                </h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  Multimodal transportation networks ensuring your produce arrives with optimal freshness, regardless of the destination.
                </p>
                <Link
                  to="/logistics"
                  className="text-[#ffba38] font-bold text-sm hover:text-white transition-colors"
                >
                  Learn more about our fleet →
                </Link>
              </div>

              {/* Service 2 - Quality Control */}
              <div className="group">
                <div className="mb-8 overflow-hidden rounded-xl h-48">
                  <img
                    alt="Quality Control"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    src="/products/home-service-quality.jpg"
                  />
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#604100]">verified</span>
                  Quality Control
                </h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  Three-stage inspection process covering farm harvest, container loading, and port arrival for guaranteed standards.
                </p>
                <Link
                  to="/quality"
                  className="text-[#ffba38] font-bold text-sm hover:text-white transition-colors"
                >
                  Our certification standards →
                </Link>
              </div>

              {/* Service 3 - Custom Sourcing */}
              <div className="group">
                <div className="mb-8 overflow-hidden rounded-xl h-48">
                  <img
                    alt="Custom Sourcing"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    src="/products/home-service-sourcing.jpg"
                  />
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#604100]">handshake</span>
                  Custom Sourcing
                </h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  Need something rare? Our network of boutique global farmers can be mobilized for your specific contractual requirements.
                </p>
                <Link
                  to="/sourcing"
                  className="text-[#ffba38] font-bold text-sm hover:text-white transition-colors"
                >
                  Start a custom request →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#fafaf5]">
          <div className="max-w-5xl mx-auto px-8">
            <div className="bg-primary p-12 md:p-20 rounded-[2rem] text-center relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary rounded-full opacity-50"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-headline font-extrabold text-white mb-6">
                  Ready to expand your <br/>supply chain?
                </h2>
                <p className="text-white text-lg mb-10 max-w-xl mx-auto">
                  Connect with our trade experts for a tailored quote and logistics plan for your business.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="bg-[#ffdeac] text-[#281900] px-10 py-4 rounded-md font-headline font-bold text-lg hover:bg-[#ffba38] transition-all"
                  >
                    Request a Quote
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-md font-headline font-bold text-lg hover:bg-white/10 transition-all"
                  >
                    Talk to Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
      </main>

      <Footer />

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .editorial-shadow {
          box-shadow: 0 20px 40px rgba(26, 28, 25, 0.06);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Home;
