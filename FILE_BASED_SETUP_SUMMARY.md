# 📁 File-Based Data Storage - Complete Setup

## ✅ What's Been Created

Your AgroFeed CMS now uses a **complete file-based data storage system** with JSON files!

---

## 📂 Data Files Created

Located in `/data` folder:

| File | Purpose | Size |
|------|---------|------|
| **users.json** | User accounts with passwords | ~500 bytes |
| **cms.json** | Website content (all sections) | ~2 KB |
| **products.json** | Product catalog | ~1.5 KB |
| **testimonials.json** | Customer reviews | ~500 bytes |
| **orders.json** | Order history | ~500 bytes |
| **db.json** | Complete database backup | ~5 KB |

---

## 🔐 Default Credentials (Hardcoded in JSON)

### Admin User
```
Email: admin@agrofeed.com
Password: admin123
Role: admin
```

### Regular User
```
Email: john@farmco.com
Password: user123
Role: user
```

**Location:** `data/users.json`

---

## 🚀 How It Works

### Data Flow

```
┌─────────────────┐
│  JSON Files     │
│  (/data folder) │
└────────┬────────┘
         │ App loads
         ▼
┌─────────────────┐
│  localStorage   │
│  (browser)      │
└────────┬────────┘
         │ Runtime
         ▼
┌─────────────────┐
│  React App      │
│  (UI)           │
└─────────────────┘
```

### Initialization

1. **First Load:** Data copied from JSON files → localStorage
2. **Runtime:** All changes saved to localStorage
3. **Refresh:** Data loaded from localStorage (faster)
4. **Deploy:** JSON files deployed with app

---

## ✏️ How to Edit Data

### Method 1: Edit JSON Files (Permanent)

**Best for:** Production data, initial setup, bulk changes

1. Open file in `/data` folder
2. Edit content
3. Save file
4. Commit to Git
5. Deploy

**Example - Change Admin Password:**
```json
// data/users.json
{
  "users": [
    {
      "email": "admin@agrofeed.com",
      "password": "NEW_PASSWORD_HERE",
      ...
    }
  ]
}
```

### Method 2: Admin Dashboard (Runtime)

**Best for:** Quick changes, testing, content updates

1. Login as admin
2. Go to `/admin`
3. Edit content in CMS tab
4. Changes save to localStorage

**Note:** These changes don't update JSON files!

---

## 🔄 Deployment to AWS Amplify

### Step 1: Prepare Data

Edit JSON files with production data:
- Change passwords
- Add real content
- Update contact info

### Step 2: Push to Git

```bash
git add data/
git commit -m "Update production data"
git push
```

### Step 3: Deploy to Amplify

1. Go to AWS Amplify Console
2. Connect your Git repository
3. Configure build settings:

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
```

4. Click **Deploy**

### Step 4: Verify

1. Amplify builds your app
2. `/data` folder included in build
3. App loads with JSON data
4. Test login with hardcoded passwords

---

## 📊 Data Structure

### Users (users.json)

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

### CMS Data (cms.json)

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-03-22T00:00:00Z",
  "hero": { ... },
  "about": { ... },
  "testimonials": { ... },
  "enquiry": { ... },
  "siteSettings": { ... }
}
```

### Products (products.json)

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-03-22T00:00:00Z",
  "products": [
    {
      "id": "hay",
      "title": "Hay Products",
      "category": "hay",
      ...
    }
  ]
}
```

---

## 🛠️ File-Based Data Service

Created: `src/lib/fileDataService.ts`

### Features

- ✅ Load data from JSON files
- ✅ Sync with localStorage
- ✅ CRUD operations for all data types
- ✅ Export/import functionality
- ✅ Automatic initialization

### Usage

```typescript
import { fileDataService } from './lib/fileDataService';

// Users
const users = fileDataService.users.getAllUsers();
const user = fileDataService.users.getUserByEmail('admin@agrofeed.com');

// CMS
const cmsData = fileDataService.cms.getCMSData();
fileDataService.cms.updateHero({ title: 'New Title' });

// Products
const products = fileDataService.products.getProducts();
fileDataService.products.addProduct(newProduct);

// Export/Import
fileDataService.exportImport.downloadBackup();
```

---

## 💾 Backup & Restore

### Download Backup

```typescript
import { fileDataService } from './lib/fileDataService';

// In browser console or component
fileDataService.exportImport.downloadBackup();
```

### Restore from Backup

```typescript
const jsonString = '{...}'; // Your backup JSON
fileDataService.exportImport.importData(jsonString);
```

### Reset to Defaults

```typescript
fileDataService.exportImport.resetToDefaults();
// Clears localStorage and reloads from JSON files
```

---

## 📝 Quick Edit Examples

### Add New User

Edit `data/users.json`:
```json
{
  "users": [
    ...existing users,
    {
      "id": "user-003",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "company": "Example Farm",
      "password": "jane123",
      "role": "user",
      "createdAt": "2026-03-22T00:00:00Z"
    }
  ]
}
```

### Change Site Title

Edit `data/cms.json`:
```json
{
  "siteSettings": {
    "siteName": "Your New Site Name"
  }
}
```

### Add New Product

Edit `data/products.json`:
```json
{
  "products": [
    ...existing products,
    {
      "id": "new-product",
      "title": "New Product Name",
      "subtitle": "Product Subtitle",
      "description": "Detailed description",
      "image": "/product-new.jpg",
      "category": "new-category",
      "items": ["Item 1", "Item 2"],
      "features": ["Feature 1", "Feature 2"]
    }
  ]
}
```

---

## 🔒 Security Notes

### ⚠️ Passwords in JSON Files

**Current Setup:**
- Passwords stored in plain text
- **OK for:** Development, staging, internal tools
- **NOT OK for:** Public-facing production apps

**Recommendations:**

1. **For Production:**
   - Use environment variables
   - Implement backend authentication
   - Use AWS Cognito
   - Hash passwords

2. **For Now:**
   - Use strong passwords
   - Don't commit sensitive data
   - Use separate files for prod/dev

---

## 📂 Complete File Structure

```
agrofeed/
├── data/                        # ← NEW! Data storage
│   ├── users.json              # User accounts
│   ├── cms.json                # Website content
│   ├── products.json           # Products
│   ├── testimonials.json       # Testimonials
│   ├── orders.json             # Orders
│   └── db.json                 # Complete backup
│
├── src/
│   └── lib/
│       └── fileDataService.ts  # ← NEW! Data service
│
├── public/
│   └── images/                 # Static images
│
└── [Other files]
```

---

## 🎯 Benefits

### ✅ For Development

- Easy to edit data (just edit JSON)
- Version controlled (Git)
- No database setup
- Fast iteration

### ✅ For Deployment

- Files deployed with app
- Works on any static host
- No external dependencies
- Consistent data

### ✅ For Testing

- Reset data easily
- Multiple environments (dev/prod)
- Reproducible setups
- Quick backups

---

## 🔄 Data Synchronization

### Local Development

```
Edit JSON → Save → Refresh Browser → See Changes
```

### Production (Amplify)

```
Edit JSON → Commit → Push → Amplify Deploys → Live Site Updates
```

### Important Notes

1. **JSON files = Source of truth** for initial data
2. **localStorage = Runtime storage** for changes
3. **Dashboard edits** don't update JSON files
4. **To update production:** Edit JSON → Commit → Deploy

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **FILE_BASED_DATA_GUIDE.md** | 📖 Complete guide (read this!) |
| **QUICK_START.md** | ⚡ Quick reference |
| **LOCAL_DEVELOPMENT_GUIDE.md** | 💻 Dev setup |
| **README.md** | 🏠 Project overview |

---

## ✅ Testing Checklist

- [ ] Edit `data/users.json` - change password
- [ ] Edit `data/cms.json` - change hero title
- [ ] Edit `data/products.json` - add product
- [ ] Run `npm run dev`
- [ ] Login with new password
- [ ] See CMS changes on homepage
- [ ] Check new product in products page
- [ ] Download backup
- [ ] Reset to defaults
- [ ] Build: `npm run build`
- [ ] Deploy to Amplify (optional)

---

## 🎉 You're All Set!

Your AgroFeed CMS now has:

- ✅ File-based data storage in `/data` folder
- ✅ Hardcoded passwords in JSON files
- ✅ Easy editing (just edit JSON)
- ✅ Ready for Amplify deployment
- ✅ Backup/restore functionality
- ✅ Version control friendly

### Next Steps:

1. **Edit JSON files** with your data
2. **Test locally:** `npm run dev`
3. **Commit to Git**
4. **Deploy to Amplify**
5. **Enjoy!**

### Quick Commands:

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Login at
http://localhost:5173/admin
# Email: admin@agrofeed.com
# Password: admin123
```

**Happy Coding! 🚜**
