// Test Data Seeder Script
// Run this in your browser console on the admin dashboard
// Or integrate into your backend deployment

const API_URL = 'https://euwheigeak.execute-api.us-east-1.amazonaws.com/prod';

// Test Categories Data
const categories = [
  {
    name: 'Hay Products',
    description: 'Premium grass hays including Rhodes Grass, Timothy Hay, and Rye Grass for optimal livestock nutrition.',
    color: '#10b981',
    image: ''
  },
  {
    name: 'Alfalfa Products',
    description: 'High-protein alfalfa hay and pellets, perfect for dairy cattle and horses.',
    color: '#3b82f6',
    image: ''
  },
  {
    name: 'Straw Products',
    description: 'Quality wheat and barley straw for bedding and feed supplementation.',
    color: '#f59e0b',
    image: ''
  },
  {
    name: 'Grain & Silage',
    description: 'Nutrient-rich grain products and fermented silage for maximum energy.',
    color: '#ef4444',
    image: ''
  },
  {
    name: 'Pellets & Capsules',
    description: 'Convenient compressed feed pellets and nutritional capsules.',
    color: '#8b5cf6',
    image: ''
  },
  {
    name: 'Organic Feed',
    description: 'Certified organic animal feed products for health-conscious farmers.',
    color: '#06b6d4',
    image: ''
  }
];

// Test Products Data
const products = [
  // Hay Products
  {
    name: 'Rhodes Grass Hay',
    subtitle: 'Premium Quality',
    description: 'Premium Rhodes Grass hay with high fiber content and excellent palatability for all livestock.',
    category: 'Hay Products',
    price: 24.99,
    features: ['High Fiber Content', 'Low NSC', 'Excellent Palatability'],
    items: ['Small Bales', 'Large Bales', 'Bulk'],
    image: '/product-hay.jpg'
  },
  {
    name: 'Timothy Hay',
    subtitle: 'First Cutting',
    description: 'Premium first cutting Timothy Hay, perfect for horses and small animals.',
    category: 'Hay Products',
    price: 29.99,
    features: ['High Protein', 'Good Fiber', 'Sweet Smell'],
    items: ['Square Bales', 'Round Bales'],
    image: '/detail-timothy.jpg'
  },
  {
    name: 'Rye Grass Hay',
    subtitle: 'Annual Ryegrass',
    description: 'High-quality annual ryegrass hay with excellent nutritional value.',
    category: 'Hay Products',
    price: 22.99,
    features: ['Fast Growing', 'High Yield', 'Palatable'],
    items: ['Small Bales', 'Large Bales'],
    image: '/product-hay.jpg'
  },

  // Alfalfa Products
  {
    name: 'Alfalfa Hay Premium',
    subtitle: 'Extra Leafy',
    description: 'Premium extra leafy alfalfa hay with 18-22% protein content.',
    category: 'Alfalfa Products',
    price: 34.99,
    features: ['18-22% Protein', 'High Calcium', 'Rich in Vitamins'],
    items: ['Small Bales', 'Large Bales', 'Flakes'],
    image: '/product-alfalfa.jpg'
  },
  {
    name: 'Alfalfa Pellets',
    subtitle: '100% Pure Alfalfa',
    description: 'Convenient 100% pure alfalfa pellets for easy feeding and storage.',
    category: 'Alfalfa Products',
    price: 39.99,
    features: ['No Additives', 'Easy Storage', 'Consistent Quality'],
    items: ['50 lb Bags', 'Bulk'],
    image: '/product-alfalfa.jpg'
  },
  {
    name: 'Alfalfa Meal',
    subtitle: 'Ground Alfalfa',
    description: 'Finely ground alfalfa meal for mixing with other feeds.',
    category: 'Alfalfa Products',
    price: 32.99,
    features: ['Fine Texture', 'Easy Mixing', 'High Nutrition'],
    items: ['50 lb Bags', 'Bulk'],
    image: '/product-alfalfa.jpg'
  },

  // Straw Products
  {
    name: 'Wheat Straw',
    subtitle: 'Golden Straw',
    description: 'Clean golden wheat straw, perfect for bedding and feed supplementation.',
    category: 'Straw Products',
    price: 18.99,
    features: ['Clean & Dry', 'Low Dust', 'Good Absorption'],
    items: ['Square Bales', 'Round Bales'],
    image: '/product-straw.jpg'
  },
  {
    name: 'Barley Straw',
    subtitle: 'Premium Bedding',
    description: 'Premium barley straw with excellent absorption properties.',
    category: 'Straw Products',
    price: 19.99,
    features: ['High Absorption', 'Clean', 'Long Stems'],
    items: ['Square Bales', 'Bulk'],
    image: '/product-straw.jpg'
  },
  {
    name: 'Oat Straw',
    subtitle: 'Soft Bedding',
    description: 'Soft oat straw, ideal for bedding young animals.',
    category: 'Straw Products',
    price: 20.99,
    features: ['Soft Texture', 'Clean', 'Palatable'],
    items: ['Small Bales', 'Large Bales'],
    image: '/product-straw.jpg'
  },

  // Grain & Silage
  {
    name: 'Corn Silage',
    subtitle: 'Fermented Feed',
    description: 'High-energy fermented corn silage for maximum nutrition.',
    category: 'Grain & Silage',
    price: 45.99,
    features: ['High Energy', 'Fermented', 'Year-Round Available'],
    items: ['Bulk', 'Bags'],
    image: '/detail-silage.jpg'
  },
  {
    name: 'Grain Mix Premium',
    subtitle: 'Balanced Formula',
    description: 'Premium balanced grain mix for optimal livestock nutrition.',
    category: 'Grain & Silage',
    price: 52.99,
    features: ['Balanced Formula', 'High Energy', 'Quality Grains'],
    items: ['50 lb Bags', 'Bulk'],
    image: '/product-grain.jpg'
  },
  {
    name: 'Fermented Feed Mix',
    subtitle: 'Probiotic Enhanced',
    description: 'Fermented feed mix with probiotics for improved digestion.',
    category: 'Grain & Silage',
    price: 48.99,
    features: ['Probiotics', 'Easy Digestion', 'High Nutrition'],
    items: ['50 lb Bags', 'Bulk'],
    image: '/product-grain.jpg'
  },

  // Pellets & Capsules
  {
    name: 'Feed Pellets Standard',
    subtitle: 'Complete Feed',
    description: 'Complete feed pellets with balanced nutrition for all livestock.',
    category: 'Pellets & Capsules',
    price: 42.99,
    features: ['Complete Nutrition', 'Minimal Waste', 'Easy Storage'],
    items: ['50 lb Bags', 'Bulk'],
    image: '/product-pellets.jpg'
  },
  {
    name: 'Nutritional Capsules',
    subtitle: 'Vitamin Enhanced',
    description: 'Vitamin-enhanced nutritional capsules for supplemental feeding.',
    category: 'Pellets & Capsules',
    price: 55.99,
    features: ['Vitamin Enhanced', 'Easy Administration', 'Fast Acting'],
    items: ['Bottles', 'Bulk'],
    image: '/product-pellets.jpg'
  },
  {
    name: 'Supplement Pellets',
    subtitle: 'Mineral Rich',
    description: 'Mineral-rich supplement pellets for optimal health.',
    category: 'Pellets & Capsules',
    price: 49.99,
    features: ['Mineral Rich', 'Balanced Formula', 'Palatable'],
    items: ['25 lb Bags', '50 lb Bags'],
    image: '/product-pellets.jpg'
  }
];

// Seed Categories
async function seedCategories() {
  console.log('🌱 Seeding categories...');
  
  for (const category of categories) {
    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
      });
      
      if (response.ok) {
        console.log(`✅ Created category: ${category.name}`);
      } else {
        console.error(`❌ Failed to create category: ${category.name}`);
      }
    } catch (error) {
      console.error(`❌ Error creating ${category.name}:`, error);
    }
  }
  
  console.log('✅ Categories seeding complete!');
}

// Seed Products
async function seedProducts() {
  console.log('🌱 Seeding products...');
  
  for (const product of products) {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      
      if (response.ok) {
        console.log(`✅ Created product: ${product.name}`);
      } else {
        console.error(`❌ Failed to create product: ${product.name}`);
      }
    } catch (error) {
      console.error(`❌ Error creating ${product.name}:`, error);
    }
  }
  
  console.log('✅ Products seeding complete!');
}

// Run Seeder
async function runSeeder() {
  console.log('🚀 Starting test data seeder...');
  console.log('API URL:', API_URL);
  
  await seedCategories();
  await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
  await seedProducts();
  
  console.log('🎉 All test data seeded successfully!');
  console.log('Refresh your admin dashboard to see the data.');
}

// Run the seeder
runSeeder();
