import { useState } from 'react';
import { toast } from 'sonner';

const FooterMgmt = () => {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('Footer changes published!');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex justify-between items-end mb-10">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase mb-2 block">System Configuration</span>
            <h2 className="text-4xl font-extrabold tracking-tighter text-[#1a1c19]">Footer Management</h2>
            <p className="mt-4 text-[#41493e] text-base leading-relaxed">Configure the global footer infrastructure with contact details, compliance links, and real-time logistics status.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-[#e3e3de] text-[#1a1c19] font-semibold rounded-xl hover:bg-[#d6d3cd] transition-colors">Discard Changes</button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-8 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all disabled:opacity-50"
            >
              {loading ? 'Publishing...' : 'Publish Global Changes'}
            </button>
          </div>
        </div>

        {/* Footer Configuration Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Footer Sections Editor */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            {/* Contact Section */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#e3e3de]">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">contact_mail</span>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a1c19]">Contact & Headquarters</h3>
                    <p className="text-xs text-[#41493e]">Global offices and support channels</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-[#f4f4ef] rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-[#717a6d]">edit</span>
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#f4f4ef] rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-[#1a1c19]">Amsterdam HQ</p>
                    <p className="text-xs text-[#41493e]">Zuidas Business District</p>
                  </div>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded">Primary</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#f4f4ef] rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-[#1a1c19]">Support Hotline</p>
                    <p className="text-xs text-[#41493e]">+31 20 123 4567</p>
                  </div>
                  <span className="px-2 py-1 bg-[#10b981]/10 text-[#10b981] text-[10px] font-bold rounded">24/7</span>
                </div>
              </div>
            </div>

            {/* Compliance Section */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#e3e3de]">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#7a5649]">gavel</span>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a1c19]">Compliance & Legal</h3>
                    <p className="text-xs text-[#41493e]">Regulatory and privacy documentation</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-[#f4f4ef] rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-[#717a6d]">edit</span>
                </button>
              </div>
              <div className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'GDPR Compliance', 'Cookie Policy'].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 bg-[#f4f4ef] rounded-lg">
                    <span className="text-sm font-medium text-[#1a1c19]">{item}</span>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                      <span className="text-xs text-[#41493e]">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Status Section */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#e3e3de]">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#503600]">public</span>
                  <div>
                    <h3 className="text-lg font-bold text-[#1a1c19]">Global Logistics Status</h3>
                    <p className="text-xs text-[#41493e]">Real-time export hub monitoring</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#e3e3de] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="p-4 bg-[#2f312e] text-white rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest">Active Hubs</span>
                  <span className="text-xs text-[#10b981]">● Live</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-[10px] text-[#717a6d] uppercase">Rotterdam</p>
                    <p className="text-sm font-bold">98%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-[#717a6d] uppercase">Singapore</p>
                    <p className="text-sm font-bold">95%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-[#717a6d] uppercase">Dubai</p>
                    <p className="text-sm font-bold">97%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add New Section */}
            <button className="w-full py-8 border-2 border-dashed border-[#c0c9bb]/50 rounded-xl hover:bg-[#f4f4ef] transition-colors flex flex-col items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[#717a6d] text-3xl">add_circle</span>
              <span className="text-sm font-bold text-[#717a6d] uppercase tracking-widest">Add Footer Section</span>
            </button>
          </div>

          {/* Live Preview Pane */}
          <div className="col-span-12 lg:col-span-5">
            <div className="sticky top-24">
              <div className="bg-[#2f312e] rounded-xl overflow-hidden shadow-2xl">
                {/* Preview Header */}
                <div className="bg-[#3f3f3f] px-6 py-3 flex items-center justify-between border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]/40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffba38]/40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-primary/40"></div>
                  </div>
                  <span className="text-[10px] font-bold text-white/30 tracking-widest uppercase">Footer Preview</span>
                  <span className="material-symbols-outlined text-white/40 text-sm">desktop</span>
                </div>

                {/* Footer Preview Content */}
                <div className="p-8 bg-[#f4f4ef]">
                  {/* Main Footer Grid */}
                  <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-[#e3e3de]">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-primary text-lg">contact_mail</span>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#717a6d]">Contact</p>
                      </div>
                      <ul className="space-y-2 text-xs text-[#41493e]">
                        <li>Amsterdam HQ</li>
                        <li>Singapore Terminal</li>
                        <li>Dubai Logistics</li>
                        <li className="text-primary font-bold">+31 20 123 4567</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-[#7a5649] text-lg">gavel</span>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#717a6d]">Legal</p>
                      </div>
                      <ul className="space-y-2 text-xs text-[#41493e]">
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                        <li>GDPR Compliance</li>
                        <li>Cookie Policy</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-[#503600] text-lg">public</span>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#717a6d]">Network</p>
                      </div>
                      <ul className="space-y-2 text-xs text-[#41493e]">
                        <li>Producer Network</li>
                        <li>Distribution Hubs</li>
                        <li>Quality Assurance</li>
                        <li>Career Opportunities</li>
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="flex justify-between items-center py-4">
                    <p className="text-[8px] font-bold text-[#717a6d] uppercase tracking-widest">© 2024 VERDANT LOGIC</p>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></div>
                      <span className="text-[8px] font-bold text-primary">ALL SYSTEMS OPERATIONAL</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appearance Settings */}
              <div className="mt-6 bg-[#f4f4ef] p-6 rounded-xl border border-primary/5">
                <h4 className="font-bold text-sm text-[#1a1c19] mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">palette</span>
                  Appearance Settings
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#41493e] font-medium">Background Color</span>
                    <div className="flex gap-2">
                      <button className="w-6 h-6 rounded-full bg-[#f4f4ef] border-2 border-primary"></button>
                      <button className="w-6 h-6 rounded-full bg-[#2f312e] border-2 border-transparent"></button>
                      <button className="w-6 h-6 rounded-full bg-[#1a1c19] border-2 border-transparent"></button>
                    </div>
                  </div>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs text-[#41493e] font-medium">Show Logistics Ticker</span>
                    <input defaultChecked className="rounded text-primary focus:ring-primary/20 h-4 w-4" type="checkbox" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs text-[#41493e] font-medium">Social Media Icons</span>
                    <input defaultChecked className="rounded text-primary focus:ring-primary/20 h-4 w-4" type="checkbox" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs text-[#41493e] font-medium">Newsletter Signup</span>
                    <input className="rounded text-primary focus:ring-primary/20 h-4 w-4" type="checkbox" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual FAB */}
      <button
        onClick={handleSave}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
      >
        <span className="material-symbols-outlined text-2xl">save</span>
      </button>
    </div>
  );
};

export default FooterMgmt;
