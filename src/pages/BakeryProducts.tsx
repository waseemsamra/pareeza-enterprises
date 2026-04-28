import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const BakeryProducts = () => {
  return (
    <div className="bg-[#fafaf5] min-h-screen font-sans antialiased">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <header className="relative min-h-[870px] flex items-center pt-20 overflow-hidden bg-[#eeeee9]">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover opacity-90 scale-105"
              alt="dramatic close-up of artisanal sourdough loaves"
              src="/products/bakery-hero.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent"></div>
          </div>
          <div className="container mx-auto px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 mb-6 bg-[#ffdeac] text-[#281900] font-label text-xs font-bold tracking-[0.1em] rounded-full">
                GLOBAL EXPORT SELECTION
              </span>
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-white leading-[1.1] mb-8 tracking-tighter">
                Artisanal Bakery & Par-Baked Excellence
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-body leading-relaxed mb-10 max-w-2xl">
                Bridging the gap between traditional European craftsmanship and global industrial scalability. Fresh aroma, delivered worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="bg-primary text-white px-8 py-4 rounded-md font-headline font-bold text-lg hover:bg-primary transition-all shadow-xl"
                >
                  Enquire for Bulk
                </Link>
                <Link
                  to="/contact"
                  className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-md font-headline font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">download</span>
                  Specifications Sheet
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Section 1: The Daily Bake */}
        <section className="py-24 bg-[#fafaf5]">
          <div className="container mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-headline font-bold text-primary mb-4">The Daily Bake: Artisanal Breads</h2>
                <p className="text-[#41493e] text-lg leading-relaxed">
                  Leveraging 24h par-bake technology to ensure that the crust crackles and the crumb remains moist, whether in Singapore or New York. Sourced exclusively from heritage ovens in France and Germany.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>workspace_premium</span>
                  <span className="font-label tracking-widest text-sm uppercase">Heritage Quality</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Product Card 1 - Sourdough Batards */}
              <div className="group bg-[#ffffff] rounded-xl overflow-hidden editorial-shadow transition-all hover:bg-[#fafaf5]">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="close up of a sourdough batard with intricate scoring"
                    src="/products/bakery-sourdough.jpg"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-headline font-bold text-primary">Sourdough Batards</h3>
                    <span className="text-[#7a5649] font-label text-xs font-bold tracking-widest uppercase">France</span>
                  </div>
                  <p className="text-[#41493e] mb-6 text-sm leading-relaxed">
                    Natural levain fermentation with a 48-hour cold proofing cycle for complex flavor depth.
                  </p>
                  <Link
                    to="/contact"
                    className="text-primary font-bold flex items-center gap-2 text-sm hover:underline"
                  >
                    Request Data Sheet
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Product Card 2 - Classic Baguettes */}
              <div className="group bg-[#ffffff] rounded-xl overflow-hidden editorial-shadow transition-all hover:bg-[#fafaf5]">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="row of classic french baguettes with golden crust"
                    src="/products/bakery-baguettes.jpg"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-headline font-bold text-primary">Classic Baguettes</h3>
                    <span className="text-[#7a5649] font-label text-xs font-bold tracking-widest uppercase">France</span>
                  </div>
                  <p className="text-[#41493e] mb-6 text-sm leading-relaxed">
                    Stone-baked par-baked baguettes designed for high-volume finishing in industrial ovens.
                  </p>
                  <Link
                    to="/contact"
                    className="text-primary font-bold flex items-center gap-2 text-sm hover:underline"
                  >
                    Request Data Sheet
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Product Card 3 - Multigrain Loaves */}
              <div className="group bg-[#ffffff] rounded-xl overflow-hidden editorial-shadow transition-all hover:bg-[#fafaf5]">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt="dense multigrain bread loaf sliced showing seeds"
                    src="/products/bakery-multigrain.jpg"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-headline font-bold text-primary">Multigrain Loaves</h3>
                    <span className="text-[#7a5649] font-label text-xs font-bold tracking-widest uppercase">Germany</span>
                  </div>
                  <p className="text-[#41493e] mb-6 text-sm leading-relaxed">
                    Hearty, fiber-rich dough incorporating seven ancient grains for premium nutritional profiles.
                  </p>
                  <Link
                    to="/contact"
                    className="text-primary font-bold flex items-center gap-2 text-sm hover:underline"
                  >
                    Request Data Sheet
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Morning Pastries (Bento Style) */}
        <section className="py-24 bg-[#f4f4ef]">
          <div className="container mx-auto px-8">
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl font-headline font-bold text-primary mb-4">Morning Pastries & Viennoiserie</h2>
              <p className="text-[#41493e] text-lg">
                Engineered for luxury hospitality. Our pastries utilize premium Normandy Butter and are delivered in ready-to-bake frozen formats to maintain delicate lamination structure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[800px]">
              {/* Croissants - Large Card */}
              <div className="md:col-span-2 md:row-span-2 relative group rounded-xl overflow-hidden bg-white">
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="close up of flaky butter croissants stacked"
                  src="/products/bakery-croissants.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10">
                  <h3 className="text-3xl font-headline font-extrabold text-white mb-2">All-Butter Croissants</h3>
                  <p className="text-white/80 max-w-md mb-4 font-body">
                    24% Normandy butter content. 32 layers of precision lamination for the perfect honeycomb structure.
                  </p>
                  <div className="flex gap-4">
                    <span className="bg-primary/80 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] text-white font-bold tracking-widest uppercase">
                      Hospitality Grade
                    </span>
                  </div>
                </div>
              </div>

              {/* Pain au Chocolat */}
              <div className="md:col-span-2 md:row-span-1 relative group rounded-xl overflow-hidden bg-white">
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Pain au chocolat with dark chocolate batons"
                  src="/products/bakery-pain-chocolat.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-headline font-extrabold text-white mb-1">Pain au Chocolat</h3>
                  <p className="text-white/80 text-sm font-body">
                    Double chocolate baton core with premium fermented dough.
                  </p>
                </div>
              </div>

              {/* Fruit Danishes */}
              <div className="md:col-span-2 md:row-span-1 relative group rounded-xl overflow-hidden bg-white">
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="variety of fruit danishes with glossy glaze"
                  src="/products/bakery-danishes.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-headline font-extrabold text-white mb-1">Fruit Danishes</h3>
                  <p className="text-white/80 text-sm font-body">
                    Seasonal fruit glazes over custard-filled buttery nests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Specialty Crackers & Biscuits */}
        <section className="py-24 bg-[#fafaf5]">
          <div className="container mx-auto px-8">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <div className="space-y-12">
                  <div className="border-l-4 border-[#503600] pl-6">
                    <h2 className="text-4xl font-headline font-bold text-primary mb-4">Specialty Crackers & Biscuits</h2>
                    <p className="text-[#41493e] text-lg">
                      High-stability artisanal products engineered for airline catering, premium retail, and high-altitude service environments.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex items-start gap-6 p-6 bg-[#eeeee9] rounded-xl">
                      <span className="material-symbols-outlined text-[#503600] text-3xl">set_meal</span>
                      <div>
                        <h4 className="font-headline font-bold text-lg text-primary">Sea Salt Flatbreads</h4>
                        <p className="text-[#41493e] text-sm">Ultra-thin, flame-baked crisps with hand-harvested Atlantic salt.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 p-6 bg-[#eeeee9] rounded-xl">
                      <span className="material-symbols-outlined text-[#503600] text-3xl">eco</span>
                      <div>
                        <h4 className="font-headline font-bold text-lg text-primary">Rosemary Crackers</h4>
                        <p className="text-[#41493e] text-sm">Infused with aromatic Mediterranean rosemary and extra virgin olive oil.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-6 p-6 bg-[#eeeee9] rounded-xl">
                      <span className="material-symbols-outlined text-[#503600] text-3xl">cookie</span>
                      <div>
                        <h4 className="font-headline font-bold text-lg text-primary">Artisanal Shortbreads</h4>
                        <p className="text-[#41493e] text-sm">Pure butter biscuits with a crumbly, melt-in-mouth texture for retail gifting.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 order-1 md:order-2">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-full h-full border-2 border-primary rounded-xl"></div>
                  <img
                    className="relative z-10 w-full h-auto rounded-xl shadow-2xl"
                    alt="elegant presentation of artisanal crackers and shortbread biscuits"
                    src="/products/bakery-crackers.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Assurance Section */}
        <section className="py-24 bg-[#2f312e] text-white">
          <div className="container mx-auto px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-headline font-extrabold mb-6 tracking-tight">
                From Oven to Ocean: The Bakery Cold-Chain
              </h2>
              <p className="text-[#a0a0a0] text-lg leading-relaxed">
                Our logistics framework is built on moisture control. By utilizing nitrogen flash-freezing within 45 minutes of par-baking, we lock in the molecular structure of the flour.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center p-8 bg-[#272727]/50 rounded-2xl border border-[#404040]">
                <span className="material-symbols-outlined text-[#ffba38] text-5xl mb-6">ac_unit</span>
                <h3 className="text-xl font-headline font-bold mb-4">Nitrogen Flash-Freeze</h3>
                <p className="text-[#a0a0a0] text-sm">
                  Rapid temperature drop to -40°C prevents large ice crystals from forming, preserving the dough's elasticity.
                </p>
              </div>

              <div className="text-center p-8 bg-[#272727]/50 rounded-2xl border border-[#404040]">
                <span className="material-symbols-outlined text-[#ffba38] text-5xl mb-6">humidity_percentage</span>
                <h3 className="text-xl font-headline font-bold mb-4">Controlled Hydration</h3>
                <p className="text-[#a0a0a0] text-sm">
                  Hermetically sealed export packaging maintains optimal 12-14% humidity throughout maritime transit.
                </p>
              </div>

              <div className="text-center p-8 bg-[#272727]/50 rounded-2xl border border-[#404040]">
                <span className="material-symbols-outlined text-[#ffba38] text-5xl mb-6">verified_user</span>
                <h3 className="text-xl font-headline font-bold mb-4">Final Bake Protocols</h3>
                <p className="text-[#a0a0a0] text-sm">
                  Detailed finishing specifications provided for various industrial oven types to ensure consistent global results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* B2B Actions */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-8">
            <div className="bg-primary rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-12 border border-[#acf4a4]/20">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-headline font-extrabold text-white mb-2">
                  Ready for Large-Scale Integration?
                </h2>
                <p className="text-[#90d689] font-body">
                  Connect with our export directors for full bulk pricing and logistics mapping.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <Link
                  to="/contact"
                  className="bg-white text-primary px-10 py-4 rounded-md font-headline font-extrabold text-lg hover:bg-[#f5f5f5] transition-all"
                >
                  Enquire for Bulk
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white/40 text-white px-10 py-4 rounded-md font-headline font-extrabold text-lg hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">description</span>
                  Download Specs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BakeryProducts;
