import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmSignUp } from 'aws-amplify/auth';
import { toast } from 'sonner';

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  
  const email = location.state?.email || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('🔐 [EmailVerification] Verifying email code for:', email);

      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      console.log('✅ [EmailVerification] Email verification result:', { isSignUpComplete, nextStep });

      if (isSignUpComplete) {
        toast.success('Email verified successfully!', {
          description: 'You can now sign in to your account.'
        });

        // Redirect to login page
        setTimeout(() => {
          navigate('/admin-login', { state: { email, verified: true } });
        }, 1500);
      } else {
        toast.error('Verification failed', {
          description: 'Invalid verification code. Please try again.'
        });
      }
    } catch (error: any) {
      console.error('❌ [EmailVerification] Error:', error);
      
      let errorMessage = 'Verification failed. Please check your verification code.';
      
      if (error.name === 'CodeMismatchException') {
        errorMessage = 'Invalid verification code. Please check your email and try again.';
      } else if (error.name === 'ExpiredCodeException') {
        errorMessage = 'Verification code has expired. Please request a new one.';
      } else if (error.name === 'TooManyFailedAttemptsException') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }

      toast.error('Verification Failed', {
        description: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const { resendSignUpCode } = await import('aws-amplify/auth');
      await resendSignUpCode({ username: email });
      
      toast.success('Verification code resent!', {
        description: 'Check your email for the new verification code.'
      });
    } catch (error: any) {
      console.error('❌ [EmailVerification] Resend error:', error);
      toast.error('Failed to resend code', {
        description: 'Please check your email address and try again.'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body text-on-surface antialiased">
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="font-headline font-extrabold text-3xl tracking-tighter text-primary mb-2">
              Pareeza Enterprises Admin
            </h1>
            <p className="font-body text-on-surface-variant">
              Verify your email address
            </p>
          </div>

          {/* Email Display */}
          <div className="bg-surface-variant rounded-lg p-4 text-center">
            <p className="text-sm text-on-surface-variant">
              We sent a verification code to:
            </p>
            <p className="font-medium text-on-surface mt-1">{email}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-on-surface mb-2">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="w-full px-4 py-3 border border-outline rounded-lg bg-surface-variant text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent"
                maxLength={6}
                pattern="[0-9]{6}"
                required
                disabled={loading}
              />
              <p className="mt-2 text-sm text-on-surface-variant">
                Enter the 6-digit code from your email
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full bg-primary text-on-primary py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          {/* Help Section */}
          <div className="text-center space-y-4">
            <button
              onClick={handleResend}
              className="text-primary hover:text-primary/90 text-sm font-medium"
            >
              Didn't receive the code? Resend
            </button>
            
            <div className="text-sm text-on-surface-variant">
              <p>Check your spam folder if you don't see the email</p>
              <p className="mt-1">The code will expire in 24 hours</p>
            </div>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <button
              onClick={() => navigate('/admin-login')}
              className="text-on-surface-variant hover:text-primary text-sm"
            >
              ← Back to login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmailVerification;
