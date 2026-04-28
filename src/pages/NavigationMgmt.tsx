import { useState } from 'react';
import { toast } from 'sonner';

const NavigationMgmt = () => {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('Navigation changes published!');
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
            <h2 className="text-4xl font-extrabold tracking-tighter text-[#1a1c19]">Navigation & Footer Structure</h2>
            <p className="mt-4 text-[#41493e] text-base leading-relaxed">Manage the global editorial architecture. Curate the primary navigation hierarchy and the logistics-focused footer layout.</p>
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

        {/* Bento Grid Interface */}
        <div className="grid grid-cols-12 gap-8">
          {/* Navigation Hierarchy Pane */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <div className="bg-white p-8 rounded-xl relative overflow-hidden shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-[#1a1c19]">Primary Navigation</h3>
                  <p className="text-xs text-[#41493e] mt-1">Drag and drop to reorder top-level links and sub-menus.</p>
                </div>
                <button className="p-2 bg-primary/5 text-primary rounded-lg hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined">add_circle</span>
                </button>
              </div>

              {/* Tree Structure */}
              <div className="space-y-3">
                {/* Parent Item */}
                <div className="group border border-transparent hover:border-primary/20 bg-[#f4f4ef] rounded-xl p-4 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-[#717a6d] cursor-grab">drag_indicator</span>
                      <span className="material-symbols-outlined text-primary">eco</span>
                      <span className="font-semibold text-[#1a1c19]">The Harvest</span>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full">ACTIVE</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-white rounded-md text-[#41493e]">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button className="p-1.5 hover:bg-white rounded-md text-[#ba1a1a]">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Nested Items */}
                  <div className="ml-12 mt-4 space-y-2 border-l-2 border-[#e3e3de] pl-6">
                    <div className="flex items-center justify-between py-2 group/sub">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-[#41493e]">Seasonal Roots</span>
                      </div>
                      <span className="material-symbols-outlined text-[#717a6d] text-sm opacity-0 group-hover/sub:opacity-100">settings</span>
                    </div>
                    <div className="flex items-center justify-between py-2 group/sub">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-[#41493e]">Exotic Citrus</span>
                      </div>
                      <span className="material-symbols-outlined text-[#717a6d] text-sm opacity-0 group-hover/sub:opacity-100">settings</span>
                    </div>
                  </div>
                </div>

                {/* Single Parent Item */}
                <div className="group bg-[#f4f4ef] rounded-xl p-4 hover:border-primary/20 border border-transparent transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-[#717a6d] cursor-grab">drag_indicator</span>
                      <span className="material-symbols-outlined text-[#7a5649]">agriculture</span>
                      <span className="font-semibold text-[#1a1c19]">Producer Network</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-white rounded-md text-[#41493e]">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button className="p-1.5 hover:bg-white rounded-md text-[#ba1a1a]">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Parent Item */}
                <div className="group bg-[#f4f4ef] rounded-xl p-4 hover:border-primary/20 border border-transparent transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-[#717a6d] cursor-grab">drag_indicator</span>
                      <span className="material-symbols-outlined text-[#503600]">local_shipping</span>
                      <span className="font-semibold text-[#1a1c19]">Logistics</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-white rounded-md text-[#41493e]">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button className="p-1.5 hover:bg-white rounded-md text-[#ba1a1a]">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Section Manager */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold tracking-tight text-[#1a1c19] mb-6">Footer Infrastructure</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-[#c0c9bb]/30 rounded-lg hover:border-primary/40 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="material-symbols-outlined text-[#717a6d] group-hover:text-primary transition-colors">contact_mail</span>
                    <span className="text-[10px] font-bold text-[#717a6d] uppercase tracking-widest">Section 01</span>
                  </div>
                  <p className="font-bold text-[#1a1c19]">Contact & HQ</p>
                  <p className="text-xs text-[#41493e] mt-1">4 Addresses, 2 Support Lines</p>
                </div>

                <div className="p-4 border border-[#c0c9bb]/30 rounded-lg hover:border-primary/40 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="material-symbols-outlined text-[#717a6d] group-hover:text-primary transition-colors">gavel</span>
                    <span className="text-[10px] font-bold text-[#717a6d] uppercase tracking-widest">Section 02</span>
                  </div>
                  <p className="font-bold text-[#1a1c19]">Compliance</p>
                  <p className="text-xs text-[#41493e] mt-1">Legal, Privacy, GDPR</p>
                </div>

                <div className="p-4 border border-[#c0c9bb]/30 rounded-lg hover:border-primary/40 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="material-symbols-outlined text-[#717a6d] group-hover:text-primary transition-colors">public</span>
                    <span className="text-[10px] font-bold text-[#717a6d] uppercase tracking-widest">Global Status</span>
                  </div>
                  <p className="font-bold text-[#1a1c19]">Real-time Feed</p>
                  <p className="text-xs text-[#41493e] mt-1">Logistics API Toggle: ON</p>
                </div>

                <button className="p-4 border-2 border-dashed border-[#c0c9bb]/50 rounded-lg hover:bg-[#f4f4ef] transition-colors flex flex-col items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[#717a6d]">add</span>
                  <span className="text-xs font-bold text-[#717a6d] uppercase">New Column</span>
                </button>
              </div>
            </div>
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
                  <span className="text-[10px] font-bold text-white/30 tracking-widest uppercase">Live Curator Preview</span>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-white/40 text-sm">laptop</span>
                    <span className="material-symbols-outlined text-white/40 text-sm">tablet</span>
                    <span className="material-symbols-outlined text-white/40 text-sm">smartphone</span>
                  </div>
                </div>

                {/* Site Header Preview */}
                <div className="p-8 bg-[#f4f4ef] text-[#1a1c19]">
                  <div className="flex items-center justify-between border-b border-[#e3e3de] pb-6 mb-12">
                    <h4 className="font-black text-xl tracking-tighter text-primary">Verdant Logic</h4>
                    <nav className="flex gap-6">
                      <span className="text-[11px] font-bold text-primary border-b-2 border-primary pb-1">The Harvest</span>
                      <span className="text-[11px] font-bold text-[#717a6d]">Producers</span>
                      <span className="text-[11px] font-bold text-[#717a6d]">Logistics</span>
                    </nav>
                    <span className="material-symbols-outlined text-primary">shopping_basket</span>
                  </div>

                  {/* Preview Body Content */}
                  <div className="space-y-6">
                    <div className="h-40 rounded-lg overflow-hidden relative">
                      <img
                        alt="Fresh produce"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQI8UNlXG0M3PLGdObh9pEwiU5Ohdd2JmbbW965G8v0K84XhtDh_Y7kDnWPeDBSwwtPCLdYSkOjQXrkON7wnUfxcqQjPA9xz1Y7xvoS_lSzF2pydzahTvpc1JbvAhNBISqxujAWgfsFh2AppQCs0guFEDAkvRuwbjGb5ePobfh7sv0le7wWm3XqCFm2hUfM5j1vwD0b_DpSS52rmbStPk6mC2AHssJcFV_u5t8RKpCx10mXfmT1Dwcde5eyWUO6oYmQTeMNvq6ZIOi"
                      />
                      <div className="absolute inset-0 bg-primary/20 flex items-center p-6">
                        <div className="bg-white/90 backdrop-blur-md p-4 rounded max-w-[140px]">
                          <div className="h-1.5 w-8 bg-primary mb-2"></div>
                          <div className="h-2 w-full bg-[#e3e3de] mb-1"></div>
                          <div className="h-2 w-2/3 bg-[#d6d3cd]"></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="h-3 w-3/4 bg-[#e3e3de] rounded"></div>
                        <div className="h-2 w-full bg-[#f4f4ef] rounded"></div>
                        <div className="h-2 w-full bg-[#f4f4ef] rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 w-3/4 bg-[#e3e3de] rounded"></div>
                        <div className="h-2 w-full bg-[#f4f4ef] rounded"></div>
                        <div className="h-2 w-full bg-[#f4f4ef] rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Preview */}
                  <div className="mt-20 pt-10 border-t border-[#e3e3de]">
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#717a6d] mb-3">Network</p>
                        <ul className="space-y-1">
                          <li className="h-1.5 w-full bg-[#e3e3de]"></li>
                          <li className="h-1.5 w-4/5 bg-[#f4f4ef]"></li>
                          <li className="h-1.5 w-3/4 bg-[#f4f4ef]"></li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#717a6d] mb-3">Support</p>
                        <ul className="space-y-1">
                          <li className="h-1.5 w-full bg-[#e3e3de]"></li>
                          <li className="h-1.5 w-4/5 bg-[#f4f4ef]"></li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#717a6d] mb-3">Legal</p>
                        <ul className="space-y-1">
                          <li className="h-1.5 w-full bg-[#e3e3de]"></li>
                          <li className="h-1.5 w-4/5 bg-[#f4f4ef]"></li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-4 border-t border-[#f4f4ef]">
                      <p className="text-[8px] font-bold text-[#717a6d]">© 2024 VERDANT LOGIC</p>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ffba38]"></div>
                        <span className="text-[8px] font-bold text-[#503600]">LIVE: ROTTERDAM HUB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuration Card */}
              <div className="mt-6 bg-[#f4f4ef] p-6 rounded-xl border border-primary/5">
                <h4 className="font-bold text-sm text-[#1a1c19] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">auto_fix_high</span>
                  Appearance Logic
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs text-[#41493e] font-medium">Sticky Navigation</span>
                    <input defaultChecked className="rounded text-primary focus:ring-primary/20 h-4 w-4" type="checkbox" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs text-[#41493e] font-medium">Glassmorphism Overlay</span>
                    <input defaultChecked className="rounded text-primary focus:ring-primary/20 h-4 w-4" type="checkbox" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs text-[#41493e] font-medium">Logistics Status Ticker</span>
                    <input defaultChecked className="rounded text-primary focus:ring-primary/20 h-4 w-4" type="checkbox" />
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

export default NavigationMgmt;
