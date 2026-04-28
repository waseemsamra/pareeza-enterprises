import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface Category {
  id: number | string;
  name: string;
  description: string;
  color: string;
  image?: string;
  productCount?: number;
}

const API_URL = 'https://euwheigeak.execute-api.us-east-1.amazonaws.com/prod';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined mr-2 animate-spin">progress_activity</span>
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="section-padding py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="section-padding py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Browse by Category
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our products organized by category for easy navigation and selection.
          </p>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="text-center py-16">
            <span className="material-symbols-outlined">label</span>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Categories Found</h3>
            <p className="text-gray-500">Check back later for product categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="group relative bg-white rounded-2xl overflow-hidden
                         shadow-card hover:shadow-card-hover transition-all duration-500
                         hover:-translate-y-2"
              >
                {/* Image/Color Background */}
                <div className="relative h-48 overflow-hidden">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform
                               duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/category-placeholder.jpg';
                      }}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center transition-transform
                               duration-700 group-hover:scale-105"
                      style={{ backgroundColor: category.color }}
                    >
                      <span className="material-symbols-outlined">label</span>
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
                    <h3 className="text-2xl font-bold text-white mb-1">
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
                    <span className="material-symbols-outlined">arrow_forward</span>
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
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Categories;
