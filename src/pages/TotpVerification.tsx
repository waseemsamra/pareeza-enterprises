import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmSignIn } from 'aws-amplify/auth';
import { toast } from 'sonner';

const TotpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  
  const email = location.state?.email || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('🔐 [TotpVerification] Verifying TOTP code for:', email);

      const { isSignedIn, nextStep } = await confirmSignIn({
        challengeResponse: code,
      });

      console.log('✅ [TotpVerification] TOTP verification result:', { isSignedIn, nextStep });

      if (isSignedIn) {
        // Get the session token
        const { fetchAuthSession } = await import('aws-amplify/auth');
        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken?.toString();
        const accessToken = session.tokens?.accessToken?.toString();
        
        console.log('✅ [TotpVerification] Session tokens obtained');

        // Store user info and token
        const userObj = {
          email: email,
          name: email.split('@')[0],
          role: 'admin',
          userId: email
        };

        localStorage.setItem('user', JSON.stringify(userObj));
        
        if (idToken) {
          localStorage.setItem('idToken', idToken);
        }
        
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
        }

        toast.success('Authentication successful!', {
          description: 'Accessing admin console...'
        });

        // Redirect to admin dashboard
        setTimeout(() => {
          navigate('/admin');
        }, 500);
      } else {
        toast.error('Verification failed', {
          description: 'Invalid authorization code. Please try again.'
        });
      }
    } catch (error: any) {
      console.error('❌ [TotpVerification] Error:', error);
      
      let errorMessage = 'Verification failed. Please check your authorization code.';
      
      if (error.name === 'CodeMismatchException') {
        errorMessage = 'Invalid authorization code. Please try again.';
      } else if (error.name === 'ExpiredCodeException') {
        errorMessage = 'Authorization code has expired. Please request a new one.';
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
      toast.info('Resending authorization code...', {
        description: 'Check your authenticator app for a new code.'
      });
      // Note: AWS Cognito TOTP codes are time-based and automatically refresh
    } catch (error) {
      toast.error('Failed to resend code');
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
              Enter your authorization code
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-on-surface mb-2">
                Authorization Code
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
                Open your authenticator app and enter the 6-digit code
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full bg-primary text-on-primary py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
          </form>

          {/* Help Section */}
          <div className="text-center space-y-4">
            <button
              onClick={handleResend}
              className="text-primary hover:text-primary/90 text-sm font-medium"
            >
              Need a new code?
            </button>
            
            <div className="text-sm text-on-surface-variant">
              <p>Having trouble?</p>
              <ul className="mt-2 space-y-1">
                <li>• Make sure your device time is correct</li>
                <li>• Check your authenticator app</li>
                <li>• Codes refresh every 30 seconds</li>
              </ul>
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

export default TotpVerification;
