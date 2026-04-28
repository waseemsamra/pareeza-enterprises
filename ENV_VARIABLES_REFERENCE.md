# AgroFeed Environment Variables Reference

## Required Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

---

## AWS Configuration

### AWS Region
```env
VITE_AWS_REGION=us-east-1
```
- **Required:** Yes (for AWS mode)
- **Description:** Your AWS region for all services
- **Example:** `us-east-1`, `eu-west-1`, `ap-southeast-1`
- **Default:** `us-east-1`

---

### Cognito User Pool ID
```env
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
```
- **Required:** Yes (for AWS mode)
- **Description:** Your Cognito User Pool ID
- **Where to find:** AWS Console → Cognito → User pools → Your pool → Pool details
- **Format:** `{region}_{id}` (e.g., `us-east-1_abc123XYZ`)

---

### Cognito Client ID
```env
VITE_AWS_COGNITO_CLIENT_ID=abc123xyz456def789
```
- **Required:** Yes (for AWS mode)
- **Description:** Your Cognito User Pool Client ID
- **Where to find:** AWS Console → Cognito → User pools → Your pool → App clients
- **Format:** 26-character alphanumeric string

---

### S3 Bucket Name
```env
VITE_AWS_S3_BUCKET=agrofeed-content-yourname
```
- **Required:** Yes (for AWS mode)
- **Description:** Your S3 bucket name (must be globally unique)
- **Where to find:** AWS Console → S3 → Buckets
- **Format:** Lowercase letters, numbers, and hyphens only

---

### S3 Region
```env
VITE_AWS_S3_REGION=us-east-1
```
- **Required:** Yes (for AWS mode)
- **Description:** S3 bucket region
- **Note:** Usually same as `VITE_AWS_REGION`
- **Example:** `us-east-1`, `eu-west-1`

---

### DynamoDB Table Name
```env
VITE_AWS_DYNAMODB_TABLE=agrofeed-content
```
- **Required:** Yes (for AWS mode)
- **Description:** Your DynamoDB table name
- **Where to find:** AWS Console → DynamoDB → Tables
- **Default:** `agrofeed-content`

---

### DynamoDB Region
```env
VITE_AWS_DYNAMODB_REGION=us-east-1
```
- **Required:** Yes (for AWS mode)
- **Description:** DynamoDB table region
- **Note:** Usually same as `VITE_AWS_REGION`
- **Example:** `us-east-1`, `eu-west-1`

---

### AWS Access Key ID
```env
VITE_AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
```
- **Required:** Yes (for AWS mode)
- **Description:** IAM user access key ID
- **Where to find:** AWS Console → IAM → Users → Your user → Security credentials
- **Format:** Starts with `AKIA` followed by 16 characters
- **⚠️ Security:** Never commit this to version control!

---

### AWS Secret Access Key
```env
VITE_AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- **Required:** Yes (for AWS mode)
- **Description:** IAM user secret access key
- **Where to find:** AWS Console → IAM → Users → Your user → Security credentials
- **Format:** 40-character alphanumeric string
- **⚠️ Security:** Never commit this to version control!
- **⚠️ Note:** Only shown once when creating the key!

---

## Development vs Production

### Development Mode (No AWS)

If you don't configure AWS credentials, the app automatically falls back to localStorage:

```env
# Leave these empty or don't create .env file
VITE_AWS_COGNITO_USER_POOL_ID=
VITE_AWS_COGNITO_CLIENT_ID=
VITE_AWS_ACCESS_KEY_ID=
VITE_AWS_SECRET_ACCESS_KEY=
```

The app will use:
- localStorage for authentication
- localStorage for CMS data
- Blob URLs for images

**Perfect for local development and testing!**

---

### Production Mode (AWS)

Fill in all environment variables for production:

```env
VITE_AWS_REGION=us-east-1
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
VITE_AWS_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_AWS_S3_BUCKET=agrofeed-content-production
VITE_AWS_S3_REGION=us-east-1
VITE_AWS_DYNAMODB_TABLE=agrofeed-content
VITE_AWS_DYNAMODB_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
VITE_AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Environment-Specific Files

You can create multiple environment files:

### `.env.development`
```env
# Local development settings
VITE_AWS_REGION=us-east-1
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_DEVPOOL123
VITE_AWS_COGNITO_CLIENT_ID=devclient123
VITE_AWS_S3_BUCKET=agrofeed-dev-bucket
VITE_AWS_DYNAMODB_TABLE=agrofeed-dev
# ... other vars
```

### `.env.staging`
```env
# Staging environment
VITE_AWS_REGION=us-east-1
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_STAGINGPOOL
VITE_AWS_COGNITO_CLIENT_ID=stagingclient123
VITE_AWS_S3_BUCKET=agrofeed-staging-bucket
VITE_AWS_DYNAMODB_TABLE=agrofeed-staging
# ... other vars
```

### `.env.production`
```env
# Production environment
VITE_AWS_REGION=us-east-1
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_PRODPOOL123
VITE_AWS_COGNITO_CLIENT_ID=prodclient123
VITE_AWS_S3_BUCKET=agrofeed-production-bucket
VITE_AWS_DYNAMODB_TABLE=agrofeed-production
# ... other vars
```

---

## Using Environment Variables

### In Vite Config

```typescript
// vite.config.ts
export default defineConfig(({ mode }) => {
  return {
    // Load .env.{mode} file
    envDir: './environments',
    envPrefix: 'VITE_',
  }
})
```

### In Code

```typescript
// Access environment variables
const region = import.meta.env.VITE_AWS_REGION;
const userPoolId = import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID;
const bucket = import.meta.env.VITE_AWS_S3_BUCKET;
```

### In Build Command

```bash
# Build for specific environment
npm run build -- --mode development
npm run build -- --mode staging
npm run build -- --mode production
```

---

## Deployment Platform Configuration

### Vercel

1. Go to Project Settings → Environment Variables
2. Add each variable
3. Select environments (Preview, Production, Development)
4. Deploy

### Netlify

1. Go to Site Settings → Build & Deploy → Environment
2. Add each variable
3. Deploy

### AWS Amplify

1. Go to Amplify Console → Your app → App settings
2. Build settings → Environment variables
3. Add each variable
4. Save and deploy

---

## Security Best Practices

### ✅ Do's

1. **Never commit `.env` to git**
   ```bash
   # Add to .gitignore
   .env
   .env.local
   .env.*.local
   ```

2. **Use IAM roles in production**
   - For EC2: Attach IAM role to instance
   - For Lambda: Use execution role
   - For ECS/EKS: Use task roles or IRSA

3. **Rotate access keys regularly**
   - Create new key
   - Update environment
   - Test
   - Delete old key

4. **Use separate resources per environment**
   - Dev Cognito pool
   - Staging S3 bucket
   - Production DynamoDB table

5. **Restrict IAM permissions**
   - Use least privilege principle
   - Scope to specific resources
   - Add conditions where possible

### ❌ Don'ts

1. **Don't hardcode credentials in code**
   ```typescript
   // ❌ BAD
   const accessKey = "AKIAXXXXXXXXXXXXXXXX";
   
   // ✅ GOOD
   const accessKey = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
   ```

2. **Don't commit `.env` files**
   ```bash
   # ❌ BAD
   git add .env
   git commit -m "Add credentials"
   
   # ✅ GOOD
   echo ".env" >> .gitignore
   ```

3. **Don't use root account credentials**
   - Create separate IAM user
   - Use minimal permissions
   - Enable MFA

4. **Don't share credentials via chat/email**
   - Use secure secret management
   - Use AWS Secrets Manager
   - Use environment-specific access

---

## Troubleshooting

### Variables Not Loading

**Problem:** `import.meta.env.VITE_XXX` is undefined

**Solutions:**
1. Restart dev server after changing `.env`
2. Check variable name starts with `VITE_`
3. Verify `.env` file is in project root
4. Clear browser cache

### Wrong Environment

**Problem:** Using wrong AWS resources

**Solutions:**
1. Check which `.env` file is active
2. Verify environment variables in deployment platform
3. Use `console.log(import.meta.env)` to debug

### Build Errors

**Problem:** Build fails with missing variables

**Solutions:**
1. Ensure all required variables are set
2. Use `.env.production` for production builds
3. Set variables in deployment platform

---

## Quick Reference Table

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_AWS_REGION` | Yes | AWS region | `us-east-1` |
| `VITE_AWS_COGNITO_USER_POOL_ID` | Yes | Cognito pool ID | `us-east-1_abc123` |
| `VITE_AWS_COGNITO_CLIENT_ID` | Yes | Cognito client ID | `abc123xyz456` |
| `VITE_AWS_S3_BUCKET` | Yes | S3 bucket name | `agrofeed-bucket` |
| `VITE_AWS_S3_REGION` | Yes | S3 region | `us-east-1` |
| `VITE_AWS_DYNAMODB_TABLE` | Yes | DynamoDB table | `agrofeed-content` |
| `VITE_AWS_DYNAMODB_REGION` | Yes | DynamoDB region | `us-east-1` |
| `VITE_AWS_ACCESS_KEY_ID` | Yes | IAM access key | `AKIAXXXXXXXXXXXXXXXX` |
| `VITE_AWS_SECRET_ACCESS_KEY` | Yes | IAM secret key | `40-char-string` |

---

## Validation Script

Create a script to validate environment variables:

```typescript
// src/lib/validateEnv.ts
const requiredVars = [
  'VITE_AWS_REGION',
  'VITE_AWS_COGNITO_USER_POOL_ID',
  'VITE_AWS_COGNITO_CLIENT_ID',
  'VITE_AWS_S3_BUCKET',
  'VITE_AWS_DYNAMODB_TABLE',
  'VITE_AWS_ACCESS_KEY_ID',
  'VITE_AWS_SECRET_ACCESS_KEY',
];

export function validateEnvironment() {
  const missing = requiredVars.filter(
    varName => !import.meta.env[varName]
  );
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
    console.warn('App will run in localStorage fallback mode');
    return false;
  }
  
  console.log('All environment variables present');
  return true;
}
```

---

## Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [AWS SDK Configuration](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html)
- [AWS Best Practices](https://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html)

---

**Need help?** See:
- `AWS_CMS_INTEGRATION_GUIDE.md` - Complete setup guide
- `AWS_QUICK_START.md` - Quick start checklist
- `AWS_CMS_SUMMARY.md` - Overview and summary
