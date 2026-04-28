# 🚜 AgroFeed - Local Development Guide

## Overview

This guide covers local development with localStorage-based data persistence. AWS integration can be added later.

---

## ✅ What's Implemented

### Frontend Pages
- ✅ **Home** - Hero, About, Testimonials, Enquiry sections
- ✅ **Products** - Product catalog with categories
- ✅ **Product Detail** - Individual product pages
- ✅ **Contact** - Contact form with enquiry
- ✅ **Login** - User authentication
- ✅ **Register** - User registration
- ✅ **Dashboard** - User dashboard
- ✅ **Admin Dashboard** - Full CMS management

### Data Persistence (localStorage)
- ✅ Users (with admin/user roles)
- ✅ CMS Content (Hero, About, Testimonials, Enquiry, Settings)
- ✅ Products
- ✅ Testimonials
- ✅ Orders (demo data)

### Features
- ✅ Authentication with role-based access
- ✅ CMS editor for all sections
- ✅ Product management
- ✅ Image upload (blob URLs)
- ✅ Data export/import
- ✅ Responsive design

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access the Application
- **Homepage:** http://localhost:5173
- **Login:** http://localhost:5173/login
- **Admin Dashboard:** http://localhost:5173/admin

### 4. Default Credentials
```
Email: admin@agrofeed.com
Password: admin123
Role: admin
```

---

## 📦 Data Storage

All data is stored in browser localStorage with these keys:

| Key | Data Type | Description |
|-----|-----------|-------------|
| `agrofeed_users` | Array | All registered users |
| `agrofeed_current_user` | Object | Currently logged-in user |
| `agrofeed_cms_data` | Object | CMS content for all sections |
| `agrofeed_products` | Array | Product catalog |
| `agrofeed_testimonials` | Array | Customer testimonials |
| `agrofeed_orders` | Array | Order history (demo) |

---

## 🛠️ Development Tools

### Data Export/Import

The app includes utilities to backup and restore data:

```typescript
import { exportData, importData } from './lib/dataManager';

// Export all data to JSON file
exportData();

// Import data from JSON string
const jsonString = '{"version":"1.0.0",...}';
importData(jsonString);
```

### localStorage Service

Centralized service for data operations:

```typescript
import { localStorageService } from './lib/localStorageService';

// Users
const users = localStorageService.users.getAllUsers();
const user = localStorageService.users.getUserByEmail('admin@agrofeed.com');
localStorageService.users.createUser(newUser);

// CMS Data
const cmsData = localStorageService.cms.getCMSData();
localStorageService.cms.updateSection('hero', heroData);

// Products
const products = localStorageService.products.getProducts();
localStorageService.products.addProduct(product);
localStorageService.products.updateProduct(id, updates);
localStorageService.products.deleteProduct(id);
```

---

## 📝 Managing Content

### Via Admin Dashboard

1. Login as admin
2. Navigate to `/admin`
3. Use the tabs:
   - **CMS** - Edit website content
   - **Products** - Manage product catalog
   - **Testimonials** - Manage reviews
   - **Orders** - View orders
   - **Settings** - Site configuration

### Via Browser Console

```javascript
// Access CMS data
const cms = localStorage.getItem('agrofeed_cms_data');
const data = JSON.parse(cms);
console.log(data.hero);

// Update hero title
data.hero.title = 'New Title';
localStorage.setItem('agrofeed_cms_data', JSON.stringify(data));

// Refresh page to see changes
location.reload();
```

---

## 🎨 Customization

### Add a New Product

**Via Admin Dashboard:**
1. Go to Admin → Products tab
2. Click "Add Product"
3. Fill in details
4. Upload images
5. Save

**Programmatically:**
```typescript
import { localStorageService } from './lib/localStorageService';

const newProduct = {
  id: 'new-product',
  title: 'New Product',
  subtitle: 'Product Subtitle',
  description: 'Description',
  image: '/product.jpg',
  detailImage: '/detail.jpg',
  items: ['Item 1', 'Item 2'],
  features: ['Feature 1', 'Feature 2'],
  category: 'new',
};

localStorageService.products.addProduct(newProduct);
```

### Add a New User

**Via Registration:**
1. Go to `/register`
2. Fill in details
3. Submit

**Programmatically:**
```typescript
import { localStorageService } from './lib/localStorageService';

const newUser = {
  id: Date.now().toString(),
  name: 'John Doe',
  email: 'john@example.com',
  company: 'Company Inc.',
  password: 'password123',
  role: 'user', // or 'admin'
};

localStorageService.users.createUser(newUser);
```

---

## 🔄 Data Flow

### Authentication Flow

```
Login Form
    ↓
AuthContext.login(email, password)
    ↓
localStorageService.users.getUserByEmail()
    ↓
Check password
    ↓
Store user in localStorage
    ↓
Update React state
    ↓
Redirect to dashboard
```

### CMS Update Flow

```
CMS Editor Form
    ↓
useCMS().updateHero(data)
    ↓
Update React state
    ↓
Save to localStorage
    ↓
Show success toast
    ↓
Homepage reflects changes
```

### Image Upload Flow

```
File Input
    ↓
CMSContext.uploadImage(file)
    ↓
Create blob URL
    ↓
Return URL
    ↓
Save in content
    ↓
Display image
```

---

## 📊 Default Data

### Admin User
```json
{
  "id": "admin-001",
  "name": "Admin User",
  "email": "admin@agrofeed.com",
  "company": "AgroFeed Inc.",
  "password": "admin123",
  "role": "admin"
}
```

### CMS Sections
- **Hero** - Homepage hero section
- **About** - About section with features and stats
- **Testimonials** - Customer reviews
- **Enquiry** - Contact form content
- **SiteSettings** - Site configuration

### Products
- Hay Products
- Alfalfa Products
- Straw Products
- Grain & Silage
- Pellets & Capsules

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Login with admin credentials
- [ ] Access admin dashboard
- [ ] Edit hero section
- [ ] Upload an image
- [ ] Add a new product
- [ ] Edit testimonials
- [ ] Update site settings
- [ ] Logout and login again
- [ ] Changes persist after refresh

### Browser Console Tests

```javascript
// Check current user
JSON.parse(localStorage.getItem('agrofeed_current_user'))

// Check CMS data
JSON.parse(localStorage.getItem('agrofeed_cms_data'))

// Check products
JSON.parse(localStorage.getItem('agrofeed_products'))

// Clear all data (resets to defaults)
localStorage.clear()
location.reload()
```

---

## 🐛 Troubleshooting

### Data Not Persisting

**Problem:** Changes don't save

**Solution:**
1. Check browser console for errors
2. Verify localStorage is enabled
3. Try in a different browser
4. Check incognito mode (may block localStorage)

### Login Not Working

**Problem:** Can't login with admin credentials

**Solution:**
```javascript
// Reset users to default
localStorage.setItem('agrofeed_users', JSON.stringify([{
  id: 'admin-001',
  name: 'Admin User',
  email: 'admin@agrofeed.com',
  company: 'AgroFeed Inc.',
  password: 'admin123',
  role: 'admin'
}]));
location.reload();
```

### Images Not Showing

**Problem:** Uploaded images don't display

**Solution:**
- Blob URLs are temporary (session only)
- For permanent images, use actual image files in `/public` folder
- Or integrate with S3 later

### Admin Dashboard Not Accessible

**Problem:** Redirected to dashboard instead of admin

**Solution:**
```javascript
// Check user role
const user = JSON.parse(localStorage.getItem('agrofeed_current_user'));
console.log(user.role); // Should be 'admin'

// Fix role if needed
user.role = 'admin';
localStorage.setItem('agrofeed_current_user', JSON.stringify(user));
location.reload();
```

---

## 📁 File Structure

```
src/
├── components/
│   ├── ui/                 # Radix UI components
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   └── ProtectedRoute.tsx
│
├── contexts/
│   ├── AuthContext.tsx     # Authentication (localStorage)
│   └── CMSContext.tsx      # CMS data (localStorage)
│
├── lib/
│   ├── localStorageService.ts  # Data persistence
│   ├── dataManager.ts         # Export/import utilities
│   └── utils.ts
│
├── pages/
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Contact.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── AdminDashboard.tsx
│   └── CMSManagement.tsx
│
├── sections/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Testimonials.tsx
│   └── EnquiryForm.tsx
│
└── hooks/
    └── *.ts
```

---

## 🔧 Useful Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run preview      # Preview build

# Code Quality
npm run lint         # Check code
npm run lint --fix   # Auto-fix issues
```

---

## 💾 Backup Data

### Manual Backup
```javascript
// In browser console
const backup = {
  users: localStorage.getItem('agrofeed_users'),
  cmsData: localStorage.getItem('agrofeed_cms_data'),
  products: localStorage.getItem('agrofeed_products'),
  testimonials: localStorage.getItem('agrofeed_testimonials'),
};

// Download as JSON
const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'agrofeed-backup.json';
a.click();
```

### Programmatic Backup
```typescript
import { exportData } from './lib/dataManager';
exportData(); // Downloads JSON file
```

---

## 🎯 Next Steps

### Complete the Application

1. **Test All Features**
   - Login/Logout
   - CMS editing
   - Product management
   - Image upload
   - User registration

2. **Add Missing Features**
   - Password reset
   - Email verification
   - User profile editing
   - Advanced search
   - Filtering

3. **Improve UI/UX**
   - Add loading states
   - Improve error messages
   - Add animations
   - Enhance mobile experience

4. **Add Content**
   - Real product images
   - Actual testimonials
   - Company information
   - Contact details

### Future AWS Integration

When ready to integrate AWS:

1. **Set up AWS resources**
   - Follow `CLOUDFORMATION_DEPLOYMENT.md`
   - Deploy CloudFormation stack
   - Get credentials

2. **Switch contexts**
   - Change `AuthContext` to `AuthContextAWS`
   - Change `CMSContext` to `CMSContextAWS`
   - Update imports in `App.tsx`

3. **Test with AWS**
   - Cognito authentication
   - S3 image upload
   - DynamoDB storage

---

## 📚 Resources

### Documentation
- **React Docs:** https://react.dev
- **TypeScript:** https://typescriptlang.org
- **Tailwind CSS:** https://tailwindcss.com
- **Radix UI:** https://radix-ui.com

### Project Docs
- `README.md` - Project overview
- `AWS_CMS_INTEGRATION_GUIDE.md` - AWS integration (for later)
- `CLOUDFORMATION_DEPLOYMENT.md` - CloudFormation setup

---

## ✅ Development Checklist

- [ ] Dependencies installed
- [ ] Dev server running
- [ ] Can access homepage
- [ ] Can login as admin
- [ ] Can access admin dashboard
- [ ] Can edit CMS content
- [ ] Can add products
- [ ] Can upload images
- [ ] Changes persist after refresh
- [ ] Can logout and login again
- [ ] Data can be exported

---

**🎉 You're all set for local development!**

Focus on completing the frontend features first. AWS integration can come later when you're ready for production deployment.
