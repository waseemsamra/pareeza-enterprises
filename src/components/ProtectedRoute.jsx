import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check localStorage FIRST
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('idToken');

      console.log('🔍 [ProtectedRoute] Checking auth...', {
        hasStoredUser: !!storedUser,
        hasToken: !!storedToken
      });

      if (storedUser && storedToken) {
        const user = JSON.parse(storedUser);
        const userIsAdmin = user.role === 'admin';

        console.log('✅ [ProtectedRoute] User found:', {
          email: user.email,
          role: user.role,
          isAdmin: userIsAdmin
        });

        setIsAuthenticated(true);
        setIsAdmin(userIsAdmin);
      } else {
        console.log('⚠️ [ProtectedRoute] No stored credentials');
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('❌ [ProtectedRoute] Auth check error:', error);
      setIsAuthenticated(false);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('❌ [ProtectedRoute] Not authenticated');
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    console.log('⚠️ [ProtectedRoute] Not admin');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('✅ [ProtectedRoute] Access granted');
  return children;
};

export default ProtectedRoute;
