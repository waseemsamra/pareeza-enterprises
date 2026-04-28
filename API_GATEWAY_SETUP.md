# 🚀 API Gateway + Lambda Setup for DynamoDB

## Complete Guide to Use DynamoDBService with Amplify API

---

## 📋 Architecture

```
Frontend (React)
    ↓
Amplify.configure()
    ↓
API.get() / API.post()
    ↓
API Gateway
    ↓
Lambda Function
    ↓
DynamoDB
```

---

## 📦 Step 1: Install Required Packages

```bash
npm install aws-amplify uuid
npm install -D @types/uuid
```

---

## ☁️ Step 2: Deploy API Gateway + Lambda

### Option A: Deploy with CloudFormation (Recommended)

```bash
# Deploy the CloudFormation stack
aws cloudformation deploy \
  --stack-name agrofeed-cms-api \
  --template-file aws/api-gateway-cloudformation.yml \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides Environment=prod \
  --tags Project=AgroFeed
```

### Option B: Deploy via AWS Console

1. **Go to:** AWS CloudFormation Console
2. **Click:** Create stack → With new resources
3. **Upload:** `aws/api-gateway-cloudformation.yml`
4. **Stack name:** `agrofeed-cms-api`
5. **Parameters:** Environment = `prod`
6. **Capabilities:** Check IAM
7. **Create stack**

### Get API Endpoint

After deployment completes:

```bash
# Get the API endpoint
aws cloudformation describe-stacks \
  --stack-name agrofeed-cms-api \
  --query 'Stacks[0].Outputs[?OutputKey==`ApiEndpoint`].OutputValue' \
  --output text
```

**Save this URL!** You'll need it for your `.env` file.

---

## ⚙️ Step 3: Update Environment Variables

### Update `.env` File

Add your API Gateway URL:

```env
# API Gateway Configuration
VITE_API_URL=https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod
```

### Full `.env` File

```env
# AWS Region
VITE_AWS_REGION=us-east-1

# Cognito
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_JxtucAU3s
VITE_AWS_COGNITO_CLIENT_ID=4bp3ron4t3v2n1q8qvu2j795ov
VITE_AWS_COGNITO_IDENTITY_POOL_ID=us-east-1:7d4e0b0c-2a44-4be1-94c6-1c73af02e000
VITE_AWS_COGNITO_DOMAIN=agrofeed.auth.us-east-1.amazoncognito.com

# S3
VITE_AWS_S3_BUCKET=agrofeed-content-agrofeed-536217686312
VITE_AWS_S3_REGION=us-east-1
VITE_AWS_S3_URL=https://agrofeed-content-agrofeed-536217686312.s3.us-east-1.amazonaws.com

# DynamoDB
VITE_AWS_DYNAMODB_TABLE=agrofeed-content
VITE_AWS_DYNAMODB_REGION=us-east-1

# API Gateway
VITE_API_URL=https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod

# IAM Credentials
VITE_AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
VITE_AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY

# App
VITE_APP_NAME=AgroFeed CMS
VITE_APP_URL=http://localhost:5173
```

---

## 🔧 Step 4: Update amplifyConfig.ts

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
        endpoint: import.meta.env.VITE_API_URL,
        region: import.meta.env.VITE_AWS_REGION || 'us-east-1'
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

## 📝 Step 5: Update DynamoDBService.ts

### Your `src/lib/DynamoDBService.ts` (Already Created)

```typescript
import { API } from 'aws-amplify';

class DynamoDBService {
  // Get content by type
  async getContent(type) {
    try {
      const response = await API.get('cmsApi', `/content/${type}`);
      return response;
    } catch (error) {
      console.error('Get content error:', error);
      return null;
    }
  }
  
  // Save content
  async saveContent(type, data) {
    try {
      const response = await API.post('cmsApi', '/content', {
        body: {
          type: type,
          data: data,
          updatedAt: new Date().toISOString()
        }
      });
      return response;
    } catch (error) {
      console.error('Save content error:', error);
      throw error;
    }
  }
  
  // Get all testimonials
  async getTestimonials() {
    try {
      const response = await API.get('cmsApi', '/testimonials');
      return response;
    } catch (error) {
      console.error('Get testimonials error:', error);
      return [];
    }
  }
  
  // Add testimonial
  async addTestimonial(testimonial) {
    try {
      const response = await API.post('cmsApi', '/testimonials', {
        body: testimonial
      });
      return response;
    } catch (error) {
      console.error('Add testimonial error:', error);
      throw error;
    }
  }
  
  // Get products
  async getProducts() {
    try {
      const response = await API.get('cmsApi', '/products');
      return response;
    } catch (error) {
      console.error('Get products error:', error);
      return [];
    }
  }
}

export default new DynamoDBService();
```

---

## 🔄 Step 6: Update CMSContext.tsx

### Update `src/contexts/CMSContext.tsx`

```typescript
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import DynamoDBService from '../lib/DynamoDBService';
import S3Service from '../lib/S3Service';
import { toast } from 'sonner';

// ... (keep your existing interfaces)

export const CMSProvider = ({ children }: { children: ReactNode }) => {
  const [cmsData, setCmsData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFromDynamoDB();
  }, []);

  const loadFromDynamoDB = async () => {
    try {
      const [hero, about, testimonials, enquiry, siteSettings] = await Promise.all([
        DynamoDBService.getContent('hero'),
        DynamoDBService.getContent('about'),
        DynamoDBService.getTestimonials(),
        DynamoDBService.getContent('enquiry'),
        DynamoDBService.getContent('siteSettings')
      ]);

      setCmsData({
        hero: hero?.data || {},
        about: about?.data || {},
        testimonials: testimonials || [],
        enquiry: enquiry?.data || {},
        siteSettings: siteSettings?.data || {}
      });
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
      await DynamoDBService.saveContent('hero', data);
      toast.success('Hero section saved!');
    } catch (error) {
      toast.error('Failed to save to DynamoDB');
    }
  };

  const updateAbout = async (data: any) => {
    const newData = { ...cmsData, about: data };
    setCmsData(newData);
    
    try {
      await DynamoDBService.saveContent('about', data);
      toast.success('About section saved!');
    } catch (error) {
      toast.error('Failed to save to DynamoDB');
    }
  };

  const updateTestimonials = async (data: any) => {
    const newData = { ...cmsData, testimonials: data };
    setCmsData(newData);
    
    try {
      // Save all testimonials
      for (const testimonial of data.testimonials) {
        await DynamoDBService.addTestimonial(testimonial);
      }
      toast.success('Testimonials saved!');
    } catch (error) {
      toast.error('Failed to save testimonials');
    }
  };

  const updateEnquiry = async (data: any) => {
    const newData = { ...cmsData, enquiry: data };
    setCmsData(newData);
    
    try {
      await DynamoDBService.saveContent('enquiry', data);
      toast.success('Enquiry section saved!');
    } catch (error) {
      toast.error('Failed to save to DynamoDB');
    }
  };

  const updateSiteSettings = async (data: any) => {
    const newData = { ...cmsData, siteSettings: data };
    setCmsData(newData);
    
    try {
      await DynamoDBService.saveContent('siteSettings', data);
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

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
```

---

## 🧪 Step 7: Test Your Setup

### Test 1: Check API Gateway

```bash
# Test the API directly
curl https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod/content/hero
```

### Test 2: Test in Browser

Add to browser console:

```javascript
import DynamoDBService from './lib/DynamoDBService';

// Test get content
DynamoDBService.getContent('hero')
  .then(result => console.log('Hero content:', result));

// Test get testimonials
DynamoDBService.getTestimonials()
  .then(result => console.log('Testimonials:', result));
```

### Test 3: Test in App

```
1. Go to http://localhost:5173
2. Open browser console
3. Check for Amplify logs
4. Navigate to /admin
5. Try to load CMS content
```

---

## 🚀 Step 8: Start Development

```bash
# Start dev server
npm run dev
```

---

## 📊 API Endpoints Available

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/content/{type}` | Get content by type |
| POST | `/content` | Save content |
| GET | `/testimonials` | Get all testimonials |
| POST | `/testimonials` | Add testimonial |
| GET | `/products` | Get all products |

---

## ✅ Complete Setup Checklist

- [ ] Packages installed (aws-amplify, uuid)
- [ ] API Gateway + Lambda deployed
- [ ] API endpoint saved
- [ ] `.env` updated with API URL
- [ ] `amplifyConfig.ts` updated
- [ ] `DynamoDBService.ts` created
- [ ] `CMSContext.tsx` updated
- [ ] Dev server started
- [ ] API tested successfully

---

## 🎉 You're Done!

Your app now uses:
- ✅ **Amplify Auth** for Cognito login
- ✅ **Amplify Storage** for S3 uploads
- ✅ **Amplify API** for DynamoDB (via API Gateway)
- ✅ **Complete backend integration**

**Happy coding! 🚜☁️**
