// LocalStorage Service for Development
// This service handles all data persistence using localStorage
// Later can be replaced with AWS integration

export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  role: 'user' | 'admin';
}

export interface StoredUser extends User {
  password: string;
}

// Storage Keys
const STORAGE_KEYS = {
  USERS: 'agrofeed_users',
  CURRENT_USER: 'agrofeed_current_user',
  CMS_DATA: 'agrofeed_cms_data',
  PRODUCTS: 'agrofeed_products',
  TESTIMONIALS: 'agrofeed_testimonials',
  ORDERS: 'agrofeed_orders',
} as const;

// Default Admin User
const DEFAULT_ADMIN: StoredUser = {
  id: 'admin-001',
  name: 'Admin User',
  email: 'admin@agrofeed.com',
  company: 'AgroFeed Inc.',
  password: 'admin123',
  role: 'admin',
};

// Default CMS Data
const DEFAULT_CMS_DATA = {
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

// Generic localStorage functions
function getItem<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
    return defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
}

// Users Service
export const usersService = {
  getAllUsers: (): StoredUser[] => {
    const users = getItem<StoredUser[]>(STORAGE_KEYS.USERS, []);
    if (users.length === 0) {
      // Initialize with admin user
      setItem(STORAGE_KEYS.USERS, [DEFAULT_ADMIN]);
      return [DEFAULT_ADMIN];
    }
    return users;
  },

  getUserByEmail: (email: string): StoredUser | null => {
    const users = usersService.getAllUsers();
    return users.find(u => u.email === email) || null;
  },

  createUser: (user: StoredUser): boolean => {
    const users = usersService.getAllUsers();
    if (users.some(u => u.email === user.email)) {
      return false; // User already exists
    }
    users.push(user);
    setItem(STORAGE_KEYS.USERS, users);
    return true;
  },

  updateUser: (email: string, updates: Partial<StoredUser>): boolean => {
    const users = usersService.getAllUsers();
    const index = users.findIndex(u => u.email === email);
    if (index === -1) {
      return false;
    }
    users[index] = { ...users[index], ...updates };
    setItem(STORAGE_KEYS.USERS, users);
    return true;
  },

  deleteUser: (email: string): boolean => {
    const users = usersService.getAllUsers();
    const filtered = users.filter(u => u.email !== email);
    if (filtered.length === users.length) {
      return false;
    }
    setItem(STORAGE_KEYS.USERS, filtered);
    return true;
  },
};

// Current User Service
export const currentUserService = {
  getCurrentUser: (): User | null => {
    return getItem<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  },

  setCurrentUser: (user: User): void => {
    setItem(STORAGE_KEYS.CURRENT_USER, user);
  },

  clearCurrentUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },
};

// CMS Data Service
export const cmsDataService = {
  getCMSData: () => {
    return getItem<typeof DEFAULT_CMS_DATA>(STORAGE_KEYS.CMS_DATA, DEFAULT_CMS_DATA);
  },

  updateCMSData: (data: Partial<typeof DEFAULT_CMS_DATA>): void => {
    const current = cmsDataService.getCMSData();
    const updated = { ...current, ...data };
    setItem(STORAGE_KEYS.CMS_DATA, updated);
  },

  updateSection: <K extends keyof typeof DEFAULT_CMS_DATA>(
    section: K,
    data: (typeof DEFAULT_CMS_DATA)[K]
  ): void => {
    const current = cmsDataService.getCMSData();
    const updated = { ...current, [section]: data };
    setItem(STORAGE_KEYS.CMS_DATA, updated);
  },
};

// Products Service
export const productsService = {
  getProducts: () => {
    return getItem<any[]>(STORAGE_KEYS.PRODUCTS, []);
  },

  saveProducts: (products: any[]): void => {
    setItem(STORAGE_KEYS.PRODUCTS, products);
  },

  addProduct: (product: any): void => {
    const products = productsService.getProducts();
    products.push(product);
    productsService.saveProducts(products);
  },

  updateProduct: (id: string, updates: any): boolean => {
    const products = productsService.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return false;
    }
    products[index] = { ...products[index], ...updates };
    productsService.saveProducts(products);
    return true;
  },

  deleteProduct: (id: string): boolean => {
    const products = productsService.getProducts();
    const filtered = products.filter(p => p.id !== id);
    if (filtered.length === products.length) {
      return false;
    }
    productsService.saveProducts(filtered);
    return true;
  },
};

// Testimonials Service
export const testimonialsService = {
  getTestimonials: () => {
    return getItem<any[]>(STORAGE_KEYS.TESTIMONIALS, []);
  },

  saveTestimonials: (testimonials: any[]): void => {
    setItem(STORAGE_KEYS.TESTIMONIALS, testimonials);
  },
};

// Orders Service (Demo data)
export const ordersService = {
  getOrders: () => {
    const orders = getItem<any[]>(STORAGE_KEYS.ORDERS, []);
    if (orders.length === 0) {
      // Seed demo orders
      const demoOrders = [
        { id: 'ORD-001', customer: 'John Smith', product: 'Alfalfa Hay Bales', quantity: '500 units', status: 'Delivered', amount: '$4,500' },
        { id: 'ORD-002', customer: 'Sarah Johnson', product: 'Corn Silage', quantity: '200 kg', status: 'In Transit', amount: '$1,800' },
        { id: 'ORD-003', customer: 'Mike Williams', product: 'Timothy Hay', quantity: '300 units', status: 'Processing', amount: '$3,200' },
        { id: 'ORD-004', customer: 'Emily Davis', product: 'Grain Mix Premium', quantity: '150 kg', status: 'Pending', amount: '$950' },
      ];
      setItem(STORAGE_KEYS.ORDERS, demoOrders);
      return demoOrders;
    }
    return orders;
  },
};

// Export all services
export const localStorageService = {
  users: usersService,
  currentUser: currentUserService,
  cms: cmsDataService,
  products: productsService,
  testimonials: testimonialsService,
  orders: ordersService,
};
