import { useState } from 'react';
import { toast } from 'sonner';

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    fullName: 'Elena Vasseur',
    email: 'e.vasseur@pareezaenterprises.com',
    phone: '+971 4 123 4567',
    department: 'Global Operations',
    language: 'English (Global Office)',
    emailNotifications: true,
    desktopAlerts: false,
    theme: 'light'
  });

  const handleSave = () => {
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="w-full">
      {/* Profile Header */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-8">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-2xl ring-4 border-2 border-[#00450d]/20">
              <img
                alt="Profile"
                className="w-full h-full object-cover"
                src="https://ui-avatars.com/api/?name=Admin&background=00450d&color=fff&size=256"
              />
            </div>
            <button className="absolute -bottom-2 -right-2 bg-[#00450d] text-white p-2 rounded-lg shadow-lg hover:scale-105 transition-transform">
              <span className="material-symbols-outlined">edit</span>
            </button>
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#1a1c19]">Elena Vasseur</h1>
            <p className="text-[#00450d] text-lg font-semibold mt-1">Senior Super Admin</p>
            <div className="flex items-center gap-2 mt-4 text-[#41493e] text-sm">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span>Global Operations • Dubai HQ</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="bg-[#00450d] hover:bg-[#0c5216] text-white px-8 py-3 rounded-md font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95"
        >
          Save Changes
          <span className="material-symbols-outlined text-sm">check_circle</span>
        </button>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Personal Information (Spans 8) */}
        <section className="lg:col-span-8 bg-white p-8 rounded-xl border border-[#e3e3de]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#1a1c19] mb-8 border-b border-[#f4f4ef] pb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#41493e]">Full Name</label>
              <input
                className="w-full bg-[#f4f4ef] border-b-2 border-[#717a6d] focus:border-[#00450d] outline-none py-3 px-4 transition-colors"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#41493e]">Email Address</label>
              <input
                className="w-full bg-[#f4f4ef] border-b-2 border-[#717a6d] focus:border-[#00450d] outline-none py-3 px-4 transition-colors"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#41493e]">Phone Number</label>
              <input
                className="w-full bg-[#f4f4ef] border-b-2 border-[#717a6d] focus:border-[#00450d] outline-none py-3 px-4 transition-colors"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#41493e]">Department</label>
              <div className="w-full bg-[#f4f4ef] border-b-2 border-[#717a6d] py-3 px-4 font-medium text-[#00450d]">
                {formData.department}
              </div>
            </div>
          </div>
        </section>

        {/* Security Quick Status (Spans 4) */}
        <section className="lg:col-span-4 bg-[#00450d] text-white p-8 rounded-xl shadow-xl flex flex-col justify-between overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-6">Security Health</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span>2FA Authentication</span>
                <span className="bg-[#1b5e20] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Password Strength</span>
                <span className="text-[#91d78a] font-bold">EXCELLENT</span>
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-8">
            <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded text-sm font-bold uppercase tracking-widest transition-colors backdrop-blur-md">
              Reset Password
            </button>
          </div>
          {/* Decorative abstract shape */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        </section>

        {/* Account Preferences (Spans 6) */}
        <section className="lg:col-span-6 bg-white p-8 rounded-xl border border-[#e3e3de]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#1a1c19] mb-8 border-b border-[#f4f4ef] pb-4">Account Preferences</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[#717a6d] group-hover:text-[#00450d] transition-colors">language</span>
                <div>
                  <p className="font-bold text-[#1a1c19]">Language</p>
                  <p className="text-xs text-[#41493e]">{formData.language}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#717a6d]">chevron_right</span>
            </div>
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[#717a6d] group-hover:text-[#00450d] transition-colors">notifications_active</span>
                <div>
                  <p className="font-bold text-[#1a1c19]">Email Notifications</p>
                  <p className="text-xs text-[#41493e]">Critical system alerts and summaries</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  checked={formData.emailNotifications}
                  onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                  className="sr-only peer"
                  type="checkbox"
                />
                <div className="w-11 h-6 bg-[#e3e3de] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00450d]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[#717a6d] group-hover:text-[#00450d] transition-colors">desktop_windows</span>
                <div>
                  <p className="font-bold text-[#1a1c19]">Desktop Alerts</p>
                  <p className="text-xs text-[#41493e]">Real-time logistics status updates</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  checked={formData.desktopAlerts}
                  onChange={(e) => setFormData({ ...formData, desktopAlerts: e.target.checked })}
                  className="sr-only peer"
                  type="checkbox"
                />
                <div className="w-11 h-6 bg-[#e3e3de] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00450d]"></div>
              </label>
            </div>
            <div className="pt-4 mt-4 border-t border-[#f4f4ef]">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#41493e] mb-4">Theme Selection</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setFormData({ ...formData, theme: 'light' })}
                  className={`flex-1 py-4 border-2 ${formData.theme === 'light' ? 'border-[#00450d] bg-[#00450d]/5' : 'border-[#e3e3de]'} rounded-lg flex flex-col items-center gap-2 transition-all`}
                >
                  <span className={`material-symbols-outlined ${formData.theme === 'light' ? 'text-[#00450d]' : 'text-[#717a6d]'}`}>light_mode</span>
                  <span className="text-xs font-bold">Light</span>
                </button>
                <button
                  onClick={() => setFormData({ ...formData, theme: 'dark' })}
                  className={`flex-1 py-4 border-2 ${formData.theme === 'dark' ? 'border-[#00450d] bg-[#00450d]/5' : 'border-[#e3e3de]'} rounded-lg flex flex-col items-center gap-2 transition-all`}
                >
                  <span className={`material-symbols-outlined ${formData.theme === 'dark' ? 'text-[#00450d]' : 'text-[#717a6d]'}`}>dark_mode</span>
                  <span className="text-xs font-bold text-[#41493e]">Dark</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Login Sessions (Spans 6) */}
        <section className="lg:col-span-6 bg-white p-8 rounded-xl border border-[#e3e3de]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#1a1c19] mb-8 border-b border-[#f4f4ef] pb-4">Recent Sessions</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[#f4f4ef] flex items-center justify-between border-l-4 border-[#10b981]">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[#10b981]">devices</span>
                <div>
                  <p className="text-sm font-bold text-[#1a1c19]">MacBook Pro M2 • Dubai, AE</p>
                  <p className="text-xs text-[#41493e]">Current Session • IP: 192.168.1.45</p>
                </div>
              </div>
              <span className="text-[10px] bg-[#dcfce7] text-[#047852] px-2 py-1 rounded font-bold uppercase">Active</span>
            </div>
            <div className="p-4 rounded-lg bg-white flex items-center justify-between border-l-4 border-[#717a6d]">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[#717a6d]">smartphone</span>
                <div>
                  <p className="text-sm font-bold text-[#1a1c19]">iPhone 14 Pro • Abu Dhabi, AE</p>
                  <p className="text-xs text-[#41493e]">2 hours ago • IP: 172.16.254.1</p>
                </div>
              </div>
              <button className="text-[#717a6d] hover:text-[#ba1a1a] transition-colors">
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
            <div className="p-4 rounded-lg bg-white flex items-center justify-between border-l-4 border-[#717a6d]">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[#717a6d]">laptop</span>
                <div>
                  <p className="text-sm font-bold text-[#1a1c19]">Dell XPS 15 • Riyadh, SA</p>
                  <p className="text-xs text-[#41493e]">Yesterday, 14:22 • IP: 45.32.11.2</p>
                </div>
              </div>
              <button className="text-[#717a6d] hover:text-[#ba1a1a] transition-colors">
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          </div>
          <button className="mt-8 text-[#00450d] font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
            Terminate All Other Sessions
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </section>
      </div>

      {/* Footer for Admin Context */}
      <footer className="mt-20 pt-10 border-t border-[#e3e3de]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[#41493e] text-sm">
          <div className="flex items-center gap-4">
            <span className="font-bold text-[#1a1c19]">Pareeza Enterprises</span>
            <span className="h-4 w-[1px] bg-[#717a6d]"></span>
            <span>Internal Admin Portal v2.4.0</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#503600]"></span>
            <span className="text-xs font-bold uppercase tracking-widest">Global Logistics Status: Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminProfile;
