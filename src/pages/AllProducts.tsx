import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Hardcoded product data with LOCAL images from /public/products folder
const allProductsData = {
  version: "3.0.0",
  lastUpdated: "2026-03-28T00:00:00Z",
  categories: [
    {
      id: "rice-spices",
      name: "Rice & Spices",
      description: "Sourcing long-grain Basmati, Jasmine, and rare heritage spices directly from cooperatives across South Asia and the Mediterranean.",
      image: "/products/rice-spices.jpg",
      link: "/products/rice-spices"
    },
    {
      id: "fruits-vegetables",
      name: "Fruits & Vegetables",
      description: "Seasonal harvests and year-round staples maintained through precision temperature-controlled logistics from farm gate to port.",
      image: "/products/fruits-vegetables.jpg",
      link: "/products/fruits-vegetables"
    },
    {
      id: "nuts-flavors",
      name: "Nuts & Flavors",
      description: "High-yield almonds, cashews, and botanical extracts tailored for large-scale food manufacturing and gourmet retail bulk buy.",
      image: "/products/nuts-flavors.jpg",
      link: "/products/nuts-flavors"
    },
    {
      id: "canned-goods",
      name: "Canned Foods",
      description: "Advanced preservation techniques that lock in peak-season nutrition for long-haul stability and inventory resilience.",
      image: "/products/canned-goods.jpg",
      link: "/products/canned-goods"
    },
    {
      id: "meat-seafood",
      name: "Meat & Seafood",
      description: "Sustainably sourced protein from certified ethical producers, adhering to rigorous cold-chain protocols for global export.",
      image: "/products/meat-seafood.jpg",
      link: "/products/meat-seafood"
    },
    {
      id: "bakery-products",
      name: "Bakery Products",
      description: "Par-baked and artisanal grain solutions designed for high-volume hospitality and international distribution networks.",
      image: "/products/bakery-products.jpg",
      link: "/products/bakery"
    }
  ],
  newArrivals: [
    {
      id: "alphonso-mango",
      name: "Alphonso Mangoes",
      description: "Ratnagiri's finest, hand-picked for peak sweetness and fiber-less texture.",
      image: "/products/alphonso-mango.jpg",
      origin: "India"
    },
    {
      id: "saffron",
      name: "Spanish Saffron",
      description: "Grade 1 Aromatic saffron threads from the fields of La Mancha, Spain.",
      image: "/products/saffron.jpg",
      origin: "Spain"
    },
    {
      id: "wagyu",
      name: "Wagyu Ribeye",
      description: "Japanese A5 certified Ribeye with exquisite marbling and buttery texture.",
      image: "/products/wagyu.jpg",
      origin: "Japan"
    }
  ]
};

const AllProducts = () => {
  return (
    <div className="bg-[#fafaf5] min-h-screen font-sans antialiased">
      <Navigation />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative px-8 py-20 lg:py-32 overflow-hidden bg-[#fafaf5]">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 z-10">
              <span className="inline-block px-3 py-1 bg-[#ffdeac] text-[#281900] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full mb-6">
                Curated Global Supply
              </span>
              <h1 className="font-headline font-extrabold text-5xl lg:text-7xl text-[#00450d] leading-[1.1] tracking-tight mb-8">
                The Harvest of Nations, <br/>
                <span className="text-[#7a5649]">Orchestrated for Scale.</span>
              </h1>
              <p className="text-lg lg:text-xl text-[#41493e] max-w-2xl leading-relaxed mb-10">
                Bridging the gap between artisanal heritage and industrial demand. We curate the world's most resilient supply chains to deliver premium fresh food commodities with uncompromising traceability and B2B precision.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-[#00450d] text-white rounded-md font-semibold text-lg hover:bg-[#1b5e20] transition-all flex items-center gap-2 group"
                >
                  Initiate Bulk Inquiry
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-4 bg-transparent border border-[#c0c9bb] text-[#00450d] rounded-md font-semibold text-lg hover:bg-[#f4f4ef] transition-all"
                >
                  Download Full Portfolio
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden editorial-shadow relative z-10 scale-105">
                <img
                  alt="Premium fresh organic vegetables"
                  className="w-full h-full object-cover"
                  src="/products/hero-vegetables.jpg"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#fdcdbc] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#acf4a4] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="px-8 py-20 bg-[#fafaf5]">
          <div className="max-w-screen-2xl mx-auto">
            <div className="mb-12">
              <h2 className="font-headline text-3xl lg:text-4xl font-extrabold text-[#00450d] mb-2 tracking-tight">New Arrivals</h2>
              <div className="h-1 w-20 bg-[#7a5649] rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {allProductsData.newArrivals.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#ffffff] rounded-xl overflow-hidden editorial-shadow group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={product.image}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#7a5649] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        New
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-headline text-xl font-bold text-[#00450d] mb-2">
                      {product.name}
                    </h3>
                    <p className="text-[#41493e] text-sm mb-6">
                      {product.description}
                    </p>
                    <Link
                      to="/contact"
                      className="w-full py-3 bg-[#00450d] text-white rounded font-semibold text-sm hover:bg-[#1b5e20] transition-colors"
                    >
                      Enquire for Bulk
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Grid Section */}
        <section className="px-8 py-20 bg-[#eeeee9]">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="font-headline text-3xl lg:text-4xl font-extrabold text-[#00450d] mb-4 tracking-tight">
                  Our Curated Portfolios
                </h2>
                <p className="text-[#41493e] text-lg">
                  Explore our six core commodity pillars, each managed by dedicated procurement specialists and verified for international B2B standards.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProductsData.categories.map((category) => (
                <div
                  key={category.id}
                  className="group relative overflow-hidden bg-[#ffffff] rounded-xl p-8 transition-all hover:bg-[#fafaf5] duration-500"
                >
                  <div className="aspect-video mb-8 overflow-hidden rounded-lg">
                    <img
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={category.image}
                    />
                  </div>
                  <h3 className="font-headline text-2xl font-bold text-[#00450d] mb-3">
                    {category.name}
                  </h3>
                  <p className="text-[#41493e] mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  <Link
                    to={category.link || "/products"}
                    className="inline-flex items-center text-[#00450d] font-bold uppercase text-xs tracking-widest hover:gap-3 transition-all"
                  >
                    Explore Category
                    <span className="material-symbols-outlined ml-2 text-sm">trending_flat</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Propositions Section */}
        <section className="px-8 py-24 bg-[#fafaf5] overflow-hidden relative">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="font-headline text-4xl font-extrabold text-[#00450d] mb-12 leading-tight">
                  The Infrastructure <br/>
                  <span className="text-[#7a5649]">of Quality.</span>
                </h2>
                <div className="space-y-12">
                  {/* Pillar 1 */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#1b5e20] rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#acf4a4]">verified</span>
                    </div>
                    <div>
                      <h4 className="font-headline text-xl font-bold text-[#00450d] mb-2">
                        Global Compliance
                      </h4>
                      <p className="text-[#41493e]">
                        Every shipment is backed by HACCP and GAP certifications, ensuring full adherence to international phytosanitary standards.
                      </p>
                    </div>
                  </div>
                  {/* Pillar 2 */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#1b5e20] rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#acf4a4]">ac_unit</span>
                    </div>
                    <div>
                      <h4 className="font-headline text-xl font-bold text-[#00450d] mb-2">
                        Cold-Chain Mastery
                      </h4>
                      <p className="text-[#41493e]">
                        Real-time IoT tracking for every container. Maintain the harvest's vital temperature from field to warehouse.
                      </p>
                    </div>
                  </div>
                  {/* Pillar 3 */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#1b5e20] rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#acf4a4]">inventory_2</span>
                    </div>
                    <div>
                      <h4 className="font-headline text-xl font-bold text-[#00450d] mb-2">
                        Bulk Precision
                      </h4>
                      <p className="text-[#41493e]">
                        Scalable procurement structures designed for enterprise-level demands without compromising on artisanal quality.
                      </p>
                    </div>
                  </div>
                  {/* Pillar 4 */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#1b5e20] rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#acf4a4]">history_edu</span>
                    </div>
                    <div>
                      <h4 className="font-headline text-xl font-bold text-[#00450d] mb-2">
                        Seed-to-Shelf Traceability
                      </h4>
                      <p className="text-[#41493e]">
                        Digital documentation for every batch, providing total transparency on origin, harvest date, and logistics milestones.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-[#1b5e20]/5 -rotate-3 rounded-2xl"></div>
                <img
                  alt="Shipping containers port"
                  className="rounded-2xl editorial-shadow relative z-10 w-full object-cover aspect-square"
                  src="/products/shipping-port.jpg"
                />
                {/* Floating Badge */}
                <div className="absolute -bottom-8 -left-8 bg-white p-6 editorial-shadow rounded-xl z-20 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#ffdeac] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#503600]">public</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#41493e]">
                      Global Logistics Status
                    </p>
                    <p className="font-headline font-bold text-[#00450d]">
                      Active: 142 Ports Reachable
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement Section */}
        <section className="px-8 py-20 bg-[#1b5e20] relative">
          <div className="max-w-screen-2xl mx-auto text-center relative z-10">
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#ffffff] mb-6 tracking-tight">
              Ready to Scale Your Sourcing?
            </h2>
            <p className="text-[#002203] text-xl max-w-2xl mx-auto mb-12 opacity-90">
              Our procurement specialists are ready to architect a supply solution tailored to your volume and quality requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-10 py-5 bg-white text-[#00450d] rounded-md font-bold text-lg hover:bg-[#fafaf5] transition-all editorial-shadow active:scale-95"
              >
                Initiate Bulk Inquiry
              </Link>
              <Link
                to="/procurement"
                className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-[#00450d]/20 text-white rounded-md font-bold text-lg hover:bg-[#00450d]/10 transition-all active:scale-95"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>
          {/* Organic shape background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00450d]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#acf4a4]/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AllProducts;
