import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Award, Sprout } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Static data
  const aboutData = {
    badge: 'About Us',
    title: 'Why Choose Our Products?',
    subtitle: 'We provide the highest quality food products sourced from sustainable farms.',
    features: [
      { icon: Sprout, title: 'Sustainable Farming', description: 'Eco-friendly practices that protect the environment.', image: '/about-sustainable.jpg' },
      { icon: Award, title: 'Premium Quality', description: 'Rigorous quality control ensures highest grade nutrients.', image: '/about-quality.jpg' },
      { icon: Leaf, title: 'Wide Variety', description: 'Complete range of feed products for all livestock.', image: '/about-variety.jpg' },
    ],
    stats: [
      { value: '15+', label: 'Years Experience' },
      { value: '5000+', label: 'Happy Customers' },
      { value: '50+', label: 'Products' },
      { value: '99%', label: 'Satisfaction Rate' },
    ],
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-badge', { y: 30, opacity: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.about-title', { y: 50, opacity: 0, duration: 0.8, delay: 0.1, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.about-text', { y: 30, opacity: 0, duration: 0.6, delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.feature-card', { y: 80, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' } });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="section-padding relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="about-badge inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Leaf className="w-4 h-4" />
            {aboutData.badge}
          </span>
          <h2 className="about-title text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
            {aboutData.title}
          </h2>
          <p className="about-text text-gray-600 text-lg leading-relaxed">
            {aboutData.subtitle}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutData.features.map((feature, index) => (
            <div key={index} className="feature-card group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-56 overflow-hidden">
                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {aboutData.stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
