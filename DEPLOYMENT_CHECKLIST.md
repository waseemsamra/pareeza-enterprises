# 🚀 AgroFeed CMS - Amplify Deployment Checklist

## ✅ Pre-Deployment Checklist

### Code & Repository
- [x] `.env` file removed from project
- [x] `.env` added to `.gitignore`
- [x] `amplify.yml` build config created
- [x] All code committed to Git
- [x] Repository pushed to GitHub/GitLab/Bitbucket

### AWS Resources
- [ ] Cognito User Pool: `us-east-1_JxtucAU3s`
- [ ] Cognito Client ID: `4bp3ron4t3v2n1q8qvu2j795ov`
- [ ] S3 Bucket: `agrofeed-content-agrofeed-536217686312`
- [ ] DynamoDB Table: `agrofeed-content`
- [ ] IAM User with access keys

### IAM User Setup
- [ ] IAM user created
- [ ] Policies attached:
  - AmazonCognitoPowerUser
  - AmazonS3FullAccess
  - AmazonDynamoDBFullAccess
- [ ] Access keys created
- [ ] Access keys copied securely

### Cognito User Setup
- [ ] Admin user created in Cognito
- [ ] Email verified
- [ ] Role set to `admin`
- [ ] Temporary password noted

---

## 📋 Deployment Steps

### Step 1: Push to Git ✅

```bash
git add .
git commit -m "Ready for Amplify deployment"
git push origin main
```

**Status:** [ ] Completed

---

### Step 2: Connect to Amplify

1. Go to: https://console.aws.amazon.com/amplify
2. Click **"Connect app"**
3. Select Git provider (GitHub/GitLab/Bitbucket)
4. Authorize AWS Amplify
5. Select repository: `agrofeed`
6. Branch: `main`

**Status:** [ ] Completed

---

### Step 3: Configure Build

Amplify should auto-detect `amplify.yml`:

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

**Status:** [ ] Build config recognized

---

### Step 4: Add Environment Variables ⚠️ CRITICAL

Add these in Amplify Console:

#### AWS Configuration
- [ ] `VITE_AWS_REGION` = `us-east-1`

#### Cognito
- [ ] `VITE_AWS_COGNITO_USER_POOL_ID` = `us-east-1_JxtucAU3s`
- [ ] `VITE_AWS_COGNITO_CLIENT_ID` = `4bp3ron4t3v2n1q8qvu2j795ov`
- [ ] `VITE_AWS_COGNITO_DOMAIN` = `agrofeed.auth.us-east-1.amazoncognito.com`

#### S3
- [ ] `VITE_AWS_S3_BUCKET` = `agrofeed-content-agrofeed-536217686312`
- [ ] `VITE_AWS_S3_REGION` = `us-east-1`
- [ ] `VITE_AWS_S3_URL` = `https://agrofeed-content-agrofeed-536217686312.s3.us-east-1.amazonaws.com`

#### DynamoDB
- [ ] `VITE_AWS_DYNAMODB_TABLE` = `agrofeed-content`
- [ ] `VITE_AWS_DYNAMODB_REGION` = `us-east-1`

#### IAM Credentials (from your IAM user)
- [ ] `VITE_AWS_ACCESS_KEY_ID` = `AKIA...`
- [ ] `VITE_AWS_SECRET_ACCESS_KEY` = `...`

#### App Settings
- [ ] `VITE_APP_NAME` = `AgroFeed CMS`
- [ ] `VITE_API_URL` = (leave empty)

**Status:** [ ] All variables added

---

### Step 5: Review and Deploy

1. Review all settings
2. Click **"Save and deploy"**
3. Wait for deployment (5-10 minutes)
4. Note your Amplify URL

**Amplify URL:** `https://main.<random>.amplifyapp.com`

**Status:** [ ] Deployment complete

---

## 🧪 Post-Deployment Testing

### Test 1: Access App
- [ ] Open Amplify URL
- [ ] Homepage loads
- [ ] No console errors

### Test 2: Authentication
- [ ] Go to `/login`
- [ ] Login with Cognito credentials
- [ ] Redirects to dashboard
- [ ] User info displays correctly

### Test 3: Admin Access
- [ ] Login as admin
- [ ] Access `/admin`
- [ ] Admin dashboard loads
- [ ] All tabs visible

### Test 4: CMS Functionality
- [ ] Edit hero section
- [ ] Save changes
- [ ] Refresh page
- [ ] Changes persist
- [ ] Check DynamoDB for saved data

### Test 5: Image Upload
- [ ] Upload image in CMS
- [ ] Image uploads to S3
- [ ] Image displays in app
- [ ] Check S3 bucket for file

### Test 6: Products
- [ ] View products page
- [ ] Add new product
- [ ] Edit product
- [ ] Delete product
- [ ] Changes persist

---

## 🔒 Security Verification

### Environment Variables
- [ ] No `.env` file in repository
- [ ] `.gitignore` includes `.env`
- [ ] All credentials in Amplify only
- [ ] Repository is private (recommended)

### AWS Configuration
- [ ] IAM user has minimal permissions
- [ ] S3 bucket CORS configured
- [ ] S3 bucket policy set
- [ ] DynamoDB table encrypted
- [ ] Cognito MFA enabled (recommended)

### Monitoring
- [ ] CloudTrail enabled
- [ ] CloudWatch alarms set up
- [ ] Amplify notifications enabled

---

## 📊 Deployment Info

**Amplify App Name:** _______________

**Amplify URL:** _______________

**Custom Domain:** _______________

**Deployment Date:** _______________

**Deployed By:** _______________

---

## 🎨 Optional: Custom Domain

- [ ] Domain purchased
- [ ] Go to Amplify → Domain management
- [ ] Add subdomain (e.g., `www` or `app`)
- [ ] Configure DNS (CNAME provided by Amplify)
- [ ] SSL certificate auto-generated
- [ ] Test custom domain

**Custom Domain URL:** _______________

---

## 🆘 Troubleshooting

### Build Failed
- [ ] Check build logs in Amplify Console
- [ ] Verify `amplify.yml` is correct
- [ ] Check Node.js version compatibility
- [ ] Review package.json scripts

### App Deploys But Features Don't Work
- [ ] Verify all environment variables are set
- [ ] Check IAM permissions
- [ ] Verify AWS resource names are correct
- [ ] Check browser console for errors

### Can't Login
- [ ] Verify Cognito user exists
- [ ] Check user pool ID is correct
- [ ] Verify client ID is correct
- [ ] Check user email is verified

### Images Not Uploading
- [ ] Check S3 bucket exists
- [ ] Verify bucket name is correct
- [ ] Check CORS configuration
- [ ] Verify IAM has S3 permissions

### CMS Changes Not Saving
- [ ] Check DynamoDB table exists
- [ ] Verify table name is correct
- [ ] Check IAM has DynamoDB permissions
- [ ] Review browser console for errors

---

## 📝 Notes

### Issues Encountered

```
[Write any issues here]
```

### Solutions Applied

```
[Write solutions here]
```

### Additional Configuration

```
[Write any additional config here]
```

---

## ✅ Final Checklist

- [ ] App deployed successfully
- [ ] All features tested
- [ ] Security verified
- [ ] Monitoring enabled
- [ ] Documentation updated
- [ ] Team notified
- [ ] Backup plan in place

---

## 🎉 Deployment Complete!

**Your AgroFeed CMS is now live on AWS Amplify!**

### Next Steps

1. **Monitor** the app for issues
2. **Set up** custom domain (optional)
3. **Configure** CI/CD pipeline
4. **Enable** auto-scaling
5. **Plan** next features

### Useful Links

- **Amplify Console:** https://console.aws.amazon.com/amplify
- **Your App:** [Amplify URL]
- **CloudWatch:** https://console.aws.amazon.com/cloudwatch
- **Cognito:** https://console.aws.amazon.com/cognito/users/us-east-1_JxtucAU3s
- **S3:** https://console.aws.amazon.com/s3/buckets/agrofeed-content-agrofeed-536217686312
- **DynamoDB:** https://console.aws.amazon.com/dynamodb/tables/agrofeed-content

---

**Congratulations! 🚜☁️**
