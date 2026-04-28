# Install AWS Amplify Packages

## Required for AuthService and Enhanced AWS Integration

### Install Packages

```bash
npm install aws-amplify @aws-amplify/ui-react
```

### Update package.json

Add to dependencies:

```json
{
  "dependencies": {
    "aws-amplify": "^6.0.0",
    "@aws-amplify/ui-react": "^6.0.0",
    ...
  }
}
```

---

## Initialize Amplify in App

Add to `src/main.tsx` or `src/App.tsx`:

```typescript
import { Amplify } from 'aws-amplify';
import awsConfig from './lib/amplifyConfig';

// Initialize Amplify
Amplify.configure(awsConfig);
```

---

## Use AuthService

```typescript
import AuthService from './lib/AuthService';

// Login
const login = async () => {
  try {
    const result = await AuthService.login('admin@agrofeed.com', 'password');
    console.log('Login successful:', result);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Logout
const logout = async () => {
  await AuthService.logout();
};

// Check if admin
const checkAdmin = async () => {
  const isAdmin = await AuthService.isAdmin();
  console.log('Is admin:', isAdmin);
};

// Get current user
const getUser = async () => {
  const user = await AuthService.getCurrentUser();
  console.log('Current user:', user);
};
```

---

## Update AuthContext to Use AuthService

```typescript
// src/contexts/AuthContext.tsx
import AuthService from '../lib/AuthService';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check current user on mount
    const checkUser = async () => {
      const currentUser = await AuthService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser.user);
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    const result = await AuthService.login(email, password);
    if (result.success) {
      setUser(result.user);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const isAdmin = async () => {
    return await AuthService.isAdmin();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## S3 Upload with Storage

```typescript
import { Storage } from 'aws-amplify';

// Upload file
const uploadFile = async (file) => {
  try {
    const result = await Storage.put(file.name, file, {
      level: 'private',
      contentType: file.type
    });
    
    console.log('Upload successful:', result);
    return result;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

// Download file
const downloadFile = async (key) => {
  try {
    const url = await Storage.get(key);
    return url;
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};

// Delete file
const deleteFile = async (key) => {
  try {
    await Storage.remove(key);
    return { success: true };
  } catch (error) {
    console.error('Delete failed:', error);
    throw error;
  }
};
```

---

## Environment Variables Required

Make sure these are set in Amplify Console:

```
VITE_AWS_REGION=us-east-1
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_JxtucAU3s
VITE_AWS_COGNITO_CLIENT_ID=4bp3ron4t3v2n1q8qvu2j795ov
VITE_AWS_COGNITO_IDENTITY_POOL_ID=us-east-1:7d4e0b0c-2a44-4be1-94c6-1c73af02e000
VITE_AWS_S3_BUCKET=agrofeed-content-agrofeed-536217686312
VITE_AWS_ACCESS_KEY_ID=<your-key>
VITE_AWS_SECRET_ACCESS_KEY=<your-secret>
```

---

## Test Integration

Create a test component:

```typescript
import { useEffect, useState } from 'react';
import AuthService from './lib/AuthService';
import { Storage } from 'aws-amplify';

function TestComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await AuthService.getCurrentUser();
      setIsAuthenticated(!!user);
      
      if (user) {
        const admin = await AuthService.isAdmin();
        setIsAdmin(admin);
      }
    };
    
    checkAuth();
  }, []);

  return (
    <div>
      <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
      <p>Admin: {isAdmin ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

---

## Build and Deploy

```bash
# Install dependencies
npm install

# Build
npm run build

# Deploy to Amplify
git push
```

---

## ✅ After Installation

- [ ] aws-amplify package installed
- [ ] Amplify initialized in main.tsx
- [ ] AuthService created
- [ ] AuthContext updated to use AuthService
- [ ] S3 uploads working with Storage
- [ ] Admin role checking working
- [ ] Environment variables set in Amplify

**Ready to deploy! 🚜☁️**
