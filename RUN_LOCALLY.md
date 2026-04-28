# 🏠 Run Locally with AWS Services

## ✅ Yes, You Can Run Locally!

Your app can run on `http://localhost:5173` while using AWS services (Cognito, S3, DynamoDB).

---

## 🚀 Quick Start

### Step 1: Create .env File Locally

Create a `.env` file in your project root:

```bash
# Create .env file
cat > .env << EOF
VITE_AWS_REGION=us-east-1
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_JxtucAU3s
VITE_AWS_COGNITO_CLIENT_ID=4bp3ron4t3v2n1q8qvu2j795ov
VITE_AWS_COGNITO_IDENTITY_POOL_ID=us-east-1:7d4e0b0c-2a44-4be1-94c6-1c73af02e000
VITE_AWS_COGNITO_DOMAIN=agrofeed.auth.us-east-1.amazoncognito.com
VITE_AWS_S3_BUCKET=agrofeed-content-agrofeed-536217686312
VITE_AWS_S3_REGION=us-east-1
VITE_AWS_S3_URL=https://agrofeed-content-agrofeed-536217686312.s3.us-east-1.amazonaws.com
VITE_AWS_DYNAMODB_TABLE=agrofeed-content
VITE_AWS_DYNAMODB_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_HERE
VITE_AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY_HERE
VITE_APP_NAME=AgroFeed CMS
VITE_APP_URL=http://localhost:5173
VITE_API_URL=
EOF
```

### Step 2: Add Your IAM Credentials

Edit `.env` and add your IAM credentials:

```env
VITE_AWS_ACCESS_KEY_ID=AKIA...YOUR_KEY
VITE_AWS_SECRET_ACCESS_KEY=...YOUR_SECRET
```

**Get credentials from:**
```
AWS Console → IAM → Users → Your User 
→ Security credentials → Create access key
```

### Step 3: Install Dependencies (Optional)

If you want to use aws-amplify:

```bash
npm install aws-amplify @aws-amplify/ui-react uuid
npm install -D @types/uuid
```

**Note:** Your app works without these packages too!

### Step 4: Start Development Server

```bash
npm run dev
```

Your app will run on: **http://localhost:5173**

---

## 🔧 How It Works Locally

### With .env File (AWS Mode)

```
Local Browser (localhost:5173)
    ↓
React App
    ↓
AWS SDK (reads .env)
    ↓
AWS Services (Cognito, S3, DynamoDB)
```

### Without .env File (File Mode)

```
Local Browser (localhost:5173)
    ↓
React App
    ↓
localStorage /data files
```

---

## ✅ What Works Locally

### Authentication (Cognito)
- ✅ Login with Cognito users
- ✅ Register new users
- ✅ Logout
- ✅ Admin role checking

**Test:**
```
1. Go to http://localhost:5173/login
2. Login with Cognito user
3. Should redirect to dashboard
```

### Image Upload (S3)
- ✅ Upload images to S3
- ✅ Images stored in your bucket
- ✅ Get S3 URLs

**Test:**
```
1. Go to /admin
2. Upload image in CMS
3. Check S3 bucket in AWS Console
```

### Content Storage (DynamoDB)
- ✅ Save CMS content
- ✅ Load content
- ✅ Update content

**Test:**
```
1. Go to /admin → CMS
2. Edit hero section
3. Save
4. Refresh page - changes persist!
```

---

## 🔒 Security for Local Development

### ⚠️ Important Security Notes

1. **Never commit .env to Git**
   ```bash
   # Verify .gitignore has .env
   cat .gitignore | grep .env
   ```

2. **Use separate IAM user for development**
   - Create dev-specific IAM user
   - Limit permissions to only what's needed
   - Rotate keys regularly

3. **Don't share .env file**
   - Keep credentials private
   - Use .env.example as template

4. **Use .env.local for personal overrides**
   ```bash
   # .env.local is also in .gitignore
   cp .env .env.local
   # Edit .env.local with your personal credentials
   ```

---

## 🎯 Two Modes Available

### Mode 1: AWS Mode (With .env)

```bash
# Has .env file with AWS credentials
npm run dev

# Uses:
# - Cognito for auth
# - S3 for images
# - DynamoDB for content
```

### Mode 2: File Mode (Without .env)

```bash
# No .env file or empty
npm run dev

# Uses:
# - localStorage for auth
# - Blob URLs for images
# - /data JSON files for content
```

---

## 🧪 Test Your Local Setup

### Test 1: Check AWS Connection

Create test file `src/TestAWS.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { dynamoDBService } from './lib/dynamoDBService';

function TestAWS() {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    const test = async () => {
      try {
        const result = await dynamoDBService.getSiteContent();
        setStatus(result.success ? '✅ AWS Connected!' : '❌ AWS Error');
        console.log('Test result:', result);
      } catch (error) {
        setStatus('❌ Error: ' + error.message);
      }
    };
    test();
  }, []);

  return <div style={{ padding: '20px' }}>{status}</div>;
}

export default TestAWS;
```

Add to App.tsx temporarily to test.

### Test 2: Login Flow

```
1. Go to http://localhost:5173/login
2. Enter Cognito credentials
3. Should login successfully
4. Check browser console for logs
```

### Test 3: Upload Image

```
1. Go to /admin → CMS
2. Upload an image
3. Check console for S3 URL
4. Verify in S3 Console
```

---

## 🐛 Troubleshooting

### Error: "Credentials not loaded"

**Solution:**
```bash
# Check .env file exists
ls -la .env

# Verify credentials are set
cat .env | grep AWS_ACCESS_KEY
```

### Error: "Cognito authentication failed"

**Solution:**
1. Check User Pool ID is correct
2. Check Client ID is correct
3. Verify user exists in Cognito
4. Check browser console for details

### Error: "S3 upload failed"

**Solution:**
1. Check S3 bucket name is correct
2. Verify CORS is configured on bucket
3. Check IAM has S3 permissions
4. Check browser console for CORS errors

### App Uses File Mode Instead of AWS Mode

**Solution:**
```bash
# Verify .env has AWS credentials
cat .env

# Restart dev server
# Stop: Ctrl+C
# Start: npm run dev
```

---

## 📝 Quick Commands

```bash
# Start with AWS mode
cat .env  # Verify credentials
npm run dev

# Start with file mode (no AWS)
mv .env .env.backup
npm run dev

# Switch back to AWS mode
mv .env.backup .env
npm run dev
```

---

## ✅ Local Development Checklist

- [ ] .env file created
- [ ] IAM credentials added
- [ ] Dependencies installed (optional)
- [ ] Dev server running
- [ ] Can access localhost:5173
- [ ] Login works with Cognito
- [ ] S3 upload works
- [ ] DynamoDB save works
- [ ] .env in .gitignore
- [ ] No errors in console

---

## 🎉 You're Ready!

Your app runs locally with full AWS integration:

- ✅ http://localhost:5173
- ✅ Uses Cognito for auth
- ✅ Uses S3 for images
- ✅ Uses DynamoDB for content
- ✅ Same as production!

**Happy coding! 🚜**
