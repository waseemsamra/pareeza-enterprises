import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import SiteSettingsEditor from './SiteSettingsEditor';
import HomepageCMS from './HomepageCMS';
import NavigationMgmt from './NavigationMgmt';
import FooterMgmt from './FooterMgmt';
import UserManagement from './UserManagement';
import AdminProfile from './AdminProfile';
import ImageManagement from './ImageManagement';

interface User {
  email: string;
  role: string;
  name: string;
}

const NewAdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<User | null>(null);
  const stats = {
    categories: 6,
    products: 142,
    inquiries: 28,
    volume: 8420
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('idToken');

    if (!storedUser || !token) {
      console.log('❌ [AdminDashboard] No user or token found, redirecting to login');
      navigate('/admin-login');
      return;
    }

    const userData: User = JSON.parse(storedUser);
    console.log('✅ [AdminDashboard] User loaded:', userData);

    // Allow admin role OR specific admin emails
    const allowedEmails = ['waseemsamra@gmail.com', 'admin@pareezaenterprises.com'];
    if (userData.role !== 'admin' && !allowedEmails.includes(userData.email)) {
      console.log('❌ [AdminDashboard] User not authorized:', userData.email);
      toast.error('Access Denied', {
        description: 'You do not have admin privileges.'
      });
      navigate('/admin-login');
      return;
    }

    console.log('✅ [AdminDashboard] Admin access granted');
    setUser(userData);
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf5]">
        <div className="text-center">
          <span className="material-symbols-outlined text-2xl text-primary animate-spin">progress_activity</span>
          <h2 className="text-sm font-medium mt-4 text-[#1a1c19]">Loading...</h2>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      localStorage.clear();
      toast.success('Logged out successfully');
      navigate('/admin-login');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.clear();
      navigate('/admin-login');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewDashboard stats={stats} />;
      case 'cms':
      case 'homepage':
        return <HomepageCMS />;
      case 'navigation':
        return <NavigationMgmt />;
      case 'footer':
        return <FooterMgmt />;
      case 'products':
        return <ProductManagement />;
      case 'categories':
        return <CategoryManagement />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <SiteSettingsEditor />;
      case 'profile':
        return <AdminProfile />;
      case 'images':
        return <ImageManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf5]">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-[#e3e3de]">
        <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                <span className="material-symbols-outlined">potted_plant</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary">Pareeza Enterprises Admin</h1>
                <p className="text-[10px] text-[#41493e] uppercase tracking-widest">Super Admin Console</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#717a6d] text-sm">search</span>
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 bg-[#f4f4ef] border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Notifications */}
            <button className="relative text-[#41493e] hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-3 cursor-pointer">
                <div className="text-right hidden lg:block">
                  <p className="text-xs font-bold text-[#1a1c19]">{user?.name || 'Admin'}</p>
                  <p className="text-[10px] text-[#41493e]">Super Admin</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold border-2 border-primary/20 group-hover:border-primary transition-all">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <span className="material-symbols-outlined text-sm text-[#41493e]">expand_more</span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-[#e3e3de] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50">
                <div className="p-4 border-b border-[#e3e3de]">
                  <p className="text-sm font-bold text-[#1a1c19]">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-[#41493e]">{user?.email || 'admin@pareezaenterprises.com'}</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#41493e] hover:bg-[#f4f4ef] transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-sm">account_circle</span>
                    Profile Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#41493e] hover:bg-[#f4f4ef] transition-colors text-left">
                    <span className="material-symbols-outlined text-sm">security</span>
                    Security
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex gap-8 p-8 max-w-screen-2xl mx-auto">
        {/* Admin Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <div className="sticky top-32 bg-white rounded-xl shadow-sm border border-[#e3e3de] p-4">
            <div className="mb-6 px-2">
              <h2 className="text-sm font-bold text-primary">Admin Console</h2>
              <p className="text-[10px] text-[#41493e] uppercase tracking-widest">Management Panel</p>
            </div>
            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Overview', icon: 'dashboard' },
                { id: 'categories', label: 'Categories', icon: 'category' },
                { id: 'products', label: 'Products', icon: 'inventory_2' },
                { id: 'images', label: 'Images', icon: 'image' },
                { id: 'users', label: 'Users', icon: 'group' },
                { id: 'cms', label: 'CMS', icon: 'auto_awesome_motion', hasSubmenu: true },
                { id: 'settings', label: 'Settings', icon: 'settings' }
              ].map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === item.id
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-[#41493e] hover:bg-[#f4f4ef]'
                    }`}
                  >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </button>
                  {item.hasSubmenu && activeTab === 'cms' && (
                    <div className="ml-8 mt-1 space-y-1 border-l-2 border-[#e3e3de] pl-2">
                      <button
                        onClick={() => setActiveTab('homepage')}
                        className={`w-full text-left px-4 py-2 text-sm rounded ${
                          String(activeTab) === 'homepage'
                            ? 'text-primary font-bold'
                            : 'text-[#41493e] hover:text-primary'
                        }`}
                      >
                        Homepage CMS
                      </button>
                      <button
                        onClick={() => setActiveTab('navigation')}
                        className={`w-full text-left px-4 py-2 text-sm rounded ${
                          String(activeTab) === 'navigation'
                            ? 'text-primary font-bold'
                            : 'text-[#41493e] hover:text-primary'
                        }`}
                      >
                        Navigation Mgmt
                      </button>
                      <button
                        onClick={() => setActiveTab('footer')}
                        className={`w-full text-left px-4 py-2 text-sm rounded ${
                          String(activeTab) === 'footer'
                            ? 'text-primary font-bold'
                            : 'text-[#41493e] hover:text-primary'
                        }`}
                      >
                        Footer Mgmt
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-6 pt-6 border-t border-[#e3e3de] space-y-3">
              <button className="w-full py-2.5 bg-primary text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#0c5216] transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">download</span>
                Export Report
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-2.5 bg-[#f4f4ef] text-[#ba1a1a] rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#ffdad6] transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Overview Dashboard Component
const OverviewDashboard = ({ stats }: { stats: any }) => {
  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#1a1c19]">Overview</h2>
          <p className="text-[#41493e] text-sm mt-1">Operational analytics and marketplace performance.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-lg text-[10px] font-medium text-[#7a5649]">
            MARKET STATUS: <span className="text-primary font-bold">ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat 1 */}
        <div className="bg-white p-6 rounded-xl border-b-4 border-primary transition-all hover:bg-[#fafaf5] group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-[#f5f5f0] rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">category</span>
            </div>
            <span className="text-[10px] font-bold text-primary bg-[#dcfce7] px-2 py-1 rounded">+2 This Month</span>
          </div>
          <p className="text-[#41493e] text-xs font-medium uppercase tracking-widest">Total Categories</p>
          <h3 className="text-2xl font-extrabold mt-1">{stats.categories}</h3>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-6 rounded-xl border-b-4 border-[#e3e3de] transition-all hover:bg-[#fafaf5] group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-[#f5f5f0] rounded-lg flex items-center justify-center text-[#41493e] group-hover:bg-[#fdcdbc] group-hover:text-[#7a5649] transition-colors">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <span className="text-[10px] font-bold text-[#41493e] bg-[#f5f5f0] px-2 py-1 rounded">Global Reach</span>
          </div>
          <p className="text-[#41493e] text-xs font-medium uppercase tracking-widest">Total Active Products</p>
          <h3 className="text-2xl font-extrabold mt-1">{stats.products}</h3>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-6 rounded-xl border-b-4 border-[#503600] transition-all hover:bg-[#fafaf5] group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-[#f5f5f0] rounded-lg flex items-center justify-center text-[#503600] group-hover:bg-[#ffdeac] group-hover:text-[#503600] transition-colors">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-1 rounded">Urgent</span>
          </div>
          <p className="text-[#41493e] text-xs font-medium uppercase tracking-widest">Pending Inquiries</p>
          <h3 className="text-2xl font-extrabold mt-1">{stats.inquiries}</h3>
        </div>

        {/* Stat 4 */}
        <div className="bg-white p-6 rounded-xl border-b-4 border-primary transition-all hover:bg-[#fafaf5] group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-[#f5f5f0] rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <span className="text-[10px] font-bold text-primary bg-[#dcfce7] px-2 py-1 rounded">YTD</span>
          </div>
          <p className="text-[#41493e] text-xs font-medium uppercase tracking-widest">Marketplace Volume (MT)</p>
          <h3 className="text-2xl font-extrabold mt-1">{stats.volume.toLocaleString()}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Category Performance */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#eeeee9] p-6 rounded-2xl relative overflow-hidden">
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold tracking-tight">Category Performance</h3>
                <p className="text-[#41493e] text-xs">Monthly export volume by produce type</p>
              </div>
              <button className="text-primary font-bold text-[10px] uppercase tracking-widest flex items-center gap-1">
                Full Analysis <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* Abstract Chart */}
            <div className="mt-10 h-64 flex items-end gap-4">
              {[
                { name: 'Citrus', height: '40%', color: 'bg-primary' },
                { name: 'Tubers', height: '75%', color: 'bg-[#047852]' },
                { name: 'Grains', height: '60%', color: 'bg-[#059669]' },
                { name: 'Berries', height: '90%', color: 'bg-[#503600]' },
                { name: 'Leafy', height: '55%', color: 'bg-primary' },
                { name: 'Exotic', height: '30%', color: 'bg-[#d6d3cd]' },
              ].map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className={`w-full ${item.color} rounded-t-sm transition-all duration-500 group-hover:opacity-80`} style={{ height: item.height }}></div>
                  <span className="text-[10px] font-bold uppercase text-[#41493e] rotate-[-45deg] mt-4">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-primary p-6 rounded-2xl text-white flex flex-col justify-between aspect-video relative overflow-hidden group">
              <img
                alt="Fresh Produce"
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASrwJEXLky4fMv2SeLgJa9cjV_cFO9zK_iiZwRQty7IXqahPT2R4BcLFGCxA0gfaW7AaUixbpOr_5EqDZNpT5oL4pSYv7wlAN4jRi2JKLOScBQrDOhKnn7vDZGvnK49Xi59xMMLe_xRYnTmm1UP5mcR6NRPcLg7WxGdvN56bU5eXKWx8Imygmj3ibfJpMTyaUrSsp164d1UFluZgK99-oh3FtqMzjk2NbT6pcuhqTHzc5LhzTlMwqI2uqx-fNqTSioIqaruaPLg15X"
              />
              <div className="relative z-10">
                <span className="bg-[#503600] text-white text-[10px] font-bold px-2 py-1 rounded">PREMIUM ASSET</span>
                <h4 className="text-lg font-extrabold mt-3 leading-tight">Artisan Root<br/>Vegetables</h4>
              </div>
              <div className="relative z-10">
                <p className="text-xs opacity-80">Inventory Status: High Demand</p>
                <button className="mt-3 flex items-center gap-2 text-xs font-bold">
                  Manage Catalog <span className="material-symbols-outlined text-sm">open_in_new</span>
                </button>
              </div>
            </div>

            <div className="bg-[#e8e8e3] p-6 rounded-2xl flex flex-col justify-between aspect-video border border-[#e3e3de]/50">
              <div>
                <h4 className="text-base font-bold text-primary tracking-tight">Logistics Update</h4>
                <p className="text-[#41493e] text-xs mt-2">
                  All export lanes to EU are currently performing with <span className="text-[#047852] font-bold">98% efficiency</span>.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#d6d3cd]"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#a8a29e]"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#78716c]"></div>
                </div>
                <span className="text-[10px] font-bold text-[#41493e] uppercase">12 Active Couriers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl border border-[#e3e3de] flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold tracking-tight">Recent Activity</h3>
            <span className="material-symbols-outlined text-[#717a6d]">history</span>
          </div>

          <div className="space-y-4 flex-1">
            {/* Activity Item 1 */}
            <div className="flex gap-4 relative">
              <div className="absolute left-[15px] top-8 bottom-[-24px] w-[2px] bg-[#f5f5f0]"></div>
              <div className="w-8 h-8 rounded-full bg-[#dcfce7] border border-[#86efac] flex items-center justify-center shrink-0 z-10">
                <span className="material-symbols-outlined text-[#047852] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1a1c19]">New SKU Added: 'Hass Avocado XL'</p>
                <p className="text-xs text-[#41493e] mt-1">Updated by Warehouse Manager • 14m ago</p>
              </div>
            </div>

            {/* Activity Item 2 */}
            <div className="flex gap-4 relative">
              <div className="absolute left-[15px] top-8 bottom-[-24px] w-[2px] bg-[#f5f5f0]"></div>
              <div className="w-8 h-8 rounded-full bg-[#ffdeac] border border-[#ffba38] flex items-center justify-center shrink-0 z-10">
                <span className="material-symbols-outlined text-[#503600] text-sm">mail</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1a1c19]">Bulk Inquiry: Central Co-op</p>
                <p className="text-xs text-[#41493e] mt-1">Requested 120MT of Wheat Grains • 42m ago</p>
                <div className="mt-2 flex gap-2">
                  <button className="text-[10px] font-bold bg-[#f5f5f0] px-3 py-1 rounded hover:bg-[#e3e3de] transition-colors">ASSIGN</button>
                  <button className="text-[10px] font-bold bg-primary text-white px-3 py-1 rounded">REVIEW</button>
                </div>
              </div>
            </div>

            {/* Activity Item 3 */}
            <div className="flex gap-4 relative">
              <div className="absolute left-[15px] top-8 bottom-[-24px] w-[2px] bg-[#f5f5f0]"></div>
              <div className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0 z-10">
                <span className="material-symbols-outlined text-red-600 text-sm">warning</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1a1c19]">Low Stock Alert: Organic Kale</p>
                <p className="text-xs text-[#41493e] mt-1">Current levels below safety threshold (12%) • 2h ago</p>
              </div>
            </div>

            {/* Activity Item 4 */}
            <div className="flex gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-[#f5f5f0] border border-[#e3e3de] flex items-center justify-center shrink-0 z-10">
                <span className="material-symbols-outlined text-[#41493e] text-sm">person_add</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1a1c19]">New Supplier Verified</p>
                <p className="text-xs text-[#41493e] mt-1">Andean Organics S.A. joined the platform • 5h ago</p>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 py-2 text-[10px] font-bold text-[#717a6d] border border-dashed border-[#e3e3de] rounded-lg hover:border-[#86efac] hover:text-[#047852] transition-all uppercase tracking-widest">
            VIEW ALL SYSTEM LOGS
          </button>
        </div>
      </div>

      {/* Global Logistics Status */}
      <div className="bg-[#2f312e] rounded-2xl p-6 text-[#f1f1ec]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[#ffdeac]">globe_uk</span>
            </div>
            <div>
              <h4 className="font-bold text-base tracking-tight">Global Logistics Status</h4>
              <p className="text-[#717a6d] text-sm">Real-time supply chain monitoring active.</p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-[10px] font-bold text-[#717a6d] uppercase tracking-widest">Active Ships</p>
              <p className="text-lg font-bold">24</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-[#717a6d] uppercase tracking-widest">Port Clearance</p>
              <p className="text-lg font-bold">94%</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-[#717a6d] uppercase tracking-widest">Avg Transit</p>
              <p className="text-lg font-bold">12d</p>
            </div>
          </div>
          <button className="bg-[#eeeee9] text-[#1a1c19] px-6 py-2 rounded-md font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-colors">
            Network Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAdminDashboard;
