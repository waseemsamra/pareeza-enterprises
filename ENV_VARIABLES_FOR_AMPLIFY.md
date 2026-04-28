# AgroFeed CMS - Environment Variables for Amplify

## ⚠️ DO NOT COMMIT THIS FILE TO GIT!

This file is for reference only. **Set these variables in AWS Amplify Console.**

---

## Required Environment Variables

Add these in Amplify Console when deploying:

### AWS Configuration

```
VITE_AWS_REGION=us-east-1
```

### Cognito Configuration

```
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_JxtucAU3s
VITE_AWS_COGNITO_CLIENT_ID=4bp3ron4t3v2n1q8qvu2j795ov
VITE_AWS_COGNITO_DOMAIN=agrofeed.auth.us-east-1.amazoncognito.com
```

### S3 Configuration

```
VITE_AWS_S3_BUCKET=agrofeed-content-agrofeed-536217686312
VITE_AWS_S3_REGION=us-east-1
VITE_AWS_S3_URL=https://agrofeed-content-agrofeed-536217686312.s3.us-east-1.amazonaws.com
```

### DynamoDB Configuration

```
VITE_AWS_DYNAMODB_TABLE=agrofeed-content
VITE_AWS_DYNAMODB_REGION=us-east-1
```

### IAM Credentials (Get from AWS Console)

```
VITE_AWS_ACCESS_KEY_ID=<GET_FROM_IAM_CONSOLE>
VITE_AWS_SECRET_ACCESS_KEY=<GET_FROM_IAM_CONSOLE>
```

### App Configuration

```
VITE_API_URL=
VITE_APP_NAME=AgroFeed CMS
VITE_APP_URL=http://localhost:5173
```

---

## How to Get IAM Credentials

1. **AWS Console → IAM → Users**
2. **Select your user** (or create new one)
3. **Security credentials tab**
4. **Create access key**
5. **Copy Access Key ID and Secret Access Key**
6. **Add to Amplify Console**

---

## How to Add to Amplify

1. **Amplify Console → Your app**
2. **App settings → Environment variables**
3. **Click "Add variable"**
4. **Add each variable from above**
5. **Click "Save"**

---

## ✅ Security Checklist

- [ ] No .env file in repository
- [ ] .env in .gitignore
- [ ] Credentials set in Amplify Console only
- [ ] IAM user has minimal permissions
- [ ] MFA enabled on admin accounts
- [ ] Access keys rotated regularly

---

## 📋 Deployment Steps

1. **Push code to Git** (without .env)
2. **Connect to Amplify**
3. **Add environment variables** in Amplify Console
4. **Deploy**

---

**Keep your credentials secure! 🔒**
