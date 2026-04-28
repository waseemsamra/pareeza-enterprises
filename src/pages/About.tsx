import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="bg-[#fafaf5] min-h-screen font-sans antialiased">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative h-[870px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Lush agricultural landscape"
              className="w-full h-full object-cover scale-105"
              src="/products/about-banner.png"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#00450d]/60 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
            <div className="max-w-3xl">
              <span className="font-label text-white uppercase tracking-[0.2em] mb-4 block">
                Our Heritage & Future
              </span>
              <h1 className="font-headline font-extrabold text-white text-5xl md:text-7xl leading-[1.1] tracking-tight mb-8">
                Pareeza Enterprises: Bridging Gap from Soil to Table.
              </h1>
              <div className="flex gap-4">
                <a
                  href="#story"
                  className="bg-[#acf4a4] text-[#002203] px-8 py-4 rounded-md font-headline font-bold tracking-tight flex items-center gap-2 hover:bg-[#91d78a] transition-all"
                >
                  Discover Our Story
                  <span className="material-symbols-outlined">arrow_downward</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section id="story" className="py-24 bg-[#fafaf5]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="aspect-[4/5] rounded-xl overflow-hidden editorial-shadow">
                  <img
                    alt="Traditional market scene"
                    className="w-full h-full object-cover"
                    src="/products/about-market.jpg"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 hidden md:block w-64 h-64 rounded-xl overflow-hidden border-[12px] border-[#f4f4ef] editorial-shadow">
                  <img
                    alt="Modern warehouse logistics"
                    className="w-full h-full object-cover"
                    src="/products/about-warehouse.jpg"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <span className="font-label text-[#503600] uppercase tracking-widest block mb-2">Our Origins</span>
                  <h2 className="font-headline font-bold text-4xl text-[#1a1c19] leading-tight">
                    A Deep-Rooted History in Trade.
                  </h2>
                </div>
                <p className="text-[#41493e] text-lg leading-relaxed">
                  For generations, our founders traversed the ancient trade routes, connecting rural producers with urban centers. What began as a local grain exchange has evolved into a sophisticated global enterprise.
                </p>
                <p className="text-[#41493e] text-lg leading-relaxed">
                  Today, we combine this historical wisdom with cutting-edge sustainable logistics. We haven't just adapted to the modern world; we are redefining it by ensuring that transparency and ethics remain at the heart of every transaction across the globe.
                </p>
                <div className="pt-4 grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-3xl font-headline font-extrabold text-[#00450d] mb-1">50+</div>
                    <div className="font-label text-xs uppercase tracking-tighter text-[#717a6d]">Years of Heritage</div>
                  </div>
                  <div>
                    <div className="text-3xl font-headline font-extrabold text-[#00450d] mb-1">120</div>
                    <div className="font-label text-xs uppercase tracking-tighter text-[#717a6d]">Global Ports Connected</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision (Bento Style) */}
        <section className="py-24 bg-[#f4f4ef]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-16 max-w-2xl">
              <h2 className="font-headline font-bold text-4xl mb-4">The Purpose Behind the Produce.</h2>
              <p className="text-[#41493e] text-lg">
                We are driven by a commitment to excellence that transcends profit, focusing on the longevity of our planet and the prosperity of its people.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
              {/* Mission Card */}
              <div className="md:col-span-7 bg-[#00450d] rounded-xl p-12 text-white flex flex-col justify-end relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#1b5e20] rounded-full blur-[100px] opacity-50 -mr-32 -mt-32"></div>
                <div className="relative z-10">
                  <span className="font-label text-[#acf4a4] uppercase tracking-widest block mb-4">Mission</span>
                  <h3 className="text-4xl font-headline font-bold mb-6">Securing the Global Food Chain.</h3>
                  <p className="text-[#91d78a] text-xl leading-relaxed max-w-lg">
                    To bridge the geographical divide between the world's most fertile soils and the tables of the global population, ensuring food security through innovative and ethical trade practices.
                  </p>
                </div>
              </div>

              {/* Vision Card */}
              <div className="md:col-span-5 bg-[#ffffff] rounded-xl p-10 flex flex-col justify-between editorial-shadow">
                <div>
                  <span className="font-label text-[#503600] uppercase tracking-widest block mb-4">Vision</span>
                  <h3 className="text-3xl font-headline font-bold mb-4 text-[#1a1c19]">Sustainable Prosperity.</h3>
                  <p className="text-[#41493e] leading-relaxed">
                    To be the world's most trusted curator of agricultural goods, leading the transition towards a 100% transparent and carbon-neutral supply chain by 2040.
                  </p>
                </div>
                <div className="mt-8 rounded-lg overflow-hidden h-40">
                  <img
                    alt="Sustainable farming"
                    className="w-full h-full object-cover"
                    src="/products/about-sustainable.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Network */}
        <section className="py-24 bg-[#fafaf5] overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <span className="font-label text-[#00450d] uppercase tracking-widest block mb-2">Our Reach</span>
              <h2 className="font-headline font-bold text-4xl">A Truly Global Network.</h2>
            </div>

            <div className="relative mb-20">
              <div className="aspect-[21/9] bg-[#eeeee9] rounded-3xl overflow-hidden relative group">
                <img
                  alt="World Map Graphic"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
                  src="/products/about-worldmap.jpg"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                  <div className="grid grid-cols-3 gap-12 text-white">
                    <div>
                      <div className="font-headline font-bold text-xl">SE Asia</div>
                      <div className="text-xs font-label opacity-70">Rice & Spice Hub</div>
                    </div>
                    <div>
                      <div className="font-headline font-bold text-xl">Europe</div>
                      <div className="text-xs font-label opacity-70">Dairy & Tech Logistics</div>
                    </div>
                    <div>
                      <div className="font-headline font-bold text-xl">Africa</div>
                      <div className="text-xs font-label opacity-70">Organic Raw Materials</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-[#ffffff] rounded-xl border-l-4 border-[#00450d] editorial-shadow">
                <h4 className="font-headline font-bold text-xl mb-3">Sourcing Hubs</h4>
                <p className="text-[#41493e] text-sm">
                  Strategic collection centers located in the heart of production zones to minimize post-harvest loss.
                </p>
              </div>
              <div className="p-8 bg-[#ffffff] rounded-xl border-l-4 border-[#7a5649] editorial-shadow">
                <h4 className="font-headline font-bold text-xl mb-3">Cold-Chain Routes</h4>
                <p className="text-[#41493e] text-sm">
                  Advanced temperature-controlled corridors across three oceans for maximum freshness.
                </p>
              </div>
              <div className="p-8 bg-[#ffffff] rounded-xl border-l-4 border-[#503600] editorial-shadow">
                <h4 className="font-headline font-bold text-xl mb-3">Digital Backbone</h4>
                <p className="text-[#41493e] text-sm">
                  Real-time blockchain tracking for every shipment, providing total provenance data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="py-24 bg-[#f4f4ef]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <span className="font-label text-[#00450d] uppercase tracking-widest block mb-2">Our Foundation</span>
                <h2 className="font-headline font-bold text-4xl">The Core Pillars of Excellence.</h2>
              </div>
              <p className="max-w-md text-[#41493e]">
                Our operations are built on three non-negotiable standards that ensure every product delivered is world-class.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Card 1 - Quality Control */}
              <div className="group bg-[#ffffff] rounded-xl p-8 transition-all hover:bg-[#fafaf5] editorial-shadow">
                <div className="w-14 h-14 rounded-lg bg-[#00450d]/10 flex items-center justify-center mb-6 text-[#00450d] group-hover:bg-[#00450d] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                </div>
                <h3 className="font-headline font-bold text-2xl mb-4">Quality Control</h3>
                <p className="text-[#41493e] leading-relaxed">
                  Rigorous multi-stage testing from soil sampling to final packaging. We maintain our own accredited laboratories at every major port.
                </p>
              </div>

              {/* Card 2 - Ethical Sourcing */}
              <div className="group bg-[#ffffff] rounded-xl p-8 transition-all hover:bg-[#fafaf5] editorial-shadow">
                <div className="w-14 h-14 rounded-lg bg-[#7a5649]/10 flex items-center justify-center mb-6 text-[#7a5649] group-hover:bg-[#7a5649] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>handshake</span>
                </div>
                <h3 className="font-headline font-bold text-2xl mb-4">Ethical Sourcing</h3>
                <p className="text-[#41493e] leading-relaxed">
                  Direct partnerships with smallholder farmers, ensuring fair wages, community investment, and the elimination of exploitation.
                </p>
              </div>

              {/* Card 3 - Logistics Excellence */}
              <div className="group bg-[#ffffff] rounded-xl p-8 transition-all hover:bg-[#fafaf5] editorial-shadow">
                <div className="w-14 h-14 rounded-lg bg-[#503600]/10 flex items-center justify-center mb-6 text-[#503600] group-hover:bg-[#503600] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>local_shipping</span>
                </div>
                <h3 className="font-headline font-bold text-2xl mb-4">Logistics Excellence</h3>
                <p className="text-[#41493e] leading-relaxed">
                  Predictive AI-driven routing that optimizes fuel consumption and reduces transit times, keeping produce at peak nutrition.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#fafaf5]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="bg-[#1b5e20] rounded-2xl p-16 relative overflow-hidden text-center md:text-left">
              {/* Decor */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <img
                  alt="Farming texture"
                  className="w-full h-full object-cover grayscale"
                  src="/products/about-farming-texture.jpg"
                />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl">
                  <h2 className="font-headline font-bold text-4xl md:text-5xl text-white mb-6">
                    Partner with Us. Let's grow a sustainable future together.
                  </h2>
                  <p className="text-[#91d78a] text-xl">
                    Join our global network of producers, distributors, and visionaries.
                  </p>
                </div>
                <div className="shrink-0">
                  <Link
                    to="/contact"
                    className="bg-[#ffdeac] text-[#281900] px-10 py-5 rounded-md font-headline font-extrabold text-lg hover:bg-[#ffba38] transition-all shadow-xl active:scale-95"
                  >
                    Enquire for Partnership
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
