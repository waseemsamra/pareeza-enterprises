# 🚀 AWS Mode Setup Guide - AgroFeed CMS

## ✅ AWS Mode Enabled!

Your application is now configured to use **AWS services** with your actual AWS resources.

---

## 🔧 Your AWS Configuration

### Environment Variables (`.env`)

Your `.env` file has been created with your AWS resources:

```env
VITE_AWS_REGION=us-east-1
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_JxtucAU3s
VITE_AWS_COGNITO_CLIENT_ID=4bp3ron4t3v2n1q8qvu2j795ov
VITE_AWS_S3_BUCKET=agrofeed-content-agrofeed-536217686312
VITE_AWS_DYNAMODB_TABLE=agrofeed-content
```

### ⚠️ Action Required: Add IAM Credentials

You need to add your IAM user credentials to the `.env` file:

1. **Get your credentials:**
   - Go to AWS Console → IAM → Users
   - Select your user (or create a new one)
   - Go to "Security credentials" tab
   - Click "Create access key"
   - Copy the Access Key ID and Secret Access Key

2. **Update `.env` file:**
   ```env
   VITE_AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_HERE
   VITE_AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY_HERE
   ```

3. **Restart the development server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

---

## 📦 What's Using AWS Now

### 1. Authentication (Cognito)
- **Service:** Amazon Cognito
- **User Pool:** `us-east-1_JxtucAU3s`
- **Client ID:** `4bp3ron4t3v2n1q8qvu2j795ov`

**Users must be created in Cognito:**
```
1. Go to Cognito Console
2. Select User Pool: us-east-1_JxtucAU3s
3. Click "Create user"
4. Add user details
5. Set custom attribute: role = admin (for admin access)
```

### 2. Content Storage (DynamoDB)
- **Table:** `agrofeed-content`
- **Region:** `us-east-1`

**CMS content is now saved to DynamoDB:**
- Hero section
- About section
- Testimonials
- Enquiry form
- Site settings

### 3. Image Storage (S3)
- **Bucket:** `agrofeed-content-agrofeed-536217686312`
- **Region:** `us-east-1`

**Images are uploaded to S3:**
- Hero images
- About images
- Product images
- All uploaded files

---

## 🎯 Quick Start with AWS Mode

### Step 1: Add IAM Credentials

Edit `.env` file:
```bash
# Open .env file
code .env

# Add your credentials
VITE_AWS_ACCESS_KEY_ID=AKIA...
VITE_AWS_SECRET_ACCESS_KEY=...
```

### Step 2: Create Admin User in Cognito

```
1. AWS Console → Cognito → User pools
2. Select: us-east-1_JxtucAU3s
3. Users tab → Create user
4. Fill in:
   - Email: admin@agrofeed.com
   - Name: Admin User
   - Password: (temporary password)
5. Custom attributes:
   - company: AgroFeed Inc.
   - role: admin
6. Click "Create"
```

### Step 3: Seed DynamoDB Table (Optional)

Run this in Node.js console or create a Lambda function:

```javascript
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

const seedData = async () => {
  const items = [
    {
      PK: 'HERO#default',
      SK: 'METADATA',
      type: 'hero',
      data: {
        badge: 'Premium Quality Feed',
        title: 'Premium Animal Feed Products',
        subtitle: 'High-quality hay, alfalfa, straw, and grain products...',
        primaryButtonText: 'Explore Products',
        secondaryButtonText: 'Contact Us',
        backgroundImage: ''
      }
    },
    // Add more items as needed
  ];

  for (const item of items) {
    await dynamodb.put({
      TableName: 'agrofeed-content',
      Item: item
    }).promise();
  }
  
  console.log('Data seeded!');
};

seedData();
```

### Step 4: Start Development

```bash
npm run dev
```

### Step 5: Login

```
URL: http://localhost:5173/login
Email: (the email you created in Cognito)
Password: (temporary password from Cognito)
```

---

## 🔄 Data Flow in AWS Mode

```
User Login
    ↓
Cognito Authentication
    ↓
Access Granted
    ↓
CMS Content from DynamoDB
    ↓
Images from S3
    ↓
Changes saved to DynamoDB
    ↓
Uploads go to S3
```

---

## 🛠️ Testing AWS Integration

### Test 1: Authentication

```bash
# Start app
npm run dev

# Go to login page
http://localhost:5173/login

# Login with Cognito user
# Should redirect to dashboard on success
```

### Test 2: CMS Content

```bash
# Login as admin
# Go to /admin
# Edit hero section
# Save

# Check DynamoDB:
# AWS Console → DynamoDB → agrofeed-content
# Query: PK = 'HERO#default'
# Should see your changes
```

### Test 3: Image Upload

```bash
# In admin dashboard
# Go to CMS tab
# Upload an image

# Check S3:
# AWS Console → S3 → agrofeed-content-agrofeed-536217686312
# Should see uploaded image in folder
```

---

## 📊 Verify AWS Connections

### Check Cognito Connection

```javascript
// In browser console
import { cognitoService } from './lib/cognitoService';

cognitoService.signIn('your-email@example.com', 'your-password')
  .then(result => console.log('Cognito working:', result));
```

### Check DynamoDB Connection

```javascript
// In browser console
import { dynamoDBService } from './lib/dynamoDBService';

dynamoDBService.getSiteContent()
  .then(result => console.log('DynamoDB working:', result));
```

### Check S3 Connection

```javascript
// In browser console
import { s3Service } from './lib/s3Service';

// Create a test file
const testFile = new File(['test'], 'test.txt', { type: 'text/plain' });

s3Service.uploadImage(testFile, 'test')
  .then(result => console.log('S3 working:', result));
```

---

## 🐛 Troubleshooting

### Error: "Credentials not loaded"

**Solution:**
1. Check `.env` file exists
2. Verify `VITE_AWS_ACCESS_KEY_ID` and `VITE_AWS_SECRET_ACCESS_KEY` are set
3. Restart dev server
4. Clear browser cache

### Error: "Cognito authentication failed"

**Solution:**
1. Verify User Pool ID is correct: `us-east-1_JxtucAU3s`
2. Verify Client ID is correct: `4bp3ron4t3v2n1q8qvu2j795ov`
3. Check user exists in Cognito
4. Check user email is verified
5. Ensure `USER_PASSWORD_AUTH` flow is enabled

### Error: "DynamoDB access denied"

**Solution:**
1. Check IAM user has DynamoDB permissions
2. Verify table name: `agrofeed-content`
3. Check table exists in us-east-1
4. Verify credentials are correct

### Error: "S3 upload failed"

**Solution:**
1. Check IAM user has S3 permissions
2. Verify bucket name: `agrofeed-content-agrofeed-536217686312`
3. Check CORS configuration on S3 bucket
4. Verify bucket policy allows uploads

---

## 🔒 IAM Permissions Required

Your IAM user needs these permissions:

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
      "Resource": "arn:aws:cognito-idp:us-east-1:*:userpool/us-east-1_JxtucAU3s"
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
        "arn:aws:s3:::agrofeed-content-agrofeed-536217686312",
        "arn:aws:s3:::agrofeed-content-agrofeed-536217686312/*"
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
        "dynamodb:Scan"
      ],
      "Resource": "arn:aws:dynamodb:us-east-1:*:table/agrofeed-content"
    }
  ]
}
```

---

## 📝 Create IAM User (If Needed)

### Step 1: Create User

```
1. AWS Console → IAM → Users
2. Click "Create user"
3. User name: agrofeed-app
4. Select "Attach policies directly"
5. Add policies:
   - AmazonCognitoPowerUser
   - AmazonS3FullAccess
   - AmazonDynamoDBFullAccess
6. Click "Create user"
```

### Step 2: Create Access Key

```
1. Select your new user
2. Go to "Security credentials" tab
3. Scroll to "Access keys"
4. Click "Create access key"
5. Select "Command Line Interface (CLI)"
6. Copy Access Key ID and Secret Access Key
7. Add to `.env` file
```

---

## ✅ AWS Mode Checklist

- [ ] `.env` file created
- [ ] IAM credentials added to `.env`
- [ ] Admin user created in Cognito
- [ ] DynamoDB table exists
- [ ] S3 bucket exists and CORS configured
- [ ] Development server restarted
- [ ] Can login with Cognito user
- [ ] CMS content loads from DynamoDB
- [ ] Images upload to S3
- [ ] Changes save to DynamoDB

---

## 🎯 Next Steps

### 1. Test Locally
```bash
npm run dev
# Test login, CMS, uploads
```

### 2. Create Content
- Add products in DynamoDB
- Upload images to S3
- Configure site settings

### 3. Deploy to Amplify
```bash
# Push to Git
git add .
git commit -m "AWS mode enabled"
git push

# Deploy in Amplify Console
```

### 4. Production Setup
- Use IAM roles instead of access keys
- Set up CloudFront for S3
- Configure custom domain
- Enable CloudWatch monitoring

---

## 📚 Resources

### Your AWS Console Links

- **Cognito:** https://console.aws.amazon.com/cognito/users/us-east-1_JxtucAU3s
- **S3:** https://console.aws.amazon.com/s3/buckets/agrofeed-content-agrofeed-536217686312
- **DynamoDB:** https://console.aws.amazon.com/dynamodb/tables/agrofeed-content
- **IAM:** https://console.aws.amazon.com/iam

### Documentation

- `BACKEND_INTEGRATION.md` - Integration details
- `AWS_CMS_INTEGRATION_GUIDE.md` - Complete AWS guide
- `CLOUDFORMATION_DEPLOYMENT.md` - Deployment guide

---

## 🎉 You're in AWS Mode!

Your application is now using:
- ✅ **Cognito** for authentication
- ✅ **DynamoDB** for content storage
- ✅ **S3** for image uploads

### Start Now:

```bash
# Make sure .env has IAM credentials
# Then start
npm run dev

# Login with Cognito user
http://localhost:5173/login
```

**Happy Coding with AWS! 🚜☁️**
