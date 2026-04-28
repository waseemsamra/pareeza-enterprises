# 🚀 AWS Amplify Deployment Guide

## Secure Deployment with Environment Variables

This guide shows you how to deploy to AWS Amplify **without storing credentials in code**.

---

## ✅ What's Ready

- ✅ **Amplify config file** created (`amplify.yml`)
- ✅ **No .env file** (credentials stored in Amplify Console)
- ✅ **App configured** to use AWS services
- ✅ **Build script** ready

---

## 🔐 Environment Variables (Set in Amplify Console)

You'll add these in the Amplify Console (not in code):

### Required Variables

```
VITE_AWS_REGION=us-east-1
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_JxtucAU3s
VITE_AWS_COGNITO_CLIENT_ID=4bp3ron4t3v2n1q8qvu2j795ov
VITE_AWS_S3_BUCKET=agrofeed-content-agrofeed-536217686312
VITE_AWS_S3_REGION=us-east-1
VITE_AWS_DYNAMODB_TABLE=agrofeed-content
VITE_AWS_DYNAMODB_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=<SET_IN_AMPLIFY>
VITE_AWS_SECRET_ACCESS_KEY=<SET_IN_AMPLIFY>
```

---

## 📋 Deployment Steps

### Step 1: Push to Git

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Ready for Amplify deployment"

# Push to your Git provider (GitHub, GitLab, Bitbucket)
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

---

### Step 2: Connect to Amplify

1. **Go to AWS Amplify Console**
   - https://console.aws.amazon.com/amplify/home

2. **Click "Connect app"**

3. **Select Git provider**
   - GitHub / GitLab / Bitbucket / AWS CodeCommit

4. **Connect repository**
   - Select your repository
   - Branch: `main`

---

### Step 3: Configure Build

**Amplify will auto-detect the `amplify.yml` file**

You should see:
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

Click **Next**

---

### Step 4: Add Environment Variables ⚠️ IMPORTANT

**This is where you add credentials securely!**

1. Click **"Environment variables"**

2. Add each variable:

| Key | Value |
|-----|-------|
| `VITE_AWS_REGION` | `us-east-1` |
| `VITE_AWS_COGNITO_USER_POOL_ID` | `us-east-1_JxtucAU3s` |
| `VITE_AWS_COGNITO_CLIENT_ID` | `4bp3ron4t3v2n1q8qvu2j795ov` |
| `VITE_AWS_S3_BUCKET` | `agrofeed-content-agrofeed-536217686312` |
| `VITE_AWS_S3_REGION` | `us-east-1` |
| `VITE_AWS_DYNAMODB_TABLE` | `agrofeed-content` |
| `VITE_AWS_DYNAMODB_REGION` | `us-east-1` |
| `VITE_AWS_ACCESS_KEY_ID` | `YOUR_ACCESS_KEY` |
| `VITE_AWS_SECRET_ACCESS_KEY` | `YOUR_SECRET_KEY` |

3. **Click "Save"**

---

### Step 5: Deploy

1. Click **"Save and deploy"**

2. Amplify will:
   - Clone your repository
   - Install dependencies
   - Build the app
   - Deploy to global CDN

3. **Wait for deployment** (5-10 minutes)

4. **Your app URL:**
   ```
   https://main.<random>.amplifyapp.com
   ```

---

## 🔒 Security Best Practices

### ✅ What You're Doing Right

- ✅ Not storing credentials in code
- ✅ Using Amplify environment variables
- ✅ Credentials encrypted at rest
- ✅ Separate credentials per environment

### 🎯 Additional Security

1. **Use IAM Roles** (instead of access keys)
   - In Amplify: App settings → IAM service role
   - Attach policies directly to Amplify

2. **Enable MFA** on admin accounts
   - Cognito → User pools → Your pool → MFA

3. **Restrict IAM permissions**
   - Use least privilege principle
   - Only allow necessary actions

---

## 🎨 Custom Domain (Optional)

### Set Up Custom Domain

1. **Amplify Console → Your app → Domain management**

2. **Click "Add sub domain"**

3. **Enter domain:**
   - Sub domain: `www` or `app`
   - Root domain: `agrofeed.com`

4. **Configure DNS**
   - Amplify provides CNAME records
   - Add to your DNS provider

5. **SSL certificate** (automatic)

---

## 📊 Post-Deployment

### Test Your Deployment

1. **Open your Amplify URL**
   ```
   https://main.<random>.amplifyapp.com
   ```

2. **Test login**
   - Use Cognito credentials
   - Created in Cognito console

3. **Test CMS**
   - Edit content
   - Should save to DynamoDB

4. **Test uploads**
   - Upload image
   - Should appear in S3

### Monitor Deployment

```
Amplify Console → Your app → Deployments

View:
- Build logs
- Deployment history
- App metrics
```

---

## 🔄 Continuous Deployment

**Every push to Git triggers deployment:**

```bash
# Make changes
git add .
git commit -m "Update CMS"
git push

# Amplify auto-deploys!
```

---

## 🛠️ Managing Environment Variables

### Update Variables

```
Amplify Console → Your app → App settings → Environment variables

Edit → Save → Redeploy
```

### Add New Variables

```
Same as above → Add new variable → Save
```

### Delete Variables

```
Select variable → Delete → Save
```

---

## 📁 File Structure for Amplify

```
agrofeed/
├── amplify.yml              # ← Amplify build config
├── src/
│   ├── contexts/
│   │   ├── AuthContext.tsx  # Uses AWS env vars
│   │   └── CMSContext.tsx   # Uses AWS env vars
│   └── ...
├── data/                    # ← For local dev only
│   └── *.json
├── package.json
└── [other files]
```

**Note:** The `/data` folder is still included but not used in production (AWS mode).

---

## 🎯 Environment Setup

### Development (Local)

```bash
# No .env needed - app uses file-based mode
npm run dev

# Data stored in /data JSON files
```

### Production (Amplify)

```
Environment variables set in Amplify Console
App uses AWS mode automatically
Data stored in:
- Cognito (users)
- DynamoDB (content)
- S3 (images)
```

---

## 📊 Deployment Checklist

- [ ] Code pushed to Git
- [ ] Amplify app created
- [ ] Repository connected
- [ ] Environment variables added
- [ ] Build successful
- [ ] Deployment complete
- [ ] Tested login
- [ ] Tested CMS
- [ ] Tested uploads
- [ ] Custom domain set up (optional)
- [ ] Monitoring enabled

---

## 🆘 Troubleshooting

### Build Fails

**Check build logs:**
```
Amplify Console → Your app → Deployments → Click failed deployment
View build logs
```

**Common issues:**
- Missing environment variables
- Node version mismatch
- Build script errors

### App Deploys But AWS Features Don't Work

**Check:**
1. All environment variables are set
2. IAM user has correct permissions
3. Cognito user pool is configured
4. S3 bucket CORS is configured
5. DynamoDB table exists

### Can't Access Environment Variables

**In Amplify Console:**
```
App settings → Environment variables → Edit
Make sure variables are saved
Redeploy app
```

---

## 💰 Cost Estimation

### Amplify Hosting

- **Free tier:** 1,000 build-minutes/month
- **Storage:** 5 GB
- **Data transfer:** 15 GB/month

**Typical usage:** $0-10/month

### AWS Services

- **Cognito:** Free for first 50,000 MAUs
- **S3:** ~$1-5/month (depending on usage)
- **DynamoDB:** ~$0-5/month (on-demand)

**Total:** ~$5-20/month

---

## 📚 Resources

### Amplify Documentation

- [Amplify Console](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
- [Environment Variables](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html)
- [Custom Domains](https://docs.aws.amazon.com/amplify/latest/userguide/custom-domains.html)

### Your AWS Resources

- **Cognito:** us-east-1_JxtucAU3s
- **S3:** agrofeed-content-agrofeed-536217686312
- **DynamoDB:** agrofeed-content

---

## 🎉 Ready to Deploy!

### Quick Commands

```bash
# Commit and push
git add .
git commit -m "Ready for Amplify"
git push

# Then in Amplify Console:
# 1. Connect repository
# 2. Add environment variables
# 3. Deploy!
```

### Environment Variables to Add

Copy these to Amplify Console:

```
VITE_AWS_REGION=us-east-1
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_JxtucAU3s
VITE_AWS_COGNITO_CLIENT_ID=4bp3ron4t3v2n1q8qvu2j795ov
VITE_AWS_S3_BUCKET=agrofeed-content-agrofeed-536217686312
VITE_AWS_S3_REGION=us-east-1
VITE_AWS_DYNAMODB_TABLE=agrofeed-content
VITE_AWS_DYNAMODB_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=<GET_FROM_IAM>
VITE_AWS_SECRET_ACCESS_KEY=<GET_FROM_IAM>
```

**Your credentials are secure in Amplify! 🔒**

**Happy Deploying! 🚜☁️**
