import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Phone, User, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const EnquiryForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', product: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Enquiry submitted successfully!');
    setTimeout(() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', product: '', message: '' }); }, 3000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.enquiry-image', { x: -80, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.enquiry-form-container', { x: 80, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.from('.form-field', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.enquiry-form', start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-green-50/50 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="enquiry-image relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="/form-farmer.jpg" alt="Farmer with hay" className="w-full h-[500px] lg:h-[600px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-dark mb-2">Get in Touch</h3>
                  <p className="text-gray-600 mb-4">Have questions about our products? We are here to help!</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Phone className="w-5 h-5" />
                      <span className="font-medium">+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent rounded-2xl -z-10" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10" />
          </div>

          <div className="enquiry-form-container">
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                <Mail className="w-4 h-4" />
                Send Enquiry
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">Request a Quote</h2>
              <p className="text-gray-600 leading-relaxed">Fill out the form below and our team will get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="enquiry-form space-y-5">
              <div className="form-field">
                <label className="block text-sm font-medium text-dark mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Smith" className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="form-field">
                  <label className="block text-sm font-medium text-dark mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-white" />
                  </div>
                </div>
                <div className="form-field">
                  <label className="block text-sm font-medium text-dark mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-white" />
                  </div>
                </div>
              </div>

              <div className="form-field">
                <label className="block text-sm font-medium text-dark mb-2">Product Interest</label>
                <select name="product" value={formData.product} onChange={handleChange} required className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-white">
                  <option value="">Select a product</option>
                  <option value="hay">Hay Products</option>
                  <option value="alfalfa">Alfalfa Products</option>
                  <option value="straw">Straw Products</option>
                  <option value="grain">Grain & Silage</option>
                  <option value="pellets">Pellets & Capsules</option>
                </select>
              </div>

              <div className="form-field">
                <label className="block text-sm font-medium text-dark mb-2">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Tell us about your requirements..." className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 bg-white resize-none" />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting || isSubmitted} className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitted ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30'} disabled:cursor-not-allowed`}>
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : isSubmitted ? <><CheckCircle className="w-5 h-5" /> Sent Successfully!</> : <><Send className="w-5 h-5" /> Send Enquiry</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;
