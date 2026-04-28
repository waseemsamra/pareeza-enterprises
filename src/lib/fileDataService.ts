// File-based Data Service
// Loads data from JSON files in /data folder
// Syncs with localStorage for runtime persistence
// Perfect for deployment to Amplify, Vercel, Netlify, etc.

import usersData from '../../data/users.json';
import cmsData from '../../data/cms.json';
import productsData from '../../data/products.json';
import testimonialsData from '../../data/testimonials.json';
import ordersData from '../../data/orders.json';

export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  role: 'user' | 'admin';
}

export interface StoredUser extends User {
  password: string;
  createdAt?: string;
  updatedAt?: string;
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

// Initialize data from JSON files if localStorage is empty
function initializeFromJSON(): void {
  // Users
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(usersData.users));
  }

  // CMS Data
  if (!localStorage.getItem(STORAGE_KEYS.CMS_DATA)) {
    const cms = { ...cmsData };
    delete (cms as any).version;
    delete (cms as any).lastUpdated;
    localStorage.setItem(STORAGE_KEYS.CMS_DATA, JSON.stringify(cms));
  }

  // Products
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(productsData.products));
  }

  // Testimonials
  if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonialsData.testimonials));
  }

  // Orders
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(ordersData.orders));
  }
}

// Run initialization
if (typeof window !== 'undefined') {
  initializeFromJSON();
}

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
    console.log(`[DataService] Updated ${key}`);
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
}

// Users Service
export const usersService = {
  getAllUsers: (): StoredUser[] => {
    return getItem<StoredUser[]>(STORAGE_KEYS.USERS, []);
  },

  getUserByEmail: (email: string): StoredUser | null => {
    const users = usersService.getAllUsers();
    return users.find(u => u.email === email) || null;
  },

  getUserById: (id: string): StoredUser | null => {
    const users = usersService.getAllUsers();
    return users.find(u => u.id === id) || null;
  },

  createUser: (user: StoredUser): boolean => {
    const users = usersService.getAllUsers();
    if (users.some(u => u.email === user.email)) {
      return false; // User already exists
    }
    users.push({
      ...user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setItem(STORAGE_KEYS.USERS, users);
    return true;
  },

  updateUser: (email: string, updates: Partial<StoredUser>): boolean => {
    const users = usersService.getAllUsers();
    const index = users.findIndex(u => u.email === email);
    if (index === -1) {
      return false;
    }
    users[index] = { 
      ...users[index], 
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    setItem(STORAGE_KEYS.USERS, users);
    return true;
  },

  updateUserRole: (email: string, role: 'user' | 'admin'): boolean => {
    return usersService.updateUser(email, { role });
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

  validatePassword: (email: string, password: string): boolean => {
    const user = usersService.getUserByEmail(email);
    return user?.password === password;
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

  isAdmin: (): boolean => {
    const user = currentUserService.getCurrentUser();
    return user?.role === 'admin';
  },
};

// CMS Data Service
export const cmsDataService = {
  getCMSData: () => {
    return getItem<any>(STORAGE_KEYS.CMS_DATA, {});
  },

  getSection: (section: string) => {
    const cmsData = cmsDataService.getCMSData();
    return cmsData[section] || null;
  },

  updateCMSData: (data: any): void => {
    const current = cmsDataService.getCMSData();
    const updated = { ...current, ...data };
    setItem(STORAGE_KEYS.CMS_DATA, updated);
  },

  updateSection: (section: string, data: any): void => {
    const current = cmsDataService.getCMSData();
    const updated = { ...current, [section]: data };
    setItem(STORAGE_KEYS.CMS_DATA, updated);
  },

  updateHero: (data: any): void => cmsDataService.updateSection('hero', data),
  updateAbout: (data: any): void => cmsDataService.updateSection('about', data),
  updateTestimonials: (data: any): void => cmsDataService.updateSection('testimonials', data),
  updateEnquiry: (data: any): void => cmsDataService.updateSection('enquiry', data),
  updateSiteSettings: (data: any): void => cmsDataService.updateSection('siteSettings', data),
};

// Products Service
export const productsService = {
  getProducts: () => {
    return getItem<any[]>(STORAGE_KEYS.PRODUCTS, []);
  },

  getProductById: (id: string) => {
    const products = productsService.getProducts();
    return products.find(p => p.id === id) || null;
  },

  getProductsByCategory: (category: string) => {
    const products = productsService.getProducts();
    return products.filter(p => p.category === category);
  },

  saveProducts: (products: any[]): void => {
    setItem(STORAGE_KEYS.PRODUCTS, products);
  },

  addProduct: (product: any): void => {
    const products = productsService.getProducts();
    const newProduct = {
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    products.push(newProduct);
    productsService.saveProducts(products);
  },

  updateProduct: (id: string, updates: any): boolean => {
    const products = productsService.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return false;
    }
    products[index] = { 
      ...products[index], 
      ...updates,
      updatedAt: new Date().toISOString(),
    };
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

  addTestimonial: (testimonial: any): void => {
    const testimonials = testimonialsService.getTestimonials();
    testimonials.push(testimonial);
    testimonialsService.saveTestimonials(testimonials);
  },

  updateTestimonial: (id: number, updates: any): boolean => {
    const testimonials = testimonialsService.getTestimonials();
    const index = testimonials.findIndex(t => t.id === id);
    if (index === -1) {
      return false;
    }
    testimonials[index] = { ...testimonials[index], ...updates };
    testimonialsService.saveTestimonials(testimonials);
    return true;
  },

  deleteTestimonial: (id: number): boolean => {
    const testimonials = testimonialsService.getTestimonials();
    const filtered = testimonials.filter(t => t.id !== id);
    if (filtered.length === testimonials.length) {
      return false;
    }
    testimonialsService.saveTestimonials(filtered);
    return true;
  },
};

// Orders Service
export const ordersService = {
  getOrders: () => {
    return getItem<any[]>(STORAGE_KEYS.ORDERS, []);
  },

  getOrderById: (id: string) => {
    const orders = ordersService.getOrders();
    return orders.find(o => o.id === id) || null;
  },

  getOrdersByCustomer: (customer: string) => {
    const orders = ordersService.getOrders();
    return orders.filter(o => o.customer === customer);
  },

  getOrdersByStatus: (status: string) => {
    const orders = ordersService.getOrders();
    return orders.filter(o => o.status === status);
  },

  saveOrders: (orders: any[]): void => {
    setItem(STORAGE_KEYS.ORDERS, orders);
  },

  addOrder: (order: any): void => {
    const orders = ordersService.getOrders();
    const newOrder = {
      ...order,
      createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    ordersService.saveOrders(orders);
  },

  updateOrderStatus: (id: string, status: string): boolean => {
    const orders = ordersService.getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) {
      return false;
    }
    orders[index] = { ...orders[index], status };
    ordersService.saveOrders(orders);
    return true;
  },
};

// Data Export/Import
export const dataExportImport = {
  exportAllData: (): string => {
    const data = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      users: usersService.getAllUsers(),
      cmsData: cmsDataService.getCMSData(),
      products: productsService.getProducts(),
      testimonials: testimonialsService.getTestimonials(),
      orders: ordersService.getOrders(),
    };
    return JSON.stringify(data, null, 2);
  },

  downloadBackup: (): void => {
    const data = dataExportImport.exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agrofeed-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  importData: (jsonString: string): { success: boolean; error?: string } => {
    try {
      const data = JSON.parse(jsonString);
      
      if (data.users) setItem(STORAGE_KEYS.USERS, data.users);
      if (data.cmsData) setItem(STORAGE_KEYS.CMS_DATA, data.cmsData);
      if (data.products) setItem(STORAGE_KEYS.PRODUCTS, data.products);
      if (data.testimonials) setItem(STORAGE_KEYS.TESTIMONIALS, data.testimonials);
      if (data.orders) setItem(STORAGE_KEYS.ORDERS, data.orders);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to import data',
      };
    }
  },

  resetToDefaults: (): void => {
    if (confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      localStorage.clear();
      initializeFromJSON();
      window.location.reload();
    }
  },
};

// Export all services
export const fileDataService = {
  users: usersService,
  currentUser: currentUserService,
  cms: cmsDataService,
  products: productsService,
  testimonials: testimonialsService,
  orders: ordersService,
  exportImport: dataExportImport,
};

// Re-export for compatibility
export { initializeFromJSON };
