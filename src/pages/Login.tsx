import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('waseemsamra@gmail.com');
  const [password, setPassword] = useState('Admin123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('🚀 [Login] Submitting login for:', email);
      
      // CLEAR old cached data first
      localStorage.removeItem('user');
      localStorage.removeItem('idToken');
      console.log('🗑️ [Login] Cleared old cached data');
      
      const result = await authService.login(email, password);
      console.log('✅ [Login] Login result:', result);
      
      // FORCE admin redirect for admin email
      if (email === 'waseemsamra@gmail.com') {
        console.log('🔑 [Login] ADMIN - Forcing redirect to /admin');
        window.location.replace('/admin');
      } else if (result.isAdmin) {
        console.log('🔑 [Login] Is admin - Going to /admin');
        window.location.replace('/admin');
      } else {
        console.log('👤 [Login] Regular user - Going to /dashboard');
        navigate('/dashboard');
      }
      
    } catch (err: any) {
      console.error('❌ [Login] Error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🌾 AgroFeed CMS</h1>
        <p>Admin Login Portal</p>
        
        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              placeholder="admin@agrofeed.com"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span style={{ marginRight: '8px' }}>⏳</span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div style={{ 
          marginTop: '24px', 
          padding: '16px', 
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          borderRadius: '12px',
          border: '1px solid #bfdbfe'
        }}>
          <p style={{ 
            margin: '0 0 8px 0', 
            fontSize: '13px', 
            color: '#1e40af',
            fontWeight: '600'
          }}>
            🔐 Admin Access Only
          </p>
          <p style={{ 
            margin: 0, 
            fontSize: '12px', 
            color: '#3b82f6'
          }}>
            This system is restricted to authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
