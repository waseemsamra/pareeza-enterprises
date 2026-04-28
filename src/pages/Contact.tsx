import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="bg-[#fafaf5] min-h-screen font-sans antialiased">
      <Navigation />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[500px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Global trade connections"
              className="w-full h-full object-cover scale-105"
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
            <div className="max-w-3xl">
              <span className="font-sans text-white uppercase tracking-[0.2em] text-xs mb-4 block">Get in Touch</span>
              <h1 className="font-headline font-extrabold text-white text-5xl md:text-6xl leading-[1.1] tracking-tight mb-8">
                Let's Grow Together.
              </h1>
              <p className="text-white/90 text-lg max-w-xl leading-relaxed">
                Whether you're a producer seeking global markets or a buyer looking for premium sourcing, our team is ready to connect.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-24 bg-[#fafaf5]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <span className="font-sans text-primary uppercase tracking-widest text-xs block mb-2">Send Us a Message</span>
                <h2 className="font-headline font-bold text-4xl text-[#1a1c19] mb-8">Start the Conversation.</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="font-sans text-sm font-medium text-[#1a1c19] block mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-[#f4f4ef] border-b-2 border-[#c0c9bb] focus:border-primary focus:outline-none transition-colors rounded-t-md"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-sm font-medium text-[#1a1c19] block mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-[#f4f4ef] border-b-2 border-[#c0c9bb] focus:border-primary focus:outline-none transition-colors rounded-t-md"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-sans text-sm font-medium text-[#1a1c19] block mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-[#f4f4ef] border-b-2 border-[#c0c9bb] focus:border-primary focus:outline-none transition-colors rounded-t-md"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="font-sans text-sm font-medium text-[#1a1c19] block mb-2">Company</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-[#f4f4ef] border-b-2 border-[#c0c9bb] focus:border-primary focus:outline-none transition-colors rounded-t-md"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label className="font-sans text-sm font-medium text-[#1a1c19] block mb-2">Interest</label>
                    <select className="w-full px-4 py-3 bg-[#f4f4ef] border-b-2 border-[#c0c9bb] focus:border-primary focus:outline-none transition-colors rounded-t-md">
                      <option>General Enquiry</option>
                      <option>Become a Supplier</option>
                      <option>Become a Buyer</option>
                      <option>Partnership Opportunity</option>
                      <option>Media Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-sans text-sm font-medium text-[#1a1c19] block mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 bg-[#f4f4ef] border-b-2 border-[#c0c9bb] focus:border-primary focus:outline-none transition-colors rounded-t-md resize-none"
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-4 rounded font-headline font-bold text-base hover:bg-primary transition-all"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-12">
                <div>
                  <span className="font-sans text-primary uppercase tracking-widest text-xs block mb-2">Our Offices</span>
                  <h2 className="font-headline font-bold text-4xl text-[#1a1c19] mb-8">Global Presence.</h2>
                  
                  <div className="space-y-8">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#7a5649]/10 flex items-center justify-center text-[#7a5649] flex-shrink-0">
                        <span className="text-2xl">🌍</span>
                      </div>
                      <div>
                        <h3 className="font-headline font-bold text-xl text-[#1a1c19] mb-2">Pakistan (HQ)</h3>
                        <p className="text-[#41493e] text-sm leading-relaxed">Office # 01, 2nd Floor, B.B Shopping Mall<br/>Opposite NED University<br/>Gulistan-e-Johar, block 1<br/>Karachi, Pakistan</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <span className="text-2xl">🏢</span>
                      </div>
                      <div>
                        <h3 className="font-headline font-bold text-xl text-[#1a1c19] mb-2">Dubai (Regional Office)</h3>
                        <p className="text-[#41493e] text-sm leading-relaxed">Al Qusais Industrial Area 1<br/>Dubai<br/>UAE</p>
                      </div>
                    </div>

                                      </div>
                </div>

                <div className="pt-8 border-t border-[#c0c9bb]/20">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <span className="text-xl">📞</span>
                      </div>
                      <div>
                        <div className="font-sans text-xs uppercase tracking-widest text-[#717a6d] mb-1">Phone</div>
                        <div className="font-headline font-bold text-[#1a1c19]">+92 333 2193635 / +971 52 2140909</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <span className="text-xl">✉️</span>
                      </div>
                      <div>
                        <div className="font-sans text-xs uppercase tracking-widest text-[#717a6d] mb-1">Email</div>
                        <div className="font-headline font-bold text-[#1a1c19]">info@pareezaenterprises.com</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <span className="text-xl">🕐</span>
                      </div>
                      <div>
                        <div className="font-sans text-xs uppercase tracking-widest text-[#717a6d] mb-1">Business Hours</div>
                        <div className="font-headline font-bold text-[#1a1c19]">Mon - Fri: 9:00 - 18:00 CET</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-24 bg-[#f4f4ef]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <span className="font-sans text-primary uppercase tracking-widest text-xs block mb-2">Our Reach</span>
              <h2 className="font-headline font-bold text-4xl text-[#1a1c19]">Global Network.</h2>
            </div>
            
            <div className="aspect-[21/9] bg-[#eeeee9] rounded-3xl overflow-hidden relative">
              <img
                alt="World Map"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                <div className="grid grid-cols-3 gap-12 text-white">
                  <div>
                    <div className="font-headline font-bold text-xl">25+</div>
                    <div className="text-xs font-sans opacity-70">Countries Served</div>
                  </div>
                  <div>
                    <div className="font-headline font-bold text-xl">120</div>
                    <div className="text-xs font-sans opacity-70">Global Ports</div>
                  </div>
                  <div>
                    <div className="font-headline font-bold text-xl">500+</div>
                    <div className="text-xs font-sans opacity-70">Farm Partners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#fafaf5]">
          <div className="max-w-5xl mx-auto px-8">
            <div className="bg-primary p-12 md:p-20 rounded-[2rem] text-center relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary rounded-full opacity-50"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-headline font-extrabold text-white mb-6">
                  Ready to Expand Your Supply Chain?
                </h2>
                <p className="text-primary text-lg mb-10 max-w-xl mx-auto">
                  Connect with our trade experts for a tailored quote and logistics plan for your business.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Link to="/contact" className="bg-[#ffdeac] text-[#604100] px-10 py-4 rounded font-headline font-bold text-lg hover:bg-[#ffba38] transition-all">
                    Request a Quote
                  </Link>
                  <a href="tel:+31101234567" className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded font-headline font-bold text-lg hover:bg-white/10 transition-all">
                    Talk to Sales
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>


      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-headline {
          font-family: 'Manrope', sans-serif;
        }
        
        .font-body, .font-sans {
          font-family: 'Inter', sans-serif;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .editorial-shadow {
          box-shadow: 0 20px 40px rgba(26, 28, 25, 0.06);
        }
      `}</style>
    </div>
  );
};

export default Contact;
