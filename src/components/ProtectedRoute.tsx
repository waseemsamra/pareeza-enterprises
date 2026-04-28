import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user, isAdmin } = useAuth();
  const location = useLocation();

  console.log('🔒 [ProtectedRoute]', {
    path: location.pathname,
    isAuthenticated,
    isLoading,
    userEmail: user?.email,
    userRole: user?.role,
    isAdmin: isAdmin
  });

  // Show loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    console.log('❌ [ProtectedRoute] Not authenticated - redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admin route - check if user is admin
  if (location.pathname.startsWith('/admin')) {
    // Check if user is admin by role or by email
    const isAdminUser = isAdmin || user?.email === 'waseemsamra@gmail.com';
    console.log('🔐 [ProtectedRoute] Admin route check:', { isAdminUser, email: user?.email, role: user?.role });

    if (!isAdminUser) {
      console.log('❌ [ProtectedRoute] Not admin - redirecting to dashboard');
      return <Navigate to="/dashboard" replace />;
    }
    console.log('✅ [ProtectedRoute] Admin access granted');
  }

  return <>{children}</>;
};

export default ProtectedRoute;
