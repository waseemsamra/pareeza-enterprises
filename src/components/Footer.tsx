import { Link } from 'react-router-dom';
import { Globe, Mail, CheckCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary w-full pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 max-w-screen-2xl mx-auto font-sans text-sm leading-relaxed">
        {/* Brand Column */}
        <div className="col-span-1">
          <div className="text-lg font-bold text-white mb-6">Pareeza Enterprises</div>
          <p className="text-white mb-8">Defining the next era of global fresh produce trade through precision and integrity.</p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center text-white hover:text-white transition-all" href="#">
              <Globe className="w-5 h-5" />
            </a>
            <a className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center text-white hover:text-white transition-all" href="#">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Global Network */}
        <div className="col-span-1">
          <h4 className="text-white font-medium mb-6">Global Network</h4>
          <ul className="space-y-4">
            <li>
              <Link to="#" className="text-white hover:text-blue-400 transition-colors hover:underline decoration-[#3b82f6] underline-offset-4">
                Europe Division
              </Link>
            </li>
            <li>
              <Link to="#" className="text-white hover:text-blue-400 transition-colors hover:underline decoration-[#3b82f6] underline-offset-4">
                Asia-Pacific Hub
              </Link>
            </li>
            <li>
              <Link to="#" className="text-white hover:text-blue-400 transition-colors hover:underline decoration-[#3b82f6] underline-offset-4">
                Americas Logistics
              </Link>
            </li>
            <li>
              <Link to="#" className="text-white hover:text-blue-400 transition-colors hover:underline decoration-[#3b82f6] underline-offset-4">
                African Sourcing
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="col-span-1">
          <h4 className="text-white font-medium mb-6">Resources</h4>
          <ul className="space-y-4">
            <li>
              <Link to="/trade-policy" className="text-stone-400 hover:text-white transition-colors hover:underline decoration-[#91d78a] underline-offset-4">
                Trade Terms
              </Link>
            </li>
            <li>
              <Link to="/certifications" className="text-stone-400 hover:text-white transition-colors hover:underline decoration-[#91d78a] underline-offset-4">
                Certifications
              </Link>
            </li>
            <li>
              <Link to="#" className="text-stone-400 hover:text-white transition-colors hover:underline decoration-[#91d78a] underline-offset-4">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/logistics" className="text-stone-400 hover:text-white transition-colors hover:underline decoration-[#91d78a] underline-offset-4">
                Global Logistics Status
              </Link>
            </li>
          </ul>
        </div>

        {/* Logistics Status */}
        <div className="col-span-1 bg-stone-950/30 p-8 rounded-lg border border-stone-700/50">
          <h4 className="text-white font-medium mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Logistics Status
          </h4>
          <p className="text-xs text-stone-400 mb-6">All shipping lanes currently operational with minor delays in Suez Canal zone.</p>
          <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-widest">
            <CheckCircle className="w-4 h-4" />
            Operational
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-screen-2xl mx-auto px-8 mt-16 pt-8 border-t border-stone-700/30 flex flex-col md:flex-row justify-between items-center gap-4 text-white text-xs">
        <p>© 2026 Pareeza Enterprises. All Rights Reserved.</p>
        <div className="flex gap-8">
          <Link to="#" className="hover:text-white">Terms of Service</Link>
          <Link to="#" className="hover:text-white">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
