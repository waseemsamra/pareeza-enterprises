import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Sourcing = () => {
  return (
    <div className="bg-[#fafaf5] min-h-screen font-sans antialiased">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[870px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Lush regenerative farm"
              className="w-full h-full object-cover scale-105"
              src="/products/sourcing-hero.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent"></div>
          </div>
          <div className="relative z-10 px-8 md:px-20 max-w-5xl">
            <span className="inline-block px-3 py-1 bg-[#ffdeac] text-[#281900] text-[0.7rem] font-bold uppercase tracking-[0.15em] rounded mb-6">
              Our Philosophy
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold font-headline text-white leading-[1.1] tracking-tight mb-8">
              Sourcing the Future: <br/>
              <span className="text-[#acf4a4]">Ethical, Regenerative, Global.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed">
              We curate the world's most resilient food systems, connecting visionary growers with professional procurement.
            </p>
          </div>
        </section>

        {/* Impact Metrics Dashboard */}
        <section className="py-24 px-8 bg-[#fafaf5]">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Metric 1 - Carbon Progress */}
              <div className="p-10 bg-[#ffffff] rounded-xl border-l-4 border-primary editorial-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <span className="material-symbols-outlined text-primary text-3xl">co2</span>
                  <span className="text-label-md font-bold text-[#717a6d] tracking-widest uppercase text-xs">Carbon Progress</span>
                </div>
                <h3 className="text-4xl font-headline font-bold text-[#1a1c19] mb-2">12.4k Tons</h3>
                <p className="text-[#41493e] text-sm leading-relaxed">
                  Annual carbon sequestration through regenerative soil practices across our network.
                </p>
                <div className="mt-6 w-full bg-[#eeeee9] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-full w-[78%]"></div>
                </div>
              </div>

              {/* Metric 2 - Fair Trade Premiums */}
              <div className="p-10 bg-[#ffffff] rounded-xl border-l-4 border-[#7a5649] editorial-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <span className="material-symbols-outlined text-[#7a5649] text-3xl">payments</span>
                  <span className="text-label-md font-bold text-[#717a6d] tracking-widest uppercase text-xs">Fair Trade Premiums</span>
                </div>
                <h3 className="text-4xl font-headline font-bold text-[#1a1c19] mb-2">$3.2M</h3>
                <p className="text-[#41493e] text-sm leading-relaxed">
                  Direct premiums paid above market rates to 500+ independent growers this year.
                </p>
                <div className="mt-6 w-full bg-[#eeeee9] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#7a5649] h-full w-[92%]"></div>
                </div>
              </div>

              {/* Metric 3 - Water Stewardship */}
              <div className="p-10 bg-[#ffffff] rounded-xl border-l-4 border-[#503600] editorial-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <span className="material-symbols-outlined text-[#503600] text-3xl">water_drop</span>
                  <span className="text-label-md font-bold text-[#717a6d] tracking-widest uppercase text-xs">Water Stewardship</span>
                </div>
                <h3 className="text-4xl font-headline font-bold text-[#1a1c19] mb-2">850M Gal</h3>
                <p className="text-[#41493e] text-sm leading-relaxed">
                  Fresh water saved through precision irrigation and aquifer recharge initiatives.
                </p>
                <div className="mt-6 w-full bg-[#eeeee9] rounded-full h-1.5 overflow-hidden">
                  <div className="bg-[#503600] h-full w-[65%]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Direct-from-Source Commitment */}
        <section className="py-24 bg-[#f4f4ef]">
          <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-xl overflow-hidden editorial-shadow">
                <img
                  alt="Independent grower"
                  className="w-full h-full object-cover"
                  src="/products/sourcing-farmer.jpg"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-primary p-8 rounded-xl text-white max-w-xs editorial-shadow hidden md:block">
                <p className="text-3xl font-headline font-bold">500+</p>
                <p className="text-sm opacity-80 mt-2 uppercase tracking-widest">Independent growers directly connected to our logistics.</p>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-headline font-bold text-primary mb-8 leading-tight">
                Direct Relationships, <br/>Total Traceability.
              </h2>
              <p className="text-lg text-[#41493e] leading-relaxed mb-6">
                We have dismantled the opaque middleman model. By maintaining direct, peer-to-peer relationships with artisanal growers across six continents, we ensure that every piece of produce is fully traceable back to the plot of land where it was harvested.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="material-symbols-outlined text-primary bg-primary/20 p-2 rounded-lg">verified_user</span>
                  <div>
                    <h4 className="font-bold text-[#1a1c19]">Verified Fair Trade</h4>
                    <p className="text-sm text-[#41493e]">We guarantee living wages and community investment for all sourcing partners.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="material-symbols-outlined text-primary bg-primary/20 p-2 rounded-lg">location_on</span>
                  <div>
                    <h4 className="font-bold text-[#1a1c19]">Geo-Location Origin Data</h4>
                    <p className="text-sm text-[#41493e]">Real-time tracking from harvest to delivery via our Agrarian Ledger.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Regenerative Agriculture Bento */}
        <section className="py-32 px-8">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-headline font-bold text-[#1a1c19] mb-6">
                  Beyond Sustainability: <br/><span className="text-[#7a5649]">Regenerative Practice</span>
                </h2>
                <p className="text-lg text-[#41493e] leading-relaxed">
                  We don't just aim to 'do no harm'. Our goal is to actively repair the earth through the power of diverse agricultural ecosystems.
                </p>
              </div>
              <Link
                to="/contact"
                className="text-primary font-bold border-b-2 border-primary pb-1 inline-flex items-center gap-2 hover:gap-4 transition-all"
              >
                View our methodology
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
              {/* Soil Health Card */}
              <div className="md:col-span-4 bg-[#e3e3de] rounded-xl p-8 flex flex-col justify-end relative overflow-hidden group">
                <img
                  className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700"
                  alt="Macro photo of rich dark soil with small green sprouts"
                  src="/products/sourcing-soil.jpg"
                />
                <div className="relative z-10">
                  <h3 className="text-2xl font-headline font-bold mb-3">Soil Health</h3>
                  <p className="text-sm text-[#41493e]">
                    No-till farming and cover cropping to sequester carbon and restore microbial life.
                  </p>
                </div>
              </div>

              {/* Bio-Diverse Edge Card */}
              <div className="md:col-span-8 bg-[#2f312e] text-white rounded-xl p-12 flex flex-col justify-center relative overflow-hidden">
                <div className="max-w-md relative z-10">
                  <span className="text-[#ffba38] font-bold tracking-widest text-xs uppercase mb-4 block">The Bio-Diverse Edge</span>
                  <h3 className="text-3xl font-headline font-bold mb-6">Promoting Poly-Culture ecosystems.</h3>
                  <p className="text-white/70 leading-relaxed mb-8">
                    Instead of vast mono-crops, our growers cultivate integrated systems that support pollinators and natural pest control, eliminating the need for synthetic chemicals.
                  </p>
                  <Link
                    to="/contact"
                    className="bg-primary text-white px-8 py-3 rounded-md font-bold"
                  >
                    Read the Report
                  </Link>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/2 opacity-30">
                  <img
                    className="w-full h-full object-cover"
                    alt="A lush greenhouse interior with diverse vegetables"
                    src="/products/sourcing-greenhouse.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ethical Supply Chain */}
        <section className="py-24 bg-[#e3e3de]">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="bg-[#ffffff] rounded-2xl overflow-hidden flex flex-col lg:flex-row editorial-shadow">
              <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center">
                <h2 className="text-3xl font-headline font-bold mb-8">Zero-Waste Logistics</h2>
                <p className="text-[#41493e] leading-relaxed mb-10">
                  Sustainability doesn't stop at the farm gate. Our cold-chain logistics are optimized using proprietary AI to reduce energy consumption by 40% and virtually eliminate food waste during transit.
                </p>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <span className="material-symbols-outlined text-[#7a5649] text-4xl">ac_unit</span>
                    <div>
                      <h4 className="font-bold text-[#1a1c19]">Solar-Powered Cold Storage</h4>
                      <p className="text-sm text-[#41493e]">Off-grid modular storage units powered entirely by renewable energy.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <span className="material-symbols-outlined text-[#7a5649] text-4xl">route</span>
                    <div>
                      <h4 className="font-bold text-[#1a1c19]">Route Optimization</h4>
                      <p className="text-sm text-[#41493e]">Minimizing food miles through intelligent, multi-modal transport strategies.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 h-[500px] lg:h-auto relative">
                <img
                  alt="Logistics"
                  className="w-full h-full object-cover"
                  src="/products/sourcing-warehouse.jpg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Partner with Us CTA */}
        <section className="py-32 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="material-symbols-outlined text-6xl text-primary mb-8">eco</span>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-[#1a1c19] mb-8">
              Align your brand with the planet's future.
            </h2>
            <p className="text-xl text-[#41493e] mb-12 max-w-2xl mx-auto">
              We partner with global retailers, restaurateurs, and manufacturers who refuse to compromise on ethics or quality.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="bg-primary text-white px-10 py-4 rounded-md font-bold text-lg hover:bg-primary transition-colors shadow-lg"
              >
                Request a Sustainability Audit
              </Link>
              <Link
                to="/contact"
                className="bg-white border-2 border-primary text-primary px-10 py-4 rounded-md font-bold text-lg hover:bg-[#f4f4ef] transition-colors"
              >
                Partner with Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sourcing;
