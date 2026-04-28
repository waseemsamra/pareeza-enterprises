import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const NutsFlavors = () => {
  return (
    <div className="bg-[#fafaf5] min-h-screen font-sans antialiased">
      <Navigation />

      <main className="pt-20">
        {/* Section 1: Hero Banner */}
        <section className="relative h-[870px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover"
              alt="Top-down minimalist editorial shot of premium mixed nuts"
              src="/products/nuts-hero.jpg"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="container mx-auto px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-[#ffdeac] text-[#281900] text-[0.75rem] font-bold tracking-[0.05em] uppercase mb-6">
                The Global Curator
              </span>
              <h1 className="text-white font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                Premium Nuts & Natural Flavors:<br/>The Essence of Quality
              </h1>
              <p className="text-white/90 text-xl font-body mb-10 max-w-2xl leading-relaxed">
                Sourcing world-class kernels and aromatic extracts for global distribution. From the Mediterranean groves to the heart of Southeast Asia.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="bg-[#00450d] text-white px-8 py-4 rounded-md font-headline font-bold flex items-center gap-3 hover:bg-[#1b5e20] transition-all group"
                >
                  Download Inventory List
                  <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">download</span>
                </Link>
                <Link
                  to="/contact"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-md font-headline font-bold hover:bg-white/20 transition-all"
                >
                  Contact Sourcing Desk
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The Nut Connoisseur */}
        <section className="py-24 bg-[#fafaf5]">
          <div className="container mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <h2 className="text-[#00450d] font-headline text-4xl font-bold tracking-tight mb-4">The Nut Connoisseur</h2>
                <div className="h-1 w-24 bg-[#503600] mb-6"></div>
                <p className="text-[#41493e] text-lg leading-relaxed">
                  Our curated selection represents the pinnacle of agricultural excellence, sourced directly from origin partners.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-label-md uppercase tracking-widest text-[#7a5649] font-bold">Bulk Inquiries Only</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 - Marcona Almonds */}
              <div className="bg-[#ffffff] p-8 group hover:bg-[#fafaf5] transition-all duration-500 rounded-lg">
                <div className="aspect-square overflow-hidden mb-8 rounded-md">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Close-up of smooth, pale Marcona almonds"
                    src="/products/marcona-almonds.jpg"
                  />
                </div>
                <h3 className="text-[#00450d] font-headline text-xl font-bold mb-4">Marcona Almonds</h3>
                <ul className="space-y-3 mb-8 text-[#41493e] text-sm">
                  <li className="flex justify-between border-b border-[#c0c9bb]/20 pb-1">
                    <span>Origin:</span>
                    <span className="font-semibold text-[#00450d]">Spain</span>
                  </li>
                  <li className="flex justify-between border-b border-[#c0c9bb]/20 pb-1">
                    <span>Grade:</span>
                    <span className="font-semibold text-[#00450d]">Supreme</span>
                  </li>
                  <li className="flex justify-between border-b border-[#c0c9bb]/20 pb-1">
                    <span>Process:</span>
                    <span className="font-semibold text-[#00450d]">Steam Pasteurized</span>
                  </li>
                </ul>
                <Link
                  to="/contact"
                  className="w-full py-3 border border-[#00450d] text-[#00450d] font-headline font-bold hover:bg-[#00450d] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Enquire for Bulk
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Card 2 - Jumbo Cashews */}
              <div className="bg-[#ffffff] p-8 group hover:bg-[#fafaf5] transition-all duration-500 rounded-lg">
                <div className="aspect-square overflow-hidden mb-8 rounded-md">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Jumbo whole cashew nuts in a ceramic bowl"
                    src="/products/jumbo-cashews.jpg"
                  />
                </div>
                <h3 className="text-[#00450d] font-headline text-xl font-bold mb-4">Jumbo Cashews</h3>
                <ul className="space-y-3 mb-8 text-[#41493e] text-sm">
                  <li className="flex justify-between border-b border-[#c0c9bb]/20 pb-1">
                    <span>Origin:</span>
                    <span className="font-semibold text-[#00450d]">Vietnam</span>
                  </li>
                  <li className="flex justify-between border-b border-[#c0c9bb]/20 pb-1">
                    <span>Grade:</span>
                    <span className="font-semibold text-[#00450d]">W180</span>
                  </li>
                  <li className="flex justify-between border-b border-[#c0c9bb]/20 pb-1">
                    <span>Process:</span>
                    <span className="font-semibold text-[#00450d]">Raw/Dry Roasted</span>
                  </li>
                </ul>
                <Link
                  to="/contact"
                  className="w-full py-3 border border-[#00450d] text-[#00450d] font-headline font-bold hover:bg-[#00450d] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Enquire for Bulk
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Card 3 - Turkish Pistachios */}
              <div className="bg-[#ffffff] p-8 group hover:bg-[#fafaf5] transition-all duration-500 rounded-lg">
                <div className="aspect-square overflow-hidden mb-8 rounded-md">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Turkish pistachios in their shells"
                    src="/products/turkish-pistachios.jpg"
                  />
                </div>
                <h3 className="text-[#00450d] font-headline text-xl font-bold mb-4">Turkish Pistachios</h3>
                <ul className="space-y-3 mb-8 text-[#41493e] text-sm">
                  <li className="flex justify-between border-b border-[#c0c9bb]/20 pb-1">
                    <span>Origin:</span>
                    <span className="font-semibold text-[#00450d]">Gaziantep</span>
                  </li>
                  <li className="flex justify-between border-b border-[#c0c9bb]/20 pb-1">
                    <span>Grade:</span>
                    <span className="font-semibold text-[#00450d]">Antep</span>
                  </li>
                  <li className="flex justify-between border-b border-[#c0c9bb]/20 pb-1">
                    <span>Process:</span>
                    <span className="font-semibold text-[#00450d]">In-Shell</span>
                  </li>
                </ul>
                <Link
                  to="/contact"
                  className="w-full py-3 border border-[#00450d] text-[#00450d] font-headline font-bold hover:bg-[#00450d] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Enquire for Bulk
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Card 4 - Macadamias */}
              <div className="bg-[#ffffff] p-8 group hover:bg-[#fafaf5] transition-all duration-500 rounded-lg">
                <div className="aspect-square overflow-hidden mb-8 rounded-md">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Rich buttery macadamia nuts on a dark slate background"
                    src="/products/macadamias.jpg"
                  />
                </div>
                <h3 className="text-[#00450d] font-headline text-xl font-bold mb-4">Macadamias</h3>
                <ul className="space-y-3 mb-8 text-[#41493e] text-sm">
                  <li className="flex justify-between border-b border-[#c0c9bb]/20 pb-1">
                    <span>Origin:</span>
                    <span className="font-semibold text-[#00450d]">Kenya</span>
                  </li>
                  <li className="flex justify-between border-b border-[#c0c9bb]/20 pb-1">
                    <span>Grade:</span>
                    <span className="font-semibold text-[#00450d]">Style 1</span>
                  </li>
                  <li className="flex justify-between border-b border-[#c0c9bb]/20 pb-1">
                    <span>Process:</span>
                    <span className="font-semibold text-[#00450d]">Raw</span>
                  </li>
                </ul>
                <Link
                  to="/contact"
                  className="w-full py-3 border border-[#00450d] text-[#00450d] font-headline font-bold hover:bg-[#00450d] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Enquire for Bulk
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Exotic Seeds & Kernels */}
        <section className="py-24 bg-[#f4f4ef] overflow-hidden">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <img
                      className="w-full aspect-[4/5] object-cover rounded-xl shadow-lg"
                      alt="Close up of black and white sunflower seeds"
                      src="/products/sunflower-seeds.jpg"
                    />
                    <img
                      className="w-full aspect-square object-cover rounded-xl shadow-lg translate-x-12"
                      alt="Deep green pumpkin seeds on a light wooden background"
                      src="/products/pumpkin-seeds.jpg"
                    />
                  </div>
                  <div className="pt-12">
                    <img
                      className="w-full aspect-[4/6] object-cover rounded-xl shadow-lg"
                      alt="Exquisite pine nuts on a marble surface"
                      src="/products/pine-nuts.jpg"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-[#00450d] font-headline text-4xl font-bold mb-8">Exotic Seeds & Kernels</h2>
                <p className="text-[#41493e] text-lg mb-12 leading-relaxed">
                  Beyond conventional snacking, our botanical seeds are sourced for their dense nutritional profiles and culinary purity. High in plant-based proteins and essential minerals.
                </p>
                <div className="space-y-10">
                  <div className="flex gap-6 items-start">
                    <div className="bg-[#1b5e20] p-3 rounded-full text-[#90d689]">
                      <span className="material-symbols-outlined">nutrition</span>
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-lg text-[#00450d] mb-2">Sunflower & Pumpkin Seeds</h4>
                      <p className="text-[#41493e]">Triple-cleaned and size-sorted for consistent baking and manufacturing outcomes.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="bg-[#1b5e20] p-3 rounded-full text-[#90d689]">
                      <span className="material-symbols-outlined">restaurant</span>
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-lg text-[#00450d] mb-2">Siberian & Cedar Pine Nuts</h4>
                      <p className="text-[#41493e]">Cold-extracted and nitrogen-sealed to preserve delicate fatty acids and flavor.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Natural Extracts & Flavors */}
        <section className="py-24 bg-[#fafaf5]">
          <div className="container mx-auto px-8">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-[#00450d] font-headline text-4xl font-bold mb-6">Natural Extracts & Flavors</h2>
              <p className="text-[#41493e] italic">"Farm-to-Bottle Traceability for Global Food Manufacturers"</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#c0c9bb]/30">
              {/* Vanilla Beans */}
              <div className="p-12 border-r border-[#c0c9bb]/30 hover:bg-[#eeeee9] transition-colors group">
                <span className="text-[#503600] font-headline font-bold text-sm tracking-widest block mb-4">MADAGASCAR</span>
                <h3 className="text-[#00450d] font-headline text-2xl font-bold mb-6">Vanilla Beans</h3>
                <p className="text-[#41493e] text-sm leading-relaxed mb-8">Grade A Gourmet beans, cured using traditional Bourbon methods for high vanillin content.</p>
                <div className="h-[200px] bg-[#f5f5f5] mb-8 rounded overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="Dark, glossy vanilla beans on a sterile white background"
                    src="/products/vanilla-beans.jpg"
                  />
                </div>
                <Link
                  to="/contact"
                  className="text-[#00450d] font-bold text-xs uppercase tracking-tighter cursor-pointer hover:underline"
                >
                  Specifications Sheet →
                </Link>
              </div>

              {/* Pure Almond Extract */}
              <div className="p-12 border-r border-[#c0c9bb]/30 hover:bg-[#eeeee9] transition-colors group">
                <span className="text-[#503600] font-headline font-bold text-sm tracking-widest block mb-4">CONCENTRATED</span>
                <h3 className="text-[#00450d] font-headline text-2xl font-bold mb-6">Pure Almond Extract</h3>
                <p className="text-[#41493e] text-sm leading-relaxed mb-8">Steam-distilled essence from bitter almonds, 100% natural and allergen-managed.</p>
                <div className="h-[200px] bg-[#f5f5f5] mb-8 rounded overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="Clear liquid extract in a designer glass bottle"
                    src="/products/almond-extract.jpg"
                  />
                </div>
                <Link
                  to="/contact"
                  className="text-[#00450d] font-bold text-xs uppercase tracking-tighter cursor-pointer hover:underline"
                >
                  Batch Analysis →
                </Link>
              </div>

              {/* Saffron Threads */}
              <div className="p-12 hover:bg-[#eeeee9] transition-colors group">
                <span className="text-[#503600] font-headline font-bold text-sm tracking-widest block mb-4">IRANIAN GRADE I</span>
                <h3 className="text-[#00450d] font-headline text-2xl font-bold mb-6">Saffron Threads</h3>
                <p className="text-[#41493e] text-sm leading-relaxed mb-8">Negin grade stigma, hand-picked and moisture-controlled for maximum color and aroma.</p>
                <div className="h-[200px] bg-[#f5f5f5] mb-8 rounded overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="Deep crimson saffron threads on a designer ceramic spoon"
                    src="/products/saffron-threads.jpg"
                  />
                </div>
                <Link
                  to="/contact"
                  className="text-[#00450d] font-bold text-xs uppercase tracking-tighter cursor-pointer hover:underline"
                >
                  Origin Certification →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Quality & Certification */}
        <section className="py-24 bg-[#2f312e] text-[#f1f1ec]">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-headline text-3xl font-bold mb-8 text-[#91d78a]">Institutional Quality Assurance</h2>
                <p className="text-[#a0a0a0] text-lg leading-relaxed mb-10">
                  We operate a closed-loop supply chain with temperature-controlled transit from farm gate to global port. Our proprietary shelf-life optimization ensures peak freshness upon arrival.
                </p>
                <div className="flex flex-wrap gap-8 grayscale opacity-60 hover:grayscale-0 transition-all">
                  <div className="flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest">Global GAP</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>security</span>
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest">BRCGS Food</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>eco</span>
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest">Fair Trade</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#272727] p-12 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <span className="material-symbols-outlined text-9xl">thermostat</span>
                </div>
                <h3 className="font-headline text-xl font-bold mb-4">Moisture Control Protocol</h3>
                <p className="text-[#a0a0a0] mb-8">Advanced desiccant management in containers prevents aflatoxin development and maintains kernel snap.</p>
                <div className="space-y-4">
                  <div className="w-full bg-[#404040] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#91d78a] h-full w-[94%]"></div>
                  </div>
                  <p className="text-[0.7rem] text-[#606060] uppercase font-bold tracking-widest">Current Inventory Quality Index: 94%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Final CTA */}
        <section className="py-32 bg-[#00450d] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="grid grid-cols-12 gap-4 h-full">
              <div className="border-r border-white"></div>
              <div className="border-r border-white"></div>
              <div className="border-r border-white"></div>
              <div className="border-r border-white"></div>
              <div className="border-r border-white"></div>
              <div className="border-r border-white"></div>
              <div className="border-r border-white"></div>
              <div className="border-r border-white"></div>
              <div className="border-r border-white"></div>
              <div className="border-r border-white"></div>
              <div className="border-r border-white"></div>
              <div className="border-r border-white"></div>
            </div>
          </div>

          <div className="container mx-auto px-8 text-center relative z-10">
            <h2 className="text-white font-headline text-4xl md:text-5xl font-extrabold mb-8">Ready to secure your next shipment?</h2>
            <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">Request a custom quote today and experience the benchmark in agrarian logistics.</p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="bg-[#ffba38] text-white px-10 py-5 rounded-md font-headline font-bold text-lg hover:bg-[#ffba38]/90 transition-all shadow-xl"
              >
                Request Custom Quote
              </Link>
              <Link
                to="/contact"
                className="bg-white text-[#00450d] px-10 py-5 rounded-md font-headline font-bold text-lg hover:bg-[#f5f5f5] transition-all shadow-xl"
              >
                View Product Catalog
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NutsFlavors;
