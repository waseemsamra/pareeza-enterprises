import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  categoryId?: number;
  description: string;
  image: string;
  sku: string;
  origin: string;
  status: string;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: '',
    subcategory: '',
    categoryId: 0,
    description: '',
    image: '',
    sku: '',
    origin: '',
    status: 'In Stock'
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const API_URL = 'https://euwheigeak.execute-api.us-east-1.amazonaws.com/prod';
      const response = await fetch(`${API_URL}/categories`);

      if (response.ok) {
        const data = await response.json();
        const transformedCategories = data.map((cat: any) => ({
          id: cat.id || cat.PK?.replace('CATEGORY#', ''),
          name: cat.name || cat.data?.name || 'Category'
        }));
        setCategories(transformedCategories);
      } else {
        setCategories([
          { id: 1, name: 'Grains' },
          { id: 2, name: 'Produce' },
          { id: 3, name: 'Protein' },
          { id: 4, name: 'Dairy' }
        ]);
      }
    } catch (error: any) {
      console.error('Error loading categories:', error);
      setCategories([
        { id: 1, name: 'Grains' },
        { id: 2, name: 'Produce' },
        { id: 3, name: 'Protein' },
        { id: 4, name: 'Dairy' }
      ]);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const API_URL = 'https://euwheigeak.execute-api.us-east-1.amazonaws.com/prod';
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      
      const transformedProducts = data.map((item: any) => ({
        ...item,
        sku: item.sku || `PRD-${String(item.id).padStart(3, '0')}`,
        origin: item.origin || 'Unknown',
        status: item.stock > 10 ? 'In Stock' : item.stock > 0 ? 'Low Stock' : 'Out of Stock'
      }));
      
      setProducts(transformedProducts);
      toast.success('Products loaded!');
    } catch (error: any) {
      console.error('Error loading products:', error);
      // Fallback data
      setProducts([
        { id: 1, name: 'Aged Basmati', price: 12.99, category: 'Grains', description: 'Premium Long Grain', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAyP5yAgc39yK5epsxGLJ4DV0DJU7oBEyeqw9bawdJ94Qw7QvuPkBortcjllJ9GcxDkyNDE3CY_SSvrgaIqw_2p3HNC8YBv7rRqMsoy4rqCBm6nPPHUZARAdkmvQeWfOWGX2pXos93E5fQR2p4qPR7Ahum9AyC11xeYLEYvhg-ny5gGuySpvyQfQmOPSqXVqbQ98SP4wQ9SLVrPmEPOTmRuEkwSinbCBvsXcMKul9muh-_IhsdR7rg_MxDe36mwavBHl6VrhgcZ34z', sku: 'GRA-BAS-001', origin: 'Punjab, India', status: 'In Stock' },
        { id: 2, name: 'Hass Avocados', price: 8.99, category: 'Produce', description: 'Organic Grade A', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLx_aCyhCUxoS0efnv_lpABYOjuMJbK_QkbTXxJS6lMbYyorZpewPlUesn1Dv-GNLC510gkDouc7Ifj-OBAxEh9byZlSASJpOdYI2VtB8pBSJkSRPYJsg-0Nb_6KV7k3yMHkQ9s73UVgryVw8W0WGm9HZ92CZQoAWJOQFK6d24xkEDSI30Mw9rWroH87wMij8QxTkvWycIzby47gsjuIrMGgGHr3NH1S8oUHruahZzDuFMFC7UMLKVb0ukDOtqZzwamOF9Q-riKr2_', sku: 'FRU-AVO-293', origin: 'Michoacán, MX', status: 'Low Stock' },
        { id: 3, name: 'Wagyu Beef', price: 89.99, category: 'Protein', description: 'A5 Miyazaki Grade', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhKGT5YBgEUh4EXaXIRNBaBRCKxPyaBILZ1J_ViAkSiAuxAfCCPuqfRzU5_gaS46a1s4dpRHB_jK12iJ9s3AWMnyrUDJxmZ3BmsBiwNwMsjdWUTNKv2J0yRsU-HGkGQyh9bSmzw4E9vt_ATPsZ5SygztQLvHHWZHh2HyoGsEUoJmsOEmKyZjCw4v3ZPEinAwdvgD6qKxhY0nFKxsvRNFLzPkfsesjq7hNR04LLyPHkRAGDMDe0LXHrevbNinin3iTwIR37XH9hkZx6', sku: 'PRT-WAG-012', origin: 'Kyushu, JP', status: 'In Stock' }
      ]);
      toast.success('Showing sample products');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        subcategory: (product as any).subcategory || '',
        categoryId: product.categoryId || 0,
        description: product.description,
        image: product.image,
        sku: product.sku,
        origin: product.origin,
        status: product.status
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: 0,
        category: '',
        subcategory: '',
        categoryId: 0,
        description: '',
        image: '',
        sku: '',
        origin: '',
        status: 'In Stock'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: 0,
      category: '',
      subcategory: '',
      categoryId: 0,
      description: '',
      image: '',
      sku: '',
      origin: '',
      status: 'In Stock'
    });
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
      const result = await s3Service.uploadImage(file, 'products');

      if (result.success && result.url) {
        setFormData({ ...formData, image: result.url });
        toast.success('Product image uploaded to S3!');
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
    
    try {
      const token = localStorage.getItem('idToken');
      const headers = {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      };

      if (editingProduct) {
        const response = await fetch(`https://euwheigeak.execute-api.us-east-1.amazonaws.com/prod/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          toast.success('Product updated successfully!');
          loadProducts();
          handleCloseModal();
        } else {
          toast.error('Failed to update product');
        }
      } else {
        const response = await fetch('https://euwheigeak.execute-api.us-east-1.amazonaws.com/prod/products', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          toast.success('Product created successfully!');
          loadProducts();
          handleCloseModal();
        } else {
          toast.error('Failed to create product');
        }
      }
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('idToken');
      const response = await fetch(`https://euwheigeak.execute-api.us-east-1.amazonaws.com/prod/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });

      if (response.ok) {
        toast.success('Product deleted successfully!');
        loadProducts();
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-emerald-100 text-emerald-800';
      case 'Low Stock': return 'bg-amber-100 text-amber-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalInventory = products.length;
  const activeExports = products.filter(p => p.status === 'In Stock').length;
  const qualityAlerts = products.filter(p => p.status === 'Out of Stock').length;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary">Pareeza Enterprises</h1>
          <p className="text-[#7a5649] font-medium italic">Curating the world's finest harvest for global distribution.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white font-bold rounded-lg shadow-xl shadow-primary/10 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
          <span>New Product</span>
        </button>
      </div>

      {/* Stats Overview - Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2 bg-[#f4f4ef] p-6 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#41493e] mb-1">Total Curated Inventory</p>
            <h3 className="text-3xl font-bold text-[#1a1c19]">{totalInventory.toLocaleString()} <span className="text-sm font-normal text-[#10b981]">+12%</span></h3>
          </div>
          <div className="p-4 bg-[#dcfce7] rounded-full">
            <span className="material-symbols-outlined text-[#047852] text-3xl">inventory_2</span>
          </div>
        </div>
        <div className="bg-[#f4f4ef] p-6 rounded-xl">
          <p className="text-[10px] uppercase tracking-widest text-[#41493e] mb-1">Active Exports</p>
          <h3 className="text-3xl font-bold text-[#1a1c19]">{activeExports}</h3>
          <div className="mt-2 flex items-center gap-1 text-[#503600]">
            <span className="material-symbols-outlined text-xs">public</span>
            <span className="text-xs font-semibold">Global Reach</span>
          </div>
        </div>
        <div className="bg-[#f4f4ef] p-6 rounded-xl">
          <p className="text-[10px] uppercase tracking-widest text-[#41493e] mb-1">Quality Alerts</p>
          <h3 className="text-3xl font-bold text-[#ba1a1a]">{qualityAlerts}</h3>
          <p className="text-xs text-[#41493e] mt-2">Requires immediate attention</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 py-4 px-6 bg-[#eeeee9] rounded-xl">
        <div className="flex items-center gap-2 text-[#41493e] font-bold text-xs uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm">filter_alt</span>
          <span>Filters</span>
        </div>
        <div className="h-6 w-[1px] bg-[#d6d3cd]"></div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-transparent border-none focus:ring-0 text-sm font-semibold text-[#1a1c19] cursor-pointer hover:text-primary transition-colors"
        >
          <option>All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-transparent border-none focus:ring-0 text-sm font-semibold text-[#1a1c19] cursor-pointer hover:text-primary transition-colors"
        >
          <option>All</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-[#41493e]">View:</span>
          <button className="p-2 text-primary bg-white rounded shadow-sm">
            <span className="material-symbols-outlined">list</span>
          </button>
          <button className="p-2 text-[#41493e] hover:text-primary transition-colors">
            <span className="material-symbols-outlined">grid_view</span>
          </button>
        </div>
      </div>

      {/* Product Table */}
      {loading ? (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-4xl text-[#717a6d] animate-spin">progress_activity</span>
          <p className="mt-4 text-[#41493e]">Loading products...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#e8e8e3]/30">
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-[#41493e] w-24">Thumbnail</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-[#41493e]">Product Name</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-[#41493e]">Category</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-[#41493e]">SKU</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-[#41493e]">Origin</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-[#41493e]">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-[#41493e] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f5f0]">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="group hover:bg-[#f5f5f0] transition-colors duration-200">
                  <td className="px-6 py-4">
                    <img
                      alt={product.name}
                      className="w-16 h-12 object-cover rounded-md bg-[#f5f5f0]"
                      src={product.image || '/product-placeholder.jpg'}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#1a1c19]">{product.name}</div>
                    <div className="text-[10px] text-[#41493e]">{product.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold px-2 py-1 bg-[#f5f5f0] text-[#41493e] rounded">{product.category}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-[#41493e]">{product.sku}</td>
                  <td className="px-6 py-4 text-xs font-medium text-[#1a1c19]">{product.origin}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="p-2 text-[#717a6d] hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
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

          {/* Pagination Footer */}
          <div className="px-6 py-4 bg-[#f5f5f0] flex items-center justify-between border-t border-[#f5f5f0]">
            <p className="text-xs text-[#41493e] font-medium">
              Showing <span className="text-[#1a1c19]">1-{Math.min(3, filteredProducts.length)}</span> of <span className="text-[#1a1c19]">{filteredProducts.length}</span> products
            </p>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#41493e] hover:bg-[#e3e3de] transition-colors">
                <span className="material-symbols-outlined text-xl">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#1a1c19] hover:bg-[#e3e3de] text-xs font-semibold transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#1a1c19] hover:bg-[#e3e3de] text-xs font-semibold transition-colors">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#41493e] hover:bg-[#e3e3de] transition-colors">
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Logistics Status Indicator */}
      <div className="bg-[#2f312e] p-6 rounded-xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#6e4b00] rounded-full flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
          </div>
          <div>
            <h4 className="font-bold text-lg">Global Logistics Status</h4>
            <p className="text-xs text-[#717a6d]">Real-time update on trans-continental shipping lanes</p>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="text-center">
            <p className="text-[10px] uppercase text-[#717a6d] tracking-widest mb-1">Pacific Route</p>
            <p className="text-sm font-bold text-[#10b981]">OPTIMAL</p>
          </div>
          <div className="text-center border-l border-white/10 pl-8">
            <p className="text-[10px] uppercase text-[#717a6d] tracking-widest mb-1">Atlantic Hubs</p>
            <p className="text-sm font-bold text-[#ffdeac]">MODERATE DELAY</p>
          </div>
          <div className="text-center border-l border-white/10 pl-8">
            <p className="text-[10px] uppercase text-[#717a6d] tracking-widest mb-1">Cold Chain Integ.</p>
            <p className="text-sm font-bold text-[#10b981]">99.8%</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#e3e3de]">
              <h3 className="text-xl font-bold text-[#1a1c19]">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#41493e] mb-1">Product Image</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="flex-1 text-sm"
                  />
                  <button type="button" disabled={uploading} className="px-4 py-2 border border-[#e3e3de] rounded-lg text-xs font-bold hover:bg-[#f5f5f0] transition-colors">
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
                {formData.image && (
                  <div className="mt-2">
                    <img src={formData.image} alt="Product" className="w-full max-w-xs h-32 object-cover rounded-lg border" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#41493e] mb-1">Product Name</label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Aged Basmati"
                  required
                  className="w-full px-3 py-2 border border-[#e3e3de] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#41493e] mb-1">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-3 py-2 border border-[#e3e3de] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#41493e] mb-1">SKU</label>
                  <input
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="e.g., GRA-BAS-001"
                    required
                    className="w-full px-3 py-2 border border-[#e3e3de] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#41493e] mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-[#e3e3de] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#41493e] mb-1">Origin</label>
                  <input
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="e.g., Punjab, India"
                    required
                    className="w-full px-3 py-2 border border-[#e3e3de] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#41493e] mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe this product..."
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-[#e3e3de] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#41493e] mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-[#e3e3de] rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option>In Stock</option>
                  <option>Low Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all"
                >
                  {editingProduct ? 'Update' : 'Create'} Product
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 border border-[#e3e3de] rounded-xl font-bold hover:bg-[#f5f5f0] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
