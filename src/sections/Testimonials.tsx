import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Static data
  const testimonials = [
    { id: 1, name: 'John Smith', role: 'Dairy Farm Owner', content: 'Best quality hay we have ever purchased. Our cattle production has increased significantly.', rating: 5, avatar: 'JS' },
    { id: 2, name: 'Sarah Johnson', role: 'Horse Trainer', content: 'Reliable delivery and excellent service. The Timothy hay is always fresh and my horses love it.', rating: 5, avatar: 'SJ' },
    { id: 3, name: 'Mike Williams', role: 'Livestock Rancher', content: 'Our livestock loves their products. The alfalfa pellets are a game-changer for winter feeding.', rating: 5, avatar: 'MW' },
  ];

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonials-badge', { y: 30, opacity: 0, duration: 0.6, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.testimonials-title', { y: 50, opacity: 0, duration: 0.8, delay: 0.1, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.testimonials-slider', { y: 60, opacity: 0, duration: 0.8, delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="section-padding relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="testimonials-badge inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <MessageSquare className="w-4 h-4" />
            Testimonials
          </span>
          <h2 className="testimonials-title text-3xl sm:text-4xl lg:text-5xl font-bold text-dark">
            What Our Clients Say
          </h2>
        </div>

        <div ref={sliderRef} className="testimonials-slider max-w-4xl mx-auto">
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-card p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-8 right-8 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Quote className="w-8 h-8 text-primary" />
              </div>
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-dark leading-relaxed mb-8">
                  "{testimonials[activeIndex].content}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{testimonials[activeIndex].avatar}</span>
                  </div>
                  <div>
                    <div className="font-bold text-dark text-lg">{testimonials[activeIndex].name}</div>
                    <div className="text-gray-500">{testimonials[activeIndex].role}</div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-light to-accent" />
            </div>

            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button key={index} onClick={() => setActiveIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-primary w-8' : 'bg-gray-300 hover:bg-gray-400'}`} />
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={prevSlide} className="w-12 h-12 rounded-xl bg-white shadow-card flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextSlide} className="w-12 h-12 rounded-xl bg-white shadow-card flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <p className="text-center text-gray-500 text-sm mb-8">Trusted by leading farms and ranches</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {['FarmCo', 'AgriTech', 'GreenFields', 'LiveStock Pro', 'DairyBest'].map((name, i) => (
              <div key={i} className="text-xl md:text-2xl font-bold text-gray-400 hover:text-primary transition-colors duration-300 cursor-default">{name}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
