import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Products = () => {
  const categories = [
    { name: 'Rice & Spices', image: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=600', badge: 'Export Grade' },
    { name: 'Meat & Seafood', image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600', badge: 'Fresh Catch' },
    { name: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600', badge: 'Seasonal' },
    { name: 'Nuts & Flavors', image: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=600', badge: 'Artisan' },
  ];

  return (
    <div className="bg-[#f4f4ef] min-h-screen font-sans antialiased">
      <Navigation />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Premium produce collection"
              className="w-full h-full object-cover scale-105"
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
            <div className="max-w-3xl">
              <span className="font-sans text-white uppercase tracking-[0.2em] text-xs mb-4 block">Our Portfolio</span>
              <h1 className="font-headline font-extrabold text-white text-5xl md:text-6xl leading-[1.1] tracking-tight mb-8">
                Curated from the Earth's Finest Harvest.
              </h1>
              <p className="text-white/90 text-lg max-w-xl leading-relaxed">
                Each category represents years of relationships with growers who share our commitment to quality, sustainability, and ethical practices.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-24 bg-[#fafaf5]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-16 max-w-2xl">
              <span className="font-sans text-primary uppercase tracking-widest text-xs block mb-2">Explore Our Range</span>
              <h2 className="font-headline font-bold text-4xl text-[#1a1c19] mb-4">Premium Categories.</h2>
              <p className="text-[#41493e] text-lg leading-relaxed">
                From ancient grain varieties to ocean-fresh seafood, our portfolio spans the globe's most sought-after agricultural products.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/products/${index}`}
                  className={`group relative rounded-xl overflow-hidden editorial-shadow ${index % 2 === 0 ? 'md:mt-0' : 'md:mt-16'}`}
                >
                  <div className="aspect-[4/3] bg-[#eeeee9] overflow-hidden">
                    <img
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      src={category.image}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent"></div>
                  <div className="absolute top-6 right-6 bg-[#3b82f6] px-4 py-2 rounded-full">
                    <span className="text-[10px] font-bold text-[#604100] uppercase tracking-widest">{category.badge}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="font-headline font-bold text-3xl text-white mb-2">{category.name}</h3>
                    <p className="text-white/80 text-sm mb-4">Explore our curated selection</p>
                    <div className="flex items-center gap-2 text-[#604100] font-bold text-sm">
                      View Collection
                      <span className="text-xl">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Horizontal Scroll */}
        <section className="py-24 bg-[#f4f4ef]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="font-sans text-[#1a1c19] uppercase tracking-widest text-xs block mb-2">Seasonal Selection</span>
                <h2 className="font-headline font-bold text-4xl text-[#1a1c19]">Fresh Arrivals</h2>
              </div>
              <Link to="/products" className="bg-[#1a1c19] text-[#604100] px-10 py-4 rounded font-headline font-bold text-sm border-b-2 border-[#001f3f]/20 hover:border-[#001f3f] transition-all pb-1">
                View All Products
              </Link>
            </div>

            <div className="flex gap-8 overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Link
                  key={item}
                  to={`/products/${item}`}
                  className="min-w-[300px] flex-shrink-0 group cursor-pointer"
                >
                  <div className="aspect-[4/5] bg-[#eeeee9] overflow-hidden rounded-xl mb-6 relative">
                    <img
                      alt="Product"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={`https://images.unsplash.com/photo-${1523049673857 + item}?w=600`}
                    />
                    <div className="absolute top-4 right-4 bg-[#ffdeac] px-3 py-1 rounded-full">
                      <span className="text-[10px] font-bold text-[#604100] uppercase">Export Grade</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-headline font-bold text-[#1a1c19] mb-2">Premium Product {item}</h3>
                  <p className="text-[#41493e] text-sm mb-4">Aromatic extra-long grain, aged 2 years.</p>
                  <button className="w-full py-3 border border-[#c0c9bb] text-primary font-bold text-sm rounded hover:bg-primary hover:text-white transition-all">
                    Enquire Now
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#fafaf5]">
          <div className="max-w-5xl mx-auto px-8">
            <div className="bg-[#001f3f] p-12 md:p-20 rounded-[2rem] text-center relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary rounded-full opacity-50"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-headline font-extrabold text-white mb-6">
                  Need a Custom Sourcing Solution?
                </h2>
                <p className="text-[#acf4a4] text-lg mb-10 max-w-xl mx-auto">
                  Our network of boutique global farmers can be mobilized for your specific contractual requirements.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Link to="/contact" className="bg-[#ffdeac] text-[#604100] px-10 py-4 rounded font-headline font-bold text-lg hover:bg-[#ffba38] transition-all">
                    Request Custom Quote
                  </Link>
                  <Link to="/products" className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded font-headline font-bold text-lg hover:bg-white/10 transition-all">
                    Browse Catalog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>


      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-headline {
          font-family: 'Manrope', sans-serif;
        }
        
        .font-body, .font-sans {
          font-family: 'Inter', sans-serif;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .editorial-shadow {
          box-shadow: 0 20px 40px rgba(26, 28, 25, 0.06);
        }
      `}</style>
    </div>
  );
};

export default Products;
