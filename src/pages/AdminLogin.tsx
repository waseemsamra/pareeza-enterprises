import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from 'aws-amplify/auth';
import { toast } from 'sonner';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('🔐 [AdminLogin] Attempting login...', formData.email);

      const { isSignedIn, nextStep } = await signIn({
        username: formData.email,
        password: formData.password,
      });

      console.log('🔐 [AdminLogin] SignIn response:', { isSignedIn, nextStep });

      if (isSignedIn) {
        // Get the session token
        const { fetchAuthSession } = await import('aws-amplify/auth');
        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken?.toString();
        const accessToken = session.tokens?.accessToken?.toString();
        
        console.log('✅ [AdminLogin] Session tokens obtained');

        // Store user info and token
        const userObj = {
          email: formData.email,
          name: formData.email.split('@')[0],
          role: 'admin',
          userId: formData.email
        };

        localStorage.setItem('user', JSON.stringify(userObj));
        
        if (idToken) {
          localStorage.setItem('idToken', idToken);
        }
        
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
        }

        toast.success('Welcome back!', {
          description: 'Accessing admin console...'
        });

        // Redirect to admin dashboard
        setTimeout(() => {
          navigate('/admin');
        }, 500);
      } else {
        // Handle multi-step auth (TOTP, etc.)
        console.log('⚠️ [AdminLogin] Additional step required:', nextStep);
        
        if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
          toast.info('Please verify your email');
          navigate('/verify', { state: { email: formData.email } });
        } else if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_TOTP_CODE') {
          toast.info('TOTP verification required');
          navigate('/totp', { state: { email: formData.email } });
        } else {
          toast.error('Additional verification required');
        }
      }
    } catch (error: any) {
      console.error('❌ [AdminLogin] Error:', error);
      
      let errorMessage = 'Login failed. Please check your credentials.';
      
      if (error.name === 'UserNotConfirmedException') {
        errorMessage = 'Please verify your email address first.';
        navigate('/verify', { state: { email: formData.email } });
      } else if (error.name === 'UserNotFoundException') {
        errorMessage = 'No account found with this email.';
      } else if (error.name === 'NotAuthorizedException') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.name === 'TooManyRequestsException') {
        errorMessage = 'Too many attempts. Please try again later.';
      }

      toast.error('Sign In Failed', {
        description: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body text-on-surface antialiased">
      <main className="flex-grow flex flex-col md:flex-row h-screen">
        {/* Brand/Visual Side (Split-Screen Layout) */}
        <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-primary-container">
          <div className="absolute inset-0 z-0">
            <img
              alt="Agricultural Overview"
              className="w-full h-full object-cover opacity-60"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmvN8LZBIFiIu7WaaZbjYHBJyHH94PpRukzTYyMoQpHbhrTJnUHR5om1Trubk1w5GzVGf0rJyZQFPhtUj50ovNckCO0XhYXPT0nQ5BYTbFGpvdDt3CTjdlXVxAxlofVpu449B7bTdZ72z8v43YW-xT7hZPjSMKZHkjZGC7lZuPhiSQIwRY8NU4ham0N2Ninzb_fbXuTmLB6wnuLcrDnfhG4hNknoHL6pJOD8vRvXhMuucxJRQVT4hDq5VZmJJU-AL8Wba2fy_3trls"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary via-transparent to-transparent"></div>
          </div>
          <div className="relative z-10 flex flex-col justify-between p-16 w-full text-white">
            <div>
              <h1 className="font-headline font-extrabold text-4xl tracking-tighter mb-2">
                Pareeza Enterprises Admin
              </h1>
              <p className="font-body text-on-primary-container max-w-sm opacity-90 leading-relaxed">
                Pareeza Enterprises Editorial Super Admin Console. Manage global harvest logs and editorial workflows with precision.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface/10 flex items-center justify-center backdrop-blur-md">
                  <span className="material-symbols-outlined text-tertiary-fixed">verified_user</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">Tier 1 Security</p>
                  <p className="text-xs text-on-primary-container/80">Encrypted session management active.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-surface">
          <div className="w-full max-w-md space-y-10">
            {/* Mobile Branding */}
            <div className="md:hidden text-center mb-8">
              <h1 className="font-headline font-extrabold text-3xl tracking-tighter text-primary">
                Pareeza Enterprises Admin
              </h1>
              <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-surface-container-high rounded-full">
                <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                <span className="text-[10px] font-label uppercase tracking-widest font-bold text-on-surface-variant">
                  Secure Super Admin Access
                </span>
              </div>
            </div>

            {/* Header for Form */}
            <div className="space-y-2">
              <div className="hidden md:inline-flex items-center gap-2 mb-4 px-3 py-1 bg-surface-container-high rounded-full">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                <span className="text-[10px] font-label uppercase tracking-widest font-bold text-on-surface-variant">
                  Secure Super Admin Access
                </span>
              </div>
              <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight">
                Sign In to Console
              </h2>
              <p className="text-on-surface-variant text-sm">
                Enter your credentials to access the internal curation engine.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Email Field */}
                <div className="group">
                  <label
                    className="block text-[10px] font-label font-bold uppercase tracking-wider text-on-surface-variant mb-1 transition-colors group-focus-within:text-primary"
                    htmlFor="email"
                  >
                    Admin Email
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 text-on-surface placeholder-on-surface-variant/40 transition-all font-body"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@globalagrarian.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={loading}
                    />
                    <span className="material-symbols-outlined absolute right-0 top-3 text-on-surface-variant/50 text-xl">
                      alternate_email
                    </span>
                  </div>
                </div>

                {/* Password Field */}
                <div className="group">
                  <label
                    className="block text-[10px] font-label font-bold uppercase tracking-wider text-on-surface-variant mb-1 transition-colors group-focus-within:text-primary"
                    htmlFor="password"
                  >
                    Secure Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-surface-container-low border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-0 py-3 text-on-surface placeholder-on-surface-variant/40 transition-all font-body"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      disabled={loading}
                    />
                    <span className="material-symbols-outlined absolute right-0 top-3 text-on-surface-variant/50 text-xl">
                      key
                    </span>
                  </div>
                </div>
              </div>

              {/* Helpers */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    className="w-4 h-4 rounded-sm border-outline-variant text-primary focus:ring-primary/20 bg-surface"
                    type="checkbox"
                    checked={formData.remember}
                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                    disabled={loading}
                  />
                  <span className="ml-2 text-xs font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">
                    Remember device
                  </span>
                </label>
                <a className="text-xs font-bold text-primary hover:text-primary-container transition-colors tracking-tight" href="#">
                  Forgot Password?
                </a>
              </div>

              {/* CTA */}
              <button
                className="w-full py-4 bg-primary text-on-primary font-headline font-bold text-sm tracking-wide rounded-md hover:bg-primary-container shadow-lg shadow-primary/10 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In to Console
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Status Signal */}
            <div className="pt-8 border-t border-outline-variant/30 flex items-center gap-3">
              <div className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-container opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
              </div>
              <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest font-semibold">
                Global Logistics Status: <span className="text-on-surface">Live & Synchronized</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-12 flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-900 dark:bg-black z-40">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <span className="text-sm font-bold text-white">
            © 2024 Pareeza Enterprises. Secure Super Admin Portal.
          </span>
          <div className="h-4 w-[1px] bg-zinc-700 hidden md:block"></div>
          <div className="flex gap-6">
            <a className="font-inter text-xs tracking-wider uppercase text-zinc-500 hover:text-white transition-colors" href="#">
              Security Policy
            </a>
            <a className="font-inter text-xs tracking-wider uppercase text-zinc-500 hover:text-white transition-colors" href="#">
              System Status
            </a>
            <a className="font-inter text-xs tracking-wider uppercase text-zinc-500 hover:text-white transition-colors" href="#">
              Privacy
            </a>
            <a className="font-inter text-xs tracking-wider uppercase text-zinc-500 hover:text-white transition-colors" href="#">
              Contact Support
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          <span className="font-inter text-[10px] tracking-widest uppercase text-green-500">
            Service Operational
          </span>
        </div>
      </footer>
    </div>
  );
};

export default AdminLogin;
