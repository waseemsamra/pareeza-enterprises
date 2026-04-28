import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const GlobalLogistics = () => {
  return (
    <div className="bg-[#fafaf5] min-h-screen font-sans antialiased">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <header className="relative h-[921px] flex items-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <img
              alt="Cold-Chain Logistics"
              className="w-full h-full object-cover scale-105"
              src="/products/logistics-hero.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#00450d]/80 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1 bg-[#ffdeac] text-[#281900] text-[0.75rem] font-bold tracking-[0.05em] rounded-full mb-6 uppercase">
                Global Logistics Infrastructure
              </span>
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-white leading-[1.1] tracking-tight mb-8">
                Precision at Every Latitude: Our Global <span className="text-[#acf4a4]">Cold-Chain Backbone</span>.
              </h1>
              <p className="text-xl text-white/90 leading-relaxed mb-10 font-body">
                We manage the invisible architecture of freshness. From climate-controlled vessel hulls to localized last-mile logistics, our infrastructure ensures the integrity of your harvest from field to port.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="bg-[#acf4a4] text-[#002203] px-8 py-4 rounded-md font-bold text-lg hover:bg-white transition-colors duration-300"
                >
                  Request a Logistics Simulation
                </Link>
                <Link
                  to="/contact"
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white/20 transition-colors duration-300"
                >
                  View Fleet Specs
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Network Overview Section */}
        <section className="py-32 bg-[#fafaf5]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5">
                <h2 className="text-[0.75rem] font-bold tracking-[0.05em] text-[#7a5649] uppercase mb-4">The Global Grid</h2>
                <h3 className="text-4xl font-headline font-bold text-[#1a1c19] leading-tight mb-6">Optimized Hubs & Trade Corridors</h3>
                <p className="text-lg text-[#41493e] leading-relaxed mb-8">
                  Our network is strategically anchored in the world's most vital agricultural zones. We reduce transit times through proprietary route optimization that accounts for real-time atmospheric variables.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f4f4ef] border-l-4 border-[#00450d]">
                    <span className="material-symbols-outlined text-[#00450d] mt-1">hub</span>
                    <div>
                      <h4 className="font-bold text-[#1a1c19]">Southeast Asia Hub</h4>
                      <p className="text-sm text-[#41493e]">Singapore & Ho Chi Minh City transshipment expertise.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f4f4ef] border-l-4 border-[#7a5649]">
                    <span className="material-symbols-outlined text-[#7a5649] mt-1">euro</span>
                    <div>
                      <h4 className="font-bold text-[#1a1c19]">European Gateway</h4>
                      <p className="text-sm text-[#41493e]">Rotterdam automated cold-storage facilities.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f4f4ef] border-l-4 border-[#503600]">
                    <span className="material-symbols-outlined text-[#503600] mt-1">public</span>
                    <div>
                      <h4 className="font-bold text-[#1a1c19]">African Export Corridors</h4>
                      <p className="text-sm text-[#41493e]">Cape Town and Mombasa rapid-cool protocols.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 relative h-[500px]">
                <div className="absolute inset-0 bg-[#eeeee9] rounded-3xl overflow-hidden">
                  <img
                    alt="Logistics Map"
                    className="w-full h-full object-cover opacity-80"
                    src="/products/logistics-map.jpg"
                  />
                  <div className="absolute inset-0 bg-[#00450d]/10"></div>
                  <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-[#c0c9bb]/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs font-bold text-[#41493e] uppercase">Current Transit Volume</p>
                        <p className="text-2xl font-headline font-extrabold text-[#00450d]">14.2M Metric Tons</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-[#41493e] uppercase">Network Latency</p>
                        <p className="text-2xl font-headline font-extrabold text-[#7a5649]">0.4% Deviation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Infrastructure Cards */}
        <section className="py-32 bg-[#f4f4ef]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-16">
              <h2 className="text-[0.75rem] font-bold tracking-[0.05em] text-[#00450d] uppercase mb-4">Precision Engineering</h2>
              <h3 className="text-4xl font-headline font-bold text-[#1a1c19]">Thermal & Atmospheric Infrastructure</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 - Active Thermal Monitoring */}
              <div className="group bg-[#ffffff] p-8 rounded-xl transition-all duration-300 hover:bg-[#fafaf5]">
                <div className="w-16 h-16 bg-[#acf4a4] rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[#00450d] text-3xl">thermostat</span>
                </div>
                <h4 className="text-xl font-headline font-bold text-[#1a1c19] mb-4">Active Thermal Monitoring</h4>
                <p className="text-[#41493e] leading-relaxed">
                  Sensor-embedded crates providing minute-by-minute temperature telemetry via satellite uplink, ensuring ±0.5°C variance control.
                </p>
              </div>

              {/* Card 2 - Atmospheric Control */}
              <div className="group bg-[#ffffff] p-8 rounded-xl transition-all duration-300 hover:bg-[#fafaf5]">
                <div className="w-16 h-16 bg-[#fdcdbc] rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[#7a5649] text-3xl">air</span>
                </div>
                <h4 className="text-xl font-headline font-bold text-[#1a1c19] mb-4">Atmospheric Control Units</h4>
                <p className="text-[#41493e] leading-relaxed">
                  Precision O₂ and CO₂ regulation to slow ripening and preserve the cellular integrity of produce during ultra-long maritime transits.
                </p>
              </div>

              {/* Card 3 - Last-Mile Integrity */}
              <div className="group bg-[#ffffff] p-8 rounded-xl transition-all duration-300 hover:bg-[#fafaf5]">
                <div className="w-16 h-16 bg-[#ffdeac] rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[#503600] text-3xl">local_shipping</span>
                </div>
                <h4 className="text-xl font-headline font-bold text-[#1a1c19] mb-4">Last-Mile Integrity</h4>
                <p className="text-[#41493e] leading-relaxed">
                  Specialized EV fleet for urban delivery featuring multi-zone refrigeration, maintaining the cold-chain until final handover.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Real-Time Tracking Visualization */}
        <section className="py-32 bg-[#2f312e] text-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="aspect-video bg-[#272727] rounded-2xl p-4 border border-[#404040] shadow-2xl relative overflow-hidden">
                  {/* Mock Dashboard UI */}
                  <div className="flex items-center justify-between mb-8 border-b border-[#404040] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-bold tracking-widest text-[#a0a0a0] uppercase">Live Shipment: TGA-4921-X</span>
                    </div>
                    <span className="material-symbols-outlined text-[#606060]">settings</span>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-4xl font-headline font-light">3.2°C</p>
                        <p className="text-[0.65rem] text-[#a0a0a0] uppercase tracking-tighter">Core Temperature</p>
                      </div>
                      <div className="w-2/3 h-16 flex items-end gap-1">
                        <div className="flex-1 bg-green-500/20 h-[40%]"></div>
                        <div className="flex-1 bg-green-500/20 h-[45%]"></div>
                        <div className="flex-1 bg-green-500/40 h-[42%]"></div>
                        <div className="flex-1 bg-green-500 h-[38%]"></div>
                        <div className="flex-1 bg-green-500/60 h-[41%]"></div>
                        <div className="flex-1 bg-green-500/30 h-[44%]"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#1a1a1a]/50 p-4 rounded-lg border border-[#404040]/50">
                        <p className="text-[0.6rem] text-[#a0a0a0] uppercase">Humidity</p>
                        <p className="text-lg font-bold">88.4%</p>
                      </div>
                      <div className="bg-[#1a1a1a]/50 p-4 rounded-lg border border-[#404040]/50">
                        <p className="text-[0.6rem] text-[#a0a0a0] uppercase">O2 Level</p>
                        <p className="text-lg font-bold">2.1%</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-[0.6rem] text-[#606060] font-mono">
                    LAST UPDATED: 14:02:44 GMT | LAT: 1.3521 N | LON: 103.8198 E
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-[#ffba38] text-[0.75rem] font-bold tracking-[0.05em] uppercase mb-4">The Digital Twin</h2>
                <h3 className="text-4xl font-headline font-bold mb-6">IoT-Enabled Transparency</h3>
                <p className="text-[#a0a0a0] text-lg leading-relaxed mb-8">
                  Our bulk buyers gain access to a secure, real-time dashboard. Monitor every metric that matters. Not just location, but the microscopic health of your shipment.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                    <span>Historical temperature data logs for compliance audit.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                    <span>Immediate push notifications for threshold variances.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                    <span>Blockchain-verified bill of lading and customs documentation.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance & Safety */}
        <section className="py-32 bg-[#fafaf5]">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <h2 className="text-[0.75rem] font-bold tracking-[0.05em] text-[#7a5649] uppercase mb-4">Certified Excellence</h2>
            <h3 className="text-4xl font-headline font-bold text-[#1a1c19] mb-12">Global Safety & Protocol Standards</h3>

            <div className="flex flex-wrap justify-center gap-12 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-5xl mb-2" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
                <span className="font-bold text-sm tracking-widest uppercase">HACCP Certified</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-5xl mb-2" style={{fontVariationSettings: "'FILL' 1"}}>security</span>
                <span className="font-bold text-sm tracking-widest uppercase">ISO 22000</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-5xl mb-2" style={{fontVariationSettings: "'FILL' 1"}}>eco</span>
                <span className="font-bold text-sm tracking-widest uppercase">GlobalG.A.P.</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-5xl mb-2" style={{fontVariationSettings: "'FILL' 1"}}>ac_unit</span>
                <span className="font-bold text-sm tracking-widest uppercase">Cold-Chain Protocol V.4</span>
              </div>
            </div>

            <p className="max-w-2xl mx-auto mt-12 text-[#41493e] italic">
              "Our commitment to safety is absolute. Every container undergoes a 42-point technical inspection prior to loading, ensuring total adherence to international biosecurity standards."
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-[#00450d] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              alt="Logistics Detail"
              className="w-full h-full object-cover"
              src="/products/logistics-containers.jpg"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
            <h3 className="text-4xl md:text-5xl font-headline font-extrabold text-white mb-8">
              Ready to Optimize Your Global Supply?
            </h3>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <Link
                to="/contact"
                className="bg-white text-[#00450d] px-10 py-5 rounded-md font-bold text-lg hover:bg-[#acf4a4] transition-all shadow-xl"
              >
                Request a Logistics Simulation
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white/40 text-white px-10 py-5 rounded-md font-bold text-lg hover:bg-white/10 transition-all"
              >
                Contact Our Freight Specialists
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GlobalLogistics;
