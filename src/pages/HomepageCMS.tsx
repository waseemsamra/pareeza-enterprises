import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { fetchHeroData, saveHeroData, uploadHeroImage } from '../lib/heroService';
import HeroSliderManager from '../components/HeroSliderManager';
import PortfolioManager from '../components/PortfolioManager';

const HomepageCMS = () => {
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    headline: '',
    description: '',
    tagline: '',
    button1Text: '',
    button1Link: '',
    button2Text: '',
    button2Link: '',
    imageUrl: ''
  });

  useEffect(() => {
    loadHeroData();
  }, []);

  const loadHeroData = async () => {
    setLoading(true);
    const data = await fetchHeroData();
    if (data) {
      setFormData({
        headline: data.headline,
        description: data.description,
        tagline: data.tagline,
        button1Text: data.button1Text,
        button1Link: data.button1Link,
        button2Text: data.button2Text,
        button2Link: data.button2Link,
        imageUrl: data.imageUrl
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    const success = await saveHeroData(formData);
    if (success) {
      toast.success('Hero section saved!', {
        description: 'Changes have been published to the homepage.'
      });
    } else {
      toast.error('Failed to save', {
        description: 'Please try again.'
      });
    }
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('📷 Starting image upload...', file.name);
    setUploading(true);

    try {
      const imageUrl = await uploadHeroImage(file);
      if (imageUrl) {
        console.log('✅ Image uploaded, updating formData:', imageUrl);
        setFormData(prev => ({ ...prev, imageUrl }));
        toast.success('Hero image uploaded successfully!');
      } else {
        console.error('❌ Upload returned null URL');
        toast.error('Upload failed - no URL returned');
      }
    } catch (error: any) {
      console.error('❌ Upload error:', error);
      toast.error('Upload failed: ' + (error.message || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const handleSliderChange = (slides: any[]) => {
    console.log('📊 Slides changed:', slides.length, 'slides');
    
    // Save the first active slide as the main hero data
    const activeSlide = slides.find(s => s.isActive) || slides[0];
    if (activeSlide) {
      console.log('🔄 Updating formData with active slide:', activeSlide.headline);
      setFormData({
        headline: activeSlide.headline,
        description: activeSlide.description,
        tagline: activeSlide.tagline,
        button1Text: activeSlide.button1Text,
        button1Link: activeSlide.button1Link,
        button2Text: activeSlide.button2Text,
        button2Link: activeSlide.button2Link,
        imageUrl: activeSlide.imageUrl
      });
      
      // Auto-save to backend when slides change
      console.log('💾 Auto-saving to backend...');
      saveHeroData({
        headline: activeSlide.headline,
        description: activeSlide.description,
        tagline: activeSlide.tagline,
        button1Text: activeSlide.button1Text,
        button1Link: activeSlide.button1Link,
        button2Text: activeSlide.button2Text,
        button2Link: activeSlide.button2Link,
        imageUrl: activeSlide.imageUrl
      }).then(success => {
        if (success) {
          console.log('✅ Auto-save successful!');
        } else {
          console.log('⚠️ Auto-save failed - data saved locally only');
        }
      });
    }
  };

  return (
    <div className="w-full space-y-12">
      {/* Hero Slider Manager - S3 Upload */}
      <section className="space-y-6">
        <HeroSliderManager onSlideChange={handleSliderChange} />
      </section>

      {/* Portfolio Manager */}
      <section className="space-y-6 pt-6">
        <PortfolioManager />
      </section>

      {/* Section Reordering & Management */}
      <section className="space-y-6 pt-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-3xl font-bold tracking-tight text-[#00450d]">Content Sequence</h3>
            <p className="text-sm text-[#717a6d]">Drag handles to reorder sections on the homepage</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-[#c0c9bb] text-[#717a6d] hover:text-[#00450d] transition-all">
              <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button className="p-2 rounded-lg border border-[#00450d] text-[#00450d] transition-all bg-[#00450d]/10">
              <span className="material-symbols-outlined">view_stream</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Section Card: About */}
          <div className="group flex items-center gap-6 p-6 bg-white rounded-2xl shadow-lg hover:translate-x-1 transition-all duration-300">
            <div className="cursor-grab active:cursor-grabbing text-[#717a6d] group-hover:text-[#00450d] transition-colors">
              <span className="material-symbols-outlined">drag_indicator</span>
            </div>
            <div className="w-24 h-16 rounded-lg overflow-hidden bg-[#eeeee9]">
              <img
                alt="About section thumbnail"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkxR15eHWyRLx8HudNm8nAgZ-1ujwX8wMW9fYl-qJw6u56ORkTnsgXP_1mi5S4B5dvFj6mVVPtsFgkcO94vrZLSuVFLVwhEj3lxAHHUjih4fhmGvkAmhnOmr_8x0YUgEgBvQi0vkedEjFmTK1DCTTda1342WJmsPPdPzZjdOdt5Rc2fqhYymFACDP_CGwsWlcn8E-u3CDeJqWsVmWgSXON8JIyNsVtQgCdCEDczPZKpdobdc6eevmWDoZPJDjWzqdy1UhgS7v_0Zzs"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h5 className="text-lg font-bold text-[#1a1c19]">The Editorial Story</h5>
                <span className="px-2 py-0.5 bg-[#dcfce7] text-[#047852] text-[10px] font-bold rounded uppercase">Active</span>
              </div>
              <p className="text-sm text-[#717a6d]">Corporate About section featuring logistics narrative and history.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-sm font-bold text-[#00450d] hover:bg-[#00450d]/10 px-3 py-2 rounded-lg transition-all">
                <span className="material-symbols-outlined text-base">edit</span>
                <span>Edit</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm font-bold text-[#7a5649] hover:bg-[#7a5649]/10 px-3 py-2 rounded-lg transition-all">
                <span className="material-symbols-outlined text-base">visibility_off</span>
                <span>Hide</span>
              </button>
            </div>
          </div>

          {/* Section Card: Featured Categories */}
          <div className="group flex items-center gap-6 p-6 bg-white rounded-2xl shadow-lg hover:translate-x-1 transition-all duration-300">
            <div className="cursor-grab active:cursor-grabbing text-[#717a6d] group-hover:text-[#00450d] transition-colors">
              <span className="material-symbols-outlined">drag_indicator</span>
            </div>
            <div className="w-24 h-16 rounded-lg overflow-hidden bg-[#eeeee9]">
              <img
                alt="Categories thumbnail"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfDHez3G4K6rY3hB5m-ZC_0xpoX6i63PujfTe3mj3iO4D4cBkqSSyl4JhbpYrhIDPxdOshJJpi5KCYvCUNIocuL4Baws2CqnjCE-8CX5yMKCAP8Tn-jeSItPVI10kwQ1LnPfg7bLAtzyZpyeCzqpsxNFlR9yt8EQ7ddJRcEX3KnhBnNdfbguxi6rZz6KcFnXh9p5knwzszS9Z50Pny6u9wat_xvSqb4B77zYOr007bhXilPjT_QIw93Bydm8HEFUigDn2xlNguggGi"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h5 className="text-lg font-bold text-[#1a1c19]">Featured Categories</h5>
                <span className="px-2 py-0.5 bg-[#dcfce7] text-[#047852] text-[10px] font-bold rounded uppercase">Active</span>
              </div>
              <p className="text-sm text-[#717a6d]">Bento grid layout showing Citrus, Root Vegetables, and Exotic Fruits.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-sm font-bold text-[#00450d] hover:bg-[#00450d]/10 px-3 py-2 rounded-lg transition-all">
                <span className="material-symbols-outlined text-base">edit</span>
                <span>Edit</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm font-bold text-[#7a5649] hover:bg-[#7a5649]/10 px-3 py-2 rounded-lg transition-all">
                <span className="material-symbols-outlined text-base">visibility_off</span>
                <span>Hide</span>
              </button>
            </div>
          </div>

          {/* Section Card: Logistics Status */}
          <div className="group flex items-center gap-6 p-6 bg-white rounded-2xl shadow-lg hover:translate-x-1 transition-all duration-300 border-l-4 border-[#503600]">
            <div className="cursor-grab active:cursor-grabbing text-[#717a6d] group-hover:text-[#503600] transition-colors">
              <span className="material-symbols-outlined">drag_indicator</span>
            </div>
            <div className="w-24 h-16 rounded-lg overflow-hidden bg-[#eeeee9] flex items-center justify-center text-[#503600]">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h5 className="text-lg font-bold text-[#1a1c19]">Global Logistics Status</h5>
                <span className="px-2 py-0.5 bg-[#6e4b00] text-white text-[10px] font-bold rounded uppercase">Draft</span>
              </div>
              <p className="text-sm text-[#717a6d]">Real-time data visualization of export routes and harvest updates.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-sm font-bold text-[#00450d] hover:bg-[#00450d]/10 px-3 py-2 rounded-lg transition-all">
                <span className="material-symbols-outlined text-base">edit</span>
                <span>Edit</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm font-bold text-[#503600] hover:bg-[#ffdeac]/30 px-3 py-2 rounded-lg transition-all">
                <span className="material-symbols-outlined text-base">publish</span>
                <span>Publish</span>
              </button>
            </div>
          </div>

          {/* Add New Section Trigger */}
          <button className="w-full py-8 border-2 border-dashed border-[#c0c9bb]/40 rounded-2xl flex flex-col items-center justify-center text-[#717a6d] hover:border-[#00450d] hover:text-[#00450d] transition-all bg-transparent group">
            <span className="material-symbols-outlined text-3xl mb-2 group-hover:scale-110 transition-transform">add_circle</span>
            <span className="font-bold text-sm uppercase tracking-widest">Add New Section</span>
          </button>
        </div>
      </section>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-4 bg-[#2f312e] text-white rounded-full shadow-2xl z-50">
        <p className="text-sm font-medium mr-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
          Unsaved changes in Hero Slider
        </p>
        <div className="h-6 w-px bg-white/20"></div>
        <button className="text-sm font-bold hover:text-white transition-colors">Discard</button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-[#00450d] hover:bg-[#1b5e20] text-white px-6 py-2 rounded-full font-bold text-sm transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save & Refresh Dashboard'}
        </button>
      </div>

      {/* Edit Slide Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 bg-[#1a1c19]/10 backdrop-blur-sm">
          <div className="bg-white w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-xl shadow-2xl flex flex-col md:flex-row border border-[#c0c9bb]/20">
            {/* Left: Preview & Status */}
            <div className="w-full md:w-5/12 bg-[#f4f4ef] p-8 border-r border-[#c0c9bb]/10 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#41493e]">Live Preview</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00450d] animate-pulse"></span>
                  <span className="text-xs font-semibold text-[#00450d]">Hero Preview</span>
                </div>
              </div>

              {/* Card Preview Container */}
              <div className="relative flex-1 rounded-lg overflow-hidden group aspect-[4/5] md:aspect-auto shadow-sm">
                <img
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={formData.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPvjVcMcAPnUfgGQ6dtsyNqw6gsKo1Kyjc1tv6pOo1v41mUmsE0QOEbN-xywroLKjD_JexyTES-l1AncWpiQqRrHAhdMRB6H170qmWK1emVCzUouJ4SZHUX20XIeLN6enbVbPjhZQZMNnV3W8gh42Cw5XqE4Mn1t8qRcBDLjs3c0M3tYyXuWNGN5OalU0WIv30ZEuvYAPsnM14PFad2-pB2GEt86eigx8D37_aKqdf79M_oWUAkkWjQnlcxp5EozTSryYooMixAcq_'}
                  alt="Hero preview"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <span className="inline-block px-2 py-1 bg-[#ffdeac] text-[#503600] text-[10px] font-bold tracking-widest uppercase mb-3 rounded-sm">{formData.tagline || 'SEASONAL SELECTION'}</span>
                  <h3 className="text-white font-bold text-2xl leading-tight mb-2">{formData.headline || 'Your Headline Here'}</h3>
                  <p className="text-white/80 text-sm line-clamp-2 mb-4">{formData.description || 'Your description text will appear here...'}</p>
                  <button className="px-5 py-2 bg-[#00450d] text-white text-xs font-bold rounded-sm inline-flex items-center gap-2">
                    {formData.button1Text || 'Learn More'}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#e3e3de]/30 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-[#1a1c19]">Active Status</label>
                  <label className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#00450d] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={true}
                      className="sr-only peer"
                    />
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition peer-checked:translate-x-1"></span>
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-[#1a1c19]">Display Order</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#41493e]">Priority #</span>
                    <span className="w-12 h-8 text-center bg-white border-none rounded-md text-sm font-bold">1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Editor Form */}
            <div className="flex-1 p-8 overflow-y-auto bg-white">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#1a1c19] tracking-tight">Edit Slide Content</h2>
                  <p className="text-sm text-[#41493e] mt-1 font-medium">Update messaging and media for the hero carousel.</p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-[#f4f4ef] rounded-full transition-colors text-[#41493e]"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-8">
                {/* Image Upload */}
                <div className="space-y-3">
                  <label className="text-xs font-bold tracking-widest uppercase text-[#41493e] block">Hero Image (S3)</label>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="w-full text-sm"
                      />
                      {uploading && (
                        <p className="text-xs text-[#00450d] mt-2 flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                          Uploading to S3...
                        </p>
                      )}
                    </div>
                    {formData.imageUrl ? (
                      <div className="w-48 h-32 rounded-lg overflow-hidden border-2 border-[#00450d] shadow-lg">
                        <img 
                          key={formData.imageUrl} 
                          src={formData.imageUrl} 
                          alt="Hero preview" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ) : (
                      <div className="w-48 h-32 rounded-lg overflow-hidden border-2 border-dashed border-[#717a6d] flex items-center justify-center bg-[#f4f4ef]">
                        <span className="text-[#717a6d] text-sm">No image uploaded</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-[#41493e] block">Tagline</label>
                    <input
                      className="w-full bg-[#f4f4ef] border-b-2 border-[#c0c9bb]/20 border-t-0 border-x-0 focus:border-[#00450d] focus:ring-0 px-4 py-3 text-lg font-bold text-[#1a1c19] placeholder:text-[#717a6d] transition-all"
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="Established 1984 — Global Curators"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-[#41493e] block">Main Headline</label>
                    <input
                      className="w-full bg-[#f4f4ef] border-b-2 border-[#c0c9bb]/20 border-t-0 border-x-0 focus:border-[#00450d] focus:ring-0 px-4 py-3 text-lg font-bold text-[#1a1c19] placeholder:text-[#717a6d] transition-all"
                      type="text"
                      value={formData.headline}
                      onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                      placeholder="Nurturing the Global Harvest"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-[#41493e] block">Description</label>
                    <textarea
                      className="w-full bg-[#f4f4ef] border-b-2 border-[#c0c9bb]/20 border-t-0 border-x-0 focus:border-[#00450d] focus:ring-0 px-4 py-3 text-sm text-[#41493e] resize-none"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="We bridge the distance between origin and table..."
                    />
                  </div>
                </div>

                {/* CTA Configuration */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-[#41493e] block">Button 1 Text</label>
                    <input
                      className="w-full bg-[#f4f4ef] border-b-2 border-[#c0c9bb]/20 border-t-0 border-x-0 focus:border-[#00450d] focus:ring-0 px-4 py-3 text-sm font-semibold text-[#1a1c19] transition-all"
                      type="text"
                      value={formData.button1Text}
                      onChange={(e) => setFormData({ ...formData, button1Text: e.target.value })}
                      placeholder="View Portfolios"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-[#41493e] block">Button 1 Link</label>
                    <div className="relative">
                      <input
                        className="w-full bg-[#f4f4ef] border-b-2 border-[#c0c9bb]/20 border-t-0 border-x-0 focus:border-[#00450d] focus:ring-0 pl-4 pr-10 py-3 text-sm text-[#41493e] transition-all"
                        type="text"
                        value={formData.button1Link}
                        onChange={(e) => setFormData({ ...formData, button1Link: e.target.value })}
                        placeholder="/products"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#717a6d] text-sm">link</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-[#41493e] block">Button 2 Text</label>
                    <input
                      className="w-full bg-[#f4f4ef] border-b-2 border-[#c0c9bb]/20 border-t-0 border-x-0 focus:border-[#00450d] focus:ring-0 px-4 py-3 text-sm font-semibold text-[#1a1c19] transition-all"
                      type="text"
                      value={formData.button2Text}
                      onChange={(e) => setFormData({ ...formData, button2Text: e.target.value })}
                      placeholder="Our Reach"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-[#41493e] block">Button 2 Link</label>
                    <div className="relative">
                      <input
                        className="w-full bg-[#f4f4ef] border-b-2 border-[#c0c9bb]/20 border-t-0 border-x-0 focus:border-[#00450d] focus:ring-0 pl-4 pr-10 py-3 text-sm text-[#41493e] transition-all"
                        type="text"
                        value={formData.button2Link}
                        onChange={(e) => setFormData({ ...formData, button2Link: e.target.value })}
                        placeholder="/about"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#717a6d] text-sm">link</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-8 border-t border-[#c0c9bb]/10 flex items-center justify-between gap-4">
                  <button
                    className="flex items-center gap-2 text-[#ba1a1a] text-xs font-bold uppercase tracking-widest px-4 py-2 hover:bg-[#ffdad6]/20 rounded-md transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                    Reset to Default
                  </button>
                  <div className="flex items-center gap-3">
                    <button
                      className="px-6 py-2.5 text-sm font-bold text-[#41493e] hover:text-[#1a1c19] transition-colors"
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || uploading}
                      className="px-8 py-2.5 bg-[#00450d] text-white text-sm font-bold rounded-md shadow-lg shadow-[#00450d]/20 flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : (
                        <>
                          Save Changes
                          <span className="material-symbols-outlined text-sm">done_all</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomepageCMS;
