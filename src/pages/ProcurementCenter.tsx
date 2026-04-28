import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const ProcurementCenter = () => {
  return (
    <div className="bg-[#fafaf5] min-h-screen font-sans antialiased scroll-smooth">
      <Navigation />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[716px] flex items-center overflow-hidden px-8 py-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fafaf5] via-[#fafaf5]/80 to-transparent z-10"></div>
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920"
            />
          </div>
          
          <div className="relative z-20 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdeac] text-[#604100] text-[10px] font-bold tracking-widest uppercase mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#503600] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#503600]"></span>
              </span>
              B2B Portal Active
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-extrabold text-[#1a1c19] leading-[0.95] tracking-tighter mb-8">
              Procurement Center: <br/>
              <span className="text-[#00450d] italic font-light">Secure Your Global Supply Chain.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#41493e] font-sans max-w-2xl leading-relaxed mb-10">
              Streamlined inquiry for high-volume traders, retailers, and hospitality groups looking for consistent, premium-grade agrarian products.
            </p>
            <div className="flex gap-4">
              <a href="#inquiry-form" className="bg-[#00450d] text-white px-8 py-4 rounded font-headline font-bold text-lg hover:bg-[#1b5e20] transition-all flex items-center group">
                Begin Procurement Request
                <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-[#f4f4ef] py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Stat Card 1 */}
              <div className="bg-[#ffffff] p-8 rounded-xl border-b-4 border-[#00450d] transition-all hover:translate-y-[-4px]">
                <span className="material-symbols-outlined text-[#00450d] w-8 h-8 mb-4">hub</span>
                <div className="text-4xl font-headline font-extrabold text-[#1a1c19] mb-2">85+</div>
                <div className="text-sm font-sans uppercase tracking-widest text-[#41493e]">Strategic Distribution Hubs</div>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-[#ffffff] p-8 rounded-xl border-b-4 border-[#7a5649] transition-all hover:translate-y-[-4px]">
                <span className="material-symbols-outlined text-[#7a5649] w-8 h-8 mb-4">agriculture</span>
                <div className="text-4xl font-headline font-extrabold text-[#1a1c19] mb-2">500+</div>
                <div className="text-sm font-sans uppercase tracking-widest text-[#41493e]">Independent Growers</div>
              </div>

              {/* Stat Card 3 */}
              <div className="bg-[#ffffff] p-8 rounded-xl border-b-4 border-[#503600] transition-all hover:translate-y-[-4px]">
                <span className="material-symbols-outlined text-[#503600] w-8 h-8 mb-4">weight</span>
                <div className="text-4xl font-headline font-extrabold text-[#1a1c19] mb-2">12k+</div>
                <div className="text-sm font-sans uppercase tracking-widest text-[#41493e]">Metric Tons Annual Capacity</div>
              </div>

              {/* Stat Card 4 */}
              <div className="bg-[#ffffff] p-8 rounded-xl border-b-4 border-[#91d78a] transition-all hover:translate-y-[-4px]">
                <span className="material-symbols-outlined text-[#00450d] w-8 h-8 mb-4">verified</span>
                <div className="text-4xl font-headline font-extrabold text-[#1a1c19] mb-2">99.8%</div>
                <div className="text-sm font-sans uppercase tracking-widest text-[#41493e]">Logistics Reliability</div>
              </div>
            </div>
          </div>
        </section>

        {/* Procurement Inquiry Form */}
        <section className="py-32 px-8 max-w-6xl mx-auto" id="inquiry-form">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-bold text-[#00450d] mb-4">Multi-Step Procurement Inquiry</h2>
            <p className="text-[#41493e] max-w-xl mx-auto">Our streamlined process ensures we match your high-volume needs with the right growers and logistics path.</p>
          </div>

          <div className="bg-[#ffffff] p-8 md:p-12 rounded-2xl editorial-shadow">
            <form className="space-y-12">
              {/* Step 1: Product Category */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <span className="text-xs font-bold text-[#1b5e20] mb-2 block uppercase tracking-tighter">Step 01</span>
                  <h3 className="text-2xl font-headline font-bold mb-2">Product Category</h3>
                  <p className="text-sm text-[#41493e]">Select the primary commodities for this request.</p>
                </div>
                <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { icon: 'rice_bowl', label: 'Rice & Grains' },
                    { icon: 'nutrition', label: 'Spices' },
                    { icon: 'eco', label: 'Fruits' },
                    { icon: 'nest_eco_leaf', label: 'Veggies' },
                    { icon: 'restaurant', label: 'Meats' },
                    { icon: 'more_horiz', label: 'Others' }
                  ].map((item) => (
                    <label key={item.label} className="cursor-pointer group">
                      <input className="hidden peer" type="checkbox" />
                      <div className="p-4 border border-[#c0c9bb] rounded-md peer-checked:bg-[#00450d] peer-checked:text-white transition-all text-center">
                        <span className="material-symbols-outlined block mb-2">{item.icon}</span>
                        <span className="text-xs font-bold uppercase tracking-wide">{item.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 2: Volume & Frequency */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <span className="text-xs font-bold text-[#1b5e20] mb-2 block uppercase tracking-tighter">Step 02</span>
                  <h3 className="text-2xl font-headline font-bold mb-2">Volume & Frequency</h3>
                  <p className="text-sm text-[#41493e]">Specify your capacity requirements.</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <select className="w-full bg-[#e3e3de] border-none border-b-2 border-[#717a6d]/20 focus:border-[#00450d] focus:ring-0 rounded-md py-4 px-6 text-[#1a1c19] font-sans">
                    <option>Select Frequency</option>
                    <option>Monthly Contract (Recurring)</option>
                    <option>Quarterly Allocation</option>
                    <option>Spot Buy (One-time)</option>
                    <option>Annual Partnership</option>
                  </select>
                  <input
                    className="w-full bg-[#e3e3de] border-none border-b-2 border-[#717a6d]/20 focus:border-[#00450d] focus:ring-0 rounded-md py-4 px-6 text-[#1a1c19] font-sans"
                    placeholder="Estimated Metric Tons (e.g., 500 MT)"
                    type="text"
                  />
                </div>
              </div>

              {/* Step 3: Logistics & Destination */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <span className="text-xs font-bold text-[#1b5e20] mb-2 block uppercase tracking-tighter">Step 03</span>
                  <h3 className="text-2xl font-headline font-bold mb-2">Logistics & Destination</h3>
                  <p className="text-sm text-[#41493e]">Global shipping terms and destination.</p>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-4 bg-[#f4f4ef] rounded-md cursor-pointer hover:bg-[#eeeee9] transition-colors">
                      <input className="text-[#00450d] focus:ring-[#00450d]" name="incoterms" type="radio" />
                      <span className="font-bold">FOB</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-[#f4f4ef] rounded-md cursor-pointer hover:bg-[#eeeee9] transition-colors">
                      <input className="text-[#00450d] focus:ring-[#00450d]" name="incoterms" type="radio" />
                      <span className="font-bold">CIF</span>
                    </label>
                  </div>
                  <input
                    className="w-full bg-[#e3e3de] border-none border-b-2 border-[#717a6d]/20 focus:border-[#00450d] focus:ring-0 rounded-md py-4 px-6 text-[#1a1c19] font-sans"
                    placeholder="Destination Port / City"
                    type="text"
                  />
                  <label className="flex items-center gap-3">
                    <input className="rounded text-[#00450d] focus:ring-[#00450d]" type="checkbox" />
                    <span className="text-sm">End-to-End Cold-Chain Logistics required</span>
                  </label>
                </div>
              </div>

              {/* Step 4: Compliance */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <span className="text-xs font-bold text-[#1b5e20] mb-2 block uppercase tracking-tighter">Step 04</span>
                  <h3 className="text-2xl font-headline font-bold mb-2">Compliance</h3>
                  <p className="text-sm text-[#41493e]">Select mandatory certifications.</p>
                </div>
                <div className="md:col-span-2 flex flex-wrap gap-3">
                  {['HACCP', 'Global GAP', 'ISO 22000', 'Halal Certified', 'USDA Organic', 'Fair Trade'].map((cert) => (
                    <button
                      key={cert}
                      className="px-4 py-2 border border-[#c0c9bb] rounded-full text-xs font-bold hover:bg-[#ffdeac] hover:border-[#00450d] transition-all"
                      type="button"
                    >
                      {cert}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-8 flex justify-end">
                <button className="bg-[#00450d] text-white px-12 py-5 rounded font-headline font-extrabold text-xl scale-95 hover:scale-100 transition-all shadow-lg active:opacity-90" type="submit">
                  Submit Procurement Request
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Expert Advisory Section */}
        <section className="py-32 bg-[#eeeee9] text-[#1a1c19] px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-6">Expert Advisory <br/><span className="text-[#00450d] italic">At Your Fingertips.</span></h2>
                <p className="text-[#41493e]">Enterprise-scale trade requires precision. Our specialists are available for consultation to optimize your supply route and quality metrics.</p>
              </div>
              <div className="bg-[#1b5e20] text-[#90d689] p-6 rounded-xl flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-[#00450d] flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">support_agent</span>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-80">Response Guarantee</div>
                  <div className="text-xl font-headline font-bold">Within 4 Business Hours</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600',
                  badge: 'Logistics',
                  badgeColor: 'bg-[#00450d]',
                  title: 'Regional Logistics Lead',
                  description: 'Specialist in trans-pacific shipping and inland terminal optimization.'
                },
                {
                  image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600',
                  badge: 'Quality',
                  badgeColor: 'bg-[#7a5649]',
                  title: 'Quality Compliance Officer',
                  description: 'Expert in international food safety standards and HACCP certification.'
                },
                {
                  image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600',
                  badge: 'Strategy',
                  badgeColor: 'bg-[#503600]',
                  title: 'Custom Sourcing Specialist',
                  description: 'Assists with large-scale seasonal planning and diverse commodity portfolios.'
                }
              ].map((expert, index) => (
                <div key={index} className="bg-[#ffffff] rounded-2xl overflow-hidden flex flex-col hover:translate-y-[-10px] transition-transform duration-500 shadow-sm">
                  <div className="h-64 relative">
                    <img className="w-full h-full object-cover" src={expert.image} alt={expert.title} />
                    <div className={`absolute bottom-4 left-4 ${expert.badgeColor} text-white px-3 py-1 text-[10px] font-bold uppercase rounded`}>
                      {expert.badge}
                    </div>
                  </div>
                  <div className="p-8 flex-grow">
                    <h4 className="text-xl font-headline font-bold mb-1">{expert.title}</h4>
                    <p className="text-sm text-[#41493e] mb-6">{expert.description}</p>
                    <button className="w-full border-2 border-[#00450d] text-[#00450d] font-headline font-bold py-3 rounded hover:bg-[#00450d] hover:text-white transition-all">
                      Request Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Signals & Live Status */}
        <section className="py-32 px-8 border-t border-[#c0c9bb]/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex-1">
                <h3 className="text-sm font-sans text-[#41493e] uppercase tracking-widest mb-8">Verified Trade Partners</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 grayscale opacity-40">
                  {['GLOBAL TRADE BD', 'AGRI-CERT', 'ECO-PASS', 'LOGI-FLOW'].map((logo) => (
                    <div key={logo} className="flex items-center justify-center font-headline font-black text-xl italic tracking-tighter">
                      {logo}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-96 bg-[#00450d] text-white p-8 rounded-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#91d78a] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4caf50]"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest">Live Network Status</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="opacity-70">Major Ports</span>
                      <span className="font-bold">Operational</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="opacity-70">Customs Queue</span>
                      <span className="font-bold">Fast (1.2d)</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="opacity-70">Transit Integrity</span>
                      <span className="font-bold">100% Secure</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-8 -bottom-8 opacity-10">
                  <span className="material-symbols-outlined text-[128px]">language</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .font-headline {
          font-family: 'Manrope', sans-serif;
        }
        
        .font-body, .font-sans {
          font-family: 'Inter', sans-serif;
        }
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        .editorial-shadow {
          box-shadow: 0 20px 40px rgba(26, 28, 25, 0.06);
        }
        
        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default ProcurementCenter;
