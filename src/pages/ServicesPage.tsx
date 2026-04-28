import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Services = () => {
  return (
    <div className="bg-[#fafaf5] min-h-screen font-sans antialiased">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[870px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Global Logistics"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1494412574643-35d324698420?w=1920"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1c19]/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
            <div className="max-w-3xl">
              <span className="text-[#ffdeac] uppercase tracking-[0.2em] font-bold text-xs mb-4 block">International Food Networks</span>
              <h1 className="text-white font-headline font-extrabold text-5xl md:text-7xl leading-[1.1] mb-8 tracking-tighter">
                Expert Services for a <span className="text-[#acf4a4]">Global Food Chain</span>
              </h1>
              <p className="text-white/80 text-xl max-w-xl leading-relaxed font-light mb-10">
                We connect the world's most fertile regions to the most demanding markets through a sophisticated tapestry of logistics and care.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="bg-[#00450d] text-white px-8 py-4 rounded font-bold text-lg hover:bg-[#1b5e20] transition-all">
                  Enquire for Services
                </Link>
                <Link to="/services" className="border border-white/30 text-white backdrop-blur-sm px-8 py-4 rounded font-bold text-lg hover:bg-white/10 transition-all">
                  View Logistics Fleet
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="py-32 bg-[#fafaf5]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-12 gap-12 items-end">
              <div className="col-span-12 md:col-span-7">
                <h2 className="font-headline font-extrabold text-4xl text-[#00450d] mb-6">A Trusted Partner in Global Food Distribution.</h2>
                <p className="text-[#41493e] text-lg leading-relaxed max-w-2xl">
                  AgroFeed isn't just a facilitator; we are the stewards of the harvest. By integrating advanced technology with boots-on-the-ground expertise, we ensure that every piece of produce arriving at its destination retains the same vitality it possessed when first plucked from the earth.
                </p>
              </div>
              <div className="col-span-12 md:col-span-5 flex justify-end">
                <div className="bg-[#f4f4ef] p-8 rounded-xl border-l-4 border-[#503600]">
                  <span className="text-[#503600] font-bold block mb-2 uppercase text-xs tracking-widest">Global Status</span>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined w-10 h-10">language</span>
                    <span className="text-[#1a1c19] font-semibold">142 Active Trade Routes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Services Grid (Bento Style) */}
        <section className="pb-32 bg-[#fafaf5]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Global Logistics */}
              <div className="md:col-span-8 group relative overflow-hidden bg-[#ffffff] p-10 rounded-xl transition-all duration-500 hover:bg-[#fafaf5]">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="material-symbols-outlined w-10 h-10">sailing</span>
                    <h3 className="font-headline font-bold text-2xl mb-4">Global Logistics</h3>
                    <p className="text-[#41493e] max-w-md">Seamless air, sea, and land transport networks optimized for speed and reliability. Our multimodal approach ensures no corner of the globe is out of reach.</p>
                  </div>
                  <div className="mt-8 flex items-center text-[#00450d] font-bold group-hover:gap-4 transition-all gap-2 cursor-pointer">
                    <span>Learn More</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </div>
                </div>
                <img
                  alt="Container Logistics"
                  className="absolute -right-20 -bottom-20 w-80 h-80 object-cover opacity-10 group-hover:opacity-20 transition-opacity grayscale"
                  src="https://images.unsplash.com/photo-1494412574643-35d324698420?w=600"
                />
              </div>

              {/* Quality Control */}
              <div className="md:col-span-4 bg-[#00450d] text-white p-10 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined w-6 h-6">verified</span>
                  <h3 className="font-headline font-bold text-2xl mb-4">Quality Control</h3>
                  <p className="text-[#acf4a4]/80">Three-stage inspection and certification process that guarantees export-grade excellence from farmgate to warehouse.</p>
                </div>
                <div className="mt-8">
                  <ul className="space-y-3 text-sm font-medium">
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined w-4 h-4">check_circle</span> Pre-harvest verification
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined w-4 h-4">check_circle</span> Mid-transit health checks
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="material-symbols-outlined w-4 h-4">check_circle</span> Final destination audit
                    </li>
                  </ul>
                </div>
              </div>

              {/* Custom Sourcing */}
              <div className="md:col-span-4 bg-[#e3e3de] p-10 rounded-xl flex flex-col justify-between border border-transparent hover:border-[#c0c9bb] transition-colors">
                <div>
                  <span className="material-symbols-outlined w-10 h-10">handshake</span>
                  <h3 className="font-headline font-bold text-2xl mb-4">Custom Sourcing</h3>
                  <p className="text-[#41493e]">Boutique sourcing for specific client needs. We find the rare, the seasonal, and the ultra-premium through our private network.</p>
                </div>
                <div className="mt-8">
                  <Link to="/services" className="text-[#7a5649] font-bold text-sm underline underline-offset-4">Explore Networks</Link>
                </div>
              </div>

              {/* Cold-Chain */}
              <div className="md:col-span-8 group relative overflow-hidden bg-[#ffffff] p-10 rounded-xl transition-all duration-500 hover:bg-[#fafaf5]">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="material-symbols-outlined w-12 h-12 mb-6">ac_unit</span>
                    <h3 className="font-headline font-bold text-2xl mb-4">Cold-Chain Management</h3>
                    <p className="text-[#41493e] max-w-lg">Specialized temperature-controlled storage and transit. Every container is equipped with real-time IoT sensors tracking humidity, temperature, and ethylene levels.</p>
                  </div>
                  <div className="mt-8 flex items-center text-[#503600] font-bold gap-4">
                    <span className="material-symbols-outlined w-12 h-12 mb-6">sensors</span>
                    <span className="text-sm">Real-time Telemetry Enabled</span>
                  </div>
                </div>
                <img
                  alt="Cold storage"
                  className="absolute -right-10 -top-10 w-64 h-64 object-cover opacity-5 group-hover:opacity-10 transition-opacity"
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-32 bg-[#f4f4ef]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <span className="text-[#00450d] font-bold uppercase tracking-widest text-xs">The Workflow</span>
              <h2 className="font-headline font-extrabold text-4xl mt-4">Precision From Seed to Shelf</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: '01', title: 'Sourcing', description: 'Identifying prime harvests and negotiating direct contracts with vetted global growers.' },
                { number: '02', title: 'Quality Check', description: 'Rigorous physical and chemical testing to ensure every item meets international standards.' },
                { number: '03', title: 'Logistics', description: 'Execution of the custom transport plan via our integrated air, sea, and land channels.' },
                { number: '04', title: 'Delivery', description: 'Final-mile fulfillment to distributors, ensuring the cold chain is never broken.' }
              ].map((step) => (
                <div key={step.title} className="relative">
                  <div className="text-[8rem] font-black text-[#1a1c19]/5 absolute -top-20 -left-4 pointer-events-none">{step.number}</div>
                  <h4 className="font-bold text-xl mb-4 relative z-10">{step.title}</h4>
                  <p className="text-[#41493e] text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnerships Section */}
        <section className="py-32 bg-[#fafaf5]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <img
                  alt="Grower Partnership"
                  className="rounded-xl shadow-2xl"
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="font-headline font-extrabold text-4xl text-[#1a1c19] mb-8">Collaborating with Global Growers & Premium Distributors.</h2>
                <p className="text-[#41493e] text-lg mb-8">Our success is built on the strength of our relationships. From family-owned orchards in the Mediterranean to large-scale distributors in East Asia, we bridge the gap with integrity and transparency.</p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 border-l border-[#c0c9bb]">
                    <div className="text-3xl font-black text-[#00450d] mb-1">500+</div>
                    <div className="text-xs uppercase font-bold text-[#41493e]">Global Growers</div>
                  </div>
                  <div className="p-4 border-l border-[#c0c9bb]">
                    <div className="text-3xl font-black text-[#00450d] mb-1">85</div>
                    <div className="text-xs uppercase font-bold text-[#41493e]">Strategic Hubs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 bg-[#00450d] overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none"></div>
          <div className="max-w-5xl mx-auto px-8 relative z-10 text-center">
            <h2 className="font-headline font-extrabold text-4xl md:text-5xl text-white mb-8">Ready to Elevate Your Supply Chain?</h2>
            <p className="text-[#90d689] text-xl mb-12 max-w-2xl mx-auto font-light">
              Discuss a custom logistics plan with our global trade experts. We provide tailored solutions for every volume.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <Link to="/contact" className="w-full md:w-auto bg-[#ffdeac] text-white px-12 py-5 rounded font-extrabold text-xl hover:bg-[#ffba38] transition-all">
                Request a Custom Logistics Plan
              </Link>
              <Link to="/contact" className="w-full md:w-auto border-2 border-white text-white px-12 py-5 rounded font-extrabold text-xl hover:bg-white/10 transition-all">
                Contact Sales Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Inter:wght@400;500;600&display=swap');
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
      `}</style>
    </div>
  );
};

export default Services;
