import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { uploadPortfolioImage, savePortfolioData, fetchPortfolioData } from '../lib/portfolioService';
import type { PortfolioItem } from '../types/portfolio';

const PortfolioManager: React.FC = () => {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Load portfolios on mount
  useEffect(() => {
    loadPortfolios();
  }, []);

  const loadPortfolios = async () => {
    setLoading(true);
    const data = await fetchPortfolioData();
    setPortfolios(data);
    setLoading(false);
  };

  // Handle image upload
  const handleImageUpload = async (portfolioId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingId(portfolioId);

    try {
      const imageUrl = await uploadPortfolioImage(file);
      
      if (imageUrl) {
        const updatedPortfolios = portfolios.map(p =>
          p.id === portfolioId
            ? { ...p, imageUrl, s3Key: `public/hero/${file.name}` }
            : p
        );
        setPortfolios(updatedPortfolios);
        toast.success('Image uploaded! Click "Save All" to save changes.');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
    } finally {
      setUploadingId(null);
      event.target.value = '';
    }
  };

  // Update portfolio item
  const handleUpdatePortfolio = (portfolioId: string, updates: Partial<PortfolioItem>) => {
    const updatedPortfolios = portfolios.map(p =>
      p.id === portfolioId ? { ...p, ...updates } : p
    );
    setPortfolios(updatedPortfolios);
  };

  // Add new portfolio item
  const handleAddPortfolio = () => {
    const newPortfolio: PortfolioItem = {
      id: `portfolio-${Date.now()}`,
      title: 'New Portfolio Item',
      subtitle: 'Origin: TBD',
      description: 'Description here',
      imageUrl: '',
      s3Key: '',
      link: '/products',
      order: portfolios.length + 1,
      isActive: true
    };

    const updatedPortfolios = [...portfolios, newPortfolio];
    setPortfolios(updatedPortfolios);
    setExpandedId(newPortfolio.id);
    toast.success('New portfolio item added! Fill in the details and click "Save All".');
  };

  // Delete portfolio item
  const handleDeletePortfolio = (portfolioId: string) => {
    if (portfolios.length <= 1) {
      toast.error('Cannot delete', {
        description: 'You must have at least one portfolio item.'
      });
      return;
    }

    const updatedPortfolios = portfolios.filter(p => p.id !== portfolioId);
    setPortfolios(updatedPortfolios);
    toast.success('Portfolio item deleted. Click "Save All" to save changes.');
  };

  // Save all changes
  const handleSaveAll = async () => {
    const success = await savePortfolioData(portfolios);
    if (success) {
      console.log('✅ All portfolios saved!');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <span className="material-symbols-outlined animate-spin text-primary text-2xl">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-dark">Portfolios Management</h3>
          <p className="text-xs text-muted-foreground">
            Manage portfolio items. Currently {portfolios.length} item{portfolios.length !== 1 ? 's' : ''}.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSaveAll}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            Save All
          </button>
          <button
            onClick={handleAddPortfolio}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs rounded-lg hover:bg-[#0c5216] transition-colors"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Item
          </button>
        </div>
      </div>

      {/* Portfolio Items List */}
      <div className="space-y-4">
        {portfolios.map((portfolio, index) => (
          <div
            key={portfolio.id}
            className={`border rounded-lg p-4 transition-all ${
              expandedId === portfolio.id ? 'border-primary bg-green-50' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Image Preview */}
              <div className="w-32 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {portfolio.imageUrl ? (
                  <img
                    src={portfolio.imageUrl}
                    alt={portfolio.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="material-symbols-outlined text-2xl">image</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Item {index + 1}
                    </span>
                    {portfolio.isActive && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded uppercase">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setExpandedId(expandedId === portfolio.id ? null : portfolio.id)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {expandedId === portfolio.id ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                    <button
                      onClick={() => handleDeletePortfolio(portfolio.id)}
                      className="p-1 hover:bg-red-100 text-red-600 rounded"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>

                {/* Title */}
                <input
                  type="text"
                  value={portfolio.title}
                  onChange={(e) => handleUpdatePortfolio(portfolio.id, { title: e.target.value })}
                  className="w-full text-sm font-semibold border-b border-gray-300 focus:border-primary focus:ring-0 px-0 py-1 bg-transparent"
                  placeholder="Title"
                />

                {/* Subtitle */}
                <input
                  type="text"
                  value={portfolio.subtitle}
                  onChange={(e) => handleUpdatePortfolio(portfolio.id, { subtitle: e.target.value })}
                  className="w-full text-xs text-gray-600 border-b border-gray-300 focus:border-primary focus:ring-0 px-0 py-1 bg-transparent"
                  placeholder="Subtitle"
                />

                {/* Image Upload */}
                <div className="flex items-center gap-2 pt-2">
                  <label className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white text-[10px] rounded-lg cursor-pointer hover:bg-[#0c5216] transition-colors">
                    <span className="material-symbols-outlined text-sm">cloud_upload</span>
                    {uploadingId === portfolio.id ? 'Uploading...' : 'Upload Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(portfolio.id, e)}
                      disabled={uploadingId === portfolio.id}
                      className="hidden"
                    />
                  </label>
                  {portfolio.s3Key && (
                    <span className="text-[10px] text-gray-500 truncate max-w-[200px]" title={portfolio.s3Key}>
                      📁 {portfolio.s3Key.split('/').pop()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Expanded Editor */}
            {expandedId === portfolio.id && (
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide block">Description</label>
                  <textarea
                    value={portfolio.description}
                    onChange={(e) => handleUpdatePortfolio(portfolio.id, { description: e.target.value })}
                    className="w-full text-xs border rounded px-3 py-2"
                    rows={2}
                    placeholder="Description"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide block">Link</label>
                  <input
                    type="text"
                    value={portfolio.link}
                    onChange={(e) => handleUpdatePortfolio(portfolio.id, { link: e.target.value })}
                    className="w-full text-xs border rounded px-3 py-2"
                    placeholder="/products"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide block">Order</label>
                  <input
                    type="number"
                    value={portfolio.order}
                    onChange={(e) => handleUpdatePortfolio(portfolio.id, { order: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs border rounded px-3 py-2"
                    min="1"
                  />
                </div>
                <div className="space-y-2 flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={portfolio.isActive}
                      onChange={(e) => handleUpdatePortfolio(portfolio.id, { isActive: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-xs font-medium">Active (display on homepage)</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>ℹ️ Note:</strong> Portfolio images are stored in the same folder as hero images (<code className="bg-blue-100 px-2 py-1 rounded">public/hero/</code>). 
          After making changes, click <strong>"Save All"</strong> to save to the backend.
        </p>
      </div>
    </div>
  );
};

export default PortfolioManager;
