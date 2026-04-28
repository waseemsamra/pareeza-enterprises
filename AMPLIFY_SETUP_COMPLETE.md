# 🚀 AWS Amplify Setup Guide - Complete Installation

## Your Backend is Ready! Let's Connect the Frontend

---

## 📦 Step 1: Install Required Packages

```bash
# Install AWS Amplify and dependencies
npm install aws-amplify @aws-amplify/ui-react uuid

# Install TypeScript types (dev dependency)
npm install -D @types/uuid
```

---

## 🔧 Step 2: Initialize Amplify in Your App

### Update `src/main.tsx`

Add this at the top of your `main.tsx` file:

```typescript
import { Amplify } from 'aws-amplify';
import awsConfig from './lib/amplifyConfig';

// Initialize Amplify
Amplify.configure(awsConfig);
```

### Your Complete `src/main.tsx` Should Look Like:

```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import awsConfig from './lib/amplifyConfig';
import './index.css';
import App from './App.tsx';

// Initialize Amplify
Amplify.configure(awsConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

---

## ⚙️ Step 3: Update amplifyConfig.ts

### Update `src/lib/amplifyConfig.ts`

```typescript
import { Amplify } from 'aws-amplify';

export const awsConfig = {
  Auth: {
    region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
    userPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID,
    identityPoolId: import.meta.env.VITE_AWS_COGNITO_IDENTITY_POOL_ID,
    mandatorySignIn: true,
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  },
  Storage: {
    region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
    bucket: import.meta.env.VITE_AWS_S3_BUCKET,
    identityPoolId: import.meta.env.VITE_AWS_COGNITO_IDENTITY_POOL_ID,
    level: 'private',
    customPrefix: {
      public: 'public/',
      protected: 'protected/',
      private: 'admin-uploads/'
    }
  },
  API: {
    endpoints: [
      {
        name: 'cmsApi',
        endpoint: import.meta.env.VITE_API_URL || ''
      }
    ]
  }
};

// Initialize Amplify
if (typeof window !== 'undefined') {
  Amplify.configure(awsConfig);
}

export default awsConfig;
```

---

## 🔐 Step 4: Update AuthContext to Use AuthService

### Update `src/contexts/AuthContext.tsx`

```typescript
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import AuthService from '../lib/AuthService';
import { toast } from 'sonner';

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, company?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check current user on mount
    const checkUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser.user);
        }
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await AuthService.login(email, password);
      if (result.success) {
        setUser(result.user);
        toast.success('Welcome back!', {
          description: 'You have successfully logged in.',
        });
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    } catch (error) {
      toast.error('Login failed', {
        description: error instanceof Error ? error.message : 'Invalid credentials',
      });
      setIsLoading(false);
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    company?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // For registration, we'll use direct Cognito SDK
      // as Amplify Auth requires additional setup
      const { cognitoService } = await import('../lib/cognitoService');
      const result = await cognitoService.signUp(email, password, name, company);
      
      if (result.success) {
        toast.success('Account created!', {
          description: 'Please check your email for verification code.',
        });
        // Auto sign in
        const signInResult = await AuthService.login(email, password);
        if (signInResult.success) {
          setUser(signInResult.user);
        }
        setIsLoading(false);
        return true;
      }
      setIsLoading(false);
      return false;
    } catch (error) {
      toast.error('Registration failed', {
        description: error instanceof Error ? error.message : 'Could not create account',
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      toast.success('Logged out', {
        description: 'You have been successfully logged out.',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
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
        isAdmin: user?.attributes?.['custom:role'] === 'admin',
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
```

---

## 📸 Step 5: Update CMSContext to Use S3Service

### Update `src/contexts/CMSContext.tsx`

```typescript
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import S3Service from '../lib/S3Service';
import { dynamoDBService } from '../lib/dynamoDBService';
import { toast } from 'sonner';

// ... (keep all your existing interfaces)

export const CMSProvider = ({ children }: { children: ReactNode }) => {
  const [cmsData, setCmsData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFromDynamoDB();
  }, []);

  const loadFromDynamoDB = async () => {
    try {
      const result = await dynamoDBService.getSiteContent();
      if (result.success && result.data) {
        setCmsData(result.data);
      }
    } catch (error) {
      console.error('Error loading CMS data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateHero = async (data: any) => {
    const newData = { ...cmsData, hero: data };
    setCmsData(newData);
    
    try {
      await dynamoDBService.saveContent('hero', data, 'default');
      toast.success('Hero section saved!');
    } catch (error) {
      toast.error('Failed to save to DynamoDB');
    }
  };

  const updateAbout = async (data: any) => {
    const newData = { ...cmsData, about: data };
    setCmsData(newData);
    
    try {
      await dynamoDBService.saveContent('about', data, 'default');
      toast.success('About section saved!');
    } catch (error) {
      toast.error('Failed to save to DynamoDB');
    }
  };

  const updateTestimonials = async (data: any) => {
    const newData = { ...cmsData, testimonials: data };
    setCmsData(newData);
    
    try {
      await dynamoDBService.saveContent('testimonials', data, 'default');
      toast.success('Testimonials saved!');
    } catch (error) {
      toast.error('Failed to save to DynamoDB');
    }
  };

  const updateEnquiry = async (data: any) => {
    const newData = { ...cmsData, enquiry: data };
    setCmsData(newData);
    
    try {
      await dynamoDBService.saveContent('enquiry', data, 'default');
      toast.success('Enquiry section saved!');
    } catch (error) {
      toast.error('Failed to save to DynamoDB');
    }
  };

  const updateSiteSettings = async (data: any) => {
    const newData = { ...cmsData, siteSettings: data };
    setCmsData(newData);
    
    try {
      await dynamoDBService.saveContent('siteSettings', data, 'default');
      toast.success('Site settings saved!');
    } catch (error) {
      toast.error('Failed to save to DynamoDB');
    }
  };

  const uploadImage = async (file: File, folder: string): Promise<string | null> => {
    try {
      const result = await S3Service.uploadImage(file, folder);
      if (result.success) {
        toast.success('Image uploaded to S3!');
        return result.url;
      }
      return null;
    } catch (error) {
      toast.error('Failed to upload image');
      console.error('Upload error:', error);
      return null;
    }
  };

  return (
    <CMSContext.Provider
      value={{
        cmsData,
        updateHero,
        updateAbout,
        updateTestimonials,
        updateEnquiry,
        updateSiteSettings,
        uploadImage,
        isLoading,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

// ... (keep useCMS hook)
```

---

## ✅ Step 6: Verify .env File

Make sure your `.env` file has all required variables:

```env
VITE_AWS_REGION=us-east-1
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_JxtucAU3s
VITE_AWS_COGNITO_CLIENT_ID=4bp3ron4t3v2n1q8qvu2j795ov
VITE_AWS_COGNITO_IDENTITY_POOL_ID=us-east-1:7d4e0b0c-2a44-4be1-94c6-1c73af02e000
VITE_AWS_S3_BUCKET=agrofeed-content-agrofeed-536217686312
VITE_AWS_DYNAMODB_TABLE=agrofeed-content
VITE_AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
VITE_AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
```

---

## 🧪 Step 7: Test Everything

### Test 1: Check Amplify Initialization

Add this to your browser console:

```javascript
import { Amplify } from 'aws-amplify';
console.log('Amplify configured:', Amplify);
```

### Test 2: Test Login

```
1. Go to http://localhost:5173/login
2. Login with Cognito user
3. Check console: Should see user data
4. Should redirect to dashboard
```

### Test 3: Test S3 Upload

```
1. Go to /admin → CMS
2. Upload an image
3. Check console for S3 URL
4. Verify in S3 Console
```

---

## 🚀 Step 8: Start Development

```bash
# Start dev server
npm run dev
```

**Your app now uses:**
- ✅ Amplify Auth for Cognito
- ✅ Amplify Storage for S3
- ✅ Direct SDK for DynamoDB (simpler)

---

## 📚 Service Files You're Using

| Service | File | Purpose |
|---------|------|---------|
| **Auth** | `AuthService.ts` | Cognito login with admin check |
| **Storage** | `S3Service.ts` | S3 image uploads with validation |
| **Database** | `dynamoDBService.ts` | Direct DynamoDB access |
| **Config** | `amplifyConfig.ts` | Amplify configuration |

---

## 🎉 You're Done!

Your app now uses AWS Amplify with your configured backend!

**What Works:**
- ✅ Amplify Auth (Cognito)
- ✅ Amplify Storage (S3)
- ✅ Direct DynamoDB SDK
- ✅ Admin role checking
- ✅ Image uploads with validation
- ✅ Content management

**Happy coding! 🚜☁️**
