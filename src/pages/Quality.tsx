import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Quality = () => {
  return (
    <div className="bg-[#fafaf5] min-h-screen font-sans antialiased">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[819px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover"
              alt="clean high-tech laboratory setting"
              src="/products/certificate-banner.png"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#00450d]/90 to-[#00450d]/40"></div>
          </div>
          <div className="container mx-auto px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1 bg-[#ffdeac] text-[#281900] text-[0.7rem] font-bold tracking-widest uppercase mb-6 rounded-sm">
                Verification Excellence
              </span>
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-8">
                Uncompromising Standards: Global Food Safety & Compliance
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-xl">
                Our commitment to quality is the cornerstone of our global export operations, ensuring every shipment meets the world's most rigorous health and safety requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-12 bg-[#f4f4ef]">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-headline font-bold text-[#00450d] mb-2">100%</span>
                <span className="text-xs font-label uppercase tracking-widest text-[#41493e] font-semibold">Export Compliance Rate</span>
              </div>
              <div className="flex flex-col items-center border-x-0 md:border-x border-[#c0c9bb]/30">
                <span className="text-4xl font-headline font-bold text-[#00450d] mb-2">Zero</span>
                <span className="text-xs font-label uppercase tracking-widest text-[#41493e] font-semibold">Batch Rejections in 2023</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-headline font-bold text-[#00450d] mb-2">45+</span>
                <span className="text-xs font-label uppercase tracking-widest text-[#41493e] font-semibold">Verified Jurisdictions</span>
              </div>
            </div>
          </div>
        </section>

        {/* Global Certifications Grid */}
        <section className="py-24 bg-[#fafaf5]">
          <div className="container mx-auto px-8">
            <div className="mb-16">
              <h2 className="font-headline text-3xl font-bold text-[#1a1c19] tracking-tight mb-4">Global Certifications</h2>
              <div className="w-12 h-1 bg-[#00450d]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* HACCP */}
              <div className="bg-[#ffffff] p-8 group hover:bg-[#fafaf5] transition-all duration-300">
                <div className="w-16 h-16 bg-[#eeeee9] mb-6 flex items-center justify-center rounded-lg">
                  <span className="material-symbols-outlined text-3xl text-[#00450d]">verified_user</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-[#1a1c19] mb-3">HACCP</h3>
                <p className="text-[#41493e] text-sm leading-relaxed mb-6">
                  Hazard Analysis Critical Control Point (HACCP) is an internationally recognized method of identifying and managing food safety related risk.
                </p>
                <span className="text-[0.65rem] font-bold text-[#00450d] uppercase tracking-tighter">Status: Active Renewal</span>
              </div>

              {/* ISO 22000 */}
              <div className="bg-[#ffffff] p-8 group hover:bg-[#fafaf5] transition-all duration-300">
                <div className="w-16 h-16 bg-[#eeeee9] mb-6 flex items-center justify-center rounded-lg">
                  <span className="material-symbols-outlined text-3xl text-[#00450d]">gavel</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-[#1a1c19] mb-3">ISO 22000</h3>
                <p className="text-[#41493e] text-sm leading-relaxed mb-6">
                  International standard that specifies requirements for a food safety management system where an organization in the food chain needs to demonstrate its ability.
                </p>
                <span className="text-[0.65rem] font-bold text-[#00450d] uppercase tracking-tighter">Global Gold Standard</span>
              </div>

              {/* Global GAP */}
              <div className="bg-[#ffffff] p-8 group hover:bg-[#fafaf5] transition-all duration-300">
                <div className="w-16 h-16 bg-[#eeeee9] mb-6 flex items-center justify-center rounded-lg">
                  <span className="material-symbols-outlined text-3xl text-[#00450d]">public</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-[#1a1c19] mb-3">Global GAP</h3>
                <p className="text-[#41493e] text-sm leading-relaxed mb-6">
                  Good Agricultural Practices ensuring that food is grown with the highest standards of safety, sustainability, and worker welfare.
                </p>
                <span className="text-[0.65rem] font-bold text-[#00450d] uppercase tracking-tighter">Verified Farm Network</span>
              </div>

              {/* BRCGS */}
              <div className="bg-[#ffffff] p-8 group hover:bg-[#fafaf5] transition-all duration-300">
                <div className="w-16 h-16 bg-[#eeeee9] mb-6 flex items-center justify-center rounded-lg">
                  <span className="material-symbols-outlined text-3xl text-[#00450d]">security</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-[#1a1c19] mb-3">BRCGS</h3>
                <p className="text-[#41493e] text-sm leading-relaxed mb-6">
                  Brand Reputation through Compliance Global Standard (BRCGS) provides a framework to manage product safety, integrity, and quality.
                </p>
                <span className="text-[0.65rem] font-bold text-[#00450d] uppercase tracking-tighter">Supply Chain Security</span>
              </div>

              {/* MSC */}
              <div className="bg-[#ffffff] p-8 group hover:bg-[#fafaf5] transition-all duration-300">
                <div className="w-16 h-16 bg-[#eeeee9] mb-6 flex items-center justify-center rounded-lg">
                  <span className="material-symbols-outlined text-3xl text-[#00450d]">water_drop</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-[#1a1c19] mb-3">MSC</h3>
                <p className="text-[#41493e] text-sm leading-relaxed mb-6">
                  The Marine Stewardship Council (MSC) fishery standard measures the sustainability of wild-capture fisheries.
                </p>
                <span className="text-[0.65rem] font-bold text-[#00450d] uppercase tracking-tighter">Aquatic Excellence</span>
              </div>

              {/* Halal/Kosher */}
              <div className="bg-[#ffffff] p-8 group hover:bg-[#fafaf5] transition-all duration-300">
                <div className="w-16 h-16 bg-[#eeeee9] mb-6 flex items-center justify-center rounded-lg">
                  <span className="material-symbols-outlined text-3xl text-[#00450d]">star</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-[#1a1c19] mb-3">Halal/Kosher</h3>
                <p className="text-[#41493e] text-sm leading-relaxed mb-6">
                  Adherence to religious dietary laws, including source inspection and specialized handling protocols for global markets.
                </p>
                <span className="text-[0.65rem] font-bold text-[#00450d] uppercase tracking-tighter">Religious Compliance</span>
              </div>
            </div>
          </div>
        </section>

        {/* The Traceability Protocol (Visual Timeline) */}
        <section className="py-24 bg-[#f4f4ef] overflow-hidden">
          <div className="container mx-auto px-8 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="font-headline text-4xl font-bold text-[#1a1c19] tracking-tight mb-6">The Traceability Protocol</h2>
                <p className="text-[#41493e] text-lg">
                  Our 'Seed to Shelf' tracking system provides absolute visibility across every node of the supply chain.
                </p>
              </div>
              <div className="hidden lg:block">
                <img
                  className="w-64 h-40 object-cover rounded-lg rotate-3 shadow-xl"
                  alt="industrial logistics warehouse"
                  src="/products/quality-warehouse.jpg"
                />
              </div>
            </div>

            <div className="relative mt-20">
              {/* Progress Line */}
              <div className="absolute top-0 left-8 md:left-1/2 bottom-0 w-0.5 bg-[#c0c9bb]/30 -translate-x-1/2 hidden md:block"></div>

              <div className="space-y-24">
                {/* Step 1 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="md:text-right">
                    <span className="inline-block px-3 py-1 bg-[#00450d]/10 text-[#00450d] text-[0.65rem] font-bold uppercase tracking-widest mb-4">Phase 01</span>
                    <h4 className="font-headline text-2xl font-bold text-[#1a1c19] mb-4">Farm-Level Audits</h4>
                    <p className="text-[#41493e] leading-relaxed">
                      Regular unannounced inspections at our source farms ensure cultivation practices meet GAP and sustainability requirements before harvest.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute top-1/2 left-[-3rem] md:left-[-3.25rem] w-6 h-6 bg-[#00450d] rounded-full z-10 border-4 border-[#f4f4ef] hidden md:block"></div>
                    <img
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                      alt="aerial view of vast green cultivated farm fields"
                      src="/products/quality-farm.jpg"
                    />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1 relative">
                    <div className="absolute top-1/2 right-[-3rem] md:right-[-3.25rem] w-6 h-6 bg-[#00450d] rounded-full z-10 border-4 border-[#f4f4ef] hidden md:block"></div>
                    <img
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                      alt="close up of a modern digital temperature monitoring device"
                      src="/products/quality-monitoring.jpg"
                    />
                  </div>
                  <div className="order-1 md:order-2">
                    <span className="inline-block px-3 py-1 bg-[#00450d]/10 text-[#00450d] text-[0.65rem] font-bold uppercase tracking-widest mb-4">Phase 02</span>
                    <h4 className="font-headline text-2xl font-bold text-[#1a1c19] mb-4">In-Transit Cold-Chain Monitoring</h4>
                    <p className="text-[#41493e] leading-relaxed">
                      Real-time IoT sensors monitor temperature, humidity, and atmospheric conditions to maintain produce integrity during every mile of the journey.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="md:text-right">
                    <span className="inline-block px-3 py-1 bg-[#00450d]/10 text-[#00450d] text-[0.65rem] font-bold uppercase tracking-widest mb-4">Phase 03</span>
                    <h4 className="font-headline text-2xl font-bold text-[#1a1c19] mb-4">Batch Testing & Lab Analysis</h4>
                    <p className="text-[#41493e] leading-relaxed">
                      Representative samples from every batch undergo chemical, microbial, and sensory analysis in certified laboratories before consolidation.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute top-1/2 left-[-3rem] md:left-[-3.25rem] w-6 h-6 bg-[#00450d] rounded-full z-10 border-4 border-[#f4f4ef] hidden md:block"></div>
                    <img
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                      alt="scientific professional in protective gear working with produce samples"
                      src="/products/quality-lab.jpg"
                    />
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1 relative">
                    <div className="absolute top-1/2 right-[-3rem] md:right-[-3.25rem] w-6 h-6 bg-[#00450d] rounded-full z-10 border-4 border-[#f4f4ef] hidden md:block"></div>
                    <img
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                      alt="stamped official documents and certifications"
                      src="/products/quality-documents.jpg"
                    />
                  </div>
                  <div className="order-1 md:order-2">
                    <span className="inline-block px-3 py-1 bg-[#00450d]/10 text-[#00450d] text-[0.65rem] font-bold uppercase tracking-widest mb-4">Phase 04</span>
                    <h4 className="font-headline text-2xl font-bold text-[#1a1c19] mb-4">Final Export Clearance</h4>
                    <p className="text-[#41493e] leading-relaxed">
                      A final documentation review by our compliance desk ensures phytosanitary certificates and customs declarations are 100% accurate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Third-Party Verification */}
        <section className="py-24 bg-[#fafaf5] overflow-hidden">
          <div className="container mx-auto px-8">
            <div className="bg-[#1b5e20] text-white p-12 md:p-20 rounded-xl relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 -skew-x-12 transform translate-x-20"></div>

              <div className="relative z-10 md:w-2/3">
                <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6">Unbiased Third-Party Verification</h2>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  We partner with independent global leaders in testing, inspection, and certification. Our collaboration with laboratories like <span className="text-white font-bold">SGS</span> and <span className="text-white font-bold italic">Eurofins</span> ensures that our quality reports are unbiased, scientific, and globally accepted.
                </p>
                <div className="flex flex-wrap gap-12 opacity-60 grayscale brightness-200">
                  <div className="text-2xl font-bold">SGS</div>
                  <div className="text-2xl font-bold italic">eurofins</div>
                  <div className="text-2xl font-bold tracking-tighter">INTERTEK</div>
                </div>
              </div>

              <div className="md:w-1/3 relative z-10">
                <div className="bg-white/10 glass-effect p-8 border border-white/20 rounded-lg">
                  <span className="material-symbols-outlined text-4xl mb-4">policy</span>
                  <h4 className="font-headline font-bold text-xl mb-2">Transparency Protocol</h4>
                  <p className="text-sm text-white/70">
                    Access live third-party audit reports via our client portal at any stage of the shipping process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance Pack CTA */}
        <section className="py-24 bg-[#f4f4ef]">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto bg-white border border-[#c0c9bb]/30 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-center md:text-left">
                <h2 className="font-headline text-3xl font-bold text-[#1a1c19] mb-4">Request our Full Compliance Portfolio</h2>
                <p className="text-[#41493e] max-w-md">
                  Detailed certifications, laboratory protocols, and region-specific compliance documentation ready for your review.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="bg-[#00450d] text-white px-8 py-4 rounded-md font-bold text-sm tracking-wide transition-all transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                  Download PDF Pack
                </Link>
                <Link
                  to="/contact"
                  className="bg-transparent border border-[#00450d] text-[#00450d] px-8 py-4 rounded-md font-bold text-sm tracking-wide transition-all hover:bg-[#00450d]/5"
                >
                  Enquire for Documentation
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

export default Quality;
