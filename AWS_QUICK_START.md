# AWS CMS Integration - Quick Start Checklist

## ✅ Prerequisites Checklist

- [ ] AWS Account created (https://aws.amazon.com)
- [ ] AWS CLI installed (`aws --version`)
- [ ] AWS CLI configured (`aws configure`)
- [ ] Node.js 18+ installed (`node --version`)
- [ ] Dependencies installed (`npm install`)

---

## 🚀 Quick Setup (Automated)

If you have AWS CLI configured, run the automated setup script:

```bash
./scripts/setup-aws.sh
```

This will create:
- Cognito User Pool
- Cognito Client
- S3 Bucket with CORS
- DynamoDB Table with GSI
- Seed initial data

Then fill in your `.env` file with the generated values.

---

## 📋 Manual Setup Steps

### Step 1: Create Cognito User Pool
- [ ] Go to AWS Console → Cognito → User pools
- [ ] Create user pool: `agrofeed-users`
- [ ] Sign-in option: Email
- [ ] Password policy: Min 8 chars, uppercase, lowercase, numbers
- [ ] Custom attributes: `company`, `role`
- [ ] Enable `USER_PASSWORD_AUTH` flow
- [ ] Note down **User Pool ID** and **Client ID**

### Step 2: Create S3 Bucket
- [ ] Go to AWS Console → S3 → Create bucket
- [ ] Bucket name: `agrofeed-content-{unique-name}`
- [ ] Uncheck "Block all public access"
- [ ] Configure CORS (see below)
- [ ] Configure bucket policy for public read (see below)
- [ ] Note down **Bucket Name**

### Step 3: Create DynamoDB Table
- [ ] Go to AWS Console → DynamoDB → Create table
- [ ] Table name: `agrofeed-content`
- [ ] Partition key: `PK` (String)
- [ ] Sort key: `SK` (String)
- [ ] Create GSI: `TypeIndex` with partition key `type`
- [ ] Note down **Table Name**

### Step 4: Create IAM User
- [ ] Go to AWS Console → IAM → Users → Create user
- [ ] User name: `agrofeed-app`
- [ ] Attach policies:
  - `AmazonDynamoDBFullAccess`
  - `AmazonS3FullAccess`
  - `AmazonCognitoPowerUser`
- [ ] Create access key
- [ ] Note down **Access Key ID** and **Secret Access Key**

### Step 5: Configure Environment
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in all AWS credentials
- [ ] Save `.env` file (never commit to git!)

### Step 6: Test
- [ ] Run `npm run dev`
- [ ] Login with `admin@agrofeed.com` / `admin123`
- [ ] Navigate to `/admin`
- [ ] Test image upload
- [ ] Test content management

---

## 🔧 Required CORS Configuration

Add this to your S3 bucket CORS configuration:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["http://localhost:5173", "https://yourdomain.com"],
    "ExposeHeaders": []
  }
]
```

---

## 🔐 Required Bucket Policy

Add this to your S3 bucket policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::{your-bucket-name}/*"
    }
  ]
}
```

---

## 📝 Environment Variables Template

```env
# AWS Region
VITE_AWS_REGION=us-east-1

# AWS Cognito Configuration
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
VITE_AWS_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx

# AWS S3 Configuration
VITE_AWS_S3_BUCKET=agrofeed-content-yourname
VITE_AWS_S3_REGION=us-east-1

# AWS DynamoDB Configuration
VITE_AWS_DYNAMODB_TABLE=agrofeed-content
VITE_AWS_DYNAMODB_REGION=us-east-1

# AWS Credentials
VITE_AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
VITE_AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🧪 Testing Checklist

### Authentication
- [ ] Can login with admin credentials
- [ ] Can access `/admin` dashboard
- [ ] Can logout successfully
- [ ] Admin badge shows on dashboard

### Image Upload
- [ ] Can upload image in CMS editor
- [ ] Image appears in S3 bucket
- [ ] Image URL is accessible
- [ ] Image displays on frontend

### Content Management
- [ ] Can edit hero section
- [ ] Can edit about section
- [ ] Can edit testimonials
- [ ] Can edit enquiry form
- [ ] Can edit site settings
- [ ] Changes reflect on homepage
- [ ] Data is saved in DynamoDB

### Admin Dashboard
- [ ] Can view stats overview
- [ ] Can manage products
- [ ] Can manage testimonials
- [ ] Can view orders (demo data)
- [ ] Can update settings

---

## 🎯 Default Credentials

### localStorage Fallback (Development)
```
Email: admin@agrofeed.com
Password: admin123
Role: admin
```

### Cognito (Production)
Create admin user in Cognito console with:
```
Email: admin@agrofeed.com
Name: Admin User
Custom:company: AgroFeed Inc.
Custom:role: admin
```

---

## 💰 Cost Estimation

### Free Tier (12 months)
- Cognito: 50,000 MAUs free ✅
- S3: 5 GB + 20K GET requests ✅
- DynamoDB: 25 GB + 25 WCU/RCU ✅
- **Total: $0/month**

### Small Production
- Cognito: $0 (under 50K MAU)
- S3: ~$1-5/month
- DynamoDB: ~$3-5/month
- **Total: ~$5-10/month**

---

## 🆘 Common Issues

### CORS Error
**Solution:** Configure S3 CORS properly (see above)

### Authentication Failed
**Solution:** Ensure `USER_PASSWORD_AUTH` is enabled in Cognito client

### Image Not Displaying
**Solution:** Check S3 bucket policy allows public read

### Access Denied (DynamoDB)
**Solution:** Verify IAM user has DynamoDB permissions

### Credentials Not Loaded
**Solution:** Check `.env` file exists and restart dev server

---

## 📚 Documentation

- **Full Guide:** `AWS_CMS_INTEGRATION_GUIDE.md`
- **Existing Docs:** `AWS_INTEGRATION.md`, `AWS_SETUP.md`
- **AWS Cognito Docs:** https://docs.aws.amazon.com/cognito/
- **AWS S3 Docs:** https://docs.aws.amazon.com/s3/
- **AWS DynamoDB Docs:** https://docs.aws.amazon.com/dynamodb/

---

## ✨ Features

Your CMS includes:

- ✅ Hybrid AWS/localStorage architecture
- ✅ Automatic AWS detection
- ✅ Cognito authentication with admin roles
- ✅ S3 image upload with public URLs
- ✅ DynamoDB content storage (single-table design)
- ✅ Full CMS editor (hero, about, testimonials, enquiry, settings)
- ✅ Product management
- ✅ Testimonial management
- ✅ Protected admin routes
- ✅ Responsive UI with Radix UI components
- ✅ Toast notifications

---

**🎉 You're ready to go!**

Run `npm run dev` and start managing your CMS content with AWS!
