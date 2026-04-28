// Data Export/Import Utility for JSON File Storage
// This allows you to save/load data from JSON files for backup and migration

import { localStorageService } from './localStorageService';

export interface ExportData {
  version: string;
  exportedAt: string;
  users: any[];
  cmsData: any;
  products: any[];
  testimonials: any[];
  orders: any[];
}

/**
 * Export all data from localStorage to a JSON file
 */
export function exportData(): ExportData {
  const data: ExportData = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    users: localStorageService.users.getAllUsers(),
    cmsData: localStorageService.cms.getCMSData(),
    products: localStorageService.products.getProducts(),
    testimonials: localStorageService.testimonials.getTestimonials(),
    orders: localStorageService.orders.getOrders(),
  };

  // Create download link
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `agrofeed-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return data;
}

/**
 * Import data from a JSON file to localStorage
 */
export function importData(jsonString: string): { success: boolean; error?: string } {
  try {
    const data = JSON.parse(jsonString);

    // Validate data structure
    if (!data.version || !data.exportedAt) {
      return { success: false, error: 'Invalid data format' };
    }

    // Import users
    if (data.users && Array.isArray(data.users)) {
      data.users.forEach((user: any) => {
        localStorageService.users.createUser(user);
      });
    }

    // Import CMS data
    if (data.cmsData) {
      localStorage.setItem('agrofeed_cms_data', JSON.stringify(data.cmsData));
    }

    // Import products
    if (data.products && Array.isArray(data.products)) {
      localStorage.setItem('agrofeed_products', JSON.stringify(data.products));
    }

    // Import testimonials
    if (data.testimonials && Array.isArray(data.testimonials)) {
      localStorage.setItem('agrofeed_testimonials', JSON.stringify(data.testimonials));
    }

    // Import orders
    if (data.orders && Array.isArray(data.orders)) {
      localStorage.setItem('agrofeed_orders', JSON.stringify(data.orders));
    }

    return { success: true };
  } catch (error) {
    console.error('Error importing data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to import data',
    };
  }
}

/**
 * Clear all data from localStorage
 */
export function clearAllData(): void {
  if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
    localStorage.removeItem('agrofeed_users');
    localStorage.removeItem('agrofeed_current_user');
    localStorage.removeItem('agrofeed_cms_data');
    localStorage.removeItem('agrofeed_products');
    localStorage.removeItem('agrofeed_testimonials');
    localStorage.removeItem('agrofeed_orders');
    console.log('All data cleared');
  }
}

/**
 * Get storage statistics
 */
export function getStorageStats() {
  const stats = {
    users: localStorageService.users.getAllUsers().length,
    products: localStorageService.products.getProducts().length,
    testimonials: localStorageService.testimonials.getTestimonials().length,
    orders: localStorageService.orders.getOrders().length,
    totalSize: 0,
  };

  // Calculate total size
  let totalSize = 0;
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('agrofeed_')) {
      totalSize += localStorage[key].length;
    }
  });
  stats.totalSize = totalSize;

  return stats;
}
