// src/services/auth.js
// Updated for aws-amplify v6
import { signIn, signOut, fetchUserAttributes, fetchAuthSession } from 'aws-amplify/auth';

class AuthService {
  async login(email, password) {
    try {
      console.log('🔐 [AuthService v6] Attempting login for:', email);
      
      // v6 API: signIn returns { isSignedIn, nextStep, ... }
      const result = await signIn({ username: email, password });
      console.log('✅ [AuthService v6] Login result:', result);
      
      if (result.isSignedIn) {
        // Get user attributes
        const attributes = await fetchUserAttributes();
        console.log('📋 [AuthService v6] User attributes:', attributes);
        
        const userRole = attributes['custom:role'] || attributes['role'] || 'user';
        console.log('👤 [AuthService v6] User role:', userRole);
        
        // Store user info
        localStorage.setItem('user', JSON.stringify({
          email: attributes.email || email,
          role: userRole,
          name: attributes.name || ''
        }));
        
        // Get and store token
        const session = await fetchAuthSession();
        if (session.tokens) {
          localStorage.setItem('idToken', session.tokens.idToken.toString());
        }
        
        // Check if admin
        const isAdmin = userRole === 'admin' || email === 'waseemsamra@gmail.com';
        console.log('🔑 [AuthService v6] Is admin:', isAdmin);
        
        return {
          success: true,
          user: { attributes },
          isAdmin,
          redirectTo: isAdmin ? '/admin' : '/dashboard'
        };
      }
      
      return {
        success: false,
        error: 'Login failed'
      };
      
    } catch (error) {
      console.error('❌ [AuthService v6] Login error:', error);
      throw error;
    }
  }
  
  async isAdmin() {
    try {
      const session = await fetchAuthSession();
      if (!session.tokens) return false;
      
      const attributes = await fetchUserAttributes();
      const role = attributes['custom:role'] || attributes['role'] || 'user';
      return role === 'admin';
    } catch (error) {
      return false;
    }
  }
  
  async getCurrentUser() {
    try {
      const session = await fetchAuthSession();
      if (!session.tokens) {
        return null;
      }
      
      const attributes = await fetchUserAttributes();
      return {
        user: { attributes },
        email: attributes.email,
        role: attributes['custom:role'] || attributes['role'] || 'user',
        name: attributes.name
      };
    } catch (error) {
      return null;
    }
  }
  
  async logout() {
    try {
      await signOut();
      localStorage.removeItem('user');
      localStorage.removeItem('idToken');
      console.log('✅ [AuthService v6] Logged out');
      return true;
    } catch (error) {
      console.error('❌ [AuthService v6] Logout error:', error);
      throw error;
    }
  }
}

export default new AuthService();
