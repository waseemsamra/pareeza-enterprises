import { fetchAuthSession, signIn, signOut, fetchUserAttributes } from 'aws-amplify/auth';

class AuthService {
  // Admin login
  async login(email: string, password: string) {
    try {
      const result = await signIn({ username: email, password });
      
      // Get user attributes
      const attributes = await fetchUserAttributes();
      const userRole = attributes['custom:role'];
      
      // Verify admin role
      if (userRole !== 'admin') {
        await signOut();
        throw new Error('Access denied. Admin privileges required.');
      }
      
      return {
        success: true,
        user: result.nextStep,
        attributes: attributes
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
  
  // Logout
  async logout() {
    try {
      await signOut();
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
  
  // Get current authenticated user
  async getCurrentUser() {
    try {
      const session = await fetchAuthSession();
      if (!session.tokens) {
        return null;
      }
      const attributes = await fetchUserAttributes();
      return { user: session.tokens.accessToken.payload, attributes };
    } catch (error) {
      return null;
    }
  }
  
  // Check if user is admin
  async isAdmin() {
    try {
      const attributes = await fetchUserAttributes();
      return attributes['custom:role'] === 'admin';
    } catch {
      return false;
    }
  }
  
  // Get temporary AWS credentials
  async getCredentials() {
    try {
      const session = await fetchAuthSession();
      return session.credentials;
    } catch (error) {
      console.error('Error getting credentials:', error);
      return null;
    }
  }
  
  // Change password
  async changePassword(_oldPassword: string, _newPassword: string) {
    try {
      await signOut();
      // Note: Amplify v6 doesn't have direct changePassword, need to use Cognito SDK
      return { success: false, error: 'Use Cognito console to change password' };
    } catch (error) {
      console.error('Password change error:', error);
      throw error;
    }
  }
}

export default new AuthService();
