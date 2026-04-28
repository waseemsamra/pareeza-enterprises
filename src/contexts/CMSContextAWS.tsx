import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import DynamoDBService from '../lib/DynamoDBService';
import S3Service from '../lib/S3Service';
import { toast } from 'sonner';

// CMS Content Interfaces
interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  backgroundImage: string;
}

interface AboutContent {
  badge: string;
  title: string;
  subtitle: string;
  features: AboutFeature[];
  stats: AboutStat[];
}

interface AboutFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
  image: string;
}

interface AboutStat {
  id: string;
  value: string;
  label: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

interface TestimonialsContent {
  badge: string;
  title: string;
  testimonials: Testimonial[];
  clientLogos: string[];
}

interface EnquiryContent {
  badge: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  contactPhone: string;
  contactEmail: string;
  productOptions: string[];
}

interface SiteSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}

interface CMSData {
  hero: HeroContent;
  about: AboutContent;
  testimonials: TestimonialsContent;
  enquiry: EnquiryContent;
  siteSettings: SiteSettings;
}

interface CMSContextType {
  cmsData: CMSData;
  updateHero: (data: HeroContent) => void;
  updateAbout: (data: AboutContent) => void;
  updateTestimonials: (data: TestimonialsContent) => void;
  updateEnquiry: (data: EnquiryContent) => void;
  updateSiteSettings: (data: SiteSettings) => void;
  uploadImage: (file: File, folder: string) => Promise<string | null>;
  isLoading: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

// Default CMS Data
const defaultCMSData: CMSData = {
  hero: {
    badge: 'Premium Quality Feed',
    title: 'Premium Food Products',
    subtitle: 'High-quality hay, alfalfa, straw, and grain products for your livestock needs.',
    primaryButtonText: 'Explore Products',
    secondaryButtonText: 'Contact Us',
    backgroundImage: '/hero-hay.jpg',
  },
  about: {
    badge: 'About Us',
    title: 'Why Choose Our Products?',
    subtitle: 'We provide the highest quality food products sourced from sustainable farms.',
    features: [
      {
        id: '1',
        icon: 'Sprout',
        title: 'Sustainable Farming',
        description: 'Eco-friendly practices that protect the environment.',
        image: '/about-sustainable.jpg',
      },
      {
        id: '2',
        icon: 'Award',
        title: 'Premium Quality',
        description: 'Rigorous quality control ensures highest grade nutrients.',
        image: '/about-quality.jpg',
      },
      {
        id: '3',
        icon: 'Leaf',
        title: 'Wide Variety',
        description: 'Complete range of feed products for all livestock.',
        image: '/about-variety.jpg',
      },
    ],
    stats: [
      { id: '1', value: '15+', label: 'Years Experience' },
      { id: '2', value: '5000+', label: 'Happy Customers' },
      { id: '3', value: '50+', label: 'Products' },
      { id: '4', value: '99%', label: 'Satisfaction Rate' },
    ],
  },
  testimonials: {
    badge: 'Testimonials',
    title: 'What Our Clients Say',
    testimonials: [
      { id: 1, name: 'John Smith', role: 'Dairy Farm Owner', content: 'Best quality hay we have ever purchased.', rating: 5, avatar: 'JS' },
      { id: 2, name: 'Sarah Johnson', role: 'Horse Trainer', content: 'Reliable delivery and excellent service.', rating: 5, avatar: 'SJ' },
      { id: 3, name: 'Mike Williams', role: 'Livestock Rancher', content: 'Our livestock loves their products.', rating: 5, avatar: 'MW' },
    ],
    clientLogos: ['FarmCo', 'AgriTech', 'GreenFields', 'LiveStock Pro', 'DairyBest'],
  },
  enquiry: {
    badge: 'Send Enquiry',
    title: 'Request a Quote',
    subtitle: 'Fill out the form and our team will get back to you within 24 hours.',
    backgroundImage: '/form-farmer.jpg',
    contactPhone: '+1 (555) 123-4567',
    contactEmail: 'info@agrofeed.com',
    productOptions: ['Hay Products', 'Alfalfa Products', 'Straw Products', 'Grain & Silage', 'Pellets & Capsules'],
  },
  siteSettings: {
    siteName: 'AgroFeed',
    contactEmail: 'info@agrofeed.com',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Farm Road, Agricultural District, Countryside, CA 90210',
    socialLinks: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      linkedin: '#',
    },
  },
};

export const CMSProvider = ({ children }: { children: ReactNode }) => {
  const [cmsData, setCmsData] = useState<CMSData>(defaultCMSData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFromDynamoDB();
  }, []);

  const loadFromDynamoDB = async () => {
    try {
      const [hero, about, testimonials, enquiry, siteSettings] = await Promise.all([
        DynamoDBService.getContent('hero'),
        DynamoDBService.getContent('about'),
        DynamoDBService.getTestimonials(),
        DynamoDBService.getContent('enquiry'),
        DynamoDBService.getContent('siteSettings')
      ]);

      setCmsData({
        hero: hero?.data || defaultCMSData.hero,
        about: about?.data || defaultCMSData.about,
        testimonials: testimonials || defaultCMSData.testimonials,
        enquiry: enquiry?.data || defaultCMSData.enquiry,
        siteSettings: siteSettings?.data || defaultCMSData.siteSettings,
      });
    } catch (error) {
      console.error('Error loading CMS data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateHero = async (data: HeroContent) => {
    const newData = { ...cmsData, hero: data };
    setCmsData(newData);
    
    try {
      await DynamoDBService.saveContent('hero', data);
      toast.success('Hero section saved!');
    } catch (error) {
      toast.error('Failed to save to DynamoDB');
    }
  };

  const updateAbout = async (data: AboutContent) => {
    const newData = { ...cmsData, about: data };
    setCmsData(newData);
    
    try {
      await DynamoDBService.saveContent('about', data);
      toast.success('About section saved!');
    } catch (error) {
      toast.error('Failed to save to DynamoDB');
    }
  };

  const updateTestimonials = async (data: TestimonialsContent) => {
    const newData = { ...cmsData, testimonials: data };
    setCmsData(newData);
    
    try {
      await DynamoDBService.saveContent('testimonials', data);
      toast.success('Testimonials saved!');
    } catch (error) {
      toast.error('Failed to save testimonials');
    }
  };

  const updateEnquiry = async (data: EnquiryContent) => {
    const newData = { ...cmsData, enquiry: data };
    setCmsData(newData);
    
    try {
      await DynamoDBService.saveContent('enquiry', data);
      toast.success('Enquiry section saved!');
    } catch (error) {
      toast.error('Failed to save to DynamoDB');
    }
  };

  const updateSiteSettings = async (data: SiteSettings) => {
    const newData = { ...cmsData, siteSettings: data };
    setCmsData(newData);
    
    try {
      await DynamoDBService.saveContent('siteSettings', data);
      toast.success('Site settings saved!');
    } catch (error) {
      toast.error('Failed to save to DynamoDB');
    }
  };

  const uploadImage = async (file: File, folder: string): Promise<string | null> => {
    try {
      const result = await S3Service.uploadImage(file, folder);
      toast.success('Image uploaded to S3!');
      return result.url;
    } catch (error) {
      toast.error('Failed to upload image');
      return null;
    }
  };

  return (
    <CMSContext.Provider
      value={{
        cmsData,
        updateHero,
        updateAbout,
        updateTestimonials,
        updateEnquiry,
        updateSiteSettings,
        uploadImage,
        isLoading,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
