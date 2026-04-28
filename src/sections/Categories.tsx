import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Tag, Loader2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Category {
  id: number | string;
  name: string;
  description: string;
  color: string;
  image?: string;
  productCount?: number;
}

const API_URL = 'https://euwheigeak.execute-api.us-east-1.amazonaws.com/prod';

const CategoriesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    loadCategories();
    
    // Responsive items per page
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/categories`);
      
      if (!response.ok) {
        throw new Error('Failed to load categories');
      }
      
      const data = await response.json();
      
      const transformedCategories = data.map((item: any) => ({
        id: item.id || item.PK?.replace('CATEGORY#', '') || Date.now(),
        name: item.name || item.data?.name || 'Category',
        description: item.description || item.data?.description || '',
        color: item.color || item.data?.color || '#3b82f6',
        image: item.image || item.data?.image || '',
        productCount: item.productCount || item.data?.productCount || 0
      }));
      
      setCategories(transformedCategories);
    } catch (error: any) {
      console.error('Error loading categories:', error);
      // Fallback data
      setCategories([
        { id: 1, name: 'Hay Products', description: 'Premium grass hays', color: '#10b981', image: '', productCount: 3 },
        { id: 2, name: 'Alfalfa Products', description: 'High-protein alfalfa', color: '#3b82f6', image: '', productCount: 3 },
        { id: 3, name: 'Straw Products', description: 'Quality wheat and barley straw', color: '#f59e0b', image: '', productCount: 3 },
        { id: 4, name: 'Grain & Silage', description: 'Nutrient-rich grain products', color: '#ef4444', image: '', productCount: 3 },
        { id: 5, name: 'Pellets & Capsules', description: 'Convenient feed pellets', color: '#8b5cf6', image: '', productCount: 3 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && categories.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from('.categories-badge', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        gsap.from('.categories-title', {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        gsap.from('.categories-subtitle', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        gsap.from('.category-card', {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [loading, categories]);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev >= categories.length - itemsPerPage ? 0 : prev + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev <= 0 ? Math.max(0, categories.length - itemsPerPage) : prev - itemsPerPage
    );
  };

  const visibleCategories = categories.slice(currentIndex, currentIndex + itemsPerPage);

  if (loading) {
    return (
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-white to-accent/5">
        <div className="section-padding text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-white to-accent/5 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

      <div className="section-padding relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="categories-badge inline-flex items-center gap-2 px-4 py-2
                         bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Tag className="w-4 h-4" />
            Product Categories
          </span>
          <h2 className="categories-title text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
            Shop by <span className="text-gradient">Category</span>
          </h2>
          <p className="categories-subtitle text-gray-600 text-lg">
            Browse our premium food products organized by category
            for easy navigation and selection.
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 hover:-translate-x-1"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / itemsPerPage) === index
                    ? 'bg-primary w-8'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= categories.length - itemsPerPage}
            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 hover:translate-x-1"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleCategories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="category-card group relative bg-white rounded-2xl overflow-hidden
                       shadow-card hover:shadow-card-hover transition-all duration-500
                       hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform
                             duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Tag className="w-16 h-16" style={{ color: category.color }} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Product Count Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm
                              rounded-full text-xs font-bold text-dark">
                  {category.productCount || 0} Products
                </div>

                {/* Category Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* View Products Link */}
                <div className="flex items-center gap-2 text-primary font-semibold
                              group-hover:gap-4 transition-all duration-300">
                  View Products
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              {/* Color Border */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: category.color }}
              />
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/categories"
            className="inline-flex items-center gap-3 bg-primary text-white
                     px-8 py-4 rounded-xl font-semibold transition-all duration-300
                     hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30
                     hover:-translate-y-0.5 group"
          >
            View All Categories
            <ArrowRight className="w-5 h-5 transition-transform duration-300
                                 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
