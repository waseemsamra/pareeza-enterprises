# AWS CMS Integration - Complete Setup Guide

## Overview

Your AgroFeed application already has complete AWS integration for CMS functionality:

- **AWS Cognito** - Admin authentication and authorization
- **AWS S3** - Image storage and CDN
- **AWS DynamoDB** - CMS content storage

The app uses a **hybrid approach**: it automatically uses AWS when configured, or falls back to localStorage for development/testing.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     AgroFeed CMS Application                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐  │
│  │   React UI   │─────▶│  AuthContext │─────▶│   Cognito    │  │
│  │  (Frontend)  │      │   CMSContext │      │  (Auth)      │  │
│  └──────────────┘      └──────┬───────┘      └──────────────┘  │
│                               │                                  │
│                               ▼                                  │
│                      ┌────────────────┐     ┌──────────────┐    │
│                      │  DynamoDB      │     │     S3       │    │
│                      │  (Content)     │     │   (Images)   │    │
│                      └────────────────┘     └──────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

1. **AWS Account** - Sign up at https://aws.amazon.com
2. **Node.js 18+** - Already installed
3. **AWS CLI** (optional) - For command-line setup

---

## Step-by-Step Setup

### Step 1: Install Dependencies

All AWS SDK dependencies are already installed in your `package.json`:

```bash
npm install
```

### Step 2: Create AWS Cognito User Pool

#### Option A: Using AWS Console (Recommended)

1. Go to **AWS Console** → **Cognito** → **User pools**
2. Click **Create user pool**
3. **Configure sign-in:**
   - Sign-in options: **Email**
   - User pool name: `agrofeed-users`

4. **Security settings:**
   - Password policy: 
     - Minimum 8 characters ✓
     - Require uppercase ✓
     - Require lowercase ✓
     - Require numbers ✓
   - MFA: **Optional** (enable for production)

5. **Sign-up experience:**
   - Allow self-signup: **Yes**
   - Required attributes: **email**, **name**
   - Custom attributes:
     - Add `company` (String)
     - Add `role` (String, default: 'user')

6. **Message delivery:**
   - Email provider: **Send email with Cognito**

7. **App client configuration:**
   - Client name: `agrofeed-web`
   - Client type: **Public client** (no secret)
   - **Enable USER_PASSWORD_AUTH** flow (critical!)
   - Disable anonymous access

8. **Review and create**

9. **Note down:**
   - **User Pool ID** (e.g., `us-east-1_XXXXXXXXX`)
   - **Client ID** (e.g., `xxxxxxxxxxxxxxxxxxxxxxxxxx`)

#### Option B: Using AWS CLI

```bash
aws cognito-idp create-user-pool \
  --pool-name agrofeed-users \
  --username-attributes email \
  --auto-verified-attributes email \
  --policies '{
    "PasswordPolicy": {
      "MinimumLength": 8,
      "RequireUppercase": true,
      "RequireLowercase": true,
      "RequireNumbers": true,
      "RequireSymbols": false
    }
  }' \
  --schema '[
    {
      "Name": "name",
      "AttributeDataType": "String",
      "Required": true
    },
    {
      "Name": "email",
      "AttributeDataType": "String",
      "Required": true,
      "AutoVerifiedAttributes": ["email"]
    },
    {
      "Name": "company",
      "AttributeDataType": "String",
      "Required": false
    }
  ]' \
  --query 'UserPool.{Id:Id,Name:Name,Arn:Arn}'
```

Then create a client:

```bash
aws cognito-idp create-user-pool-client \
  --user-pool-id YOUR_USER_POOL_ID \
  --client-name agrofeed-web \
  --explicit-auth-flows USER_PASSWORD_AUTH \
  --allowed-auth-flows USER_PASSWORD_AUTH \
  --query 'UserPoolClient.{ClientId:ClientId,ClientName:ClientName}'
```

---

### Step 3: Create S3 Bucket

#### Using AWS Console:

1. Go to **S3** → **Create bucket**
2. **Bucket name:** `agrofeed-content-{your-unique-name}` (must be globally unique)
3. **Region:** Select your region (e.g., us-east-1)
4. **Block Public Access:**
   - Uncheck "Block all public access"
   - Acknowledge warning
5. Click **Create bucket**

6. **Configure CORS** (after creation):
   - Go to bucket → **Permissions** tab
   - Scroll to **Cross-origin resource sharing (CORS)**
   - Click **Edit** and add:

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

7. **Configure Bucket Policy** for public read:
   - Go to **Permissions** → **Bucket Policy**
   - Add:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::agrofeed-content-{your-bucket-name}/*"
    }
  ]
}
```

#### Using AWS CLI:

```bash
# Create bucket
aws s3 mb s3://agrofeed-content-yourname-$(date +%s)

# Configure CORS
aws s3api put-bucket-cors \
  --bucket agrofeed-content-yourname-XXX \
  --cors-configuration '{
    "CORSRules": [{
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
      "AllowedOrigins": ["http://localhost:5173"]
    }]
  }'

# Set bucket policy
aws s3api put-bucket-policy \
  --bucket agrofeed-content-yourname-XXX \
  --policy '{
    "Version": "2012-10-17",
    "Statement": [{
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::agrofeed-content-yourname-XXX/*"
    }]
  }'
```

---

### Step 4: Create DynamoDB Table

#### Using AWS Console:

1. Go to **DynamoDB** → **Create table**
2. **Table name:** `agrofeed-content`
3. **Partition key:** `PK` (String)
4. **Sort key:** `SK` (String)
5. Click **Create**

6. **Create Global Secondary Index (GSI):**
   - Go to table → **Indexes** tab
   - Click **Create index**
   - Index name: `TypeIndex`
   - Partition key: `type` (String)
   - Sort key: (leave empty)
   - Projection type: **ALL**
   - Click **Create**

#### Using AWS CLI:

```bash
aws dynamodb create-table \
  --table-name agrofeed-content \
  --attribute-definitions \
    AttributeName=PK,AttributeType=S \
    AttributeName=SK,AttributeType=S \
    AttributeName=type,AttributeType=S \
  --key-schema \
    AttributeName=PK,KeyType=HASH \
    AttributeName=SK,KeyType=RANGE \
  --global-secondary-indexes \
    "IndexName=TypeIndex,KeySchema=[{AttributeName=type,KeyType=HASH}],Projection={ProjectionType=ALL}" \
  --billing-mode PAY_PER_REQUEST \
  --query 'TableDescription.{TableName:TableName,TableArn:TableArn}'
```

---

### Step 5: Create IAM User (for Development)

**Note:** In production, use IAM roles instead of access keys.

1. Go to **IAM** → **Users** → **Create user**
2. **User name:** `agrofeed-app`
3. **Permissions:**
   - Click **Attach policies directly**
   - Search and attach:
     - `AmazonDynamoDBFullAccess`
     - `AmazonS3FullAccess`
     - `AmazonCognitoPowerUser`
   
   Or create a custom policy (recommended for production):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cognito-idp:SignUp",
        "cognito-idp:ConfirmSignUp",
        "cognito-idp:InitiateAuth",
        "cognito-idp:RespondToAuthChallenge",
        "cognito-idp:ChangePassword",
        "cognito-idp:ForgotPassword",
        "cognito-idp:ConfirmForgotPassword"
      ],
      "Resource": "arn:aws:cognito-idp:{region}:{account-id}:userpool/{user-pool-id}"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::{bucket-name}",
        "arn:aws:s3:::{bucket-name}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:BatchWriteItem"
      ],
      "Resource": "arn:aws:dynamodb:{region}:{account-id}:table/agrofeed-content"
    }
  ]
}
```

4. Go to **Security credentials** tab
5. Click **Create access key**
6. Select **Command Line Interface (CLI)**
7. **Note down:**
   - **Access Key ID** (e.g., `AKIAXXXXXXXXXXXXXXXX`)
   - **Secret Access Key** (e.g., `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

---

### Step 6: Configure Environment Variables

1. Copy the example file:

```bash
cp .env.example .env
```

2. Edit `.env` with your AWS credentials:

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

# AWS Credentials (Development only - use IAM roles in production)
VITE_AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
VITE_AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**⚠️ SECURITY WARNING:**
- Never commit `.env` to version control
- In production, use IAM roles (EC2, Lambda, ECS) instead of access keys

---

### Step 7: Seed Initial Data (Optional)

Create an admin user in DynamoDB:

```bash
aws dynamodb put-item --table-name agrofeed-content --item '{
  "PK": {"S": "USER#admin-001"},
  "SK": {"S": "METADATA"},
  "type": {"S": "user"},
  "data": {"M": {
    "id": {"S": "admin-001"},
    "email": {"S": "admin@agrofeed.com"},
    "name": {"S": "Admin User"},
    "company": {"S": "AgroFeed Inc."},
    "role": {"S": "admin"}
  }},
  "createdAt": {"S": "2026-03-21T00:00:00Z"},
  "updatedAt": {"S": "2026-03-21T00:00:00Z"},
  "version": {"N": "1"}
}'
```

Seed default CMS content:

```bash
# Hero content
aws dynamodb put-item --table-name agrofeed-content --item '{
  "PK": {"S": "HERO#default"},
  "SK": {"S": "METADATA"},
  "type": {"S": "hero"},
  "data": {"M": {
    "badge": {"S": "Premium Quality Feed"},
    "title": {"S": "Premium Animal Feed Products"},
    "subtitle": {"S": "High-quality hay, alfalfa, straw, and grain products for your livestock needs."},
    "primaryButtonText": {"S": "Explore Products"},
    "secondaryButtonText": {"S": "Contact Us"},
    "backgroundImage": {"S": "/hero-hay.jpg"}
  }},
  "createdAt": {"S": "2026-03-21T00:00:00Z"},
  "updatedAt": {"S": "2026-03-21T00:00:00Z"},
  "version": {"N": "1"}
}'
```

---

### Step 8: Test the Integration

1. **Start the development server:**

```bash
npm run dev
```

2. **Test Admin Login:**
   - Navigate to `/login`
   - Login with: `admin@agrofeed.com` / `admin123` (localStorage fallback)
   - Or register a new admin user in Cognito

3. **Access Admin Dashboard:**
   - Navigate to `/admin`
   - You should see the admin dashboard with CMS, Products, Testimonials tabs

4. **Test Image Upload:**
   - Go to Admin Dashboard → CMS tab
   - Edit any section with an image field
   - Upload an image
   - Check S3 bucket to verify upload

5. **Test Content Management:**
   - Edit hero section content
   - Save changes
   - Check DynamoDB to verify data is saved
   - Refresh homepage to see changes

---

## How It Works

### Automatic AWS Detection

The app automatically detects if AWS is configured:

```typescript
// In AuthContextAWS.tsx and CMSContextAWS.tsx
const isAWSConfigured = () => {
  return !!(
    import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID &&
    import.meta.env.VITE_AWS_COGNITO_CLIENT_ID &&
    import.meta.env.VITE_AWS_ACCESS_KEY_ID &&
    import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  );
};
```

- **If AWS configured** → Uses Cognito, S3, DynamoDB
- **If not configured** → Falls back to localStorage

### Authentication Flow

```
User Login
    ↓
AuthContextAWS.login()
    ↓
CognitoService.signIn()
    ↓
Cognito InitiateAuth API
    ↓
Store tokens in localStorage
    ↓
Update user state
    ↓
Redirect to dashboard
```

### Image Upload Flow

```
User selects image
    ↓
CMSContext.uploadImage()
    ↓
S3Service.uploadImage()
    ↓
S3 PutObjectCommand
    ↓
Returns S3 URL
    ↓
Save URL in DynamoDB
```

### Content Storage Flow

```
User saves CMS content
    ↓
CMSContext.updateHero/About/etc()
    ↓
DynamoDBService.saveContent()
    ↓
DynamoDB PutItemCommand
    ↓
Content saved with PK/SK pattern
```

---

## DynamoDB Table Design

### Single Table Design

```
Table: agrofeed-content
├── PK (Partition Key): STRING  - e.g., "HERO#default"
├── SK (Sort Key): STRING       - always "METADATA"
├── type: STRING                - GSI partition key
├── data: MAP                   - actual content
├── createdAt: STRING           - ISO timestamp
├── updatedAt: STRING           - ISO timestamp
└── version: NUMBER             - optimistic locking
```

### Content Types

| Type | PK Format | Description |
|------|-----------|-------------|
| `hero` | `HERO#default` | Hero section |
| `about` | `ABOUT#default` | About section |
| `testimonials` | `TESTIMONIALS#default` | Testimonials |
| `enquiry` | `ENQUIRY#default` | Enquiry form |
| `siteSettings` | `SITESETTINGS#default` | Site settings |
| `product` | `PRODUCT#{id}` | Products |
| `user` | `USER#{id}` | Users |

### Global Secondary Index

```
Index: TypeIndex
├── Partition Key: type
└── Sort Key: (none)
```

Allows querying all items by type.

---

## S3 Bucket Structure

```
s3://agrofeed-content-bucket/
├── hero/
│   └── 1711234567-abc123.jpg
├── about/
│   └── 1711234567-def456.jpg
├── products/
│   └── 1711234567-ghi789.jpg
└── uploads/
    └── 1711234567-jkl012.png
```

All objects are public-readable via bucket policy.

---

## Admin User Setup

### Default Admin (localStorage fallback)

- **Email:** `admin@agrofeed.com`
- **Password:** `admin123`
- **Role:** admin

### Creating Admin in Cognito

1. Go to **Cognito** → **User pools** → `agrofeed-users`
2. Go to **Users** tab
3. Click **Create user**
4. Fill in:
   - Email: `admin@agrofeed.com`
   - Name: `Admin User`
   - Password: (temporary password)
   - Custom attributes:
     - `company`: `AgroFeed Inc.`
     - `role`: `admin`
5. Click **Create**
6. User will need to verify email on first login

---

## Cost Estimation

### AWS Free Tier (12 months)

| Service | Free Tier Limit | Expected Usage | Cost |
|---------|----------------|----------------|------|
| Cognito | 50,000 MAUs | < 1,000 users | $0 |
| S3 | 5 GB + 20K GET | 1 GB + 5K requests | $0 |
| DynamoDB | 25 GB + 25 WCU/RCU | 100 MB + 10 WCU | $0 |

**Total: $0/month** (within free tier)

### Production (Small Business)

| Service | Usage | Cost |
|---------|-------|------|
| Cognito | 10,000 MAUs | $0 |
| S3 | 10 GB + 50K requests | ~$1-2 |
| DynamoDB | 1 GB + on-demand | ~$3-5 |

**Total: ~$5-10/month**

---

## Security Best Practices

### ✅ Do's

1. **Never commit `.env`** to version control
2. **Use IAM roles** in production (EC2, Lambda, ECS)
3. **Enable Cognito MFA** for admin users
4. **Configure S3 CORS** properly
5. **Use CloudFront** for S3 content delivery
6. **Enable DynamoDB encryption** (enabled by default)
7. **Implement rate limiting** for API calls
8. **Use HTTPS** in production
9. **Rotate access keys** regularly
10. **Enable CloudTrail** for audit logging

### ❌ Don'ts

1. Don't hardcode credentials in code
2. Don't use root account credentials
3. Don't make S3 bucket fully public (use CloudFront)
4. Don't disable Cognito password policies
5. Don't skip input validation

---

## Troubleshooting

### "Credentials not loaded"

**Problem:** AWS credentials not being recognized

**Solution:**
1. Check `.env` file exists
2. Verify all environment variables are filled
3. Restart dev server: `npm run dev`
4. Check browser console for errors

---

### "CORS error with S3"

**Problem:** Image upload fails with CORS error

**Solution:**
```bash
aws s3api put-bucket-cors \
  --bucket your-bucket-name \
  --cors-configuration file://cors.json
```

Where `cors.json` contains:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["http://localhost:5173", "https://yourdomain.com"]
  }
]
```

---

### "Cognito authentication failed"

**Problem:** Login fails with "Invalid credentials"

**Solution:**
1. Verify User Pool ID and Client ID are correct
2. Ensure `USER_PASSWORD_AUTH` flow is enabled in Cognito client
3. Check user email is verified in Cognito
4. Check browser console for detailed error

---

### "DynamoDB access denied"

**Problem:** Content save fails with access denied

**Solution:**
1. Check IAM user has DynamoDB permissions
2. Verify table name matches exactly
3. Ensure table exists in the same region
4. Check access key hasn't expired

---

### "Image not displaying after upload"

**Problem:** Image uploaded but not showing on website

**Solution:**
1. Check S3 bucket policy allows public read
2. Verify image URL is correct
3. Check browser console for 403 errors
4. Try accessing image URL directly

---

## Production Deployment

### Using IAM Roles (Recommended)

Instead of access keys, use IAM roles:

#### For EC2:
1. Create IAM role with required permissions
2. Attach role to EC2 instance
3. Remove `VITE_AWS_ACCESS_KEY_ID` and `VITE_AWS_SECRET_ACCESS_KEY` from `.env`
4. SDK automatically uses instance role

#### For Lambda:
1. Create Lambda execution role with permissions
2. Attach role to Lambda function
3. No credentials needed in code

#### For ECS/EKS:
1. Create IAM role for tasks
2. Use IRSA (EKS) or task roles (ECS)
3. SDK automatically assumes role

### Using CloudFront for S3

1. Create CloudFront distribution
2. Set S3 bucket as origin
3. Configure cache behaviors
4. Update image URLs to use CloudFront domain
5. Benefits:
   - Faster global delivery
   - HTTPS by default
   - Better security (no direct S3 access)

### Environment-Specific Configs

Create separate environments:

```
.env.development    # Local development
.env.staging        # Staging environment
.env.production     # Production environment
```

Update Vite config to use appropriate env file:

```typescript
// vite.config.ts
export default defineConfig(({ mode }) => {
  return {
    // ... other config
    envPrefix: 'VITE_',
  }
})
```

---

## API Reference

### Authentication

```typescript
import { useAuth } from './contexts/AuthContextAWS';

const { login, register, logout, user, isAdmin, isAuthenticated } = useAuth();

// Login
const success = await login('email@example.com', 'password');

// Register
const success = await register('Name', 'email@example.com', 'password', 'Company');

// Logout
logout();

// Check admin
if (isAdmin) {
  // Show admin features
}
```

### CMS Content

```typescript
import { useCMS } from './contexts/CMSContextAWS';

const { cmsData, updateHero, updateAbout, uploadImage, isLoading } = useCMS();

// Update hero section
updateHero({
  ...cmsData.hero,
  title: 'New Title',
});

// Upload image
const imageUrl = await uploadImage(file, 'hero');

// Access content
const title = cmsData.hero.title;
```

### Direct Service Usage

```typescript
// S3 Service
import { s3Service } from './lib/s3Service';

const result = await s3Service.uploadImage(file, 'products');
const url = await s3Service.getSignedUrl('products/image.jpg');
await s3Service.deleteImage(imageUrl);

// DynamoDB Service
import { dynamoDBService } from './lib/dynamoDBService';

const result = await dynamoDBService.saveContent('hero', data);
const content = await dynamoDBService.getContent('hero', 'default');
await dynamoDBService.updateContent('hero', 'default', { title: 'New' });
```

---

## Next Steps

### Recommended Enhancements

1. **CloudFront Distribution** - Faster image delivery
2. **Cognito Custom Domain** - Branded login pages
3. **CloudWatch Alarms** - Monitor errors and usage
4. **DynamoDB Backups** - Point-in-time recovery
5. **S3 Lifecycle Policies** - Cost optimization
6. **Image Optimization** - Lambda@Edge for resizing
7. **API Gateway + Lambda** - Serverless backend
8. **Amplify Hosting** - Easy deployment

### Monitoring

1. Enable **CloudWatch Logs** for Lambda functions
2. Set up **CloudWatch Alarms** for errors
3. Use **X-Ray** for distributed tracing
4. Monitor **Cognito sign-in metrics**
5. Track **S3 storage growth**
6. Monitor **DynamoDB capacity usage**

---

## Support & Resources

### AWS Documentation

- [Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [S3 Documentation](https://docs.aws.amazon.com/s3/)
- [DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/)

### Pricing

- [Cognito Pricing](https://aws.amazon.com/cognito/pricing/)
- [S3 Pricing](https://aws.amazon.com/s3/pricing/)
- [DynamoDB Pricing](https://aws.amazon.com/dynamodb/pricing/)

### Code Files

```
src/lib/
├── aws.ts                      # AWS clients configuration
├── s3Service.ts                # S3 operations
├── dynamoDBService.ts          # DynamoDB operations
└── cognitoService.ts           # Cognito authentication

src/contexts/
├── AuthContextAWS.tsx          # Authentication context
└── CMSContextAWS.tsx           # CMS content context

src/pages/
├── AdminDashboard.tsx          # Admin dashboard
└── CMSManagement.tsx           # CMS editor
```

---

## Quick Start Checklist

- [ ] AWS Account created
- [ ] Cognito User Pool created
- [ ] S3 Bucket created with CORS configured
- [ ] DynamoDB Table created with GSI
- [ ] IAM User created with permissions
- [ ] `.env` file configured with credentials
- [ ] Dependencies installed (`npm install`)
- [ ] Development server running (`npm run dev`)
- [ ] Admin login tested
- [ ] Image upload tested
- [ ] Content management tested

---

**🎉 You're all set!** Your CMS is now integrated with AWS for production-ready authentication, image storage, and content management.
