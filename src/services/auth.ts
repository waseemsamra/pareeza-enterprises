import { signIn, signOut, getCurrentUser, fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth';

interface LoginResult {
  success: boolean;
  isAdmin: boolean;
  user: { email: string; role: string };
  redirectTo: string;
}

class AuthService {
  async login(email: string, password: string): Promise<LoginResult> {
    try {
      console.log('🔐 [AuthService] Login attempt for:', email);
      
      // First, sign out any existing user
      try {
        await signOut({ global: true });
        console.log('🗑️ [AuthService] Cleared existing session');
      } catch (signOutError) {
        console.log('ℹ️ [AuthService] No existing session to clear');
      }
      
      // Wait a moment for sign out to complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('✅ [AuthService] Attempting sign in...');
      
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password: password,
        options: {
          authFlowType: 'USER_PASSWORD_AUTH'
        }
      });

      console.log('✅ [AuthService] Sign in result:', { isSignedIn, nextStep });

      if (!isSignedIn) {
        throw new Error('Login failed');
      }

      // Get user attributes
      const attributes = await fetchUserAttributes();
      console.log('📋 [AuthService] User attributes:', attributes);

      // Check role from attributes
      let userRole = attributes['custom:role'] || attributes.role || 'user';
      console.log('👤 [AuthService] Detected role:', userRole);

      // FALLBACK: If email is admin email, force admin role
      if (email === 'waseemsamra@gmail.com') {
        console.log('🔑 [AuthService] Admin email detected - forcing admin role');
        userRole = 'admin';
      }

      const isAdmin = userRole === 'admin';
      console.log('🔑 [AuthService] Is admin:', isAdmin);

      // Store user info with correct role
      localStorage.setItem('user', JSON.stringify({
        email: attributes.email || email,
        role: userRole,
        name: attributes.name || ''
      }));

      // Get tokens
      const session = await fetchAuthSession();
      if (session?.tokens?.idToken) {
        localStorage.setItem('idToken', session.tokens.idToken.toString());
      }

      return {
        success: true,
        isAdmin,
        user: { email: attributes.email || email, role: userRole },
        redirectTo: isAdmin ? '/admin' : '/dashboard'
      };

    } catch (error: any) {
      console.error('❌ [AuthService] Login error:', error);
      
      // If it's the "already signed in" error, try to force sign out and retry
      if (error.message && error.message.includes('already a signed in user')) {
        console.log('🔄 [AuthService] Clearing session and retrying...');
        try {
          localStorage.clear();
          await signOut({ global: true });
          await new Promise(resolve => setTimeout(resolve, 1000));
          // Retry login
          return await this.login(email, password);
        } catch (retryError: any) {
          console.error('❌ [AuthService] Retry failed:', retryError);
          throw new Error(retryError.message || 'Login failed');
        }
      }
      
      throw new Error(error.message || 'Login failed');
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut({ global: true });
      localStorage.removeItem('user');
      localStorage.removeItem('idToken');
      console.log('✅ [AuthService] Logged out');
    } catch (error: any) {
      console.error('❌ [AuthService] Logout error:', error);
      // Clear localStorage anyway
      localStorage.removeItem('user');
      localStorage.removeItem('idToken');
    }
  }

  async getCurrentUser(): Promise<any> {
    try {
      // Check localStorage first
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log('📋 [AuthService] User from localStorage:', user);
        return user;
      }

      // Fallback to Cognito
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const userData = {
        email: attributes.email,
        role: attributes['custom:role'] || attributes.role || 'user',
        name: attributes.name,
        userId: user.userId
      };
      console.log('📋 [AuthService] User from Cognito:', userData);
      return userData;
    } catch (error: any) {
      console.error('❌ [AuthService] Get user error:', error);
      return null;
    }
  }

  async isAdmin(): Promise<boolean> {
    try {
      // Check localStorage first
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const userIsAdmin = user.role === 'admin';
        console.log('🔑 [AuthService] Is admin (localStorage):', userIsAdmin);
        return userIsAdmin;
      }

      // Fallback to Cognito
      const attributes = await fetchUserAttributes();
      const role = attributes['custom:role'] || attributes.role || 'user';
      const userIsAdmin = role === 'admin';
      console.log('🔑 [AuthService] Is admin (Cognito):', userIsAdmin);
      return userIsAdmin;
    } catch (error: any) {
      console.error('❌ [AuthService] Is admin error:', error);
      return false;
    }
  }
}

export default new AuthService();
