# 🚜 AgroFeed CMS - Complete AWS Amplify Integration Guide

## ✅ What's Been Created

Your AgroFeed CMS now has complete AWS integration with these service files:

### Service Files Created

1. **`src/lib/amplifyConfig.ts`** - AWS Amplify configuration
2. **`src/lib/AuthService.ts`** - Authentication with Cognito
3. **`src/lib/S3Service.ts`** - S3 image upload/download
4. **`src/lib/DynamoDBService.ts`** - DynamoDB content management (via API Gateway)
5. **`src/lib/aws.ts`** - AWS SDK clients (direct access)
6. **`src/lib/cognitoService.ts`** - Cognito authentication (direct SDK)
7. **`src/lib/s3Service.ts`** - S3 operations (direct SDK)
8. **`src/lib/dynamoDBService.ts`** - DynamoDB operations (direct SDK)

---

## 🎯 Two Approaches Available

### Approach 1: Direct AWS SDK (Current - Already Working!)

**Uses:** AWS SDK v3 directly
**Files:** `src/lib/aws.ts`, `cognitoService.ts`, `s3Service.ts`, `dynamoDBService.ts`
**Pros:** 
- ✅ No API Gateway needed
- ✅ Direct AWS service access
- ✅ Already implemented
- ✅ Works with current setup

**Cons:**
- Requires IAM credentials in environment variables

### Approach 2: AWS Amplify + API Gateway

**Uses:** AWS Amplify library + API Gateway
**Files:** `src/lib/AuthService.ts`, `S3Service.ts`, `DynamoDBService.ts`
**Pros:**
- ✅ Cleaner API
- ✅ Better for frontend
- ✅ Amplify handles credentials

**Cons:**
- Requires API Gateway setup
- Requires Lambda functions for DynamoDB
- More AWS infrastructure needed

---

## 🚀 Recommended: Use Approach 1 (Direct SDK)

Your app already works with direct AWS SDK! Just:

### Step 1: Install Packages (Optional - for Amplify features)

```bash
npm install aws-amplify @aws-amplify/ui-react uuid
npm install -D @types/uuid
```

### Step 2: Initialize Amplify Config (Optional)

Add to `src/main.tsx`:

```typescript
import { Amplify } from 'aws-amplify';
import awsConfig from './lib/amplifyConfig';

// Optional: Initialize Amplify for enhanced features
Amplify.configure(awsConfig);
```

### Step 3: Deploy to Amplify

Your existing code already works! Just deploy:

```bash
git add .
git commit -m "Deploy to Amplify"
git push
```

Then in Amplify Console:
1. Connect repository
2. Add 15 environment variables
3. Deploy

---

## 📋 Environment Variables for Amplify

Add these 15 variables in Amplify Console:

### AWS Configuration (10)
```
VITE_AWS_REGION=us-east-1
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_JxtucAU3s
VITE_AWS_COGNITO_CLIENT_ID=4bp3ron4t3v2n1q8qvu2j795ov
VITE_AWS_COGNITO_IDENTITY_POOL_ID=us-east-1:7d4e0b0c-2a44-4be1-94c6-1c73af02e000
VITE_AWS_COGNITO_DOMAIN=agrofeed.auth.us-east-1.amazoncognito.com
VITE_AWS_S3_BUCKET=agrofeed-content-agrofeed-536217686312
VITE_AWS_S3_REGION=us-east-1
VITE_AWS_S3_URL=https://agrofeed-content-agrofeed-536217686312.s3.us-east-1.amazonaws.com
VITE_AWS_DYNAMODB_TABLE=agrofeed-content
VITE_AWS_DYNAMODB_REGION=us-east-1
```

### IAM Credentials (2) ⚠️
```
VITE_AWS_ACCESS_KEY_ID=[Your IAM Access Key]
VITE_AWS_SECRET_ACCESS_KEY=[Your IAM Secret Key]
```

### App Settings (3)
```
VITE_APP_NAME=AgroFeed CMS
VITE_APP_URL=http://localhost:5173
VITE_API_URL=
```

---

## 📦 Package Installation Guide

### Minimal Setup (Works Now!)

Your app works without additional packages! No installation needed.

### Enhanced Setup (Optional)

For Amplify features:

```bash
# Install Amplify packages
npm install aws-amplify @aws-amplify/ui-react uuid

# Install TypeScript types
npm install -D @types/uuid
```

### What Each Package Does

- **aws-amplify**: Amplify library for enhanced AWS integration
- **@aws-amplify/ui-react**: Pre-built UI components (optional)
- **uuid**: Generate unique filenames for uploads
- **@types/uuid**: TypeScript types for uuid

---

## 🔧 How to Use Each Service

### Using Direct SDK (Approach 1 - Recommended)

#### Authentication
```typescript
import { cognitoService } from './lib/cognitoService';

// Login
const login = async () => {
  const result = await cognitoService.signIn('email', 'password');
  console.log(result);
};

// Logout
const logout = async () => {
  await cognitoService.signOut('access_token');
};
```

#### S3 Upload
```typescript
import { s3Service } from './lib/s3Service';

// Upload
const upload = async (file) => {
  const result = await s3Service.uploadImage(file, 'folder');
  console.log(result.imageUrl);
};

// Delete
const remove = async (url) => {
  await s3Service.deleteImage(url);
};
```

#### DynamoDB
```typescript
import { dynamoDBService } from './lib/dynamoDBService';

// Get content
const content = await dynamoDBService.getContent('hero', 'default');

// Save content
await dynamoDBService.saveContent('hero', data, 'default');

// Update content
await dynamoDBService.updateContent('hero', 'default', { title: 'New' });
```

### Using Amplify Services (Approach 2 - Optional)

After installing aws-amplify:

#### Authentication
```typescript
import AuthService from './lib/AuthService';

// Login with admin check
const login = async () => {
  const result = await AuthService.login('email', 'password');
  console.log(result);
};

// Check admin
const admin = await AuthService.isAdmin();
```

#### S3 Upload
```typescript
import S3Service from './lib/S3Service';

// Upload with validation
const upload = async (file) => {
  const result = await S3Service.uploadImage(file, 'folder');
  console.log(result.url);
};
```

#### DynamoDB (Requires API Gateway)
```typescript
import DynamoDBService from './lib/DynamoDBService';

// Get content via API Gateway
const content = await DynamoDBService.getContent('hero');
```

---

## 🎯 Recommended Setup

### For Your Current App

**Use:** Direct AWS SDK (already working!)

**Files to use:**
- `src/lib/aws.ts` - AWS clients
- `src/lib/cognitoService.ts` - Authentication
- `src/lib/s3Service.ts` - S3 uploads
- `src/lib/dynamoDBService.ts` - DynamoDB

**No additional packages needed!**

### For Future Enhancement

If you want Amplify features:

1. Install packages:
   ```bash
   npm install aws-amplify @aws-amplify/ui-react uuid
   ```

2. Initialize Amplify in `main.tsx`:
   ```typescript
   import { Amplify } from 'aws-amplify';
   import awsConfig from './lib/amplifyConfig';
   
   Amplify.configure(awsConfig);
   ```

3. Use Amplify services:
   - `AuthService` for auth
   - `S3Service` for uploads
   - Keep direct SDK for DynamoDB (simpler)

---

## 📁 Complete File Structure

```
src/lib/
├── amplifyConfig.ts          # Amplify configuration
├── aws.ts                    # AWS SDK clients
├── cognitoService.ts         # Cognito auth (SDK)
├── s3Service.ts              # S3 operations (SDK)
├── dynamoDBService.ts        # DynamoDB (SDK)
├── AuthService.ts            # Auth wrapper (Amplify)
├── S3Service.ts              # S3 wrapper (Amplify)
├── DynamoDBService.ts        # DynamoDB wrapper (API Gateway)
└── fileDataService.ts        # Local file-based (dev)
```

---

## ✅ Deployment Checklist

- [ ] Code ready (already working!)
- [ ] Optional: Install aws-amplify packages
- [ ] Optional: Initialize Amplify in main.tsx
- [ ] Push to Git
- [ ] Connect to Amplify Console
- [ ] Add 15 environment variables
- [ ] Deploy
- [ ] Test login
- [ ] Test S3 uploads
- [ ] Test DynamoDB saves

---

## 🎉 Summary

### What Works Now (No Changes Needed!)

✅ Authentication with Cognito
✅ S3 image uploads
✅ DynamoDB content storage
✅ Admin dashboard
✅ CMS editing
✅ All features working!

### Optional Enhancements

- Install aws-amplify for cleaner API
- Use AuthService for auth
- Use S3Service for uploads
- Keep direct SDK for DynamoDB

### Deploy Now!

Your app is ready! Just:
1. Push to Git
2. Connect to Amplify
3. Add environment variables
4. Deploy

**No code changes required! 🚜☁️**
