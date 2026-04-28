import { toast } from 'sonner';
import type { PortfolioItem } from '../types/portfolio';

const API_URL = 'https://euwheigeak.execute-api.us-east-1.amazonaws.com/prod';

// Default portfolio items (fallback)
const DEFAULT_PORTFOLIOS: PortfolioItem[] = [
  {
    id: 'portfolio-1',
    title: 'Rice & Rare Spices',
    subtitle: 'Origin: South Asia',
    description: 'Six distinct categories, sourced with surgical precision from the world\'s most fertile regions.',
    imageUrl: 'https://agrofeed-content-agrofeed-536217686312.s3.amazonaws.com/hero/02-portfolio-rice-spices.jpg',
    s3Key: 'hero/02-portfolio-rice-spices.jpg',
    link: '/products/rice-spices',
    order: 1,
    isActive: true
  },
  {
    id: 'portfolio-2',
    title: 'Seasonal Citrus',
    subtitle: 'Origin: Mediterranean',
    description: 'Six distinct categories, sourced with surgical precision from the world\'s most fertile regions.',
    imageUrl: 'https://agrofeed-content-agrofeed-536217686312.s3.amazonaws.com/hero/03-portfolio-seasonal-citrus.jpg',
    s3Key: 'hero/03-portfolio-seasonal-citrus.jpg',
    link: '/products/fruits-vegetables',
    order: 2,
    isActive: true
  },
  {
    id: 'portfolio-3',
    title: 'Global Grains',
    subtitle: 'Origin: Central Plains',
    description: 'Six distinct categories, sourced with surgical precision from the world\'s most fertile regions.',
    imageUrl: 'https://agrofeed-content-agrofeed-536217686312.s3.amazonaws.com/hero/04-portfolio-global-grains.jpg',
    s3Key: 'hero/04-portfolio-global-grains.jpg',
    link: '/products/grains',
    order: 3,
    isActive: true
  },
  {
    id: 'portfolio-4',
    title: 'Organic Root Produce',
    subtitle: 'Origin: Global Tropics',
    description: 'Six distinct categories, sourced with surgical precision from the world\'s most fertile regions.',
    imageUrl: 'https://agrofeed-content-agrofeed-536217686312.s3.amazonaws.com/hero/05-portfolio-organic-produce.jpg',
    s3Key: 'hero/05-portfolio-organic-produce.jpg',
    link: '/products/produce',
    order: 4,
    isActive: true
  }
];

// Fetch Portfolio Data from API
export const fetchPortfolioData = async (): Promise<PortfolioItem[]> => {
  try {
    console.log('📡 Fetching portfolio data from API...');
    const response = await fetch(`${API_URL}/cms/portfolios`);

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Portfolio data fetched from API:', data);
      
      if (data.items && Array.isArray(data.items) && data.items.length > 0) {
        return data.items;
      }
    }
  } catch (error: any) {
    console.log('⚠️ API error, using default portfolios:', error.message);
  }

  // Fallback to default portfolios
  console.log('📸 Using default portfolio items');
  return DEFAULT_PORTFOLIOS;
};

// Save Portfolio Data to API
export const savePortfolioData = async (items: PortfolioItem[]): Promise<boolean> => {
  try {
    const token = localStorage.getItem('idToken');
    
    const dataToSave = {
      PK: 'portfolios',
      SK: 'content',
      type: 'cms',
      items: items,
      updatedAt: new Date().toISOString()
    };

    console.log('💾 Saving portfolio data to API...');
    
    const response = await fetch(`${API_URL}/cms/portfolios`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify(dataToSave)
    });

    if (response.ok) {
      await response.json();
      console.log('✅ Portfolio data saved to API!');
      toast.success('Portfolios saved!', {
        description: 'Changes are live on the website.'
      });
      return true;
    } else {
      const error = await response.text();
      console.error('❌ Portfolio save failed:', response.status, error);
      toast.error('Failed to save portfolios');
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

// Upload Portfolio Image to S3
export const uploadPortfolioImage = async (file: File): Promise<string | null> => {
  try {
    console.log('📷 Starting portfolio image upload...', file.name);

    // Import S3Service dynamically
    const S3ServiceModule = await import('./S3Service');
    const S3Service = S3ServiceModule.default;

    // Upload to S3 in hero folder (same as all other images)
    const result = await S3Service.uploadImage(file, 'hero');

    console.log('✅ Portfolio image uploaded to S3!');
    console.log('🔑 S3 Key:', result.key);
    console.log('🌐 URL:', result.url);

    toast.success('Portfolio image uploaded!');
    return result.url;
  } catch (error: any) {
    console.error('❌ S3 upload failed:', error);
    toast.error('Upload failed: ' + (error.message || 'Unknown error'));
    return null;
  }
};
