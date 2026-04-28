import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Leaf, ArrowRight, 
  Truck, Shield, Clock, ChevronRight, Star,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const productData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  detailImage: string;
  specifications: { label: string; value: string }[];
  benefits: string[];
  uses: string[];
  relatedProducts: string[];
}> = {
  hay: {
    title: 'Hay Products',
    subtitle: 'Premium Grass Hays',
    description: 'Our hay products are carefully harvested and cured to preserve maximum nutritional value.',
    longDescription: 'Our premium hay products are sourced from the finest grasslands, carefully harvested at the optimal time to ensure maximum nutritional content. Each bale is inspected for quality, moisture content, and leaf retention. We offer Rhodes Grass, Timothy Hay, and Rye Grass - each suited for different livestock needs and dietary requirements.',
    image: '/product-hay.jpg',
    detailImage: '/detail-rhodes.jpg',
    specifications: [
      { label: 'Protein Content', value: '8-12%' },
      { label: 'Moisture', value: '< 15%' },
      { label: 'Fiber', value: '25-35%' },
      { label: 'Bale Weight', value: '15-25 kg' },
      { label: 'Storage', value: 'Dry, ventilated' },
    ],
    benefits: [
      'High fiber content aids digestion',
      'Natural source of vitamins and minerals',
      'Low in non-structural carbohydrates',
      'Promotes healthy gut function',
      'Helps maintain ideal body weight',
    ],
    uses: [
      'Daily feed for horses and cattle',
      'Supplemental fiber source',
      'Bedding material',
      'Forage for small animals',
    ],
    relatedProducts: ['alfalfa', 'straw', 'grain'],
  },
  alfalfa: {
    title: 'Alfalfa Products',
    subtitle: 'Protein-Rich Feed',
    description: 'Alfalfa is known as the "queen of forages" due to its high protein content.',
    longDescription: 'Alfalfa is one of the most nutrient-dense forages available, providing high levels of protein, calcium, and vitamins. Our alfalfa products are harvested at early bloom to maximize leaf content and nutritional value. Perfect for growing, lactating, and working animals that require extra energy and protein.',
    image: '/product-alfalfa.jpg',
    detailImage: '/product-alfalfa.jpg',
    specifications: [
      { label: 'Protein Content', value: '18-22%' },
      { label: 'Calcium', value: '1.2-1.5%' },
      { label: 'Energy', value: 'High' },
      { label: 'Form', value: 'Hay, Pellets, Meal' },
      { label: 'Best For', value: 'Dairy, Growing animals' },
    ],
    benefits: [
      'Exceptional protein content',
      'Rich in calcium for bone health',
      'High energy for active animals',
      'Excellent palatability',
      'Supports milk production',
    ],
    uses: [
      'Dairy cattle feed',
      'Growing youngstock',
      'Working horses',
      'Pregnant and lactating animals',
    ],
    relatedProducts: ['hay', 'pellets', 'grain'],
  },
  straw: {
    title: 'Straw Products',
    subtitle: 'Quality Bedding & Feed',
    description: 'Our straw products serve dual purposes - as bedding material and low-nutrient feed supplement.',
    longDescription: 'Straw is an essential farm product with multiple uses. As bedding, it provides comfort, warmth, and absorption for livestock. As feed, it adds fiber to the diet and helps maintain digestive health. Our straw is thoroughly cleaned to minimize dust and contaminants.',
    image: '/product-straw.jpg',
    detailImage: '/product-straw.jpg',
    specifications: [
      { label: 'Type', value: 'Wheat, Barley, Oat' },
      { label: 'Length', value: '5-15 cm' },
      { label: 'Dust Level', value: 'Low' },
      { label: 'Absorption', value: 'High' },
      { label: 'Packaging', value: 'Bales, Loose' },
    ],
    benefits: [
      'Excellent bedding material',
      'Good absorption properties',
      'Low cost feed supplement',
      'High fiber content',
      'Comfortable for animals',
    ],
    uses: [
      'Animal bedding',
      'Fiber supplement',
      'Erosion control',
      'Composting material',
    ],
    relatedProducts: ['hay', 'grain', 'pellets'],
  },
  grain: {
    title: 'Grain & Silage',
    subtitle: 'High-Energy Feed',
    description: 'Energy-dense grain products and fermented silage for maximum livestock performance.',
    longDescription: 'Our grain and silage products provide concentrated energy for high-performance livestock. Corn silage offers a perfect balance of fiber and energy, while our grain mixes can be customized to meet specific nutritional requirements. All products are tested for quality and safety.',
    image: '/product-grain.jpg',
    detailImage: '/detail-silage.jpg',
    specifications: [
      { label: 'Energy Content', value: 'High' },
      { label: 'Starch', value: '25-35%' },
      { label: 'Form', value: 'Whole, Ground, Silage' },
      { label: 'Moisture (Silage)', value: '60-70%' },
      { label: 'Storage Life', value: '12+ months' },
    ],
    benefits: [
      'High energy for growth',
      'Improved feed efficiency',
      'Fermented for digestibility',
      'Year-round availability',
      'Cost-effective nutrition',
    ],
    uses: [
      'Finishing cattle',
      'High-production dairy',
      'Working animals',
      'Energy supplementation',
    ],
    relatedProducts: ['alfalfa', 'pellets', 'hay'],
  },
  pellets: {
    title: 'Pellets & Capsules',
    subtitle: 'Convenient Nutrition',
    description: 'Compressed feed products offering convenience without compromising nutrition.',
    longDescription: 'Our pellets and capsules provide complete nutrition in a convenient, easy-to-feed form. The pelleting process reduces waste, improves digestibility, and ensures consistent nutrient intake. Capsules offer targeted supplementation for specific health needs.',
    image: '/product-pellets.jpg',
    detailImage: '/product-pellets.jpg',
    specifications: [
      { label: 'Diameter', value: '6-8 mm' },
      { label: 'Length', value: '10-20 mm' },
      { label: 'Density', value: 'High' },
      { label: 'Durability', value: '> 95%' },
      { label: 'Packaging', value: '25kg, 50kg, Bulk' },
    ],
    benefits: [
      'Minimal feed waste',
      'Easy to measure and feed',
      'Improved digestibility',
      'Consistent nutrition',
      'Long shelf life',
    ],
    uses: [
      'Daily complete feed',
      'Supplement delivery',
      'Travel and shows',
      'Automatic feeders',
    ],
    relatedProducts: ['alfalfa', 'grain', 'straw'],
  },
};

const ProductDetail = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  const product = category ? productData[category] : null;

  useEffect(() => {
    if (!product) {
      navigate('/products');
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from('.detail-hero-content', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.detail-main-image', {
        scale: 1.1,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });

      gsap.from('.detail-info-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.detail-info-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, [product, navigate]);

  if (!product) return null;

  const relatedProductsList = product.relatedProducts
    .map(id => ({ id, ...productData[id] }))
    .filter(p => p.title);

  return (
    <div ref={pageRef} className="pt-20">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-dark overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/70" />
        </div>

        <div className="section-padding relative z-10">
          <div className="detail-hero-content">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/products" className="hover:text-white transition-colors">Products</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{product.title}</span>
            </div>

            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 
                           text-primary-light rounded-full text-sm font-medium mb-4">
              <span className="material-symbols-outlined">package</span>
              {product.subtitle}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {product.title}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
              {product.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <div className="detail-main-image relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={product.detailImage}
                  alt={product.title}
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 fill-accent text-accent" />
                  <div>
                    <div className="text-2xl font-bold">Premium</div>
                    <div className="text-white/80 text-sm">Quality Guaranteed</div>
                  </div>
                </div>
              </div>

              {/* Decorative */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl -z-10" />
            </div>

            {/* Info */}
            <div className="detail-info-section space-y-8">
              <div className="detail-info-card">
                <h2 className="text-2xl font-bold text-dark mb-4">
                  About {product.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              {/* Specifications */}
              <div className="detail-info-card bg-green-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">package</span>
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index}>
                      <div className="text-sm text-gray-500">{spec.label}</div>
                      <div className="font-semibold text-dark">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="detail-info-card">
                <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="material-symbols-outlined w-4 h-4">check</span>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Uses */}
              <div className="detail-info-card">
                <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-primary" />
                  Recommended Uses
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.uses.map((use, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="detail-info-card flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white 
                           px-6 py-3.5 rounded-xl font-semibold transition-all duration-300
                           hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30
                           hover:-translate-y-0.5 group"
                >
                  Request Quote
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 
                                       group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center gap-2 bg-green-50 text-primary 
                           px-6 py-3.5 rounded-xl font-semibold transition-all duration-300
                           hover:bg-green-100"
                >
                  <span className="material-symbols-outlined w-5 h-5 text-blue-600">phone</span>
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-green-50/50">
        <div className="section-padding">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">
              Why Choose Our {product.title}?
            </h2>
            <p className="text-gray-600">
              We take pride in delivering only the best quality products to our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Quality Assured', desc: 'Rigorous testing and quality control' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Reliable shipping to your location' },
              { icon: Clock, title: 'Fresh Stock', desc: 'Regular inventory turnover' },
              { icon: Star, title: 'Expert Support', desc: 'Professional guidance available' },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-card
                         hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-dark mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-padding">
          <h2 className="text-2xl font-bold text-dark mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProductsList.map((related) => (
              <Link
                key={related.id}
                to={`/products/${related.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-card
                         hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-cover transition-transform duration-500
                             group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-lg font-bold text-white">{related.title}</h3>
                    <p className="text-white/80 text-sm">{related.subtitle}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm line-clamp-2">{related.description}</p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium mt-3
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Details
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Back Button */}
      <div className="section-padding pb-16">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-primary font-medium
                   hover:text-primary-dark transition-colors duration-300"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to All Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
