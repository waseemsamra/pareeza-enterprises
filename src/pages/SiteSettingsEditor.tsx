import { useState } from 'react';
import { toast } from 'sonner';

const SiteSettingsEditor = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    portalName: 'Pareeza Enterprises',
    supportEmail: 'ops@globalagrarian.com',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Harvest Lane, Agricultural District',
    timezone: 'UTC',
    language: 'English'
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('System configuration saved!');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-[#1a1c19] tracking-tight">System Settings</h2>
        <p className="text-[#41493e] mt-2 text-base">Configure core parameters of Pareeza Enterprises digital environment.</p>
      </div>

      {/* Tabbed Interface */}
      <div className="flex items-center gap-8 border-b border-[#c0c9bb]/30 mb-10 overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActiveTab('general')}
          className={`pb-4 text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'general'
              ? 'text-[#00450d] border-b-2 border-[#00450d]'
              : 'text-[#41493e] hover:text-[#00450d]'
          }`}
        >
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>tune</span>
          General Settings
        </button>
        <button
          onClick={() => setActiveTab('api')}
          className={`pb-4 text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'api'
              ? 'text-[#00450d] border-b-2 border-[#00450d]'
              : 'text-[#41493e] hover:text-[#00450d]'
          }`}
        >
          <span className="material-symbols-outlined text-lg">api</span>
          API Integration
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`pb-4 text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'notifications'
              ? 'text-[#00450d] border-b-2 border-[#00450d]'
              : 'text-[#41493e] hover:text-[#00450d]'
          }`}
        >
          <span className="material-symbols-outlined text-lg">notifications_active</span>
          Notification Rules
        </button>
        <button
          onClick={() => setActiveTab('permissions')}
          className={`pb-4 text-sm font-medium transition-all flex items-center gap-2 ${
            activeTab === 'permissions'
              ? 'text-[#00450d] border-b-2 border-[#00450d]'
              : 'text-[#41493e] hover:text-[#00450d]'
          }`}
        >
          <span className="material-symbols-outlined text-lg">shield_person</span>
          User Roles & Permissions
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Form Column */}
        <div className="lg:col-span-2 space-y-10">
          {/* General Tab Content */}
          {activeTab === 'general' && (
            <section className="bg-white rounded-2xl p-8 space-y-8 shadow-sm">
              <div className="border-l-4 border-[#00450d] pl-4">
                <h3 className="text-xl font-bold text-[#1a1c19]">General Configuration</h3>
                <p className="text-sm text-[#41493e]">Update your portal identity and contact details.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#41493e]">Portal Name</label>
                  <input
                    className="w-full bg-[#f4f4ef] border-b border-[#717a6d]/50 focus:border-[#00450d] px-4 py-3 outline-none transition-colors font-medium"
                    type="text"
                    value={formData.portalName}
                    onChange={(e) => setFormData({ ...formData, portalName: e.target.value })}
                  />
                  <p className="text-[11px] text-[#717a6d] italic">This name appears in browser tabs and system emails.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#41493e]">Support Contact Email</label>
                  <input
                    className="w-full bg-[#f4f4ef] border-b border-[#717a6d]/50 focus:border-[#00450d] px-4 py-3 outline-none transition-colors font-medium"
                    type="email"
                    value={formData.supportEmail}
                    onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                  />
                  <p className="text-[11px] text-[#717a6d] italic">The primary address for automated system alerts.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#41493e]">Contact Phone</label>
                  <input
                    className="w-full bg-[#f4f4ef] border-b border-[#717a6d]/50 focus:border-[#00450d] px-4 py-3 outline-none transition-colors font-medium"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#41493e]">Timezone</label>
                  <select
                    className="w-full bg-[#f4f4ef] border-b border-[#717a6d]/50 focus:border-[#00450d] px-4 py-3 outline-none transition-colors font-medium"
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  >
                    <option>UTC</option>
                    <option>EST</option>
                    <option>PST</option>
                    <option>GMT</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="text-sm font-bold text-[#1a1c19] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00450d] text-base">palette</span>
                  Branding Assets
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group relative overflow-hidden rounded-xl bg-[#e8e8e3] aspect-video flex flex-col items-center justify-center border-2 border-dashed border-[#c0c9bb] hover:border-[#00450d] transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-3xl text-[#717a6d] group-hover:text-[#00450d] mb-2 transition-colors">cloud_upload</span>
                    <p className="text-xs font-bold text-[#41493e]">Upload Primary Logo</p>
                    <p className="text-[10px] text-[#717a6d] mt-1">PNG, SVG up to 2MB</p>
                  </div>
                  <div className="group relative overflow-hidden rounded-xl bg-[#e8e8e3] aspect-video flex flex-col items-center justify-center border-2 border-dashed border-[#c0c9bb] hover:border-[#00450d] transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-3xl text-[#717a6d] group-hover:text-[#00450d] mb-2 transition-colors">featured_video</span>
                    <p className="text-xs font-bold text-[#41493e]">Favicon (32x32)</p>
                    <p className="text-[10px] text-[#717a6d] mt-1">ICO, PNG up to 100KB</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-4 border-t border-[#c0c9bb]/20">
                <button className="px-6 py-2 text-sm font-bold text-[#41493e] hover:text-[#1a1c19] transition-colors">
                  Discard Changes
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-8 py-2.5 bg-[#00450d] text-white rounded-lg font-bold shadow-lg shadow-[#00450d]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save System Config'}
                </button>
              </div>
            </section>
          )}

          {/* API Tab Content */}
          {activeTab === 'api' && (
            <section className="bg-white rounded-2xl p-8 space-y-8 shadow-sm">
              <div className="border-l-4 border-[#00450d] pl-4">
                <h3 className="text-xl font-bold text-[#1a1c19]">API Integration</h3>
                <p className="text-sm text-[#41493e]">Manage API keys and webhook endpoints.</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-[#f4f4ef] rounded-lg">
                  <p className="text-xs font-bold text-[#41493e] mb-2">API Endpoint</p>
                  <code className="text-sm font-mono text-[#00450d]">https://api.globalagrarian.com/v2</code>
                </div>
                <div className="p-4 bg-[#f4f4ef] rounded-lg">
                  <p className="text-xs font-bold text-[#41493e] mb-2">API Key</p>
                  <code className="text-sm font-mono text-[#00450d]">sk_live_••••••••••••••••</code>
                </div>
              </div>
            </section>
          )}

          {/* Notifications Tab Content */}
          {activeTab === 'notifications' && (
            <section className="bg-white rounded-2xl p-8 space-y-8 shadow-sm">
              <div className="border-l-4 border-[#00450d] pl-4">
                <h3 className="text-xl font-bold text-[#1a1c19]">Notification Rules</h3>
                <p className="text-sm text-[#41493e]">Configure email and push notification preferences.</p>
              </div>
              <div className="space-y-4">
                {['Low Stock Alerts', 'Order Confirmations', 'System Updates', 'Security Alerts'].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 bg-[#f4f4ef] rounded-lg">
                    <span className="text-sm font-medium text-[#1a1c19]">{item}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-[#e3e3de] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00450d]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Permissions Tab Content */}
          {activeTab === 'permissions' && (
            <section className="bg-white rounded-2xl p-8 space-y-8 shadow-sm">
              <div className="border-l-4 border-[#00450d] pl-4">
                <h3 className="text-xl font-bold text-[#1a1c19]">User Roles & Permissions</h3>
                <p className="text-sm text-[#41493e]">Manage access levels and user permissions.</p>
              </div>
              <div className="space-y-4">
                {['Admin Access', 'Product Management', 'Category Management', 'User Management'].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 bg-[#f4f4ef] rounded-lg">
                    <span className="text-sm font-medium text-[#1a1c19]">{item}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-[#e3e3de] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00450d]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#dcfce7] p-6 rounded-2xl border border-[#86efac]">
              <div className="w-10 h-10 rounded-full bg-[#10b981] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-white">security</span>
              </div>
              <h4 className="text-lg font-bold text-[#00450d] mb-1">Security Audit</h4>
              <p className="text-sm text-[#41493e] mb-4">Last full system scan was completed 14 hours ago. No vulnerabilities detected.</p>
              <a className="text-xs font-bold text-[#00450d] flex items-center gap-1 group" href="#">
                View Security Logs
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
            <div className="bg-[#fee2e2] p-6 rounded-2xl border border-[#fca5a5]">
              <div className="w-10 h-10 rounded-full bg-[#ef4444] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-white">dns</span>
              </div>
              <h4 className="text-lg font-bold text-[#991b1b] mb-1">Server Status</h4>
              <p className="text-sm text-[#41493e] mb-4">Frankfurt (FRA-01) Node is currently operating at 99.98% uptime with 42ms latency.</p>
              <a className="text-xs font-bold text-[#991b1b] flex items-center gap-1 group" href="#">
                Cluster Health
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-8">
          {/* System Health Bento */}
          <div className="bg-[#eeeee9] rounded-3xl p-6 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#41493e]">Global System Health</h4>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1a1c19]">Storage Capacity</span>
                <span className="text-xs font-bold text-[#00450d]">68% Used</span>
              </div>
              <div className="w-full bg-[#e3e3de] rounded-full h-2">
                <div className="bg-[#00450d] h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1a1c19]">API Latency</span>
                <span className="text-xs font-bold text-[#503600]">Optimal</span>
              </div>
              <div className="flex gap-1 h-6 items-end">
                <div className="bg-[#10b981]/30 w-full h-3 rounded-t-sm"></div>
                <div className="bg-[#10b981]/40 w-full h-4 rounded-t-sm"></div>
                <div className="bg-[#10b981]/50 w-full h-3 rounded-t-sm"></div>
                <div className="bg-[#10b981]/60 w-full h-5 rounded-t-sm"></div>
                <div className="bg-[#10b981] w-full h-6 rounded-t-sm"></div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#c0c9bb]/30">
              <p className="text-[11px] text-[#41493e] font-medium leading-relaxed">
                <span className="material-symbols-outlined text-xs inline-block align-middle mr-1">info</span>
                Automatic backups are scheduled every 24 hours at 02:00 UTC. Next backup in 8 hours.
              </p>
            </div>
          </div>

          {/* Decorative Editorial Image */}
          <div className="relative group overflow-hidden rounded-3xl aspect-[4/5]">
            <img
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsSy9iDfMNoJjgyQkz8VfFbgIk40c6ElbBj36dmdyEEIy4_SdAe8pcz1iQzhhrOJ5dw5iNs73lkjHrJBpXl9U4JrMCa5puLBgSx1r-tJ57_Ym4q-J84O65NBQPiCTleqwyXmcXLgJF6uLQKGzGlTrSuvS-g2JgPn-OojjAAhvdAzSYPTDIrKFnRNxveR1rKFkkI39M8-6U0ooxTA2sF1rgoX0fuJFtZgAl7ns6l6L69CsKSg-x5bCS1bBhw2iqSsV_1dQXxjtutJoQ"
              alt="Harvest"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
              <p className="text-[#ffdeac] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Seasonal Focus</p>
              <h5 className="text-white font-bold text-2xl leading-tight">Harvesting Innovation & Integrity.</h5>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-8 h-1 bg-[#ffdeac]"></div>
                <p className="text-white/60 text-xs italic">Agrarian Logistics v2.4</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default SiteSettingsEditor;
