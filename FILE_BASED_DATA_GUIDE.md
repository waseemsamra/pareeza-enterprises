# 📁 File-Based Data Storage Guide

## Overview

Your AgroFeed CMS now uses a **file-based data storage system** where all data is stored in JSON files in the `/data` folder. This makes it:

- ✅ **Easy to backup** - Just copy the `/data` folder
- ✅ **Version controlled** - Track changes in Git
- ✅ **Deployment ready** - Works on Amplify, Vercel, Netlify
- ✅ **Easy to edit** - Modify JSON files directly
- ✅ **Test-friendly** - Consistent data across deployments

---

## 📂 Data Files Structure

```
agrofeed/
├── data/
│   ├── users.json          # User accounts with passwords
│   ├── cms.json            # Website content (Hero, About, etc.)
│   ├── products.json       # Product catalog
│   ├── testimonials.json   # Customer testimonials
│   ├── orders.json         # Order history
│   └── db.json             # Complete database (all data)
│
├── src/
│   └── lib/
│       └── fileDataService.ts  # Data service
│
└── public/
    └── images/             # Static images
```

---

## 📄 File Formats

### users.json

Stores all user accounts with hardcoded passwords.

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-03-22T00:00:00Z",
  "users": [
    {
      "id": "admin-001",
      "name": "Admin User",
      "email": "admin@agrofeed.com",
      "company": "AgroFeed Inc.",
      "password": "admin123",
      "role": "admin",
      "createdAt": "2026-03-22T00:00:00Z",
      "updatedAt": "2026-03-22T00:00:00Z"
    }
  ]
}
```

### cms.json

Stores all website content sections.

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-03-22T00:00:00Z",
  "hero": {
    "badge": "Premium Quality Feed",
    "title": "Premium Animal Feed Products",
    "subtitle": "High-quality hay, alfalfa...",
    "primaryButtonText": "Explore Products",
    "secondaryButtonText": "Contact Us",
    "backgroundImage": "/hero-hay.jpg"
  },
  "about": { ... },
  "testimonials": { ... },
  "enquiry": { ... },
  "siteSettings": { ... }
}
```

### products.json

Product catalog with categories.

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-03-22T00:00:00Z",
  "products": [
    {
      "id": "hay",
      "title": "Hay Products",
      "subtitle": "Premium Grass Hays",
      "description": "Premium Rhodes Grass...",
      "image": "/product-hay.jpg",
      "detailImage": "/detail-timothy.jpg",
      "items": ["Rhodes Grass", "Timothy Hay"],
      "features": ["High Fiber Content", "Low NSC"],
      "category": "hay"
    }
  ]
}
```

---

## 🔐 Default Users & Passwords

### Admin User
```json
{
  "email": "admin@agrofeed.com",
  "password": "admin123",
  "role": "admin"
}
```

### Regular User
```json
{
  "email": "john@farmco.com",
  "password": "user123",
  "role": "user"
}
```

**To add more users**, edit `data/users.json`:
```json
{
  "users": [
    ...existing users,
    {
      "id": "user-002",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "company": "Example Inc.",
      "password": "password123",
      "role": "user",
      "createdAt": "2026-03-22T00:00:00Z"
    }
  ]
}
```

---

## ✏️ How to Edit Data

### Method 1: Direct JSON Editing (Recommended)

1. Open the relevant JSON file in `/data` folder
2. Edit the content
3. Save the file
4. Refresh your browser

**Example - Change Hero Title:**
```json
// data/cms.json
{
  "hero": {
    "title": "Your New Title Here"
  }
}
```

### Method 2: Admin Dashboard (Runtime)

1. Login as admin
2. Go to Admin Dashboard
3. Edit content using CMS editor
4. Changes save to localStorage

**Note:** Dashboard edits save to localStorage. For permanent changes, edit JSON files.

### Method 3: Programmatic Updates

```typescript
import { fileDataService } from './lib/fileDataService';

// Update user role
fileDataService.users.updateUserRole('john@example.com', 'admin');

// Add product
fileDataService.products.addProduct({
  id: 'new-product',
  title: 'New Product',
  ...
});
```

---

## 🔄 Data Flow

### Application Startup

```
1. App loads
   ↓
2. fileDataService initializes
   ↓
3. Check localStorage for data
   ↓
4. If empty, load from JSON files
   ↓
5. Data available in app
```

### Runtime Changes

```
1. User makes change (e.g., edit CMS)
   ↓
2. Change saved to localStorage
   ↓
3. UI updates immediately
   ↓
4. JSON files remain unchanged
   ↓
5. On refresh, localStorage used (not JSON)
```

### Deployment Flow

```
1. Edit JSON files locally
   ↓
2. Commit to Git
   ↓
3. Deploy to Amplify/Vercel/Netlify
   ↓
4. JSON files deployed with app
   ↓
5. First load uses JSON data
   ↓
6. Subsequent loads use localStorage
```

---

## 🚀 Deployment to AWS Amplify

### Step 1: Prepare Your Data

Edit JSON files in `/data` folder with your production data:
- Update passwords
- Add real content
- Configure site settings

### Step 2: Connect to Git

1. Push code to GitHub/GitLab/Bitbucket
2. Go to AWS Amplify Console
3. Connect repository
4. Configure build settings

### Step 3: Build Settings

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Step 4: Deploy

1. Click "Save and Deploy"
2. Amplify builds and deploys
3. Your `/data` folder is included
4. App loads with JSON data

---

## 📊 Data Synchronization

### Local Development

```
JSON Files → localStorage → App
     ↓           ↓
  Git Repo   Browser Storage
```

### Production (Amplify)

```
JSON Files (deployed) → localStorage → App
        ↓                    ↓
   S3 Bucket         Browser Storage
```

### Important Notes

1. **JSON files are source of truth** for initial data
2. **localStorage is runtime storage** for user changes
3. **Changes in admin dashboard** don't update JSON files
4. **To update production data:**
   - Edit JSON files locally
   - Commit and push to Git
   - Redeploy

---

## 💾 Backup & Restore

### Backup Data

```typescript
import { fileDataService } from './lib/fileDataService';

// Download backup
fileDataService.exportImport.downloadBackup();

// Or get JSON string
const backup = fileDataService.exportImport.exportAllData();
console.log(backup);
```

### Restore Data

```typescript
import { fileDataService } from './lib/fileDataService';

// Import from JSON string
const jsonString = '{...}';
fileDataService.exportImport.importData(jsonString);

// Reset to defaults (from JSON files)
fileDataService.exportImport.resetToDefaults();
```

### Manual Backup

```bash
# Backup all data files
cp -r data/ backup-$(date +%Y-%m-%d)
```

---

## 🛠️ Data Management Scripts

### Reset All Data

In browser console:
```javascript
localStorage.clear();
location.reload();
```

### Export Specific Data

```javascript
// Export users
const users = localStorage.getItem('agrofeed_users');
console.log(users);

// Export CMS data
const cms = localStorage.getItem('agrofeed_cms_data');
console.log(cms);
```

### Import from JSON

```javascript
// In browser console
const newData = {...}; // Your JSON
localStorage.setItem('agrofeed_cms_data', JSON.stringify(newData));
location.reload();
```

---

## 📝 Editing Examples

### Add New User

Edit `data/users.json`:
```json
{
  "users": [
    ...existing,
    {
      "id": "user-003",
      "name": "Bob Farmer",
      "email": "bob@farm.com",
      "company": "Bob's Farm",
      "password": "bob123",
      "role": "user",
      "createdAt": "2026-03-22T00:00:00Z"
    }
  ]
}
```

### Change Admin Password

Edit `data/users.json`:
```json
{
  "users": [
    {
      "id": "admin-001",
      "email": "admin@agrofeed.com",
      "password": "newpassword123",
      ...
    }
  ]
}
```

### Update Hero Content

Edit `data/cms.json`:
```json
{
  "hero": {
    "badge": "New Badge",
    "title": "New Title",
    "subtitle": "New subtitle text...",
    "primaryButtonText": "Shop Now",
    "secondaryButtonText": "Learn More",
    "backgroundImage": "/new-hero.jpg"
  }
}
```

### Add New Product

Edit `data/products.json`:
```json
{
  "products": [
    ...existing,
    {
      "id": "organic-feed",
      "title": "Organic Feed",
      "subtitle": "100% Organic",
      "description": "Certified organic animal feed",
      "image": "/product-organic.jpg",
      "detailImage": "/detail-organic.jpg",
      "items": ["Organic Hay", "Organic Grain"],
      "features": ["USDA Organic", "Non-GMO", "Sustainable"],
      "category": "organic"
    }
  ]
}
```

---

## 🔒 Security Considerations

### ⚠️ Passwords in JSON

**Current Setup:**
- Passwords stored in plain text in JSON files
- **OK for:** Development, staging, internal tools
- **NOT OK for:** Public production apps

**For Production:**
1. Use environment variables for sensitive data
2. Implement backend API with proper authentication
3. Use AWS Cognito or similar service
4. Hash passwords before storage

### Example: Environment Variables

```env
# .env
VITE_ADMIN_EMAIL=admin@agrofeed.com
VITE_ADMIN_PASSWORD_HASH=$2b$10$...
```

---

## 📊 Data Statistics

### Check Data Size

```javascript
// In browser console
const keys = [
  'agrofeed_users',
  'agrofeed_cms_data',
  'agrofeed_products',
  'agrofeed_testimonials',
  'agrofeed_orders'
];

keys.forEach(key => {
  const data = localStorage.getItem(key);
  console.log(`${key}: ${(data?.length || 0) / 1024} KB`);
});
```

### View All Data

```javascript
// Export all data
const allData = {
  users: JSON.parse(localStorage.getItem('agrofeed_users')),
  cms: JSON.parse(localStorage.getItem('agrofeed_cms_data')),
  products: JSON.parse(localStorage.getItem('agrofeed_products')),
  testimonials: JSON.parse(localStorage.getItem('agrofeed_testimonials')),
  orders: JSON.parse(localStorage.getItem('agrofeed_orders')),
};

console.log(JSON.stringify(allData, null, 2));
```

---

## 🎯 Best Practices

### ✅ Do's

1. **Keep JSON files in Git** - Version control your data
2. **Backup before major changes** - Export data regularly
3. **Test changes locally** - Deploy after testing
4. **Use meaningful IDs** - `hay` not `product1`
5. **Update version numbers** - Track data schema changes
6. **Document changes** - Keep changelog

### ❌ Don'ts

1. **Don't commit sensitive data** - Use env vars for secrets
2. **Don't edit JSON while app is running** - May cause conflicts
3. **Don't remove required fields** - May break app
4. **Don't use special characters in IDs** - Stick to alphanumeric

---

## 🔄 Migration Guide

### From localStorage to JSON Files

1. Export data from browser:
```javascript
const data = {
  users: localStorage.getItem('agrofeed_users'),
  cms: localStorage.getItem('agrofeed_cms_data'),
  products: localStorage.getItem('agrofeed_products'),
};
```

2. Save to respective JSON files in `/data`

3. Commit to Git

4. Deploy

### From JSON Files to AWS

When ready for AWS integration:

1. Keep JSON files as backup
2. Deploy CloudFormation stack
3. Import JSON data into AWS services
4. Update app to use AWS contexts

---

## 📚 Quick Reference

| File | Contains | Edit When |
|------|----------|-----------|
| `users.json` | User accounts, passwords | Adding/removing users |
| `cms.json` | Website content | Changing text, images |
| `products.json` | Product catalog | Adding/editing products |
| `testimonials.json` | Customer reviews | Adding testimonials |
| `orders.json` | Order history | Demo data |
| `db.json` | Complete backup | Reference only |

---

## 🆘 Troubleshooting

### Data Not Loading

**Problem:** App shows empty data

**Solution:**
1. Check JSON files are valid JSON
2. Clear localStorage: `localStorage.clear()`
3. Reload page
4. Check browser console for errors

### Changes Not Persisting

**Problem:** Edits don't save

**Solution:**
1. Runtime changes save to localStorage only
2. For permanent changes, edit JSON files
3. Commit and redeploy for production

### JSON Invalid

**Problem:** Syntax error in JSON

**Solution:**
1. Use JSON validator (jsonlint.com)
2. Check for missing commas, quotes
3. Use VS Code JSON extension

---

## 🎉 Summary

Your data is now stored in JSON files in the `/data` folder!

**Benefits:**
- ✅ Easy to edit and backup
- ✅ Version controlled with Git
- ✅ Deployment ready (Amplify, Vercel, Netlify)
- ✅ Consistent data across environments
- ✅ No database setup required

**Next Steps:**
1. Edit JSON files with your data
2. Test locally
3. Deploy to Amplify
4. Enjoy!

**Happy Coding! 🚜**
