# Install Required Packages for AWS Amplify Integration

## Required Packages

Your app needs these packages for full AWS Amplify integration:

### 1. AWS Amplify Core
```bash
npm install aws-amplify
```

### 2. UUID for Unique Filenames
```bash
npm install uuid
npm install -D @types/uuid
```

### 3. AWS Amplify UI React (Optional - for UI components)
```bash
npm install @aws-amplify/ui-react
```

---

## Quick Install All

```bash
npm install aws-amplify @aws-amplify/ui-react uuid
npm install -D @types/uuid
```

---

## Or Add to package.json

```json
{
  "dependencies": {
    "aws-amplify": "^6.0.0",
    "@aws-amplify/ui-react": "^6.0.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@types/uuid": "^9.0.0"
  }
}
```

---

## After Installation

### 1. Initialize Amplify in main.tsx

Add to `src/main.tsx`:

```typescript
import { Amplify } from 'aws-amplify';
import awsConfig from './lib/amplifyConfig';

// Initialize Amplify
Amplify.configure(awsConfig);
```

### 2. Update awsConfig

Update `src/lib/amplifyConfig.ts` to initialize Amplify:

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
  }
};

// Initialize Amplify
if (typeof window !== 'undefined') {
  Amplify.configure(awsConfig);
}

export default awsConfig;
```

---

## Use the Services

### AuthService (Authentication)

```typescript
import AuthService from './lib/AuthService';

// Login
const handleLogin = async (email, password) => {
  try {
    const result = await AuthService.login(email, password);
    console.log('Logged in:', result);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Logout
const handleLogout = async () => {
  await AuthService.logout();
};

// Check if admin
const checkAdmin = async () => {
  const isAdmin = await AuthService.isAdmin();
  console.log('Is admin:', isAdmin);
};
```

### S3Service (Image Uploads)

```typescript
import S3Service from './lib/S3Service';

// Upload single image
const handleUpload = async (file) => {
  try {
    const result = await S3Service.uploadImage(file, 'admin-uploads');
    console.log('Uploaded:', result);
    return result.url;
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

// Delete image
const handleDelete = async (key) => {
  await S3Service.deleteImage(key);
};

// Get URL
const getUrl = async (key) => {
  const url = await S3Service.getImageUrl(key);
  return url;
};

// List images
const listImages = async (folder) => {
  const images = await S3Service.listImages(folder);
  return images;
};

// Upload multiple images
const uploadMultiple = async (files) => {
  const result = await S3Service.uploadMultipleImages(files, 'gallery');
  console.log(`Uploaded ${result.uploaded} of ${result.total} images`);
};
```

---

## Update CMSContext to Use S3Service

```typescript
// src/contexts/CMSContext.tsx
import S3Service from '../lib/S3Service';

const uploadImage = async (file: File, folder: string): Promise<string | null> => {
  try {
    const result = await S3Service.uploadImage(file, folder);
    if (result.success) {
      return result.url;
    }
    return null;
  } catch (error) {
    console.error('Upload error:', error);
    return null;
  }
};
```

---

## Update AuthContext to Use AuthService

```typescript
// src/contexts/AuthContext.tsx
import AuthService from '../lib/AuthService';

const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const result = await AuthService.login(email, password);
    if (result.success) {
      setUser(result.user);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

const logout = async () => {
  await AuthService.logout();
  setUser(null);
};

const isAdmin = async () => {
  return await AuthService.isAdmin();
};
```

---

## Test Everything

Create a test component:

```typescript
import { useState } from 'react';
import AuthService from './lib/AuthService';
import S3Service from './lib/S3Service';

function TestComponent() {
  const [uploadStatus, setUploadStatus] = useState('');

  const testLogin = async () => {
    try {
      const result = await AuthService.login('admin@agrofeed.com', 'password');
      console.log('Login test:', result);
    } catch (error) {
      console.error('Login test failed:', error);
    }
  };

  const testUpload = async (file) => {
    try {
      const result = await S3Service.uploadImage(file, 'test');
      setUploadStatus(`Uploaded: ${result.url}`);
      console.log('Upload test:', result);
    } catch (error) {
      setUploadStatus('Upload failed');
      console.error('Upload test failed:', error);
    }
  };

  return (
    <div>
      <button onClick={testLogin}>Test Login</button>
      <input 
        type="file" 
        onChange={(e) => testUpload(e.target.files[0])}
      />
      <p>{uploadStatus}</p>
    </div>
  );
}
```

---

## Build and Deploy

```bash
# Install all packages
npm install

# Build
npm run build

# Deploy
git push
```

---

## ✅ After Installation Checklist

- [ ] aws-amplify installed
- [ ] uuid installed
- [ ] @types/uuid installed (dev dependency)
- [ ] Amplify initialized in main.tsx
- [ ] awsConfig updated to initialize Amplify
- [ ] AuthService created and working
- [ ] S3Service created and working
- [ ] AuthContext updated to use AuthService
- [ ] CMSContext updated to use S3Service
- [ ] Test login working
- [ ] Test S3 upload working
- [ ] Environment variables set in Amplify Console

---

## 🎉 Ready!

Your app now has:
- ✅ Full AWS Amplify integration
- ✅ Cognito authentication with role checking
- ✅ S3 image uploads with validation
- ✅ Secure file storage
- ✅ Admin-only access control

**Deploy to Amplify and enjoy! 🚜☁️**
