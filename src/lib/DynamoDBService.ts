class DynamoDBService {
  private API_URL = import.meta.env.VITE_API_URL || 'https://euwheigeak.execute-api.us-east-1.amazonaws.com/prod';

  // Get content by type
  async getContent(type: string) {
    try {
      const response = await fetch(`${this.API_URL}/content/${type}`);
      if (!response.ok) throw new Error('Failed to fetch content');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get content error:', error);
      return null;
    }
  }
  
  // Save content
  async saveContent(type: string, data: any) {
    try {
      const response = await fetch(`${this.API_URL}/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: type,
          data: data,
          updatedAt: new Date().toISOString()
        })
      });
      if (!response.ok) throw new Error('Failed to save content');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Save content error:', error);
      throw error;
    }
  }
  
  // Get all testimonials
  async getTestimonials() {
    try {
      const response = await fetch(`${this.API_URL}/testimonials`);
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get testimonials error:', error);
      return [];
    }
  }
  
  // Add testimonial
  async addTestimonial(testimonial: any) {
    try {
      const response = await fetch(`${this.API_URL}/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonial)
      });
      if (!response.ok) throw new Error('Failed to add testimonial');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Add testimonial error:', error);
      throw error;
    }
  }
  
  // Get products
  async getProducts() {
    try {
      const response = await fetch(`${this.API_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get products error:', error);
      return [];
    }
  }
}

export default new DynamoDBService();
