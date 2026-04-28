# 📋 Amplify Environment Variables - Complete List

## Add These 15 Variables to AWS Amplify Console

---

## AWS Configuration (10 variables)

| # | Key | Value |
|---|-----|-------|
| 1 | `VITE_AWS_REGION` | `us-east-1` |
| 2 | `VITE_AWS_COGNITO_USER_POOL_ID` | `us-east-1_JxtucAU3s` |
| 3 | `VITE_AWS_COGNITO_CLIENT_ID` | `4bp3ron4t3v2n1q8qvu2j795ov` |
| 4 | `VITE_AWS_COGNITO_IDENTITY_POOL_ID` | `us-east-1:7d4e0b0c-2a44-4be1-94c6-1c73af02e000` |
| 5 | `VITE_AWS_COGNITO_DOMAIN` | `agrofeed.auth.us-east-1.amazoncognito.com` |
| 6 | `VITE_AWS_S3_BUCKET` | `agrofeed-content-agrofeed-536217686312` |
| 7 | `VITE_AWS_S3_REGION` | `us-east-1` |
| 8 | `VITE_AWS_S3_URL` | `https://agrofeed-content-agrofeed-536217686312.s3.us-east-1.amazonaws.com` |
| 9 | `VITE_AWS_DYNAMODB_TABLE` | `agrofeed-content` |
| 10 | `VITE_AWS_DYNAMODB_REGION` | `us-east-1` |

---

## IAM Credentials (2 variables) ⚠️

**Add these privately in Amplify Console** (not in code):

| # | Key | Where to Get |
|---|-----|--------------|
| 11 | `VITE_AWS_ACCESS_KEY_ID` | AWS Console → IAM → Your User → Security credentials |
| 12 | `VITE_AWS_SECRET_ACCESS_KEY` | Same location (shown only once!) |

---

## App Configuration (3 variables)

| # | Key | Value |
|---|-----|-------|
| 13 | `VITE_APP_NAME` | `AgroFeed CMS` |
| 14 | `VITE_APP_URL` | `http://localhost:5173` |
| 15 | `VITE_API_URL` | *(leave empty)* |

---

## ✅ Quick Add to Amplify

### Step 1: Go to Amplify Console
```
https://console.aws.amazon.com/amplify
→ Your app → App settings → Environment variables
```

### Step 2: Add All Variables

Click **"Add variable"** 15 times and add:

**AWS Resources (10):**
```
VITE_AWS_REGION = us-east-1
VITE_AWS_COGNITO_USER_POOL_ID = us-east-1_JxtucAU3s
VITE_AWS_COGNITO_CLIENT_ID = 4bp3ron4t3v2n1q8qvu2j795ov
VITE_AWS_COGNITO_IDENTITY_POOL_ID = us-east-1:7d4e0b0c-2a44-4be1-94c6-1c73af02e000
VITE_AWS_COGNITO_DOMAIN = agrofeed.auth.us-east-1.amazoncognito.com
VITE_AWS_S3_BUCKET = agrofeed-content-agrofeed-536217686312
VITE_AWS_S3_REGION = us-east-1
VITE_AWS_S3_URL = https://agrofeed-content-agrofeed-536217686312.s3.us-east-1.amazonaws.com
VITE_AWS_DYNAMODB_TABLE = agrofeed-content
VITE_AWS_DYNAMODB_REGION = us-east-1
```

**IAM Credentials (2):**
```
VITE_AWS_ACCESS_KEY_ID = [Your IAM Access Key]
VITE_AWS_SECRET_ACCESS_KEY = [Your IAM Secret Key]
```

**App Settings (3):**
```
VITE_APP_NAME = AgroFeed CMS
VITE_APP_URL = http://localhost:5173
VITE_API_URL = 
```

### Step 3: Save & Deploy
```
Click "Save" → Click "Deploy" → Wait for build
```

---

## 🎉 Done!

Your app will deploy with:
- ✅ Cognito authentication
- ✅ S3 image uploads (already implemented)
- ✅ DynamoDB content storage
- ✅ All AWS services connected

**Secure and ready! 🚜☁️**
