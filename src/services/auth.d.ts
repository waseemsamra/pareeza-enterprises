// Type declarations for auth service

export interface User {
  email: string;
  role: string;
  name: string;
  attributes?: Record<string, any>;
}

export interface LoginResult {
  success: boolean;
  isAdmin: boolean;
  user: User;
  redirectTo: string;
}

export interface Session {
  tokens?: {
    accessToken?: any;
    idToken?: any;
    refreshToken?: any;
  };
}

declare class AuthServiceClass {
  login(email: string, password: string): Promise<LoginResult>;
  getCurrentSession(): Promise<Session | null>;
  getCurrentUser(): Promise<User | null>;
  isAdmin(): Promise<boolean>;
  logout(): Promise<boolean>;
}

declare const authService: AuthServiceClass;
export default authService;
