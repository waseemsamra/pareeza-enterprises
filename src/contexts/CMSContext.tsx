import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import DynamoDBService from '../lib/DynamoDBService';
import S3Service from '../lib/S3Service';
import { toast } from 'sonner';

// CMS Content Interfaces (keep your existing interfaces)
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
  features: any[];
  stats: any[];
}

interface TestimonialsContent {
  badge: string;
  title: string;
  testimonials: any[];
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
    features: [],
    stats: [],
  },
  testimonials: {
    badge: 'Testimonials',
    title: 'What Our Clients Say',
    testimonials: [],
    clientLogos: [],
  },
  enquiry: {
    badge: 'Send Enquiry',
    title: 'Request a Quote',
    subtitle: 'Fill out the form and our team will get back to you within 24 hours.',
    backgroundImage: '/form-farmer.jpg',
    contactPhone: '+1 (555) 123-4567',
    contactEmail: 'info@agrofeed.com',
    productOptions: [],
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
