import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import S3Service from '../lib/S3Service';

const API_URL = 'https://euwheigeak.execute-api.us-east-1.amazonaws.com/prod';

export interface HeroSlide {
  id: string;
  headline: string;  // Maps to 'title' in backend
  description: string;  // Maps to 'subtitle' in backend
  tagline: string;
  button1Text: string;  // Maps to 'buttonText' in backend
  button1Link: string;  // Maps to 'buttonLink' in backend
  button2Text: string;
  button2Link: string;
  imageUrl: string;  // Maps to 'image' in backend
  s3Key?: string;
  isActive: boolean;
  order: number;
}

interface HeroSliderManagerProps {
  onSlideChange?: (slides: HeroSlide[]) => void;
}

const HeroSliderManager: React.FC<HeroSliderManagerProps> = ({ onSlideChange }) => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [activeSlideId, setActiveSlideId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sliderSettings, setSliderSettings] = useState({
    duration: 5000,
    transition: 'ken-burns'
  });

  // Load slides from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('agrofeed_hero_slides');
    const storedSettings = localStorage.getItem('agrofeed_hero_settings');
    
    if (storedSettings) {
      try {
        const settings = JSON.parse(storedSettings);
        setSliderSettings(settings);
      } catch (error) {
        console.error('Error loading slider settings:', error);
      }
    }
    
    if (stored) {
      let parsedSlides = JSON.parse(stored);
      
      // Ensure only ONE slide is active
      const activeSlides = parsedSlides.filter((s: HeroSlide) => s.isActive);
      if (activeSlides.length > 1) {
        // Deactivate all but the first active slide
        parsedSlides = parsedSlides.map((slide: HeroSlide) => {
          if (activeSlides[0].id === slide.id) {
            return { ...slide, isActive: true };
          }
          return { ...slide, isActive: false };
        });
        localStorage.setItem('agrofeed_hero_slides', JSON.stringify(parsedSlides));
      }
      
      setSlides(parsedSlides);
      if (parsedSlides.length > 0 && !activeSlideId) {
        const firstActive = parsedSlides.find((s: HeroSlide) => s.isActive) || parsedSlides[0];
        setActiveSlideId(firstActive.id);
      }
    } else {
      // Default slide
      const defaultSlide: HeroSlide = {
        id: 'slide-1',
        headline: 'Nurturing the Global Harvest.',
        description: 'We bridge the distance between origin and table through sophisticated logistics and uncompromising standards of agricultural curation.',
        tagline: 'Established 1984 — Global Curators',
        button1Text: 'View Portfolios',
        button1Link: '/products',
        button2Text: 'Our Reach',
        button2Link: '/about',
        imageUrl: '',
        isActive: true,
        order: 1
      };
      setSlides([defaultSlide]);
      setActiveSlideId('slide-1');
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever slides change
  useEffect(() => {
    if (slides.length > 0 && !loading) {
      localStorage.setItem('agrofeed_hero_slides', JSON.stringify(slides));
      if (onSlideChange) {
        onSlideChange(slides);
      }
    }
  }, [slides, loading]);

  // Save to backend API (DynamoDB) - NO localStorage
  const saveToBackend = async (slidesToSave: HeroSlide[]) => {
    try {
      const token = localStorage.getItem('idToken');

      console.log('📊 Slides to save:', slidesToSave);
      console.log('📊 First slide image:', slidesToSave[0]?.imageUrl);
      console.log('📊 First slide s3Key:', slidesToSave[0]?.s3Key);

      // Format for backend
      const backendData = {
        PK: 'hero',
        SK: 'content',
        type: 'cms',
        slides: slidesToSave.map(slide => ({
          id: slide.id,
          headline: slide.headline,
          description: slide.description,
          tagline: slide.tagline,
          button1Text: slide.button1Text,
          button1Link: slide.button1Link,
          button2Text: slide.button2Text,
          button2Link: slide.button2Link,
          imageUrl: slide.imageUrl || '',
          s3Key: slide.s3Key || '',
          isActive: slide.isActive,
          order: slide.order
        })),
        updatedAt: new Date().toISOString()
      };

      console.log('💾 Saving to backend API:', backendData);
      
      const response = await fetch(`${API_URL}/cms/hero`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(backendData)
      });

      if (response.ok) {
        await response.json();
        console.log('✅ Saved to backend successfully!');
        toast.success('Hero slides saved to backend!', {
          description: 'Changes are live on the website.'
        });
        return true;
      } else {
        const error = await response.text();
        console.error('❌ Backend save failed:', response.status, error);
        toast.error('Failed to save to backend', {
          description: 'Check API configuration'
        });
        return false;
      }
    } catch (error: any) {
      console.error('❌ Backend save error:', error);
      toast.error('Save failed', {
        description: error.message || 'Network error'
      });
      return false;
    }
  };

  // Handle image upload for a slide
  const handleImageUpload = async (slideId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('📷 Starting upload for slide:', slideId, 'File:', file.name);

    // Validate file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type', {
        description: 'Please upload JPEG, PNG, GIF, or WebP images only.'
      });
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File too large', {
        description: 'Maximum file size is 5MB.'
      });
      return;
    }

    setUploadingId(slideId);

    try {
      console.log('⬆️ Uploading to S3, folder: public/hero');
      // Upload to S3 - Amplify adds 'public/' prefix automatically, so we use 'public/hero'
      const result = await S3Service.uploadImage(file, 'public/hero');

      console.log('✅ Upload success! URL:', result.url);
      console.log('🔑 S3 Key:', result.key);

      // Update slide with new image URL
      const updatedSlides = slides.map(slide =>
        slide.id === slideId
          ? { ...slide, imageUrl: result.url, s3Key: result.key }
          : slide
      );

      console.log('💾 Saving to backend API...');
      setSlides(updatedSlides);
      
      // Save to backend API (NOT localStorage)
      await saveToBackend(updatedSlides);

      toast.success('Hero image uploaded and saved!', {
        description: `Image uploaded to S3: hero/${file.name}`
      });
    } catch (error: any) {
      console.error('❌ Upload error:', error);
      toast.error('Upload failed', {
        description: error.message || 'An error occurred during upload.'
      });
    } finally {
      setUploadingId(null);
      event.target.value = '';
    }
  };

  // Add new slide
  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      id: `slide-${Date.now()}`,
      headline: 'New Hero Slide',
      description: 'Add your description here',
      tagline: 'Tagline',
      button1Text: 'Learn More',
      button1Link: '/products',
      button2Text: 'Contact',
      button2Link: '/contact',
      imageUrl: '',
      isActive: true,
      order: slides.length + 1
    };

    const updatedSlides = [...slides, newSlide];
    setSlides(updatedSlides);
    setActiveSlideId(newSlide.id);

    // Save to backend API (NOT localStorage)
    saveToBackend(updatedSlides);

    toast.success('New slide added', {
      description: 'Configure the slide content and upload an image.'
    });
  };

  // Delete slide
  const handleDeleteSlide = (slideId: string) => {
    if (slides.length === 1) {
      toast.error('Cannot delete', {
        description: 'You must have at least one hero slide.'
      });
      return;
    }

    const updatedSlides = slides.filter(s => s.id !== slideId);
    setSlides(updatedSlides);
    
    if (activeSlideId === slideId) {
      setActiveSlideId(updatedSlides[0].id);
    }
    
    toast.success('Slide deleted');
  };

  // Update slide content and auto-save
  const handleUpdateSlide = (slideId: string, updates: Partial<HeroSlide>) => {
    const updatedSlides = slides.map(slide =>
      slide.id === slideId ? { ...slide, ...updates } : slide
    );
    setSlides(updatedSlides);
    
    console.log('✏️ Slide updated locally:', updates);
    console.log('💡 Click "Save All" button to save changes to backend');
  };

  // Manual save button handler
  const handleSaveAll = async () => {
    console.log('💾 Saving all slides to backend...');
    const success = await saveToBackend(slides);
    if (success) {
      console.log('✅ All slides saved!');
      toast.success('All changes saved!', {
        description: 'Refresh homepage to see updates.'
      });
    }
  };

  // Move slide order
  const handleMoveSlide = (slideId: string, direction: 'up' | 'down') => {
    const index = slides.findIndex(s => s.id === slideId);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === slides.length - 1)
    ) {
      return;
    }

    const updatedSlides = [...slides];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [updatedSlides[index], updatedSlides[newIndex]] = [updatedSlides[newIndex], updatedSlides[index]];
    
    updatedSlides.forEach((slide, i) => {
      slide.order = i + 1;
    });
    
    setSlides(updatedSlides);
  };

  // Toggle slide active status - ensure only one slide is active at a time
  const handleToggleActive = (slideId: string) => {
    // If we're deactivating the last active slide, don't allow it
    const activeSlides = slides.filter(s => s.isActive);
    const targetSlide = slides.find(s => s.id === slideId);
    
    if (targetSlide?.isActive && activeSlides.length === 1) {
      toast.error('Cannot deactivate', {
        description: 'At least one slide must be active.'
      });
      return;
    }
    
    const updatedSlides = slides.map(slide => 
      slide.id === slideId 
        ? { ...slide, isActive: !slide.isActive } 
        : slide
    );
    setSlides(updatedSlides);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <span className="material-symbols-outlined animate-spin text-[#00450d]">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-dark">Hero Slider Management</h3>
          <p className="text-xs text-muted-foreground">
            Manage multiple hero slides. Currently {slides.length} slide{slides.length !== 1 ? 's' : ''} configured.
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
            onClick={handleAddSlide}
            className="flex items-center gap-2 px-4 py-2 bg-[#00450d] text-white text-xs rounded-lg hover:bg-[#0c5216] transition-colors"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add Slide
          </button>
        </div>
      </div>

      {/* Slides List */}
      <div className="space-y-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`border rounded-lg p-4 transition-all ${
              activeSlideId === slide.id ? 'border-[#00450d] bg-green-50' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Slide Thumbnail */}
              <div className="w-48 h-28 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                {slide.imageUrl ? (
                  <img
                    src={slide.imageUrl}
                    alt={slide.headline}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                    <div className="text-center">
                      <span className="material-symbols-outlined text-4xl">image</span>
                      <p className="text-[10px] mt-1">No image</p>
                    </div>
                  </div>
                )}
                {slide.isActive && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded uppercase">
                    Active
                  </div>
                )}
              </div>

              {/* Slide Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Slide {index + 1}
                    </span>
                    <span className="text-[10px] text-gray-400">#{slide.id.split('-')[1]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveSlide(slide.id, 'up')}
                      disabled={index === 0}
                      className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                      title="Move up"
                    >
                      <span className="material-symbols-outlined text-sm">arrow_upward</span>
                    </button>
                    <button
                      onClick={() => handleMoveSlide(slide.id, 'down')}
                      disabled={index === slides.length - 1}
                      className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                      title="Move down"
                    >
                      <span className="material-symbols-outlined text-sm">arrow_downward</span>
                    </button>
                    <button
                      onClick={() => setActiveSlideId(slide.id)}
                      className="p-1 hover:bg-gray-200 rounded"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button
                      onClick={() => handleToggleActive(slide.id)}
                      className={`p-1 rounded ${slide.isActive ? 'text-green-600 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-100'}`}
                      title={slide.isActive ? 'Deactivate' : 'Activate'}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {slide.isActive ? 'visibility' : 'visibility_off'}
                      </span>
                    </button>
                    <button
                      onClick={() => handleDeleteSlide(slide.id)}
                      className="p-1 hover:bg-red-100 text-red-600 rounded"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>

                {/* Headline Preview */}
                <div className="text-xs font-semibold text-gray-700 truncate">
                  {slide.headline || 'No headline'}
                </div>

                {/* Tagline Preview */}
                <div className="text-[10px] text-gray-500 italic">
                  {slide.tagline || 'No tagline'}
                </div>

                {/* Image Upload */}
                <div className="flex items-center gap-2 pt-2">
                  <label className="flex items-center gap-2 px-3 py-1.5 bg-[#00450d] text-white text-[10px] rounded-lg cursor-pointer hover:bg-[#0c5216] transition-colors">
                    <span className="material-symbols-outlined text-sm">cloud_upload</span>
                    {uploadingId === slide.id ? 'Uploading...' : 'Upload Image'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(slide.id, e)}
                      disabled={uploadingId === slide.id}
                      className="hidden"
                    />
                  </label>
                  {slide.s3Key && (
                    <span className="text-[10px] text-gray-500 truncate max-w-[200px]" title={slide.s3Key}>
                      📁 {slide.s3Key.split('/').pop()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Expanded Editor */}
            {activeSlideId === slide.id && (
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide block">Tagline</label>
                  <input
                    type="text"
                    value={slide.tagline}
                    onChange={(e) => handleUpdateSlide(slide.id, { tagline: e.target.value })}
                    className="w-full text-xs border rounded px-3 py-2"
                    placeholder="Established 1984"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide block">Order</label>
                  <input
                    type="number"
                    value={slide.order}
                    onChange={(e) => handleUpdateSlide(slide.id, { order: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs border rounded px-3 py-2"
                    min="1"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide block">Main Headline</label>
                  <input
                    type="text"
                    value={slide.headline}
                    onChange={(e) => handleUpdateSlide(slide.id, { headline: e.target.value })}
                    className="w-full text-xs border rounded px-3 py-2 font-semibold"
                    placeholder="Nurturing the Global Harvest"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide block">Description</label>
                  <textarea
                    value={slide.description}
                    onChange={(e) => handleUpdateSlide(slide.id, { description: e.target.value })}
                    className="w-full text-xs border rounded px-3 py-2"
                    rows={2}
                    placeholder="We bridge the distance..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide block">Button 1 Text</label>
                  <input
                    type="text"
                    value={slide.button1Text}
                    onChange={(e) => handleUpdateSlide(slide.id, { button1Text: e.target.value })}
                    className="w-full text-xs border rounded px-3 py-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide block">Button 1 Link</label>
                  <input
                    type="text"
                    value={slide.button1Link}
                    onChange={(e) => handleUpdateSlide(slide.id, { button1Link: e.target.value })}
                    className="w-full text-xs border rounded px-3 py-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide block">Button 2 Text</label>
                  <input
                    type="text"
                    value={slide.button2Text}
                    onChange={(e) => handleUpdateSlide(slide.id, { button2Text: e.target.value })}
                    className="w-full text-xs border rounded px-3 py-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide block">Button 2 Link</label>
                  <input
                    type="text"
                    value={slide.button2Link}
                    onChange={(e) => handleUpdateSlide(slide.id, { button2Link: e.target.value })}
                    className="w-full text-xs border rounded px-3 py-2"
                  />
                </div>
                <div className="md:col-span-2 flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={slide.isActive}
                      onChange={() => handleToggleActive(slide.id)}
                      className="rounded"
                    />
                    <span className="text-xs font-medium">Active (visible on homepage)</span>
                  </label>
                  <span className="text-[10px] text-gray-500">
                    Last updated: {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-[#00450d]">{slides.length}</p>
          <p className="text-[10px] text-gray-500 uppercase">Total Slides</p>
        </div>
        <div className="bg-white border rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-600">
            {slides.filter(s => s.isActive).length}
          </p>
          <p className="text-[10px] text-gray-500 uppercase">Active Slides</p>
        </div>
        <div className="bg-white border rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">
            {slides.filter(s => s.imageUrl).length}
          </p>
          <p className="text-[10px] text-gray-500 uppercase">With Images</p>
        </div>
      </div>

      {/* Slider Settings */}
      <div className="border rounded-lg p-4 bg-white">
        <h4 className="text-sm font-bold text-dark mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00450d]">settings</span>
          Slider Settings
        </h4>
        <div className="grid grid-cols-2 gap-4">
          {/* Slide Duration */}
          <div className="space-y-2">
            <label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide block flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">speed</span>
              Slide Duration
            </label>
            <select
              value={sliderSettings.duration}
              onChange={(e) => {
                const newSettings = { ...sliderSettings, duration: parseInt(e.target.value) };
                setSliderSettings(newSettings);
                localStorage.setItem('agrofeed_hero_settings', JSON.stringify(newSettings));
              }}
              className="w-full text-xs border rounded px-3 py-2 bg-white"
            >
              <option value="3000">3 seconds (3000ms)</option>
              <option value="5000">5 seconds (5000ms)</option>
              <option value="8000">8 seconds (8000ms)</option>
              <option value="10000">10 seconds (10000ms)</option>
            </select>
          </div>

          {/* Transition Animation */}
          <div className="space-y-2">
            <label className="text-[10px] font-medium text-gray-600 uppercase tracking-wide block flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">animation</span>
              Transition
            </label>
            <select
              value={sliderSettings.transition}
              onChange={(e) => {
                const newSettings = { ...sliderSettings, transition: e.target.value };
                setSliderSettings(newSettings);
                localStorage.setItem('agrofeed_hero_settings', JSON.stringify(newSettings));
              }}
              className="w-full text-xs border rounded px-3 py-2 bg-white"
            >
              <option value="fade">Fade</option>
              <option value="ken-burns">Ken Burns</option>
              <option value="slide">Slide</option>
              <option value="zoom">Zoom</option>
            </select>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-500">
          <span className="material-symbols-outlined text-sm">info</span>
          <span>Current: {sliderSettings.duration / 1000}s duration, {sliderSettings.transition === 'ken-burns' ? 'Ken Burns' : sliderSettings.transition} transition</span>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-[10px] text-blue-800">
          <strong>ℹ️ Multiple Sliders:</strong> Create multiple slides and mark them as active to enable slider rotation on the homepage. 
          Images are stored in <code className="bg-blue-100 px-1.5 py-0.5 rounded ml-1">hero/</code> folder.
        </p>
      </div>
    </div>
  );
};

export default HeroSliderManager;
