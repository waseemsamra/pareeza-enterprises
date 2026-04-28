# CloudFormation Deployment Guide

## Overview

This guide shows you how to deploy all AWS resources for the AgroFeed CMS using a single CloudFormation template.

### What Gets Created

- ✅ **Cognito User Pool** - With password policy and custom attributes
- ✅ **Cognito User Pool Client** - Configured for web app authentication
- ✅ **S3 Bucket** - With CORS, encryption, and public read policy
- ✅ **DynamoDB Table** - With GSI and point-in-time recovery
- ✅ **IAM User & Policy** - With least-privilege permissions
- ✅ **Lambda Function** - To seed initial CMS data
- ✅ **Admin User** - Optional (if email provided)

---

## Prerequisites

1. **AWS Account** - Sign up at https://aws.amazon.com
2. **AWS CLI Installed** - Version 2.x recommended
3. **AWS CLI Configured** - Run `aws configure`
4. **jq Installed** - For JSON parsing (optional but recommended)

### Install AWS CLI

**macOS:**
```bash
brew install awscli
```

**Windows:**
```bash
# Download from https://aws.amazon.com/cli/
```

**Linux:**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### Install jq

**macOS:**
```bash
brew install jq
```

**Linux:**
```bash
sudo apt-get install jq  # Ubuntu/Debian
sudo yum install jq      # RHEL/CentOS
```

### Configure AWS CLI

```bash
aws configure
```

Enter:
- AWS Access Key ID
- AWS Secret Access Key
- Default region name (e.g., `us-east-1`)
- Default output format (e.g., `json`)

---

## Deployment Options

### Option 1: Automated Script (Recommended)

The deployment script handles everything automatically:

```bash
# From project root
./scripts/deploy-cloudformation.sh
```

The script will:
1. Validate the CloudFormation template
2. Deploy the stack
3. Retrieve all outputs
4. Generate `.env` file automatically
5. Show next steps

**Parameters:**
- Stack name (default: `agrofeed-cms`)
- Environment name (default: `production`)
- Admin email (optional)

---

### Option 2: Manual AWS Console

1. Go to **AWS Console** → **CloudFormation**
2. Click **Create stack** → **With new resources**
3. Upload `aws/cloudformation.yml`
4. Enter stack name: `agrofeed-cms`
5. Fill in parameters:
   - Environment: `production`
   - EmailAddress: (optional)
6. Check capabilities:
   - ✅ CAPABILITY_NAMED_IAM
7. Click **Create stack**
8. Wait for completion (5-10 minutes)
9. Go to **Outputs** tab
10. Copy values to `.env` file

---

### Option 3: AWS CLI

```bash
# Deploy stack
aws cloudformation deploy \
  --stack-name agrofeed-cms \
  --template-file aws/cloudformation.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    Environment=production \
  --tags Project=AgroFeed

# Get outputs
aws cloudformation describe-stacks \
  --stack-name agrofeed-cms \
  --query 'Stacks[0].Outputs'
```

---

## Stack Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `Environment` | No | `production` | Environment name (dev, staging, production) |
| `EmailAddress` | No | - | Admin user email (creates user if provided) |

---

## Stack Outputs

After deployment, you'll get these outputs:

| Output | Description | Use In |
|--------|-------------|--------|
| `CognitoUserPoolId` | Cognito User Pool ID | `.env` → `VITE_AWS_COGNITO_USER_POOL_ID` |
| `CognitoClientId` | Cognito Client ID | `.env` → `VITE_AWS_COGNITO_CLIENT_ID` |
| `S3BucketName` | S3 Bucket Name | `.env` → `VITE_AWS_S3_BUCKET` |
| `DynamoDBTableName` | DynamoDB Table Name | `.env` → `VITE_AWS_DYNAMODB_TABLE` |
| `IAMUserName` | IAM User Name | For reference |
| `IAMUserAccessKeyId` | IAM Access Key ID | `.env` → `VITE_AWS_ACCESS_KEY_ID` |

---

## Post-Deployment Steps

### 1. Verify `.env` File

The deployment script creates a `.env` file automatically. Verify it contains:

```env
VITE_AWS_REGION=us-east-1
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
VITE_AWS_COGNITO_CLIENT_ID=xxxxxxxxxxxxx
VITE_AWS_S3_BUCKET=agrofeed-content-production-123456789
VITE_AWS_S3_REGION=us-east-1
VITE_AWS_DYNAMODB_TABLE=agrofeed-content-production
VITE_AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
VITE_AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 2. Update S3 CORS

The template sets up CORS for localhost. Update for production:

```bash
aws s3api put-bucket-cors \
  --bucket agrofeed-content-production-ACCOUNT_ID \
  --cors-configuration '{
    "CORSRules": [
      {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
        "AllowedOrigins": [
          "http://localhost:5173",
          "http://localhost:3000",
          "https://yourdomain.com"
        ],
        "ExposedHeaders": [],
        "MaxAge": 3600
      }
    ]
  }'
```

Or via Console:
- S3 → Your bucket → Permissions → Cross-origin resource sharing
- Add your production domain

### 3. Update Cognito Callback URLs

Update for production:

```bash
aws cognito-idp update-user-pool-client \
  --user-pool-id us-east-1_XXXXXXXXX \
  --client-id xxxxxxxxxxxxxxx \
  --callback-urls "http://localhost:5173,http://localhost:3000,https://yourdomain.com" \
  --logout-urls "http://localhost:5173,http://localhost:3000,https://yourdomain.com"
```

Or via Console:
- Cognito → User pools → Your pool → App clients
- Edit `agrofeed-web-production`
- Add production URLs

### 4. Create Admin User (if not created)

If you didn't provide an email during deployment:

**Via Console:**
1. Cognito → User pools → Your pool → Users
2. Click **Create user**
3. Email: `admin@agrofeed.com`
4. Name: `Admin User`
5. Custom attributes:
   - `company`: `AgroFeed Inc.`
   - `role`: `admin`
6. Click **Create**

**Via CLI:**
```bash
aws cognito-idp admin-create-user \
  --user-pool-id us-east-1_XXXXXXXXX \
  --username admin@agrofeed.com \
  --user-attributes \
    Name=name,Value="Admin User" \
    Name=email,Value="admin@agrofeed.com" \
    Name=email_verified,Value="true" \
    Name=custom:company,Value="AgroFeed Inc." \
    Name=custom:role,Value="admin" \
  --temporary-password "TempPass123!" \
  --message-action SUPPRESS
```

### 5. Start Development

```bash
npm install
npm run dev
```

Navigate to:
- Login: http://localhost:5173/login
- Admin Dashboard: http://localhost:5173/admin

---

## Cost Estimation

### Free Tier (12 months)

| Resource | Free Tier | Expected Usage | Cost |
|----------|-----------|----------------|------|
| Cognito | 50,000 MAU | 1,000 users | $0 |
| S3 | 5 GB + 20K GET | 1 GB + 5K requests | $0 |
| DynamoDB | 25 GB + 25 WCU/RCU | 100 MB + 10 WCU | $0 |
| Lambda | 1M requests/month | 100 requests | $0 |
| IAM | Unlimited | 1 user | $0 |
| **Total** | | | **$0/month** |

### Production (Small Business)

| Resource | Usage | Monthly Cost |
|----------|-------|--------------|
| Cognito | 10,000 MAU | $0 |
| S3 | 10 GB + requests | ~$3-5 |
| DynamoDB | 1 GB + on-demand | ~$2-5 |
| Lambda | 1,000 invocations | $0 |
| IAM | 1 user | $0 |
| **Total** | | **~$5-10/month** |

---

## Stack Updates

To update the stack with changes:

```bash
./scripts/deploy-cloudformation.sh
```

Or manually:

```bash
aws cloudformation deploy \
  --stack-name agrofeed-cms \
  --template-file aws/cloudformation.yml \
  --capabilities CAPABILITY_NAMED_IAM
```

---

## Stack Deletion

To delete all resources:

```bash
# Using script
aws cloudformation delete-stack --stack-name agrofeed-cms

# Wait for deletion
aws cloudformation wait stack-delete-complete --stack-name agrofeed-cms
```

**⚠️ Warning:** This deletes all resources including:
- All CMS content in DynamoDB
- All images in S3
- All users in Cognito
- IAM user and access keys

**Backup important data first!**

---

## Troubleshooting

### Stack Creation Fails

**Error:** `CAPABILITY_NAMED_IAM required`

**Solution:** Add `--capabilities CAPABILITY_NAMED_IAM` to deploy command

---

**Error:** `Bucket already exists`

**Solution:** S3 bucket names must be globally unique. Use a different environment name or add a suffix:
```bash
# In cloudformation.yml, change:
BucketName: !Sub 'agrofeed-content-${Environment}-${AWS::AccountId}'
```

---

**Error:** `Access Denied`

**Solution:** Ensure your AWS credentials have sufficient permissions:
- cloudformation:*
- iam:*
- s3:*
- dynamodb:*
- lambda:*
- cognito-idp:*

---

### Secret Access Key Not Shown

**Problem:** Deployment script shows `RETRIEVE_FROM_AWS_CONSOLE`

**Solution:** This is normal for existing stacks. To get a new key:

1. Go to IAM Console → Users → `agrofeed-app-production`
2. Security credentials tab
3. Create new access key
4. Download CSV file
5. Update `.env` with new credentials

---

### Lambda Function Fails

**Error:** `Handler not found`

**Solution:** The Lambda function is embedded in the template. Ensure the code is valid Node.js 18 syntax.

---

### DynamoDB Table Not Seeded

**Problem:** Table is empty after deployment

**Solution:** Manually invoke the Lambda function:
```bash
aws lambda invoke \
  --function-name agrofeed-seed-data-production \
  response.json

cat response.json
```

Or seed manually:
```bash
# See AWS_CMS_INTEGRATION_GUIDE.md for manual seed commands
```

---

## Multi-Environment Setup

Create separate stacks for each environment:

### Development
```bash
./scripts/deploy-cloudformation.sh \
  --stack-name agrofeed-cms-dev \
  --environment dev
```

### Staging
```bash
./scripts/deploy-cloudformation.sh \
  --stack-name agrofeed-cms-staging \
  --environment staging
```

### Production
```bash
./scripts/deploy-cloudformation.sh \
  --stack-name agrofeed-cms-prod \
  --environment production
```

Each environment gets:
- Separate Cognito User Pool
- Separate S3 Bucket
- Separate DynamoDB Table
- Separate IAM User

---

## Security Best Practices

### ✅ Do's

1. **Use separate stacks per environment**
   - Dev, staging, production isolation
   - Different credentials for each

2. **Enable MFA for admin users**
   ```bash
   aws cognito-idp set-user-mfa-preference \
     --user-pool-id us-east-1_XXX \
     --username admin@agrofeed.com \
     --software-token-mfa-settings Enabled=true
   ```

3. **Rotate IAM access keys regularly**
   - Create new key
   - Update `.env`
   - Test
   - Delete old key

4. **Use AWS Secrets Manager in production**
   - Store secret access keys securely
   - Automatic rotation
   - Audit logging

5. **Enable CloudTrail**
   - Audit all AWS API calls
   - Security monitoring
   - Compliance

### ❌ Don'ts

1. **Don't commit `.env` to git**
   ```bash
   # Add to .gitignore
   echo ".env" >> .gitignore
   ```

2. **Don't use production credentials locally**
   - Use dev stack for development
   - Restrict production access

3. **Don't make S3 bucket fully public**
   - Only allow GetObject (read)
   - Never allow PutObject from public

4. **Don't disable DynamoDB encryption**
   - Enabled by default
   - Keep it enabled

---

## Monitoring

### CloudWatch Alarms

Set up monitoring:

```bash
# Cognito sign-in failures
aws cloudwatch put-metric-alarm \
  --alarm-name "Cognito-SignIn-Failures" \
  --metric-name NumberOfRequests \
  --namespace AWS/Cognito \
  --statistic Sum \
  --period 300 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1 \
  --alarm-actions arn:aws:sns:us-east-1:ACCOUNT_ID:alerts

# DynamoDB throttled requests
aws cloudwatch put-metric-alarm \
  --alarm-name "DynamoDB-Throttled" \
  --metric-name ThrottledRequests \
  --namespace AWS/DynamoDB \
  --statistic Sum \
  --period 300 \
  --threshold 0 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1
```

### CloudTrail

Enable CloudTrail for audit logging:
- CloudTrail Console → Create trail
- Log all read/write events
- Send to CloudWatch Logs

---

## Template Customization

### Change Password Policy

Edit `cloudformation.yml`:
```yaml
Policies:
  PasswordPolicy:
    MinimumLength: 12  # Increase from 8
    RequireUppercase: true
    RequireLowercase: true
    RequireNumbers: true
    RequireSymbols: true  # Require symbols
```

### Change S3 Storage Class

Edit `cloudformation.yml`:
```yaml
LifecycleConfiguration:
  Rules:
    - Id: TransitionToIA
      Transitions:
        - StorageClass: STANDARD_IA
          TransitionInDays: 60  # Move to IA after 60 days
```

### Change DynamoDB Capacity

Edit `cloudformation.yml`:
```yaml
GlobalSecondaryIndexes:
  - IndexName: TypeIndex
    ProvisionedThroughput:
      ReadCapacityUnits: 10  # Increase from 5
      WriteCapacityUnits: 10  # Increase from 5
```

---

## Resources Created

```
CloudFormation Stack: agrofeed-cms
├── Cognito
│   ├── User Pool: agrofeed-users-production
│   └── User Pool Client: agrofeed-web-production
├── S3
│   └── Bucket: agrofeed-content-production-ACCOUNT_ID
├── DynamoDB
│   └── Table: agrofeed-content-production
│       └── GSI: TypeIndex
├── IAM
│   ├── User: agrofeed-app-production
│   ├── Policy: agrofeed-app-policy-production
│   └── Access Key: AKIA...
├── Lambda
│   └── Function: agrofeed-seed-data-production
└── Custom Resource
    └── SeedData (invokes Lambda)
```

---

## Support

### Documentation
- `AWS_CMS_INTEGRATION_GUIDE.md` - Complete setup guide
- `AWS_QUICK_START.md` - Quick start checklist
- `AWS_ARCHITECTURE.md` - Architecture diagrams
- `ENV_VARIABLES_REFERENCE.md` - Environment variables

### AWS Documentation
- [CloudFormation User Guide](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/)
- [Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [S3 Documentation](https://docs.aws.amazon.com/s3/)
- [DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/)

---

**🎉 You're all set!** Run `./scripts/deploy-cloudformation.sh` to deploy everything with one command!
