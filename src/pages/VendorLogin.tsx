import { Link } from 'react-router-dom';

const VendorLogin = () => {
  return (
    <div className="bg-[#fafaf5] min-h-screen font-sans antialiased">
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center h-20">
          <Link
            to="/"
            className="text-xl font-bold tracking-tighter text-green-900 dark:text-green-50 font-headline"
          >
            Pareeza Enterprises
          </Link>
          <nav className="flex items-center gap-8">
            <Link
              to="/contact"
              className="font-manrope tracking-tight font-semibold text-stone-600 hover:text-green-900 transition-opacity duration-300"
            >
              Support
            </Link>
          </nav>
        </div>
        <div className="bg-stone-100 dark:bg-stone-800 h-px"></div>
      </header>

      <main className="min-h-screen flex flex-col md:flex-row pt-20">
        {/* Left Side: Atmospheric Origin Section */}
        <section className="relative w-full md:w-1/2 min-h-[400px] md:min-h-0 overflow-hidden flex items-end p-12 md:p-20">
          <div className="absolute inset-0 z-0">
            <img
              alt="Lush agricultural fields at dawn"
              className="w-full h-full object-cover scale-105"
              src="/products/vendor-login-hero.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent"></div>
          </div>

          <div className="relative z-10 w-full max-w-lg space-y-8">
            <div className="space-y-4">
              <h2 className="text-white font-headline font-extrabold text-4xl md:text-5xl leading-tight tracking-tighter">
                The Harvest of Connection
              </h2>
              <p className="text-white/90 text-lg font-medium leading-relaxed">
                Join the world's most sophisticated supply chain for premium sustainable produce.
              </p>
            </div>

            <div className="grid gap-4">
              {/* Real-Time Logistics Tracking */}
              <div className="glass-card p-6 rounded-xl flex items-start gap-4" style={{background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.2)'}}>
                <div className="bg-primary p-2 rounded-lg text-[#90d689]">
                  <span className="material-symbols-outlined">monitoring</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Real-Time Logistics Tracking</h3>
                  <p className="text-white/80 text-sm">Monitor every shipment from origin to final destination.</p>
                </div>
              </div>

              {/* Secure Document Management */}
              <div className="glass-card p-6 rounded-xl flex items-start gap-4" style={{background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.2)'}}>
                <div className="bg-primary p-2 rounded-lg text-[#90d689]">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Secure Document Management</h3>
                  <p className="text-white/80 text-sm">Centralized hub for all compliance and trade paperwork.</p>
                </div>
              </div>

              {/* Direct Procurement Tools */}
              <div className="glass-card p-6 rounded-xl flex items-start gap-4" style={{background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.2)'}}>
                <div className="bg-primary p-2 rounded-lg text-[#90d689]">
                  <span className="material-symbols-outlined">inventory_2</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Direct Procurement Tools</h3>
                  <p className="text-white/80 text-sm">Seamless ordering and inventory forecasting system.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Login Interface */}
        <section className="w-full md:w-1/2 bg-[#fafaf5] flex items-center justify-center p-8 md:p-20">
          <div className="w-full max-w-md">
            <div className="mb-12">
              <h1 className="font-headline font-extrabold text-4xl text-[#1a1c19] tracking-tighter mb-4">
                Partner Portal
              </h1>
              <p className="text-[#41493e] leading-relaxed text-lg">
                Secure access for our global network of distributors and retailers.
              </p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label
                  className="text-xs font-bold uppercase tracking-widest text-[#41493e] font-label"
                  htmlFor="email"
                >
                  Business Email
                </label>
                <input
                  className="w-full bg-[#e3e3de] border-b-2 border-[#c0c9bb] focus:border-primary px-4 py-4 outline-none transition-all duration-300 font-body text-[#1a1c19]"
                  id="email"
                  placeholder="name@company.com"
                  type="email"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    className="text-xs font-bold uppercase tracking-widest text-[#41493e] font-label"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <input
                  className="w-full bg-[#e3e3de] border-b-2 border-[#c0c9bb] focus:border-primary px-4 py-4 outline-none transition-all duration-300 font-body text-[#1a1c19]"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                />
              </div>

              <div className="pt-4">
                <button
                  className="w-full bg-primary hover:bg-primary text-white py-5 rounded-md font-bold text-lg tracking-tight shadow-lg shadow-primary/10 transition-all active:scale-95 duration-200"
                  type="submit"
                >
                  Sign In
                </button>
              </div>

              <div className="flex items-center justify-center pt-8">
                <p className="text-[#41493e] text-sm">
                  New to our network?
                  <Link
                    to="/contact"
                    className="text-primary font-bold hover:underline decoration-2 underline-offset-4 ml-1"
                  >
                    Request Partner Access
                  </Link>
                </p>
              </div>
            </form>

            <div className="mt-20 flex items-center justify-center gap-2 opacity-60">
              <span className="material-symbols-outlined text-sm">lock</span>
              <span className="text-[10px] font-bold uppercase tracking-widest font-label">
                Secured with 256-bit Encryption
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 dark:bg-black w-full border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="text-lg font-bold text-stone-100 font-headline">
              Pareeza Enterprises
            </div>
            <p className="text-stone-400 font-inter text-sm tracking-wide max-w-sm">
              © 2024 Pareeza Enterprises Editorial. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
            <Link
              to="/about"
              className="text-stone-400 hover:text-stone-200 font-inter text-sm tracking-wide transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/contact"
              className="text-stone-400 hover:text-stone-200 font-inter text-sm tracking-wide transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact"
              className="text-stone-400 hover:text-stone-200 font-inter text-sm tracking-wide transition-colors"
            >
              Support Portal
            </Link>
            <Link
              to="/quality"
              className="text-stone-400 hover:text-stone-200 font-inter text-sm tracking-wide transition-colors"
            >
              Compliance
            </Link>
            <div className="flex items-center gap-2 px-3 py-1 bg-stone-800 rounded-full">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
              <span className="text-amber-500 text-[10px] font-bold uppercase tracking-tighter">
                Global Logistics Status
              </span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
};

export default VendorLogin;
