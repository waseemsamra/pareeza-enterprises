import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { signIn, signOut, fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (_name: string, _email: string, _password: string, _company?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = 'agrofeed_current_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await fetchAuthSession();
        if (session.tokens) {
          // User is authenticated, get attributes
          const attributes = await fetchUserAttributes();
          // Check for custom:role or custom_role attribute
          const userRole = (attributes['custom:role'] || attributes['custom_role'] || 'user') as 'user' | 'admin';
          
          const userWithoutPassword: User = {
            id: attributes.sub || '',
            email: attributes.email || '',
            name: attributes.name || '',
            company: attributes.custom_company || attributes['custom:company'] || '',
            role: userRole,
          };
          setUser(userWithoutPassword);
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
        } else {
          // Check localStorage for cached user
          const storedUser = localStorage.getItem(CURRENT_USER_KEY);
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        // Check localStorage as fallback
        const storedUser = localStorage.getItem(CURRENT_USER_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await signIn({ username: email, password });

      if (result.isSignedIn) {
        const attributes = await fetchUserAttributes();
        // Check for custom:role or custom_role attribute
        const userRole = (attributes['custom:role'] || attributes['custom_role'] || 'user') as 'user' | 'admin';
        
        const userWithoutPassword: User = {
          id: attributes.sub || '',
          email: attributes.email || '',
          name: attributes.name || '',
          company: attributes.custom_company || attributes['custom:company'] || '',
          role: userRole,
        };
        setUser(userWithoutPassword);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
        toast.success('Welcome back!', {
          description: 'You have successfully logged in.',
        });
        setIsLoading(false);
        return true;
      }

      setIsLoading(false);
      return false;
    } catch (error: any) {
      toast.error('Login failed', {
        description: error.message || 'Invalid email or password',
      });
      setIsLoading(false);
      return false;
    }
  };

  const register = async (_name: string, _email: string, _password: string, _company?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      toast.error('Registration not available', {
        description: 'Please contact admin to create an account',
      });
      setIsLoading(false);
      return false;
    } catch (error: any) {
      toast.error('Registration failed', {
        description: error.message || 'Could not create account',
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }

    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    toast.success('Logged out', {
      description: 'You have been successfully logged out.',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
