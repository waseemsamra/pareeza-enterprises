# 🚜 AgroFeed - Quick Start Card

## ✅ Frontend Complete - localStorage Mode

Your application is ready to use with localStorage-based data persistence!

---

## 🚀 Start in 3 Steps

```bash
# 1. Install (if not done)
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# http://localhost:5173
```

---

## 🔐 Default Login

```
Email: admin@agrofeed.com
Password: admin123
Role: admin
```

---

## 📱 Key URLs

| Page | URL |
|------|-----|
| Homepage | http://localhost:5173 |
| Login | http://localhost:5173/login |
| Register | http://localhost:5173/register |
| Dashboard | http://localhost:5173/dashboard |
| **Admin Dashboard** | http://localhost:5173/admin |
| Products | http://localhost:5173/products |
| Contact | http://localhost:5173/contact |

---

## 🎯 What Works

### ✅ Pages
- Home (Hero, About, Testimonials, Enquiry)
- Products (5 categories)
- Product Detail
- Contact Form
- Login/Register
- User Dashboard
- **Admin Dashboard** (CMS, Products, Testimonials, Settings)

### ✅ Features
- User authentication
- Role-based access (admin/user)
- CMS editing (all sections)
- Product management
- Image upload
- Data persistence
- Export/import

---

## 📦 Data Storage

All data saved in browser localStorage:

```
agrofeed_users           → All users
agrofeed_current_user    → Logged-in user
agrofeed_cms_data        → CMS content
agrofeed_products        → Products
agrofeed_testimonials    → Testimonials
agrofeed_orders          → Orders
```

---

## 🛠️ Quick Commands

```bash
npm run dev          # Start development
npm run build        # Build for production
npm run preview      # Preview build
npm run lint         # Check code
```

---

## 🎨 Admin Features

Access at: http://localhost:5173/admin

### Tabs:
1. **CMS** - Edit website content
2. **Products** - Manage product catalog
3. **Testimonials** - Manage reviews
4. **Orders** - View orders
5. **Settings** - Site configuration

---

## 💾 Backup Data

In browser console:
```javascript
import { exportData } from './lib/dataManager';
exportData(); // Downloads JSON backup
```

---

## 🔄 Reset Data

In browser console:
```javascript
localStorage.clear();
location.reload();
// Resets to default admin user
```

---

## 📚 Documentation

| File | Description |
|------|-------------|
| **LOCAL_DEVELOPMENT_GUIDE.md** | Complete dev guide |
| **FRONTEND_COMPLETE.md** | Feature summary |
| **README.md** | Project overview |
| **AWS_*.md** | AWS integration (future) |

---

## 🐛 Troubleshooting

**Can't login?**
```javascript
// Reset admin user
localStorage.setItem('agrofeed_users', JSON.stringify([{
  id: 'admin-001',
  name: 'Admin User',
  email: 'admin@agrofeed.com',
  password: 'admin123',
  role: 'admin'
}]));
location.reload();
```

**Data not saving?**
- Check browser console
- Verify localStorage enabled
- Try different browser

---

## ☁️ Future: AWS Integration

When ready for production:

1. Deploy AWS resources:
   ```bash
   ./scripts/deploy-cloudformation.sh
   ```

2. Update `App.tsx`:
   ```typescript
   // Change contexts to AWS versions
   import { AuthProvider } from './contexts/AuthContextAWS';
   import { CMSProvider } from './contexts/CMSContextAWS';
   ```

3. Add AWS credentials to `.env`

**See:** `CLOUDFORMATION_DEPLOYMENT.md`

---

## ✅ Testing Checklist

- [ ] Homepage loads
- [ ] Login works
- [ ] Can access admin dashboard
- [ ] Can edit CMS content
- [ ] Can add products
- [ ] Can upload images
- [ ] Data persists after refresh
- [ ] Logout/login works

---

## 🎉 You're Ready!

```bash
npm run dev
```

Then visit: **http://localhost:5173/admin**

**Happy Coding! 🚜**
