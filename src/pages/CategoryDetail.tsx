import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Product {
  id: number | string;
  name: string;
  title?: string;
  subtitle: string;
  description: string;
  image: string;
  detailImage?: string;
  items?: string[];
  features?: string[];
  price?: number;
  category?: string;
  categoryId?: number | string;
}

interface Category {
  id: number | string;
  name: string;
  description: string;
  color: string;
  image?: string;
}

const API_URL = 'https://euwheigeak.execute-api.us-east-1.amazonaws.com/prod';

const CategoryDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategoryData();
  }, [categoryId]);

  const loadCategoryData = async () => {
    setLoading(true);
    console.log('📂 Loading category:', categoryId);
    
    try {
      // Load category details
      console.log('📂 Fetching category details...');
      const categoryResponse = await fetch(`${API_URL}/categories/${categoryId}`);
      if (categoryResponse.ok) {
        const categoryData = await categoryResponse.json();
        console.log('✅ Category loaded:', categoryData);
        setCategory({
          id: categoryData.id || categoryData.PK?.replace('CATEGORY#', ''),
          name: categoryData.name || categoryData.data?.name || 'Category',
          description: categoryData.description || categoryData.data?.description || '',
          color: categoryData.color || categoryData.data?.color || '#3b82f6',
          image: categoryData.image || categoryData.data?.image || ''
        });

        // Load all products and filter by category
        console.log('📦 Fetching all products...');
        const productsResponse = await fetch(`${API_URL}/products`);
        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          console.log('✅ Products loaded:', productsData.length);

          // Filter products by category name
          const categoryProducts = productsData.filter((p: any) =>
            p.category === categoryData.name ||
            p.data?.category === categoryData.name
          );
        
          console.log('📂 Filtered to category:', categoryProducts.length, 'products');
        
          const transformedProducts = categoryProducts.map((item: any) => ({
            id: item.id || item.PK?.replace('PRODUCT#', ''),
            name: item.name || item.data?.name || 'Product',
            title: item.title || item.data?.title || item.name || 'Product',
            subtitle: item.subtitle || item.data?.subtitle || '',
            description: item.description || item.data?.description || '',
            image: item.image || item.data?.image || '/product-placeholder.jpg',
            detailImage: item.detailImage || item.data?.detailImage || item.image || '/product-placeholder.jpg',
            items: item.items || item.data?.items || [],
            features: item.features || item.data?.features || [],
            price: item.price || item.data?.price,
            category: item.category || item.data?.category
          }));
        
          setProducts(transformedProducts);
        }
      }
    } catch (error: any) {
      console.error('❌ Error loading category data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 flex items-center justify-center">
        <span className="material-symbols-outlined mr-2 animate-spin">progress_activity</span>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined">package</span>
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Category Not Found</h2>
          <Link to="/categories" className="text-primary hover:underline">
            ← Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="section-padding py-4">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Categories
          </Link>
        </div>
      </div>

      {/* Category Hero */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/category-placeholder.jpg';
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: category.color }}
          >
            <span className="material-symbols-outlined">label</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="section-padding">
            <div className="max-w-3xl">
              <span
                className="inline-block px-4 py-2 rounded-full text-white text-sm font-bold mb-4"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {category.name}
              </h1>
              <p className="text-white/90 text-lg md:text-xl">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="section-padding py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Products in This Category
          </h2>
          <p className="text-gray-600 text-lg">
            {products.length} product{products.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <span className="material-symbols-outlined">package</span>
            <h3 className="text-xl font-bold text-gray-600 mb-2">No Products Yet</h3>
            <p className="text-gray-500">Check back later for products in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group relative bg-white rounded-2xl overflow-hidden
                         shadow-card hover:shadow-card-hover transition-all duration-500
                         hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform
                             duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/product-placeholder.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Subtitle */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-white/70 text-xs font-medium uppercase tracking-wider">
                      {product.subtitle}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary
                               transition-colors duration-300">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {product.features.slice(0, 2).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="material-symbols-outlined w-4 h-4">check</span>
                          <span className="text-gray-600 text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* View Details */}
                  <div className="flex items-center gap-2 text-primary text-sm font-medium
                                opacity-0 group-hover:opacity-100 transition-all duration-300
                                transform translate-y-2 group-hover:translate-y-0">
                    View Details
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;
