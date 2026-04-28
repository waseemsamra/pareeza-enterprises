import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Certifications = () => {
  return (
    <div className="bg-[#fafaf5] min-h-screen font-sans antialiased">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Quality control laboratory"
              className="w-full h-full object-cover scale-105"
              src="/products/cert-hero.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-[#ffdeac] text-[#281900] text-[0.75rem] font-bold tracking-[0.1em] rounded-full mb-6 uppercase">
                Quality Assurance
              </span>
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-white leading-[1.1] tracking-tight mb-8">
                Certifications & <br/>Compliance Standards
              </h1>
              <p className="text-xl text-white/90 font-light max-w-2xl leading-relaxed">
                Globally recognized certifications ensuring every shipment meets the highest standards of safety, quality, and sustainability.
              </p>
            </div>
          </div>
        </section>

        {/* Main Certifications Grid */}
        <section className="py-24 bg-[#fafaf5]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-headline font-bold text-[#1a1c19] mb-6">Our Global Certifications</h2>
              <p className="text-lg text-[#41493e] max-w-3xl mx-auto">
                We maintain the industry's most comprehensive certification portfolio to ensure seamless international trade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* HACCP */}
              <div className="bg-white rounded-2xl overflow-hidden editorial-shadow hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-primary">verified_user</span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-headline font-bold text-[#1a1c19] mb-3">HACCP</h3>
                  <p className="text-[#41493e] text-sm mb-4 leading-relaxed">
                    Hazard Analysis Critical Control Point - Internationally recognized food safety management system.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#717a6d]">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Certified & Audited</span>
                  </div>
                </div>
              </div>

              {/* ISO 22000 */}
              <div className="bg-white rounded-2xl overflow-hidden editorial-shadow hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-primary">gavel</span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-headline font-bold text-[#1a1c19] mb-3">ISO 22000</h3>
                  <p className="text-[#41493e] text-sm mb-4 leading-relaxed">
                    International food safety management standard ensuring hazard control throughout the supply chain.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#717a6d]">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>ISO Certified</span>
                  </div>
                </div>
              </div>

              {/* Global GAP */}
              <div className="bg-white rounded-2xl overflow-hidden editorial-shadow hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-primary">eco</span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-headline font-bold text-[#1a1c19] mb-3">Global GAP</h3>
                  <p className="text-[#41493e] text-sm mb-4 leading-relaxed">
                    Good Agricultural Practices certification for safe and sustainable farm production.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#717a6d]">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Farm Certified</span>
                  </div>
                </div>
              </div>

              {/* BRCGS */}
              <div className="bg-white rounded-2xl overflow-hidden editorial-shadow hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-primary">security</span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-headline font-bold text-[#1a1c19] mb-3">BRCGS</h3>
                  <p className="text-[#41493e] text-sm mb-4 leading-relaxed">
                    Brand Reputation through Compliance Global Standards for food safety and quality.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#717a6d]">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Grade A Certified</span>
                  </div>
                </div>
              </div>

              {/* MSC */}
              <div className="bg-white rounded-2xl overflow-hidden editorial-shadow hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-primary">water_drop</span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-headline font-bold text-[#1a1c19] mb-3">MSC</h3>
                  <p className="text-[#41493e] text-sm mb-4 leading-relaxed">
                    Marine Stewardship Council certification for sustainable wild-capture fisheries.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#717a6d]">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Sustainable Seafood</span>
                  </div>
                </div>
              </div>

              {/* Halal/Kosher */}
              <div className="bg-white rounded-2xl overflow-hidden editorial-shadow hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-primary">restaurant_menu</span>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-headline font-bold text-[#1a1c19] mb-3">Halal & Kosher</h3>
                  <p className="text-[#41493e] text-sm mb-4 leading-relaxed">
                    Religious dietary compliance certifications for global market accessibility.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#717a6d]">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Dual Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Control Process */}
        <section className="py-24 bg-[#f4f4ef]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-headline font-bold text-[#1a1c19] mb-6">Our Quality Control Process</h2>
              <p className="text-lg text-[#41493e] max-w-3xl mx-auto">
                Three-stage inspection ensuring every product meets international standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Stage 1 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 editorial-shadow">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6">1</div>
                  <h3 className="text-xl font-headline font-bold text-[#1a1c19] mb-4">Farm Harvest Inspection</h3>
                  <p className="text-[#41493e] text-sm leading-relaxed">
                    Pre-harvest soil testing, pesticide residue screening, and visual quality assessment at source farms.
                  </p>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 editorial-shadow">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6">2</div>
                  <h3 className="text-xl font-headline font-bold text-[#1a1c19] mb-4">Container Loading Audit</h3>
                  <p className="text-[#41493e] text-sm leading-relaxed">
                    Temperature verification, packaging integrity check, and documentation review before sealing.
                  </p>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 editorial-shadow">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6">3</div>
                  <h3 className="text-xl font-headline font-bold text-[#1a1c19] mb-4">Port Arrival Verification</h3>
                  <p className="text-[#41493e] text-sm leading-relaxed">
                    Final quality inspection, cold chain data review, and customs documentation validation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#fafaf5]">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-[#1a1c19] mb-8">
              Request Certification Documents
            </h2>
            <p className="text-xl text-[#41493e] mb-12 max-w-2xl mx-auto">
              Need specific certification copies for your import requirements? Our compliance team is ready to assist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-primary text-white px-10 py-4 rounded-md font-headline font-bold text-lg hover:bg-primary transition-all shadow-lg"
              >
                Contact Compliance Team
              </Link>
              <Link
                to="/trade-policy"
                className="bg-white border-2 border-primary text-primary px-10 py-4 rounded-md font-headline font-bold text-lg hover:bg-[#f4f4ef] transition-all"
              >
                View Trade Policies
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .editorial-shadow {
          box-shadow: 0 20px 40px rgba(26, 28, 25, 0.06);
        }
      `}</style>
    </div>
  );
};

export default Certifications;
