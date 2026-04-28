// Quick Test Data Seeder
// Copy and paste this ENTIRE script into your browser console on the admin dashboard
// Then press Enter to run

(async function seedTestData() {
  const API_URL = 'https://euwheigeak.execute-api.us-east-1.amazonaws.com/prod';
  
  console.log('🚀 Starting test data seeder...');
  
  // Test Categories
  const categories = [
    { name: 'Hay Products', description: 'Premium grass hays for optimal livestock nutrition', color: '#10b981' },
    { name: 'Alfalfa Products', description: 'High-protein alfalfa hay and pellets', color: '#3b82f6' },
    { name: 'Straw Products', description: 'Quality wheat and barley straw', color: '#f59e0b' },
    { name: 'Grain & Silage', description: 'Nutrient-rich grain products and silage', color: '#ef4444' },
    { name: 'Pellets & Capsules', description: 'Convenient feed pellets and capsules', color: '#8b5cf6' },
    { name: 'Organic Feed', description: 'Certified organic animal feed', color: '#06b6d4' }
  ];
  
  // Test Products
  const products = [
    { name: 'Rhodes Grass Hay', subtitle: 'Premium Quality', description: 'Premium Rhodes Grass hay with high fiber content', category: 'Hay Products', price: 24.99, features: ['High Fiber', 'Low NSC'], items: ['Small Bales', 'Large Bales'] },
    { name: 'Timothy Hay', subtitle: 'First Cutting', description: 'Premium Timothy Hay for horses', category: 'Hay Products', price: 29.99, features: ['High Protein', 'Good Fiber'], items: ['Square Bales'] },
    { name: 'Alfalfa Hay Premium', subtitle: 'Extra Leafy', description: 'Premium alfalfa hay with 18-22% protein', category: 'Alfalfa Products', price: 34.99, features: ['18-22% Protein', 'High Calcium'], items: ['Small Bales'] },
    { name: 'Alfalfa Pellets', subtitle: '100% Pure', description: 'Pure alfalfa pellets for easy feeding', category: 'Alfalfa Products', price: 39.99, features: ['No Additives', 'Easy Storage'], items: ['50 lb Bags'] },
    { name: 'Wheat Straw', subtitle: 'Golden Straw', description: 'Clean golden wheat straw for bedding', category: 'Straw Products', price: 18.99, features: ['Clean & Dry', 'Low Dust'], items: ['Square Bales'] },
    { name: 'Barley Straw', subtitle: 'Premium Bedding', description: 'Premium barley straw with high absorption', category: 'Straw Products', price: 19.99, features: ['High Absorption', 'Clean'], items: ['Round Bales'] },
    { name: 'Corn Silage', subtitle: 'Fermented Feed', description: 'High-energy fermented corn silage', category: 'Grain & Silage', price: 45.99, features: ['High Energy', 'Fermented'], items: ['Bulk'] },
    { name: 'Grain Mix Premium', subtitle: 'Balanced', description: 'Balanced grain mix for livestock', category: 'Grain & Silage', price: 52.99, features: ['Balanced Formula', 'High Energy'], items: ['50 lb Bags'] },
    { name: 'Feed Pellets', subtitle: 'Complete Feed', description: 'Complete feed pellets with balanced nutrition', category: 'Pellets & Capsules', price: 42.99, features: ['Complete Nutrition', 'Minimal Waste'], items: ['50 lb Bags'] },
    { name: 'Nutritional Capsules', subtitle: 'Vitamin Enhanced', description: 'Vitamin-enhanced nutritional capsules', category: 'Pellets & Capsules', price: 55.99, features: ['Vitamin Enhanced', 'Fast Acting'], items: ['Bottles'] }
  ];
  
  // Seed Categories
  console.log('\n📁 Creating categories...');
  for (const cat of categories) {
    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cat)
      });
      
      if (response.ok) {
        console.log(`  ✅ ${cat.name}`);
      } else {
        console.log(`  ⚠️  ${cat.name} (may already exist)`);
      }
    } catch (error) {
      console.log(`  ❌ ${cat.name}: ${error.message}`);
    }
  }
  
  // Wait a moment
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Seed Products
  console.log('\n📦 Creating products...');
  for (const prod of products) {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prod)
      });
      
      if (response.ok) {
        console.log(`  ✅ ${prod.name}`);
      } else {
        console.log(`  ⚠️  ${prod.name} (may already exist)`);
      }
    } catch (error) {
      console.log(`  ❌ ${prod.name}: ${error.message}`);
    }
  }
  
  console.log('\n🎉 Test data seeding complete!');
  console.log('📝 Refresh your admin dashboard to see the data.');
  console.log('🏷️  Categories created:', categories.length);
  console.log('📦 Products created:', products.length);
})();
