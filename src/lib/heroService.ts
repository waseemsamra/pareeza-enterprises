import { toast } from 'sonner';

const API_URL = 'https://euwheigeak.execute-api.us-east-1.amazonaws.com/prod';

export interface HeroData {
  id: string;
  headline: string;
  description: string;
  tagline: string;
  button1Text: string;
  button1Link: string;
  button2Text: string;
  button2Link: string;
  imageUrl: string;
  isActive: boolean;
  updatedAt: string;
}

// Fetch Hero Data from DynamoDB via API
export const fetchHeroData = async (): Promise<HeroData | null> => {
  try {
    console.log('📡 Fetching hero data from API...');
    const response = await fetch(`${API_URL}/cms/hero`);

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Hero data fetched from API:', data);
      console.log('📊 Slides array:', data.slides);
      
      // Handle API response format (has slides array)
      if (data.slides && Array.isArray(data.slides)) {
        console.log('📊 Number of slides:', data.slides.length);
        const activeSlide = data.slides.find((s: any) => s.isActive) || data.slides[0];
        console.log('🎯 Active slide:', activeSlide);
        
        if (activeSlide) {
          let imageUrl = activeSlide.imageUrl || activeSlide.image || '';
          console.log('🖼️ Original image URL:', imageUrl);
          
          // Fix: Add 'public/' prefix if missing
          if (imageUrl && !imageUrl.includes('/public/')) {
            console.log('🔄 Fixing image URL - adding public/ prefix');
            imageUrl = imageUrl.replace('/hero/', '/public/hero/');
            console.log('🖼️ Fixed image URL:', imageUrl);
          }
          
          const heroData = {
            id: activeSlide.id || 'hero-1',
            headline: activeSlide.headline || activeSlide.title || 'Nurturing the Global Harvest.',
            description: activeSlide.description || activeSlide.subtitle || 'We bridge the distance between origin and table...',
            tagline: activeSlide.tagline || 'Established 1984 — Global Curators',
            button1Text: activeSlide.button1Text || activeSlide.buttonText || 'View Portfolios',
            button1Link: activeSlide.button1Link || activeSlide.buttonLink || '/products',
            button2Text: activeSlide.button2Text || 'Our Reach',
            button2Link: activeSlide.button2Link || '/about',
            imageUrl: imageUrl,
            isActive: activeSlide.isActive !== false,
            updatedAt: data.updatedAt || new Date().toISOString()
          };
          
          console.log('🎯 Final hero data:', heroData);
          return heroData;
        }
      }
      
      // Handle single hero object format
      if (data.headline || data.title) {
        let imageUrl = data.imageUrl || data.image || '';
        
        // Fix: Add 'public/' prefix if missing
        if (imageUrl && !imageUrl.includes('/public/')) {
          imageUrl = imageUrl.replace('/hero/', '/public/hero/');
        }
        
        return {
          id: data.id || 'hero-1',
          headline: data.headline || data.title || '',
          description: data.description || data.subtitle || '',
          tagline: data.tagline || '',
          button1Text: data.button1Text || data.buttonText || '',
          button1Link: data.button1Link || data.buttonLink || '',
          button2Text: data.button2Text || '',
          button2Link: data.button2Link || '',
          imageUrl: imageUrl,
          isActive: data.isActive !== false,
          updatedAt: data.updatedAt || new Date().toISOString()
        };
      }
    }
  } catch (error: any) {
    console.log('⚠️ API error:', error.message);
  }

  // Return null if API fails - Home.tsx will use S3 images fallback
  return null;
};

// Save Hero Data to Backend API
export const saveHeroData = async (heroData: Partial<HeroData>): Promise<boolean> => {
  try {
    const token = localStorage.getItem('idToken');
    
    const dataToSave = {
      PK: 'hero',
      SK: 'content',
      type: 'cms',
      slides: [{
        id: heroData.id || 'hero-1',
        headline: heroData.headline || '',
        description: heroData.description || '',
        tagline: heroData.tagline || '',
        button1Text: heroData.button1Text || '',
        button1Link: heroData.button1Link || '',
        button2Text: heroData.button2Text || '',
        button2Link: heroData.button2Link || '',
        imageUrl: heroData.imageUrl || '',
        isActive: heroData.isActive !== false,
        order: 1
      }],
      updatedAt: new Date().toISOString()
    };

    console.log('💾 Saving to backend API...');
    
    const response = await fetch(`${API_URL}/cms/hero`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify(dataToSave)
    });

    if (response.ok) {
      await response.json();
      console.log('✅ Saved to backend successfully!');
      toast.success('Hero content saved to backend!');
      return true;
    } else {
      const error = await response.text();
      console.error('❌ Backend save failed:', response.status, error);
      toast.error('Failed to save to backend');
      return false;
    }
  } catch (error: any) {
    console.error('❌ Save error:', error);
    toast.error('Save failed', {
      description: error.message || 'Network error'
    });
    return false;
  }
};

// Upload Hero Image to S3
export const uploadHeroImage = async (file: File): Promise<string | null> => {
  try {
    console.log('📷 Starting S3 upload...', file.name);

    // Import S3Service dynamically
    const S3ServiceModule = await import('./S3Service');
    const S3Service = S3ServiceModule.default;

    // Upload to S3 in public/hero folder
    const result = await S3Service.uploadImage(file, 'public/hero');

    console.log('✅ Image uploaded to S3!');
    console.log('🔑 S3 Key:', result.key);
    console.log('🌐 URL:', result.url);

    toast.success('Image uploaded to S3 successfully!');
    return result.url;
  } catch (error: any) {
    console.error('❌ S3 upload failed:', error);
    toast.error('Upload failed: ' + (error.message || 'Unknown error'));
    return null;
  }
};
