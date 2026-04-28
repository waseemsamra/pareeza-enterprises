import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Category {
  id: string | number;
  name: string;
  description: string;
  color: string;
  image?: string;
  productCount?: number;
  status?: string;
  lastUpdated?: string;
  parentId?: string | number | null;
  isSubcategory?: boolean;
  subcategories?: { id: string | number; name: string; items: number; ref: string }[];
}

const API_URL = 'https://euwheigeak.execute-api.us-east-1.amazonaws.com/prod';

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3b82f6',
    image: '',
    parentId: '',
    isSubcategory: false
  });

  const [showSubcategoryToggle, setShowSubcategoryToggle] = useState(false);

  const colorOptions = [
    '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'
  ];

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      console.log('📡 Fetching categories from API...');
      const response = await fetch(`${API_URL}/categories`);

      if (!response.ok) {
        throw new Error('Failed to load categories');
      }

      const data = await response.json();
      console.log('✅ Categories API response:', data);

      if (Array.isArray(data)) {
        const transformedCategories = data.map((item: any) => ({
          ...item,
          status: 'Active',
          lastUpdated: item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Oct 24, 2023',
          productCount: item.productCount || Math.floor(Math.random() * 400) + 50
        }));
        setCategories(transformedCategories);
        toast.success(`Loaded ${data.length} categories from API!`);
      } else {
        setCategories([]);
      }
    } catch (error: any) {
      console.error('❌ Error loading categories:', error);
      toast.error('Failed to load categories');
      // Fallback data with subcategories
      setCategories([
        { 
          id: 1, 
          name: 'Rice & Spices', 
          description: 'Grains, Masalas, Bulk Pulses', 
          color: '#10b981', 
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARVwuLEPDFGdxkvpS5dsyWNFGQL0aJh67MAAmRQ53w43UEaNEmpwJ8SAp5OUCJZg0xDA2z7aGZAtbTS1NdE1aMJqJ3FxcHQmIp1uTNoXyzFL2vt3OIUKseD3F_06sAh42_AgTPxUiEaNTIkNl3M5-raJ5xymYbSpyq3SSUv5SJqe_TbAr0DNBdrxEvodVzp9jbbRN5PpgLweST_D0abCWVI2dMTOMFciJCv0FPOmk1CXKCmZTWYJ69UYruE2H93AR3vqYcXuX64A2B', 
          productCount: 428, 
          status: 'Active', 
          lastUpdated: 'Oct 24, 2023',
          subcategories: [
            { id: '1-1', name: 'Long Grain Rice', items: 112, ref: 'ECO-R-01' },
            { id: '1-2', name: 'Aromatic Spices', items: 204, ref: 'ECO-S-04' },
            { id: '1-3', name: 'Ground Powders', items: 112, ref: 'ECO-P-02' }
          ]
        },
        { 
          id: 2, 
          name: 'Fruits & Veg', 
          description: 'Seasonal, Exotic, Root', 
          color: '#3b82f6', 
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-SnUG_hmF6b-u3MAnWXAM2fZY2qHka5K9GnTA92WifSqIgSYSJp1lNaK1hsMTz7oUFWSp2B3hO9-75boIWCYuYYjTzohyvtLFrncHWdsU0WG9u8YnF0N6yWotYiq8xJK58CIvJssDWWtUpgq0Jq5gtXfhfQ0KuzT103tJUqEPk_HZ-MnuT1qEB31aYcVth1FMV6Egs1MGk9Wv5b3Y35p8FAhv_IYern4hBzpdooudSZYlSAmCsyYvQo7tW4dOtYUmjyznJbXqoQei', 
          productCount: 312, 
          status: 'Active', 
          lastUpdated: 'Oct 25, 2023',
          subcategories: []
        },
        { 
          id: 3, 
          name: 'Dairy & Poultry', 
          description: 'Farm Fresh, Organic Certified', 
          color: '#f59e0b', 
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRGO-J-WiAHciThI2XL7Xv2_VlhruZjUWRWvJDjA91UNSjMXMozipoNIRrZNJ3WYyhGkVBxfDMzDtjx3FDg4kwAIzfneEbQtxR6l0DPmp9mlQNtrS31vESdEJoz5bpEDWwhQ63wuNafxBZgRQqrHMl7mwkbPiXIAiHVB0IsJHCQZXrI5kw8bWW-DXC-2yVdxYGRcKg1VHF6eO9KpGHoYEUwzsEDrX17q9DlJ3gdolRB3ro0CrCONv9Ucm6INJllC4Fd96AyXDL307M', 
          productCount: 185, 
          status: 'Active', 
          lastUpdated: 'Oct 22, 2023',
          subcategories: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (id: string | number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(String(id))) {
      newExpanded.delete(String(id));
    } else {
      newExpanded.add(String(id));
    }
    setExpandedCategories(newExpanded);
  };

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        color: category.color,
        image: category.image || '',
        parentId: category.parentId ? String(category.parentId) : '',
        isSubcategory: !!category.parentId
      });
      setShowSubcategoryToggle(!!category.parentId);
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        color: '#3b82f6',
        image: '',
        parentId: '',
        isSubcategory: false
      });
      setShowSubcategoryToggle(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      color: '#3b82f6',
      image: '',
      parentId: '',
      isSubcategory: false
    });
    setShowSubcategoryToggle(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const { default: s3Service } = await import('../lib/S3Service');
      const result = await s3Service.uploadImage(file, 'categories');

      if (result.success && result.url) {
        setFormData({ ...formData, image: result.url });
        toast.success('Category image uploaded to S3!');
      } else {
        toast.error('Upload failed');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Upload failed: ' + (error.message || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('idToken');
      const headers = {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      };

      const submitData: any = {
        name: formData.name,
        description: formData.description,
        color: formData.color,
        image: formData.image
      };

      if (formData.isSubcategory && formData.parentId) {
        submitData.parentId = formData.parentId;
        submitData.isSubcategory = true;
      }

      if (editingCategory) {
        const response = await fetch(`${API_URL}/categories/${editingCategory.id}`, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(submitData)
        });

        const result = await response.json();
        console.log('📝 Update response:', response.status, result);

        if (response.ok) {
          toast.success('Category updated successfully!');
          loadCategories();
          handleCloseModal();
        } else {
          toast.error(`Failed to update: ${result.message || 'Unknown error'}`);
        }
      } else {
        const response = await fetch(`${API_URL}/categories`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(submitData)
        });

        const result = await response.json();
        console.log('➕ Create response:', response.status, result);

        if (response.ok) {
          toast.success('Category created successfully!');
          loadCategories();
          handleCloseModal();
        } else {
          toast.error(`Failed to create: ${result.message || 'Unknown error'}`);
        }
      }
    } catch (error: any) {
      console.error('❌ Error saving category:', error);
      toast.error('Failed to save category: ' + (error.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this category? This will affect all products and subcategories.')) return;

    try {
      const token = localStorage.getItem('idToken');
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      const result = await response.json();
      console.log('🗑️ Delete response:', response.status, result);

      if (response.ok) {
        toast.success('Category deleted successfully!');
        loadCategories();
      } else {
        toast.error(`Failed to delete: ${result.message || 'Unknown error'}`);
      }
    } catch (error: any) {
      console.error('❌ Error deleting category:', error);
      toast.error('Failed to delete category: ' + (error.message || 'Unknown error'));
    }
  };

  const totalSubcategories = categories.reduce((sum, cat) => sum + (cat.subcategories?.length || 0), 0);

  return (
    <div className="w-full">
      {/* Breadcrumbs & Title Area */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#717a6d] text-xs mb-2 tracking-widest uppercase font-semibold">
            <span>Console</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-[#047852]">Category Management</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1a1c19]">Inventory Ecosystem</h2>
          <p className="text-[#41493e] mt-2 max-w-lg">Manage the global distribution hierarchies and curate product collections for international export compliance.</p>
        </div>
        <div className="relative inline-block text-left">
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#00450d] text-white rounded-xl font-bold shadow-xl shadow-[#00450d]/10 hover:shadow-[#00450d]/20 transition-all transform hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span>Add New</span>
            <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
          </button>
        </div>
      </div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#f4f4ef] p-6 rounded-2xl">
          <p className="text-[#41493e] text-xs font-bold uppercase tracking-wider mb-2">Total Categories</p>
          <h3 className="text-3xl font-extrabold text-[#1a1c19]">06</h3>
          <div className="mt-4 flex items-center gap-2 text-xs text-[#047852] font-bold bg-[#dcfce7] w-fit px-2 py-1 rounded">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>12% Global Growth</span>
          </div>
        </div>
        <div className="bg-[#f4f4ef] p-6 rounded-2xl">
          <p className="text-[#41493e] text-xs font-bold uppercase tracking-wider mb-2">Sub-Categories</p>
          <h3 className="text-3xl font-extrabold text-[#1a1c19]">{totalSubcategories}</h3>
          <p className="mt-4 text-xs text-[#717a6d]">Deep-tier mapping active</p>
        </div>
        <div className="bg-[#00450d] text-white p-6 rounded-2xl shadow-xl shadow-[#00450d]/20 relative overflow-hidden">
          <div className="relative z-10">
            <p className="opacity-70 text-xs font-bold uppercase tracking-wider mb-2">Hierarchy Status</p>
            <h3 className="text-2xl font-bold">Optimized</h3>
            <p className="mt-4 text-xs font-medium">All nodes reporting nominal</p>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl opacity-10">verified_user</span>
        </div>
        <div className="bg-[#503600] text-white p-6 rounded-2xl shadow-xl shadow-[#503600]/20">
          <p className="opacity-70 text-xs font-bold uppercase tracking-wider mb-2">Last Sync</p>
          <h3 className="text-2xl font-bold">14m Ago</h3>
          <p className="mt-4 text-xs font-medium">Auto-update enabled</p>
        </div>
      </div>

      {/* Main Data Table Card */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#e3e3de]">
        {/* Table Header/Filters */}
        <div className="p-6 border-b border-[#f5f5f0] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-lg px-2">Ecosystem Hierarchy</h4>
            <span className="bg-[#f5f5f0] text-[#41493e] text-[10px] px-2 py-1 rounded-full font-bold">Tree View</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-[#f5f5f0] p-1 rounded-lg border border-[#e3e3de]">
              {['All', 'Active', 'Archived'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${
                    activeFilter === filter
                      ? 'bg-white text-[#00450d] shadow-sm'
                      : 'text-[#41493e] hover:text-[#1a1c19]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#e3e3de] rounded-xl text-xs font-bold text-[#41493e] hover:bg-[#f5f5f0] transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-4xl text-[#717a6d] animate-spin">progress_activity</span>
            <p className="mt-4 text-[#41493e]">Loading categories...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f5f5f0]/50">
                  <th className="w-12 px-4 py-4 border-b border-[#f5f5f0]"></th>
                  <th className="px-4 py-4 text-[10px] uppercase tracking-widest font-extrabold text-[#717a6d] border-b border-[#f5f5f0]">Category Name</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-extrabold text-[#717a6d] border-b border-[#f5f5f0]">Items Count</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-extrabold text-[#717a6d] border-b border-[#f5f5f0]">Status</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-extrabold text-[#717a6d] border-b border-[#f5f5f0]">Last Updated</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest font-extrabold text-[#717a6d] border-b border-[#f5f5f0] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f5f0]">
                {categories.map((category) => (
                  <>
                    {/* Main Category Row */}
                    <tr
                      key={category.id}
                      className="hover:bg-[#f5f5f0]/40 transition-colors group cursor-pointer"
                      onClick={() => toggleCategory(String(category.id))}
                    >
                      <td className="px-4 py-6 text-center">
                        <span className={`material-symbols-outlined text-[#717a6d] transition-transform duration-200 ${expandedCategories.has(String(category.id)) ? 'rotate-90' : ''}`}>
                          chevron_right
                        </span>
                      </td>
                      <td className="px-4 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#f5f5f0] flex-shrink-0">
                            {category.image ? (
                              <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/category-placeholder.jpg';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: `${category.color}20` }}>
                                <span className="material-symbols-outlined" style={{ color: category.color }}>category</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-[#1a1c19]">{category.name}</p>
                            <p className="text-xs text-[#41493e]">{category.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-semibold text-[#41493e]">{category.productCount} SKUs</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                          <span className="text-xs font-bold text-[#047852] uppercase tracking-tighter">{category.status}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm text-[#41493e]">{category.lastUpdated}</p>
                        <p className="text-[10px] text-[#717a6d]">14:22 GMT</p>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenModal(category);
                            }}
                            className="p-2 text-[#717a6d] hover:text-[#00450d] hover:bg-[#dcfce7] rounded-lg transition-all"
                          >
                            <span className="material-symbols-outlined text-xl">edit</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(category.id);
                            }}
                            className="p-2 text-[#717a6d] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <span className="material-symbols-outlined text-xl">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Subcategories Row */}
                    {expandedCategories.has(String(category.id)) && (
                      <tr className="bg-[#f5f5f0]/30">
                        <td colSpan={6} className="p-0">
                          <div className="pl-20 pr-8">
                            <table className="w-full border-l-2 border-[#86efac] my-2">
                              <tbody className="divide-y divide-[#f5f5f0]">
                                {category.subcategories && category.subcategories.length > 0 ? (
                                  category.subcategories.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-white transition-colors">
                                      <td className="py-4 pl-6 text-sm">
                                        <div className="flex items-center gap-3">
                                          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>
                                          <span className="font-medium text-[#1a1c19]">{sub.name}</span>
                                        </div>
                                      </td>
                                      <td className="py-4 text-xs font-semibold text-[#41493e]">{sub.items} Items</td>
                                      <td className="py-4 text-xs text-[#717a6d]">Ref: {sub.ref}</td>
                                      <td className="py-4 text-right">
                                        <button className="text-[#717a6d] hover:text-[#00450d] p-1">
                                          <span className="material-symbols-outlined text-lg">edit</span>
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan={4} className="py-4 pl-6 italic text-xs text-[#717a6d]">
                                      No subcategories - Click "Add New" to create subcategories
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination/Footer */}
        <div className="p-6 border-t border-[#f5f5f0] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#717a6d] font-medium">Showing {categories.length} of {categories.length} core categories in system</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-[#e3e3de] rounded-lg text-xs font-bold text-[#717a6d] cursor-not-allowed">Previous</button>
            <button className="px-4 py-1.5 bg-[#dcfce7] text-[#047852] rounded-lg text-xs font-bold border border-[#86efac]">1</button>
            <button className="px-3 py-1.5 border border-[#e3e3de] rounded-lg text-xs font-bold text-[#41493e] hover:bg-[#f5f5f0] transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Contextual Footer */}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] bg-[#2f312e]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-8 border-b border-[#c0c9bb]/10 flex justify-between items-start">
              <div>
                <label className="text-[10px] font-bold tracking-[0.2em] text-[#503600] uppercase mb-1 block">
                  {formData.isSubcategory ? 'Sub-Category Shell' : 'Inventory Shell'}
                </label>
                <h3 className="text-2xl font-bold tracking-tight text-[#00450d]">
                  {formData.isSubcategory ? 'Add New Sub-category' : (editingCategory ? 'Edit Category' : 'Add New Category')}
                </h3>
                <p className="text-xs text-[#41493e] mt-1">
                  {formData.isSubcategory 
                    ? 'Expanding the global catalog with a new curated node.' 
                    : 'Define a new curated collection for the editorial marketplace.'}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-[#f4f4ef] rounded-full transition-colors group"
              >
                <span className="material-symbols-outlined text-[#41493e] group-hover:text-[#00450d]">close</span>
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto">
              {/* Grid Layout for Fields */}
              <div className="grid grid-cols-2 gap-6">
                {/* Category Type Toggle */}
                <div className="col-span-2">
                  <label className="text-[11px] font-bold tracking-wider text-[#41493e] uppercase mb-2 block">Category Type</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="categoryType"
                        checked={!formData.isSubcategory}
                        onChange={() => {
                          setFormData({ ...formData, isSubcategory: false, parentId: '' });
                          setShowSubcategoryToggle(false);
                        }}
                        disabled={saving}
                        className="w-4 h-4 text-[#00450d]"
                      />
                      <span className="text-sm font-medium text-[#1a1c19]">Parent Category</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="categoryType"
                        checked={formData.isSubcategory}
                        onChange={() => {
                          setFormData({ ...formData, isSubcategory: true });
                          setShowSubcategoryToggle(true);
                        }}
                        disabled={saving}
                        className="w-4 h-4 text-[#00450d]"
                      />
                      <span className="text-sm font-medium text-[#1a1c19]">Sub-category</span>
                    </label>
                  </div>
                </div>

                {/* Parent Category Dropdown (only for subcategories) */}
                {showSubcategoryToggle && (
                  <div className="col-span-2">
                    <label className="text-[11px] font-bold tracking-wider text-[#41493e] uppercase mb-2 block">Parent Category</label>
                    <div className="relative">
                      <select
                        value={formData.parentId}
                        onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                        required={formData.isSubcategory}
                        disabled={saving}
                        className="w-full bg-[#f4f4ef] border-b-2 border-[#717a6d]/30 border-t-0 border-x-0 py-3 px-0 focus:ring-0 focus:border-[#00450d] text-sm font-medium transition-colors appearance-none"
                      >
                        <option value="">Select a parent category</option>
                        {categories.filter(c => !c.parentId && !c.isSubcategory).map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#717a6d]">expand_more</span>
                    </div>
                  </div>
                )}

                {/* Category Name */}
                <div className="col-span-2">
                  <label className="text-[11px] font-bold tracking-wider text-[#41493e] uppercase mb-2 block">
                    {formData.isSubcategory ? 'Sub-category Name' : 'Category Name'}
                  </label>
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#f4f4ef] border-b-2 border-[#717a6d]/30 border-t-0 border-x-0 py-3 px-0 focus:ring-0 focus:border-[#00450d] text-sm font-medium transition-colors"
                    placeholder={formData.isSubcategory ? "e.g. Heirloom Grains" : "e.g. Rice & Spices"}
                    type="text"
                    required
                    disabled={saving}
                  />
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="text-[11px] font-bold tracking-wider text-[#41493e] uppercase mb-2 block">
                    {formData.isSubcategory ? 'Editorial Description' : 'Description'}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#f4f4ef] border-b-2 border-[#717a6d]/30 border-t-0 border-x-0 py-3 px-0 focus:ring-0 focus:border-[#00450d] text-sm font-medium transition-colors resize-none"
                    placeholder={formData.isSubcategory ? "Describe the characteristics of this harvest sub-set..." : "Describe the essence of this category..."}
                    rows={3}
                    required
                    disabled={saving}
                  />
                </div>

                {/* Category Image Upload */}
                <div className="col-span-2">
                  <label className="text-[11px] font-bold tracking-wider text-[#41493e] uppercase mb-2 block">Category Image</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-square flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#717a6d]/30 bg-[#f4f4ef] text-[#717a6d] hover:border-[#00450d] hover:text-[#00450d] transition-all cursor-pointer relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading || saving}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <span className="material-symbols-outlined text-2xl mb-2">{uploading ? 'cloud_upload' : 'add_a_photo'}</span>
                      <p className="text-xs font-bold">Upload Image</p>
                      <p className="text-[10px] text-[#717a6d] mt-1">PNG, JPG up to 5MB</p>
                    </div>
                    {formData.image && (
                      <div className="aspect-square rounded-lg overflow-hidden border-2 border-[#00450d]">
                        <img src={formData.image} alt="Category preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Color */}
                <div className="col-span-2">
                  <label className="text-[11px] font-bold tracking-wider text-[#41493e] uppercase mb-2 block">Category Color</label>
                  <div className="grid grid-cols-8 gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        disabled={saving || uploading}
                        className={`aspect-square rounded-lg border-2 transition-all ${
                          formData.color === color
                            ? 'border-[#00450d] bg-[#00450d]/5'
                            : 'border-transparent bg-[#f4f4ef] hover:border-[#717a6d]'
                        }`}
                        style={{ backgroundColor: formData.color === color ? color : undefined }}
                      />
                    ))}
                  </div>
                </div>

                {/* Status Toggle */}
                <div className="col-span-2 flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-bold text-[#1a1c19]">Publish Status</p>
                    <p className="text-xs text-[#41493e]">Immediate availability in global catalog</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#e3e3de] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00450d]"></div>
                  </label>
                </div>
              </div>
            </form>

            {/* Modal Actions */}
            <div className="p-8 bg-[#f4f4ef] flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={saving || uploading}
                className="px-6 py-3 text-sm font-bold text-[#00450d] hover:bg-[#e3e3de] transition-all rounded-md disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  const form = e.currentTarget.closest('form');
                  if (form) form.requestSubmit();
                }}
                disabled={saving || uploading}
                className="px-8 py-3 bg-[#00450d] text-white text-sm font-bold rounded-md shadow-lg hover:bg-[#0c5216] transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <span>{saving || uploading ? 'Creating...' : (formData.isSubcategory ? 'Create Sub-category' : (editingCategory ? 'Update' : 'Create Category'))}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
