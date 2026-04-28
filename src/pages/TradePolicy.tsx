import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const TradePolicy = () => {
  return (
    <div className="bg-[#fafaf5] font-body text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Navigation />

      <main className="pt-24 pb-20">
        {/* Compliance Overview Hero */}
        <section className="px-8 mb-20">
          <div className="relative overflow-hidden rounded-xl bg-primary text-white p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="z-10 max-w-2xl">
              <span className="font-label text-xs font-bold tracking-widest uppercase text-[#acf4a4] mb-4 block">
                Regulatory Intelligence
              </span>
              <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter leading-tight mb-6">
                Trade Policy & Compliance Tracker
              </h1>
              <p className="text-lg text-[#90d689]/80 leading-relaxed mb-8 max-w-lg">
                Real-time monitoring of global agricultural mandates, tariff shifts, and sustainability requirements to ensure your harvest moves without friction.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-lg border border-white/10">
                  <span className="block text-3xl font-bold">98.2%</span>
                  <span className="text-xs uppercase tracking-widest opacity-70">Fleet Compliance</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-lg border border-white/10">
                  <span className="block text-3xl font-bold">14</span>
                  <span className="text-xs uppercase tracking-widest opacity-70">Active Alerts</span>
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-md aspect-square md:aspect-auto h-full">
              <img
                className="rounded-xl object-cover h-full w-full shadow-2xl transform rotate-2"
                alt="dramatic aerial view of a cargo ship"
                src="/products/trade-hero.jpg"
              />
            </div>
          </div>
        </section>

        {/* Global Policy Ticker */}
        <section className="w-full bg-[#f4f4ef] py-4 overflow-hidden mb-20">
          <div className="ticker-scroll flex gap-16 whitespace-nowrap animate-ticker">
            <div className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
              <span className="text-sm font-label uppercase tracking-wider text-[#41493e]">EU Deforestation (EUDR) Updates</span>
              <span className="text-on-surface">Compliance window narrows for soy and beef exports.</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#503600]"></span>
              <span className="text-sm font-label uppercase tracking-wider text-[#41493e]">Australian Biosecurity</span>
              <span className="text-on-surface">New levies implemented for grain imports effective Oct 1.</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-sm font-label uppercase tracking-wider text-[#41493e]">USMCA Tariff Review</span>
              <span className="text-on-surface">Stable outlook for seasonal produce through Q4.</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
              <span className="text-sm font-label uppercase tracking-wider text-[#41493e]">Mercosur Update</span>
              <span className="text-on-surface">New phytosanitary digital certificate requirements.</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-8 max-w-[1600px] mx-auto">
          {/* Left Column - Regional Compliance & Tariff Monitor */}
          <div className="lg:col-span-8 space-y-12">
            {/* Regional Compliance Status */}
            <section>
              <div className="flex items-baseline justify-between mb-8">
                <h2 className="font-headline text-3xl font-bold tracking-tight">Regional Compliance Landscape</h2>
                <Link
                  to="/logistics"
                  className="text-sm font-bold text-primary hover:underline uppercase tracking-widest"
                >
                  Global Map View
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* EMEA */}
                <div className="bg-[#f4f4ef] p-6 rounded-xl border-l-4 border-[#ba1a1a]">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label text-xs font-bold tracking-tighter uppercase text-[#41493e]">
                      EMEA Region
                    </span>
                    <span className="bg-[#ba1a1a]/10 text-[#ba1a1a] px-2 py-1 rounded text-[10px] font-bold">
                      ACTION REQUIRED
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">High Scrutiny</h3>
                  <p className="text-sm text-[#41493e] mb-6 leading-relaxed">
                    Recent adjustments to pesticide MRLs (Maximum Residue Levels) for citrus exports.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>Updated 2h ago</span>
                  </div>
                </div>

                {/* APAC */}
                <div className="bg-[#f4f4ef] p-6 rounded-xl border-l-4 border-[#503600]">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label text-xs font-bold tracking-tighter uppercase text-[#41493e]">
                      APAC Region
                    </span>
                    <span className="bg-[#503600]/10 text-[#503600] px-2 py-1 rounded text-[10px] font-bold">
                      UNDER REVIEW
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Stable Transition</h3>
                  <p className="text-sm text-[#41493e] mb-6 leading-relaxed">
                    Transitioning to digital phytosanitary certificates for Australia/NZ corridors.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>Updated 5h ago</span>
                  </div>
                </div>

                {/* Americas */}
                <div className="bg-[#f4f4ef] p-6 rounded-xl border-l-4 border-primary">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label text-xs font-bold tracking-tighter uppercase text-[#41493e]">
                      Americas Region
                    </span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-[10px] font-bold">
                      STABLE
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Full Compliance</h3>
                  <p className="text-sm text-[#41493e] mb-6 leading-relaxed">
                    Trade flows remain consistent with FSMA 204 traceability mandates.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>Updated 1d ago</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Tariff & Duty Monitor */}
            <section>
              <h2 className="font-headline text-3xl font-bold tracking-tight mb-8">
                Tariff & Duty Monitor
              </h2>
              <div className="bg-[#ffffff] rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#eeeee9] text-[#41493e] text-xs font-bold uppercase tracking-widest">
                      <th className="px-6 py-4">Commodity Group</th>
                      <th className="px-6 py-4">Current Duty</th>
                      <th className="px-6 py-4">Projected (Q1)</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Last Modified</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eeeee9]">
                    <tr className="hover:bg-[#f4f4ef] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-[#fdcdbc]/30 flex items-center justify-center text-[#7a5649]">
                            <span className="material-symbols-outlined text-lg">grain</span>
                          </div>
                          <span className="font-bold">Premium Grains</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono">4.2%</td>
                      <td className="px-6 py-4 font-mono text-[#ba1a1a]">4.8% ↑</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full bg-[#ffdad6]/20 text-[#ba1a1a] text-[10px] font-bold uppercase">
                          Escalating
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#41493e]">Oct 12, 2024</td>
                    </tr>

                    <tr className="hover:bg-[#f4f4ef] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-[#fdcdbc]/30 flex items-center justify-center text-[#7a5649]">
                            <span className="material-symbols-outlined text-lg">nutrition</span>
                          </div>
                          <span className="font-bold">Tropical Fruits</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono">2.5%</td>
                      <td className="px-6 py-4 font-mono text-primary">2.1% ↓</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase">
                          Decreasing
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#41493e]">Oct 10, 2024</td>
                    </tr>

                    <tr className="hover:bg-[#f4f4ef] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-[#fdcdbc]/30 flex items-center justify-center text-[#7a5649]">
                            <span className="material-symbols-outlined text-lg">restaurant_menu</span>
                          </div>
                          <span className="font-bold">Organic Meats</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono">6.0%</td>
                      <td className="px-6 py-4 font-mono">6.0% —</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full bg-[#e3e3de] text-[#41493e] text-[10px] font-bold uppercase">
                          Stable
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#41493e]">Sep 28, 2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            {/* Upcoming Deadlines */}
            <section className="bg-[#e3e3de] p-8 rounded-xl">
              <h3 className="font-headline text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">event</span>
                Implementation Dates
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-[#41493e] uppercase tracking-tighter">Nov</span>
                    <span className="text-xl font-bold text-primary leading-none">01</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">EUDR Soft Launch</h4>
                    <p className="text-xs text-[#41493e] leading-relaxed">
                      Documentation required for all soy shipments entering EU ports.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-[#41493e] uppercase tracking-tighter">Dec</span>
                    <span className="text-xl font-bold text-[#503600] leading-none">15</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">APAC ISO-22000 Update</h4>
                    <p className="text-xs text-[#41493e] leading-relaxed">
                      New safety standard certification mandatory for logistics partners.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 opacity-60">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-[#41493e] uppercase tracking-tighter">Jan</span>
                    <span className="text-xl font-bold text-[#41493e] leading-none">01</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">Annual Tariff Reset</h4>
                    <p className="text-xs text-[#41493e] leading-relaxed">
                      Scheduled review of Mercosur-EU trade parity rates.
                    </p>
                  </div>
                </div>
              </div>
              <Link
                to="/contact"
                className="w-full mt-8 py-3 bg-white text-primary border border-primary/20 rounded font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
              >
                Download Calendar
              </Link>
            </section>

            {/* Regulatory Document Center */}
            <section className="bg-[#f4f4ef] p-8 rounded-xl">
              <h3 className="font-headline text-xl font-bold mb-6">Secured Document Center</h3>
              <div className="space-y-4">
                <div className="group flex items-center justify-between p-3 bg-white rounded border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#41493e] group-hover:text-primary">description</span>
                    <span className="text-sm font-medium">Export Protocols 2024_v2</span>
                  </div>
                  <span className="material-symbols-outlined text-xs">download</span>
                </div>

                <div className="group flex items-center justify-between p-3 bg-white rounded border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#41493e] group-hover:text-primary">verified_user</span>
                    <span className="text-sm font-medium">ISO-22000 Compliance Pack</span>
                  </div>
                  <span className="material-symbols-outlined text-xs">download</span>
                </div>

                <div className="group flex items-center justify-between p-3 bg-white rounded border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#41493e] group-hover:text-primary">local_florist</span>
                    <span className="text-sm font-medium">Phytosanitary Lists (Americas)</span>
                  </div>
                  <span className="material-symbols-outlined text-xs">download</span>
                </div>
              </div>
            </section>

            {/* Direct Compliance Advisory */}
            <section className="relative overflow-hidden bg-primary p-8 rounded-xl text-white">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
                alt="professional woman in business attire"
                src="/products/trade-advisory.jpg"
              />
              <div className="relative z-10">
                <h3 className="font-headline text-xl font-bold mb-4">Dedicated Advisory</h3>
                <p className="text-sm opacity-80 mb-6 leading-relaxed">
                  Our Compliance Specialists are standing by to guide your shipments through complex jurisdictional legalities.
                </p>
                <Link
                  to="/contact"
                  className="flex items-center gap-2 px-6 py-3 bg-[#ffdeac] text-[#281900] font-bold rounded-lg text-sm hover:translate-x-1 transition-transform"
                >
                  Connect with an Expert
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TradePolicy;
