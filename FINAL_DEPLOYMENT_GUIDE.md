# 🚀 Final Deployment Guide - AgroFeed CMS

## ✅ What's Ready

- [x] App configured for AWS (Cognito, S3, DynamoDB)
- [x] Amplify config created (`src/lib/amplifyConfig.ts`)
- [x] Build config ready (`amplify.yml`)
- [x] No credentials in code
- [x] Environment variables list ready

---

## 📋 Step 1: Push to Git

```bash
# Add all files
git add .

# Commit
git commit -m "Ready for Amplify deployment"

# Push to your Git repository
git push origin main
```

---

## 📋 Step 2: Connect to AWS Amplify

1. **Go to Amplify Console**
   - URL: https://console.aws.amazon.com/amplify

2. **Click "Connect app"**

3. **Select Git Provider**
   - GitHub / GitLab / Bitbucket / AWS CodeCommit

4. **Connect Repository**
   - Select your `agrofeed` repository
   - Branch: `main`

---

## 📋 Step 3: Configure Build

Amplify will auto-detect `amplify.yml`:

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

## 📋 Step 4: Add Environment Variables ⚠️ IMPORTANT

**Click "Environment variables"** and add these 15 variables:

### AWS Configuration (10 variables)

| Key | Value |
|-----|-------|
| `VITE_AWS_REGION` | `us-east-1` |
| `VITE_AWS_COGNITO_USER_POOL_ID` | `us-east-1_JxtucAU3s` |
| `VITE_AWS_COGNITO_CLIENT_ID` | `4bp3ron4t3v2n1q8qvu2j795ov` |
| `VITE_AWS_COGNITO_IDENTITY_POOL_ID` | `us-east-1:7d4e0b0c-2a44-4be1-94c6-1c73af02e000` |
| `VITE_AWS_COGNITO_DOMAIN` | `agrofeed.auth.us-east-1.amazoncognito.com` |
| `VITE_AWS_S3_BUCKET` | `agrofeed-content-agrofeed-536217686312` |
| `VITE_AWS_S3_REGION` | `us-east-1` |
| `VITE_AWS_S3_URL` | `https://agrofeed-content-agrofeed-536217686312.s3.us-east-1.amazonaws.com` |
| `VITE_AWS_DYNAMODB_TABLE` | `agrofeed-content` |
| `VITE_AWS_DYNAMODB_REGION` | `us-east-1` |

### IAM Credentials (2 variables) ⚠️

| Key | Value |
|-----|-------|
| `VITE_AWS_ACCESS_KEY_ID` | `[Your IAM Access Key ID]` |
| `VITE_AWS_SECRET_ACCESS_KEY` | `[Your IAM Secret Access Key]` |

**Get IAM credentials from:**
```
AWS Console → IAM → Users → Your User 
→ Security credentials → Create access key
```

### App Settings (3 variables)

| Key | Value |
|-----|-------|
| `VITE_APP_NAME` | `AgroFeed CMS` |
| `VITE_APP_URL` | `http://localhost:5173` |
| `VITE_API_URL` | *(leave empty)* |

---

## 📋 Step 5: Deploy

1. **Click "Save and deploy"**

2. **Wait for build** (5-10 minutes)

3. **Your app is live!**
   - URL: `https://main.<random>.amplifyapp.com`

---

## 📋 Step 6: Test Deployment

### Test 1: Access App
```
Open: https://<your-amplify-url>.amplifyapp.com
Check: Homepage loads
```

### Test 2: Login
```
Go to: /login
Login with: Cognito user credentials
Check: Redirects to dashboard
```

### Test 3: Admin Dashboard
```
Go to: /admin
Check: Admin features load
Check: Can access CMS tab
```

### Test 4: S3 Upload
```
In Admin Dashboard → CMS
Upload an image
Check: Image uploads successfully
Check: Image appears in S3 bucket
```

### Test 5: DynamoDB Save
```
Edit hero section
Save changes
Refresh page
Check: Changes persist
Check: Data in DynamoDB table
```

---

## 🔧 Optional: Install AWS Amplify Package

For enhanced features, you can install aws-amplify:

```bash
npm install aws-amplify @aws-amplify/ui-react
```

Then uncomment the code in `src/lib/amplifyConfig.ts`:

```typescript
import { Amplify } from 'aws-amplify';

if (typeof window !== 'undefined') {
  Amplify.configure(awsConfig);
}
```

**Note:** Your app works without this package. It uses the AWS SDK directly.

---

## 🎨 Optional: Custom Domain

1. **Amplify Console → Your app → Domain management**

2. **Click "Add sub domain"**

3. **Enter:**
   - Sub domain: `www` or `app`
   - Root domain: `yourdomain.com`

4. **Configure DNS**
   - Amplify provides CNAME records
   - Add to your DNS provider

5. **SSL certificate** (automatic)

---

## 📊 Monitoring

### View Build Logs
```
Amplify Console → Your app → Deployments
Click on deployment → View build logs
```

### Set Up Alerts
```
Amplify Console → Your app → App settings → Notifications
Enable email notifications
```

---

## 🔄 Continuous Deployment

**Every push to Git triggers auto-deploy:**

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Amplify auto-deploys!
```

---

## 📁 File Structure

```
agrofeed/
├── amplify.yml                    # Build config
├── src/
│   ├── lib/
│   │   └── amplifyConfig.ts      # AWS config
│   ├── contexts/
│   │   ├── AuthContext.tsx       # Uses Cognito
│   │   └── CMSContext.tsx        # Uses DynamoDB/S3
│   └── ...
├── data/                          # Local dev only
└── [other files]
```

---

## ✅ Deployment Checklist

- [ ] Code pushed to Git
- [ ] Amplify app created
- [ ] Repository connected
- [ ] All 15 environment variables added
- [ ] Build successful
- [ ] App deployed
- [ ] Login tested
- [ ] S3 upload tested
- [ ] DynamoDB save tested
- [ ] All features working

---

## 🆘 Troubleshooting

### Build Fails
**Check:**
- Build logs in Amplify Console
- `amplify.yml` is correct
- All dependencies in package.json

### App Deploys But AWS Features Don't Work
**Check:**
- All environment variables are set
- IAM credentials are correct
- IAM user has proper permissions
- Browser console for errors

### S3 Upload Fails
**Check:**
- S3 bucket exists
- CORS configured on bucket
- IAM has S3 permissions
- Bucket name is correct

---

## 📚 Resources

### Documentation Files
- `AMPLIFY_VARIABLES_CLEAN.md` - Clean variable list
- `AMPLIFY_DEPLOYMENT.md` - Complete guide
- `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist

### AWS Console Links
- **Amplify:** https://console.aws.amazon.com/amplify
- **Cognito:** https://console.aws.amazon.com/cognito/users/us-east-1_JxtucAU3s
- **S3:** https://console.aws.amazon.com/s3/buckets/agrofeed-content-agrofeed-536217686312
- **DynamoDB:** https://console.aws.amazon.com/dynamodb/tables/agrofeed-content
- **IAM:** https://console.aws.amazon.com/iam

---

## 🎉 You're Done!

Your AgroFeed CMS is now:
- ✅ Deployed to AWS Amplify
- ✅ Using Cognito for authentication
- ✅ Using S3 for image uploads
- ✅ Using DynamoDB for content
- ✅ Securely configured with environment variables

**Your app URL:** `https://<your-amplify-url>.amplifyapp.com`

**Happy Deploying! 🚜☁️**
