# 🔌 Backend Integration Guide

## Overview

This guide shows you how to connect your file-based frontend to your existing AWS backend resources.

---

## ✅ Your AWS Resources

Based on your configuration, you already have:

### Cognito (Authentication)
- **User Pool ID:** `us-east-1_JxtucAU3s`
- **Client ID:** `4bp3ron4t3v2n1q8qvu2j795ov`
- **Domain:** `agrofeed.auth.us-east-1.amazoncognito.com`

### S3 (Image Storage)
- **Bucket:** `agrofeed-content-agrofeed-536217686312`
- **Region:** `us-east-1`
- **Public URL:** `https://agrofeed-content-agrofeed-536217686312.s3.us-east-1.amazonaws.com`

### DynamoDB (Content Storage)
- **Table:** `agrofeed-content`
- **Region:** `us-east-1`

---

## 📋 Integration Options

### Option 1: Hybrid Mode (Recommended for Transition)

**How it works:**
- Use **JSON files** for development (current setup)
- Switch to **AWS** for production deployment
- Same codebase, different configuration

**Benefits:**
- ✅ Keep current file-based workflow
- ✅ Easy testing locally
- ✅ Production uses AWS
- ✅ No code changes needed

### Option 2: Full AWS Integration

**How it works:**
- Replace file-based service with AWS SDK
- All data goes to AWS services
- Real-time sync across users

**Benefits:**
- ✅ Production-ready
- ✅ Multi-user support
- ✅ Real-time updates
- ✅ Scalable

---

## 🔧 Configuration

### Step 1: Update .env File

Create or update `.env`:

```env
# AWS Region
VITE_AWS_REGION=us-east-1

# AWS Cognito Configuration
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_JxtucAU3s
VITE_AWS_COGNITO_CLIENT_ID=4bp3ron4t3v2n1q8qvu2j795ov
VITE_AWS_COGNITO_DOMAIN=agrofeed.auth.us-east-1.amazoncognito.com

# AWS S3 Configuration
VITE_AWS_S3_BUCKET=agrofeed-content-agrofeed-536217686312
VITE_AWS_S3_REGION=us-east-1
VITE_AWS_S3_URL=https://agrofeed-content-agrofeed-536217686312.s3.us-east-1.amazonaws.com

# AWS DynamoDB Configuration
VITE_AWS_DYNAMODB_TABLE=agrofeed-content
VITE_AWS_DYNAMODB_REGION=us-east-1

# AWS Credentials (Development - use IAM roles in production)
VITE_AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
VITE_AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY

# App Configuration
VITE_API_URL=
VITE_APP_NAME=AgroFeed CMS
VITE_APP_URL=http://localhost:5173
```

### Step 2: Choose Your Mode

Create a configuration file `src/lib/config.ts`:

```typescript
// Check if AWS is configured
export const isAWSMode = () => {
  return !!(
    import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID &&
    import.meta.env.VITE_AWS_ACCESS_KEY_ID &&
    import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  );
};

// Get current mode
export const getMode = () => {
  return isAWSMode() ? 'aws' : 'file';
};

console.log('[Config] Running in', getMode(), 'mode');
```

---

## 🔐 Authentication Integration

### Current (File-Based)
```typescript
// src/contexts/AuthContext.tsx
import { fileDataService } from '../lib/fileDataService';

const login = async (email, password) => {
  const user = fileDataService.users.getUserByEmail(email);
  if (user && user.password === password) {
    // Login success
  }
};
```

### AWS Integration (Cognito)
```typescript
// src/contexts/AuthContextAWS.tsx
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID,
  ClientId: import.meta.env.VITE_AWS_COGNITO_CLIENT_ID
};

const userPool = new CognitoUserPool(poolData);

const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({ 
      Username: email, 
      Password: password 
    });
    
    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        // Store tokens
        localStorage.setItem('idToken', result.getIdToken().getJwtToken());
        localStorage.setItem('accessToken', result.getAccessToken().getJwtToken());
        resolve(result);
      },
      onFailure: (err) => reject(err)
    });
  });
};
```

### Hybrid Approach

```typescript
// src/contexts/AuthContext.tsx
import { isAWSMode } from '../lib/config';
import { fileDataService } from '../lib/fileDataService';
import { cognitoService } from '../lib/cognitoService';

const login = async (email, password) => {
  if (isAWSMode()) {
    // Use Cognito
    return await cognitoService.signIn(email, password);
  } else {
    // Use file-based
    const user = fileDataService.users.getUserByEmail(email);
    if (user && user.password === password) {
      return { success: true, user };
    }
    return { success: false };
  }
};
```

---

## 📦 Content Management Integration

### Current (File-Based)
```typescript
// src/contexts/CMSContext.tsx
import { fileDataService } from '../lib/fileDataService';

const updateHero = (data) => {
  fileDataService.cms.updateHero(data);
  // Saves to localStorage
};
```

### AWS Integration (DynamoDB)
```typescript
// src/contexts/CMSContextAWS.tsx
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
});

const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = import.meta.env.VITE_AWS_DYNAMODB_TABLE;

const updateHero = async (data) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      PK: 'hero',
      SK: 'content',
      type: 'hero',
      ...data,
      updatedAt: Date.now(),
      updatedBy: 'admin@agrofeed.com'
    }
  };
  
  await docClient.send(new PutCommand(params));
  // Saved to DynamoDB
};
```

### Hybrid Approach

```typescript
// src/contexts/CMSContext.tsx
import { isAWSMode } from '../lib/config';
import { fileDataService } from '../lib/fileDataService';
import { dynamoDBService } from '../lib/dynamoDBService';

const updateHero = async (data) => {
  if (isAWSMode()) {
    // Use DynamoDB
    await dynamoDBService.saveContent('hero', data);
  } else {
    // Use file-based
    fileDataService.cms.updateHero(data);
  }
};
```

---

## 📸 Image Upload Integration

### Current (File-Based)
```typescript
// src/contexts/CMSContext.tsx
const uploadImage = async (file, folder) => {
  // Creates blob URL (temporary)
  return URL.createObjectURL(file);
};
```

### AWS Integration (S3)
```typescript
// src/contexts/CMSContextAWS.tsx
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
});

const uploadImage = async (file, folder = 'images') => {
  const key = `${folder}/${Date.now()}-${file.name}`;
  
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: import.meta.env.VITE_AWS_S3_BUCKET,
      Key: key,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read'
    }
  });
  
  const result = await upload.done();
  return result.Location; // S3 URL
};
```

### Hybrid Approach

```typescript
const uploadImage = async (file, folder) => {
  if (isAWSMode()) {
    // Upload to S3
    return await s3Service.uploadImage(file, folder);
  } else {
    // Create blob URL
    return URL.createObjectURL(file);
  }
};
```

---

## 🔄 Migration Path

### Phase 1: Development (Current)

```
✅ File-based data storage
✅ JSON files in /data folder
✅ localStorage for runtime
✅ Hardcoded passwords
```

**Use this for:**
- Local development
- Testing
- Demo purposes
- Single-user scenarios

### Phase 2: Staging

```
🔄 Mix of file-based and AWS
✅ Auth: File-based or Cognito
✅ Content: DynamoDB
✅ Images: S3
```

**Use this for:**
- User testing
- Content review
- Performance testing

### Phase 3: Production

```
✅ Full AWS integration
✅ Cognito authentication
✅ DynamoDB storage
✅ S3 image hosting
```

**Use this for:**
- Live production
- Multi-user access
- Real-time updates

---

## 🛠️ Implementation Steps

### Step 1: Add AWS SDK (Already Installed)

Your `package.json` already has:
```json
{
  "@aws-sdk/client-cognito-identity-provider": "^3.1014.0",
  "@aws-sdk/client-dynamodb": "^3.1014.0",
  "@aws-sdk/client-s3": "^3.1014.0",
  "@aws-sdk/lib-dynamodb": "^3.1014.0",
  "@aws-sdk/lib-storage": "^3.1014.0"
}
```

### Step 2: Create AWS Services

Files already exist in `src/lib/`:
- `aws.ts` - AWS configuration
- `cognitoService.ts` - Cognito auth
- `s3Service.ts` - S3 uploads
- `dynamoDBService.ts` - DynamoDB operations

### Step 3: Update Contexts

Option A: **Keep file-based** (current)
```typescript
import { fileDataService } from './lib/fileDataService';
```

Option B: **Switch to AWS**
```typescript
import { cognitoService } from './lib/cognitoService';
import { s3Service } from './lib/s3Service';
import { dynamoDBService } from './lib/dynamoDBService';
```

Option C: **Hybrid mode** (recommended)
```typescript
import { isAWSMode } from './lib/config';
import { fileDataService } from './lib/fileDataService';
import { cognitoService } from './lib/cognitoService';

const service = isAWSMode() ? cognitoService : fileDataService;
```

### Step 4: Update App.tsx

Current (file-based):
```typescript
import { AuthProvider } from './contexts/AuthContext';
import { CMSProvider } from './contexts/CMSContext';
```

For AWS:
```typescript
import { AuthProvider } from './contexts/AuthContextAWS';
import { CMSProvider } from './contexts/CMSContextAWS';
```

For Hybrid:
```typescript
// Keep current imports - contexts handle the switch
import { AuthProvider } from './contexts/AuthContext';
import { CMSProvider } from './contexts/CMSContext';
```

---

## 📊 Data Migration

### From JSON to DynamoDB

```javascript
// Migration script
import { fileDataService } from './lib/fileDataService';
import { dynamoDBService } from './lib/dynamoDBService';

// Export from JSON
const cmsData = fileDataService.cms.getCMSData();
const products = fileDataService.products.getProducts();
const testimonials = fileDataService.testimonials.getTestimonials();

// Import to DynamoDB
await dynamoDBService.saveContent('hero', cmsData.hero);
await dynamoDBService.saveContent('about', cmsData.about);
await dynamoDBService.saveContent('testimonials', cmsData.testimonials);

// Migrate products
for (const product of products) {
  await dynamoDBService.saveContent('product', product, product.id);
}

console.log('Migration complete!');
```

### From localStorage to DynamoDB

```javascript
// Browser console script
const cmsData = localStorage.getItem('agrofeed_cms_data');
const products = localStorage.getItem('agrofeed_products');

if (cmsData) {
  const data = JSON.parse(cmsData);
  // Send to backend API or use AWS SDK
  await fetch('/api/migrate', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}
```

---

## 🔒 Security Best Practices

### Development (File-Based)

```env
# OK for development
VITE_AWS_ACCESS_KEY_ID=AKIA...
VITE_AWS_SECRET_ACCESS_KEY=...
```

### Production

```env
# Use IAM roles instead
# No credentials in .env
VITE_AWS_REGION=us-east-1
VITE_AWS_COGNITO_USER_POOL_ID=...
VITE_AWS_COGNITO_CLIENT_ID=...
```

### Password Handling

**Current (JSON files):**
```json
{
  "password": "admin123"  // Plain text - OK for dev
}
```

**Production (Cognito):**
- Passwords hashed by Cognito
- Never stored in plain text
- MFA support
- Password policies enforced

---

## 📝 Complete Example

### Hybrid AuthContext

```typescript
// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { isAWSMode } from '../lib/config';
import { fileDataService } from '../lib/fileDataService';
import { cognitoService } from '../lib/cognitoService';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const useAWS = isAWSMode();

  useEffect(() => {
    // Load user from appropriate service
    const storedUser = useAWS 
      ? cognitoService.getCurrentUser()
      : fileDataService.currentUser.getCurrentUser();
    
    setUser(storedUser);
    setIsLoading(false);
  }, [useAWS]);

  const login = async (email, password) => {
    if (useAWS) {
      const result = await cognitoService.signIn(email, password);
      if (result.success) {
        setUser(result.user);
        return true;
      }
      return false;
    } else {
      const foundUser = fileDataService.users.getUserByEmail(email);
      if (foundUser && foundUser.password === password) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        fileDataService.currentUser.setCurrentUser(userWithoutPassword);
        return true;
      }
      return false;
    }
  };

  const logout = () => {
    if (useAWS) {
      cognitoService.signOut();
    }
    fileDataService.currentUser.clearCurrentUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 🎯 Decision Matrix

| Feature | File-Based | AWS | Hybrid |
|---------|-----------|-----|--------|
| **Setup Complexity** | ✅ Easy | ⚠️ Medium | ⚠️ Medium |
| **Development Speed** | ✅ Fast | ⚠️ Medium | ✅ Fast |
| **Production Ready** | ❌ No | ✅ Yes | ✅ Yes |
| **Multi-User** | ❌ No | ✅ Yes | ✅ Yes |
| **Real-time Sync** | ❌ No | ✅ Yes | ✅ Yes |
| **Cost** | ✅ Free | 💰 $5-10/mo | 💰 $5-10/mo |
| **Maintenance** | ✅ Low | ⚠️ Medium | ⚠️ Medium |
| **Scalability** | ❌ Limited | ✅ Unlimited | ✅ Unlimited |

**Recommendation:** Start with **File-Based**, migrate to **Hybrid**, then **Full AWS** when needed.

---

## 🚀 Quick Start with Your AWS Resources

### 1. Add Credentials to .env

```env
VITE_AWS_REGION=us-east-1
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_JxtucAU3s
VITE_AWS_COGNITO_CLIENT_ID=4bp3ron4t3v2n1q8qvu2j795ov
VITE_AWS_S3_BUCKET=agrofeed-content-agrofeed-536217686312
VITE_AWS_DYNAMODB_TABLE=agrofeed-content
VITE_AWS_ACCESS_KEY_ID=YOUR_KEY_HERE
VITE_AWS_SECRET_ACCESS_KEY=YOUR_SECRET_HERE
```

### 2. Test AWS Mode

```typescript
// In browser console
import { isAWSMode } from './lib/config';
console.log('AWS Mode:', isAWSMode()); // Should be true
```

### 3. Login with Cognito

Users created in your Cognito user pool can now login.

### 4. Upload to S3

Images uploaded in admin dashboard will go to your S3 bucket.

### 5. Save to DynamoDB

CMS changes will be saved to your DynamoDB table.

---

## 📚 Resources

### Your AWS Console Links

- **Cognito:** https://console.aws.amazon.com/cognito/users/us-east-1_JxtucAU3s
- **S3:** https://console.aws.amazon.com/s3/buckets/agrofeed-content-agrofeed-536217686312
- **DynamoDB:** https://console.aws.amazon.com/dynamodb/tables/agrofeed-content

### Documentation

- `FILE_BASED_DATA_GUIDE.md` - File-based setup
- `AWS_CMS_INTEGRATION_GUIDE.md` - AWS integration
- `CLOUDFORMATION_DEPLOYMENT.md` - CloudFormation

---

## ✅ Summary

You have **three options**:

### Option 1: Stay File-Based (Current)
- ✅ Simple, easy to use
- ✅ Perfect for development
- ❌ Not production-ready

### Option 2: Switch to AWS
- ✅ Production-ready
- ✅ Multi-user support
- ⚠️ Requires AWS credentials

### Option 3: Hybrid Mode (Recommended)
- ✅ Best of both worlds
- ✅ Develop with files, deploy with AWS
- ✅ No code changes needed

**To enable AWS mode:** Just add your credentials to `.env`!

**Happy Coding! 🚜**
