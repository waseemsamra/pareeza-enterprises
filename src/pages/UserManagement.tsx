import { useState } from 'react';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  email: string;
  initials: string;
  role: 'Super Admin' | 'Editor' | 'Partner';
  status: 'Active' | 'Inactive' | 'Suspended';
  lastSession: string;
  avatarColor: string;
}

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedStatus, setSelectedStatus] = useState('Any Status');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [resetMethod, setResetMethod] = useState<'link' | 'password'>('password');
  const [tempPassword] = useState('GR-92X-LQ71-V');
  const [requireChange, setRequireChange] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'Super Admin',
    active: true,
    permissions: {
      manageCategories: true,
      editProducts: true,
      viewFinancials: false,
      auditLogistics: true,
      supportChat: true,
      globalSettings: false
    }
  });

  const users: User[] = [
    { id: 1, name: 'Elias Jensen', email: 'elias@verdantlogic.com', initials: 'EJ', role: 'Super Admin', status: 'Active', lastSession: '2 mins ago', avatarColor: 'bg-[#acf4a4]' },
    { id: 2, name: 'Althea Moreno', email: 'althea@curator.farm', initials: 'AM', role: 'Editor', status: 'Active', lastSession: '4 hours ago', avatarColor: 'bg-[#ebbcac]' },
    { id: 3, name: 'Soren Kvist', email: 'soren.kvist@nordic.log', initials: 'SK', role: 'Partner', status: 'Inactive', lastSession: '3 days ago', avatarColor: 'bg-[#ffba38]' },
    { id: 4, name: 'Lana Bisset', email: 'lana.b@verdantlogic.com', initials: 'LB', role: 'Editor', status: 'Active', lastSession: '12 mins ago', avatarColor: 'bg-[#e3e3de]' },
  ];

  const handleAddUser = () => {
    setIsAddUserModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData({
      fullName: user.name,
      email: user.email,
      role: user.role,
      active: user.status === 'Active',
      permissions: {
        manageCategories: true,
        editProducts: true,
        viewFinancials: false,
        auditLogistics: true,
        supportChat: true,
        globalSettings: false
      }
    });
    setIsEditUserModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setDeleteConfirmText('');
    setIsDeleteModalOpen(true);
  };

  const handleResetPassword = (user: User) => {
    setSelectedUser(user);
    setResetMethod('password');
    setRequireChange(true);
    setIsResetPasswordModalOpen(true);
  };

  const confirmDeleteUser = () => {
    if (deleteConfirmText === 'DELETE') {
      toast.success('User deleted successfully!');
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      setDeleteConfirmText('');
    }
  };

  const handleConfirmReset = () => {
    toast.success(resetMethod === 'link' 
      ? 'Password reset link sent!' 
      : 'Temporary password generated!');
    setIsResetPasswordModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('User updated successfully!');
    setIsEditUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('User created successfully! Invitation sent.');
    setIsAddUserModalOpen(false);
    setFormData({
      fullName: '',
      email: '',
      role: 'Super Admin',
      active: true,
      permissions: {
        manageCategories: true,
        editProducts: true,
        viewFinancials: false,
        auditLogistics: true,
        supportChat: true,
        globalSettings: false
      }
    });
  };

  const getRoleStyles = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return 'bg-[#dcfce7] text-[#047852] border border-[#86efac]';
      case 'Editor':
        return 'bg-[#f5f5f0] text-[#41493e] border border-[#e3e3de]';
      case 'Partner':
        return 'bg-[#fdcdbc] text-[#7a5649] border border-[#ebbcac]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <span className="text-[10px] font-bold tracking-widest text-[#7a5649] uppercase mb-3 block">Access Control</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#1a1c19] leading-tight">User Management</h1>
          <p className="mt-4 text-base text-[#41493e] leading-relaxed">
            Oversee the Digital Curator ecosystem. Manage permissions, audit active sessions, and provision new administrative roles across the global logistics network.
          </p>
        </div>
        <button
          onClick={handleAddUser}
          className="flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-primary/10 transition-all active:scale-95 group"
        >
          <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">add</span>
          Add New User
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-white/20">
          <p className="text-[10px] font-bold text-[#717a6d] uppercase tracking-widest mb-1">Total Active</p>
          <p className="text-3xl font-black text-primary">1,284</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-white/20">
          <p className="text-[10px] font-bold text-[#717a6d] uppercase tracking-widest mb-1">New this month</p>
          <p className="text-3xl font-black text-[#503600]">42</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-white/20">
          <p className="text-[10px] font-bold text-[#717a6d] uppercase tracking-widest mb-1">Partner Nodes</p>
          <p className="text-3xl font-black text-[#7a5649]">156</p>
        </div>
        <div className="bg-[#f4f4ef] p-6 rounded-2xl flex items-center justify-between border border-[#e3e3de]/50">
          <div>
            <p className="text-[10px] font-bold text-[#717a6d] uppercase tracking-widest mb-1">System Health</p>
            <p className="text-sm font-bold text-[#047852]">All Nodes Active</p>
          </div>
          <div className="w-3 h-3 bg-[#10b981] rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-[#f4f4ef] p-2 rounded-2xl mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#717a6d]">person_search</span>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 shadow-sm"
            placeholder="Filter by name, email, or department..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-white border-none rounded-xl py-3 px-6 text-sm shadow-sm focus:ring-2 focus:ring-primary/20 font-medium"
          >
            <option>All Roles</option>
            <option>Super Admin</option>
            <option>Editor</option>
            <option>Partner</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-white border-none rounded-xl py-3 px-6 text-sm shadow-sm focus:ring-2 focus:ring-primary/20 font-medium"
          >
            <option>Any Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended</option>
          </select>
          <button className="p-3 bg-white text-[#41493e] rounded-xl shadow-sm hover:bg-[#f5f5f0] transition-colors">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>
      </div>

      {/* Data Table Container */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f5f5f0]/50 border-b border-[#f5f5f0]">
              <th className="px-8 py-5 text-[10px] font-bold text-[#717a6d] uppercase tracking-widest">User Name</th>
              <th className="px-8 py-5 text-[10px] font-bold text-[#717a6d] uppercase tracking-widest">Access Level</th>
              <th className="px-8 py-5 text-[10px] font-bold text-[#717a6d] uppercase tracking-widest">Network Status</th>
              <th className="px-8 py-5 text-[10px] font-bold text-[#717a6d] uppercase tracking-widest">Last Session</th>
              <th className="px-8 py-5 text-[10px] font-bold text-[#717a6d] uppercase tracking-widest text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f5f5f0]">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-[#f5f5f0]/40 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full ${user.avatarColor} flex items-center justify-center font-bold text-[#1a1c19]`}>
                      {user.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a1c19]">{user.name}</p>
                      <p className="text-xs text-[#717a6d]">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter ${getRoleStyles(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-[#10b981]' : 'bg-[#717a6d]'}`}></div>
                    <span className={`text-sm font-medium ${user.status === 'Active' ? 'text-[#047852]' : 'text-[#717a6d]'}`}>
                      {user.status}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm text-[#717a6d]">{user.lastSession}</td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="p-2 text-[#717a6d] hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="p-2 text-[#717a6d] hover:text-[#ba1a1a] transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-8 py-5 bg-[#f5f5f0]/30 border-t border-[#f5f5f0] flex items-center justify-between">
          <p className="text-xs text-[#717a6d]">
            Showing <span className="font-bold text-[#1a1c19]">1-4</span> of <span className="font-bold text-[#1a1c19]">1,284</span> administrators
          </p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#e3e3de] hover:bg-white transition-colors text-[#717a6d]">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-white text-xs font-bold">1</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#e3e3de] hover:bg-white transition-colors text-xs font-bold text-[#41493e]">2</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#e3e3de] hover:bg-white transition-colors text-xs font-bold text-[#41493e]">3</button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#e3e3de] hover:bg-white transition-colors text-[#717a6d]">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Logistics Status Footer */}

      {/* Edit User Modal */}
      {isEditUserModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#1a1c19]/40 backdrop-blur-sm p-4">
          {/* Modal Container */}
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-8 border-b border-[#c0c9bb]/20 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-[#1a1c19]">Edit User Profile</h3>
                <p className="text-sm text-[#41493e] mt-1">
                  Update credentials and access levels for <span className="text-primary font-bold">{selectedUser.name}</span>
                </p>
              </div>
              <button
                onClick={() => setIsEditUserModalOpen(false)}
                className="p-2 hover:bg-[#f4f4ef] rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-[#41493e]">close</span>
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <form onSubmit={handleSaveChanges} className="p-8 overflow-y-auto space-y-8">
              {/* Section 1: Core Information */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#41493e] block">Full Name</label>
                  <input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#f4f4ef] border-b-2 border-[#717a6d]/20 focus:border-primary focus:ring-0 transition-colors py-3 px-1 text-[#1a1c19]"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#41493e] block">Email Address</label>
                  <input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#f4f4ef] border-b-2 border-[#717a6d]/20 focus:border-primary focus:ring-0 transition-colors py-3 px-1 text-[#1a1c19]"
                    type="email"
                    required
                  />
                </div>
              </div>

              {/* Section 2: Role & Status */}
              <div className="grid grid-cols-2 gap-8 items-end">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#41493e] block">Role Selection</label>
                  <div className="relative">
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full appearance-none bg-[#f4f4ef] border-b-2 border-[#717a6d]/20 focus:border-primary focus:ring-0 py-3 px-1 pr-10 text-[#1a1c19]"
                    >
                      <option>Super Admin</option>
                      <option>Editor</option>
                      <option>Partner</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#717a6d]">expand_more</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#f4f4ef] rounded-lg">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#41493e]">Account Status</p>
                    <p className="text-sm font-bold text-[#047852]">Active</p>
                  </div>
                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer peer-focus:outline-none">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Section 3: Permissions Grid */}
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-[#41493e] block">Platform Permissions</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'manageCategories', label: 'Manage Categories', desc: 'Full control over produce taxonomy and seasonal tagging.' },
                    { key: 'editProducts', label: 'Edit Products', desc: 'Modify inventory listings, pricing, and curation details.' },
                    { key: 'viewFinancials', label: 'View Financials', desc: 'Access to export revenue reports and margin analytics.' },
                    { key: 'auditLogistics', label: 'Audit Logistics', desc: 'Track global shipping routes and supply chain health.' },
                    { key: 'supportChat', label: 'Support Chat', desc: 'Direct communication portal with regional curators.' },
                    { key: 'globalSettings', label: 'Global Settings', desc: 'Manage system-wide parameters and API integrations.' }
                  ].map((perm) => (
                    <label
                      key={perm.key}
                      className="flex items-start gap-4 p-4 rounded-xl bg-[#f4f4ef] border border-transparent hover:border-primary/20 cursor-pointer transition-all group"
                    >
                      <input
                        type="checkbox"
                        checked={formData.permissions[perm.key as keyof typeof formData.permissions]}
                        onChange={(e) => setFormData({
                          ...formData,
                          permissions: { ...formData.permissions, [perm.key]: e.target.checked }
                        })}
                        className="mt-1 rounded text-primary focus:ring-primary/20 h-4 w-4"
                      />
                      <div>
                        <p className="text-sm font-bold text-[#1a1c19] group-hover:text-primary transition-colors">{perm.label}</p>
                        <p className="text-[11px] text-[#41493e] leading-tight mt-1">{perm.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 4: Info Box (2FA) */}
              <div className="bg-[#ffdeac]/30 p-5 rounded-lg flex gap-4 items-center border border-[#ffba38]/20">
                <span className="material-symbols-outlined text-[#503600] text-2xl">verified_user</span>
                <div>
                  <p className="text-sm font-bold text-[#503600]">Two-Factor Authentication (2FA)</p>
                  <p className="text-xs text-[#503600] leading-relaxed">
                    This user has 2FA enabled via SMS. Any changes to critical permissions will require a re-verification code to be sent to their registered device for added security.
                  </p>
                </div>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="p-8 bg-[#f4f4ef] flex justify-between items-center">
              <button
                type="button"
                onClick={() => handleResetPassword(selectedUser)}
                className="text-primary font-bold text-sm px-4 py-2 hover:bg-primary/10 rounded-md transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">lock_reset</span>
                Reset Password
              </button>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditUserModalOpen(false)}
                  className="px-6 py-2.5 rounded-md font-bold text-sm text-[#41493e] hover:text-[#1a1c19] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    const form = e.currentTarget.closest('form');
                    if (form) form.requestSubmit();
                  }}
                  className="bg-primary text-white px-8 py-2.5 rounded-md font-bold text-sm shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#2f312e]/40 backdrop-blur-sm"></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="px-8 py-6 border-b border-[#c0c9bb]/20 flex justify-between items-center bg-[#fafaf5]">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-primary">Add New User</h3>
                <p className="text-sm text-[#41493e]">Grant access to the Verdant Logic dashboard</p>
              </div>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-[#f4f4ef] transition-colors flex items-center justify-center text-[#41493e]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleCreateUser} className="p-8 overflow-y-auto space-y-8">
              {/* Basic Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#41493e] px-1 block">Full Name</label>
                  <input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#f4f4ef] border-0 border-b-2 border-[#717a6d]/30 focus:border-primary focus:ring-0 transition-colors py-3 px-1 text-[#1a1c19] placeholder:text-[#717a6d]"
                    placeholder="e.g. Elena Rossi"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#41493e] px-1 block">Email Address</label>
                  <input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#f4f4ef] border-0 border-b-2 border-[#717a6d]/30 focus:border-primary focus:ring-0 transition-colors py-3 px-1 text-[#1a1c19] placeholder:text-[#717a6d]"
                    placeholder="elena.r@agri-global.com"
                    type="email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#41493e] px-1 block">Role Selection</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#f4f4ef] border-0 border-b-2 border-[#717a6d]/30 focus:border-primary focus:ring-0 transition-colors py-3 px-1 text-[#1a1c19]"
                  >
                    <option>Super Admin</option>
                    <option>CMS Editor</option>
                    <option>Partner Support</option>
                    <option>General Partner</option>
                  </select>
                </div>
                <div className="space-y-2 flex flex-col justify-end">
                  <div className="flex items-center justify-between p-3 bg-[#f4f4ef] rounded-lg">
                    <span className="text-sm font-medium text-[#1a1c19]">Account Status</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-[#717a6d] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      <span className="ml-3 text-sm font-semibold text-primary">Active</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Permissions Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#7a5649]">Permissions</h4>
                  <span className="text-[10px] text-[#41493e]">
                    {Object.values(formData.permissions).filter(Boolean).length} selected
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { key: 'manageCategories', label: 'Manage Categories', desc: 'Create & edit taxonomic structures' },
                    { key: 'editProducts', label: 'Edit Products', desc: 'Modify inventory and pricing' },
                    { key: 'viewFinancials', label: 'View Financials', desc: 'Access reports and margins' },
                    { key: 'auditLogistics', label: 'Audit Logistics', desc: 'Track global cargo movement' },
                    { key: 'supportChat', label: 'Support Chat', desc: 'Communicate with partners' },
                    { key: 'globalSettings', label: 'Global Settings', desc: 'Modify platform configuration' }
                  ].map((perm) => (
                    <label
                      key={perm.key}
                      className="group relative flex items-center gap-3 p-4 bg-[#f4f4ef] hover:bg-[#fafaf5] rounded-xl transition-all cursor-pointer border border-transparent hover:border-[#c0c9bb]/20 shadow-sm"
                    >
                      <input
                        type="checkbox"
                        checked={formData.permissions[perm.key as keyof typeof formData.permissions]}
                        onChange={(e) => setFormData({
                          ...formData,
                          permissions: { ...formData.permissions, [perm.key]: e.target.checked }
                        })}
                        className="w-5 h-5 rounded border-[#717a6d] text-primary focus:ring-primary/20"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#1a1c19]">{perm.label}</span>
                        <span className="text-[10px] text-[#41493e] leading-tight">{perm.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Security Note */}
              <div className="flex items-start gap-4 p-5 bg-[#ffdeac]/30 rounded-lg border border-[#ffba38]/20">
                <span className="material-symbols-outlined text-[#503600]">info</span>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-[#503600] uppercase tracking-wider">Authentication Requirement</p>
                  <p className="text-[11px] text-[#503600] leading-relaxed">
                    The new user will receive an automated invitation link via email. They must complete Two-Factor Authentication (2FA) setup within 24 hours to finalize their account creation.
                  </p>
                </div>
              </div>
            </form>

            {/* Footer Actions */}
            <div className="px-8 py-6 bg-[#f4f4ef] flex justify-between items-center">
              <button
                type="button"
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-[#7a5649] font-bold text-sm px-4 py-2 hover:bg-[#7a5649]/10 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  const form = e.currentTarget.closest('form');
                  if (form) form.requestSubmit();
                }}
                className="bg-primary text-white px-8 py-3 rounded-md font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-6 bg-[#2f312e]/40 backdrop-blur-sm">
          {/* Confirmation Modal */}
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-[#c0c9bb]/20 overflow-hidden flex flex-col">
            {/* Header/Warning Section */}
            <div className="p-8 pb-0 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#ffdad6] flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[#ba1a1a] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#1a1c19] mb-2">Delete User Account</h2>
              <p className="text-[#41493e] text-base leading-relaxed max-w-md">
                Are you sure you want to delete <span className="font-bold text-[#1a1c19]">{selectedUser.name}</span>? This action is permanent and will immediately revoke all platform access.
              </p>
            </div>

            {/* Interaction Section */}
            <div className="p-8 pt-10">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#41493e] mb-3" htmlFor="confirm-delete">
                Type <span className="text-[#ba1a1a]">DELETE</span> to confirm
              </label>
              <div className="relative">
                <input
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="w-full bg-[#f4f4ef] border-b-2 border-[#717a6d]/20 focus:border-[#ba1a1a] focus:ring-0 transition-all px-4 py-4 text-lg font-mono tracking-widest placeholder:text-[#717a6d]/40 placeholder:font-sans placeholder:tracking-normal rounded-t-lg"
                  id="confirm-delete"
                  placeholder="Type DELETE"
                  type="text"
                />
              </div>
              <div className="mt-4 flex items-start gap-3 p-4 bg-[#ffdeac]/30 rounded-xl border border-[#6e4b00]/10">
                <span className="material-symbols-outlined text-[#503600] text-xl">info</span>
                <p className="text-xs text-[#503600] leading-normal">
                  All associated audit trails and historical records for this user will be archived but inactive.
                </p>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="bg-[#f4f4ef] p-6 flex flex-col sm:flex-row-reverse gap-3">
              <button
                onClick={confirmDeleteUser}
                disabled={deleteConfirmText !== 'DELETE'}
                className="flex-1 bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold py-3.5 px-6 rounded-xl transition-all active:scale-95 shadow-sm shadow-[#ba1a1a]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-sm">delete_forever</span>
                Delete User
              </button>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedUser(null);
                  setDeleteConfirmText('');
                }}
                className="flex-1 bg-[#e3e3de] hover:bg-[#d6d3cd] text-[#1a1c19] font-semibold py-3.5 px-6 rounded-xl transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {isResetPasswordModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#2f312e]/40 backdrop-blur-sm p-4">
          {/* Modal Container */}
          <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl border border-[#c0c9bb]/20 overflow-hidden">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-[#e8e8e3]">
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <span className="material-symbols-outlined">lock_reset</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-[#1a1c19]">Reset User Password</h2>
              </div>
              <p className="text-sm text-[#41493e] leading-relaxed">
                Generate new credentials for <span className="font-bold text-[#1a1c19]">{selectedUser.name}</span> ({selectedUser.email})
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-8">
              {/* Reset Options */}
              <div className="grid grid-cols-1 gap-4">
                {/* Option 1: Link */}
                <button
                  onClick={() => setResetMethod('link')}
                  className={`flex items-center justify-between p-4 bg-[#f4f4ef] rounded-lg border ${resetMethod === 'link' ? 'border-primary bg-primary/5' : 'border-[#c0c9bb]/30'} hover:border-primary hover:bg-primary/5 group transition-all text-left`}
                >
                  <div className="flex gap-4 items-start">
                    <span className={`material-symbols-outlined mt-1 ${resetMethod === 'link' ? 'text-primary' : 'text-[#717a6d]'} group-hover:text-primary transition-colors`}>alternate_email</span>
                    <div>
                      <span className="block font-bold text-sm text-[#1a1c19] mb-0.5">Send Password Reset Link</span>
                      <span className="block text-xs text-[#41493e] leading-relaxed">Sends a secure, time-sensitive link via email for the user to manage their own reset.</span>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined ${resetMethod === 'link' ? 'text-primary' : 'text-[#717a6d]'} group-hover:text-primary`}>chevron_right</span>
                </button>

                {/* Option 2: Temporary Password */}
                <div className={`flex flex-col p-4 bg-[#f4f4ef] rounded-lg border-2 ${resetMethod === 'password' ? 'border-primary ring-4 ring-primary/5' : 'border-[#c0c9bb]/30'} text-left relative overflow-hidden`}>
                  <button
                    onClick={() => setResetMethod('password')}
                    className="flex items-center justify-between w-full mb-3"
                  >
                    <div className="flex gap-4 items-start">
                      <span className={`material-symbols-outlined mt-1 ${resetMethod === 'password' ? 'text-primary' : 'text-[#717a6d]'}`}>key</span>
                      <div>
                        <span className="block font-bold text-sm text-[#1a1c19] mb-0.5">Generate Temporary Password</span>
                        <span className="block text-xs text-[#41493e] leading-relaxed">Instantly creates a one-time use password for immediate access.</span>
                      </div>
                    </div>
                    {resetMethod === 'password' && (
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    )}
                  </button>

                  {/* Generated Password Field */}
                  {resetMethod === 'password' && (
                    <>
                      <div className="bg-[#e3e3de] rounded p-3 flex items-center justify-between border border-primary/20">
                        <code className="text-lg font-mono font-bold tracking-widest text-primary">{tempPassword}</code>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(tempPassword);
                          toast.success('Password copied to clipboard!');
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white rounded text-[10px] font-bold uppercase tracking-wider hover:bg-primary transition-colors mt-2 w-fit"
                      >
                        <span className="material-symbols-outlined text-sm">content_copy</span>
                        Copy
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Forced Change Checkbox */}
              <div className="flex items-start gap-3">
                <div className="flex items-center h-5">
                  <input
                    checked={requireChange}
                    onChange={(e) => setRequireChange(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary border-[#717a6d]"
                    id="require-change"
                    type="checkbox"
                  />
                </div>
                <label className="text-sm font-medium text-[#41493e] select-none cursor-pointer" htmlFor="require-change">
                  Require password change on next login
                </label>
              </div>

              {/* Security Warning */}
              <div className="bg-[#ffdad6]/20 border-l-4 border-[#ba1a1a] p-4 rounded-r-lg">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-lg">warning</span>
                  <p className="text-xs text-[#93000a] font-medium leading-relaxed">
                    <span className="font-bold">Critical Action:</span> This will revoke the user's current password and any active sessions immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-8 py-6 bg-[#f4f4ef] flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setIsResetPasswordModalOpen(false);
                  setSelectedUser(null);
                }}
                className="px-6 py-2.5 text-sm font-bold text-[#41493e] hover:text-[#1a1c19] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-8 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg hover:bg-primary transition-all active:scale-95"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
