import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Package, Check, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string | number;
  name?: string;
  title?: string;
  subtitle: string;
  description: string;
  image: string;
  detailImage?: string;
  items?: string[];
  features?: string[];
  price?: number;
  category?: string;
}

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    console.log('📦 Loading products...');
    try {
      const API_URL = 'https://euwheigeak.execute-api.us-east-1.amazonaws.com/prod';
      const response = await fetch(`${API_URL}/products`);

      if (!response.ok) {
        throw new Error('Failed to load products');
      }

      const data = await response.json();
      console.log('✅ API returned:', data.length, 'products');

      // Transform API data
      const transformedProducts = data.map((item: any) => ({
        id: item.id || `product-${Date.now()}`,
        name: item.name || 'Product',
        title: item.title || item.name || 'Product',
        subtitle: item.subtitle || item.category || '',
        description: item.description || '',
        image: item.image || '/product-placeholder.jpg',
        detailImage: item.detailImage || item.image || '/product-placeholder.jpg',
        items: item.items || [],
        features: item.features || [],
        price: item.price,
        category: item.category
      }));
      
      console.log('📦 Transformed:', transformedProducts);
      setProducts(transformedProducts);
    } catch (err: any) {
      console.error('❌ Error loading products:', err);
      // Fallback products matching your API
      setProducts([
        {
          id: 'beef',
          title: 'Beef',
          subtitle: 'Premium Quality',
          description: 'Premium quality beef for optimal nutrition.',
          image: '/product-beef.jpg',
          detailImage: '/detail-beef.jpg',
          items: ['Steak', 'Ground Beef'],
          features: ['High Protein', 'Grass Fed'],
        },
        {
          id: 'chicken',
          title: 'Chicken',
          subtitle: 'Free Range',
          description: 'Free range chicken with excellent taste.',
          image: '/product-chicken.jpg',
          detailImage: '/product-chicken.jpg',
          items: ['Whole Chicken', 'Breasts'],
          features: ['Free Range', 'Hormone Free'],
        },
        {
          id: 'eggs',
          title: 'Eggs',
          subtitle: 'Farm Fresh',
          description: 'Fresh farm eggs daily.',
          image: '/product-eggs.jpg',
          detailImage: '/product-eggs.jpg',
          items: ['Dozen'],
          features: ['Fresh', 'Organic'],
        },
        {
          id: 'vegetables',
          title: 'Vegetables',
          subtitle: 'Organic',
          description: 'Fresh organic vegetables.',
          image: '/product-vegetables.jpg',
          detailImage: '/detail-vegetables.jpg',
          items: ['Mixed'],
          features: ['Organic', 'Fresh'],
        },
        {
          id: 'honey',
          title: 'Honey',
          subtitle: 'Pure & Natural',
          description: 'Pure natural honey from local bees.',
          image: '/product-honey.jpg',
          detailImage: '/product-honey.jpg',
          items: ['500g', '1kg'],
          features: ['Pure', 'Raw'],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && products.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from('.products-badge', {
          y: 30, opacity: 0, duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        gsap.from('.products-title', {
          y: 50, opacity: 0, duration: 0.8, delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        gsap.from('.products-subtitle', {
          y: 30, opacity: 0, duration: 0.6, delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        gsap.from('.product-card', {
          y: 100, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [loading, products]);

  if (loading) {
    return (
      <section className="py-20 lg:py-32 bg-white">
        <div className="section-padding text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-20 lg:py-32 bg-white">
        <div className="section-padding text-center">
          <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-2xl font-bold text-gray-600 mb-2">No Products Available</h3>
          <p className="text-gray-500">Check back later for our product range.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="section-padding relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="products-badge inline-flex items-center gap-2 px-4 py-2
                         bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Package className="w-4 h-4" />
            Our Products
          </span>
          <h2 className="products-title text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
            Explore Our <span className="text-gradient">Product Range</span>
          </h2>
          <p className="products-subtitle text-gray-600 text-lg">
            Discover our comprehensive selection of premium food products,
            carefully crafted to meet the nutritional needs of your livestock.
          </p>
        </div>

        {/* Featured Product - Large Card */}
        {products.length > 0 && (
          <div className="mb-12">
            <Link
              to={`/products/${products[0].id}`}
              className="product-card group block relative bg-white rounded-3xl overflow-hidden
                       shadow-card hover:shadow-card-hover transition-all duration-500
                       hover:-translate-y-2"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image Side */}
                <div className="relative h-64 lg:h-[400px] overflow-hidden">
                  <img
                    src={products[0].detailImage || products[0].image}
                    alt={products[0].title}
                    className="w-full h-full object-cover transition-transform
                             duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

                  {/* Featured Badge */}
                  <div className="absolute top-6 left-6 px-4 py-2 bg-accent text-dark
                                rounded-full text-sm font-bold">
                    Featured Product
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-white/80 text-sm font-medium mb-2 block">
                      {products[0].subtitle}
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-bold text-white">
                      {products[0].title}
                    </h3>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {products[0].description}
                  </p>

                  {/* Features */}
                  {products[0].features && products[0].features.length > 0 && (
                    <div className="space-y-3 mb-8">
                      {products[0].features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-dark font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Product Items */}
                  {products[0].items && products[0].items.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {products[0].items.map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-green-50 text-primary text-sm font-medium rounded-lg"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-primary font-semibold
                                group-hover:gap-4 transition-all duration-300">
                    View Product Details
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Products Grid - Remaining Products */}
        <div ref={trackRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(1).map((product, index) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="product-card group relative bg-white rounded-2xl overflow-hidden
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
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Product Number */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm
                              rounded-xl flex items-center justify-center border border-white/30">
                  <span className="text-white text-sm font-bold">0{index + 2}</span>
                </div>

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
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="text-gray-600 text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Items List */}
                {product.items && product.items.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.items.slice(0, 2).map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-green-50 text-primary text-xs rounded-md font-medium"
                      >
                        {item}
                      </span>
                    ))}
                    {product.items.length > 2 && (
                      <span className="px-2 py-1 bg-green-50 text-primary text-xs rounded-md font-medium">
                        +{product.items.length - 2}
                      </span>
                    )}
                  </div>
                )}

                {/* View Details */}
                <div className="flex items-center gap-2 text-primary text-sm font-medium
                              opacity-0 group-hover:opacity-100 transition-all duration-300
                              transform translate-y-2 group-hover:translate-y-0">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent
                            group-hover:border-primary/30 transition-colors duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 bg-primary text-white
                     px-8 py-4 rounded-xl font-semibold transition-all duration-300
                     hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30
                     hover:-translate-y-0.5 group"
          >
            View All Products
            <ArrowRight className="w-5 h-5 transition-transform duration-300
                                 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
