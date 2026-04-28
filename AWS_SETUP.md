# AWS Setup Guide for AgroFeed

This guide explains how to set up AWS services (Cognito, S3, DynamoDB) for the AgroFeed application.

## Architecture Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React App     │────▶│    Cognito      │     │  Authentication │
│   (Frontend)    │     │   (User Pool)   │     │  & Authorization│
└────────┬────────┘     └─────────────────┘     └─────────────────┘
         │
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│   DynamoDB      │◀────│   S3 Bucket     │
│   (Content)     │     │   (Images)      │
└─────────────────┘     └─────────────────┘
```

## Prerequisites

- AWS Account
- AWS CLI installed and configured
- Node.js 18+ installed

## Step 1: Create Cognito User Pool

### Using AWS Console:

1. Go to **AWS Cognito** → **User pools** → **Create user pool**
2. **Configure sign-in experience:**
   - Sign-in options: **Email**
   - User pool name: `agrofeed-users`

3. **Configure security:**
   - Password policy: Minimum 8 characters, require uppercase, lowercase, numbers
   - MFA: Optional (can enable later)

4. **Configure sign-up experience:**
   - Allow self-signup: **Yes**
   - Required attributes: email, name
   - Custom attributes: 
     - `company` (String)
     - `role` (String, default: 'user')

5. **Configure message delivery:**
   - Email provider: **Send email with Cognito** (or configure SES)

6. **Integrate your app:**
   - User pool client name: `agrofeed-web`
   - Client type: **Public client**
   - Disable anonymous access
   - Enable **USER_PASSWORD_AUTH** flow

7. **Review and create**

### Using AWS CLI:

```bash
# Create User Pool
aws cognito-idp create-user-pool \
  --pool-name agrofeed-users \
  --username-attributes email \
  --auto-verified-attributes email \
  --user-pool-tags "Project=AgroFeed" \
  --query 'UserPool.{Id:Id,Name:Name}'
```

Note the **User Pool ID** and **Client ID** for later.

## Step 2: Create S3 Bucket

### Using AWS Console:

1. Go to **S3** → **Create bucket**
2. **Bucket name:** `agrofeed-content-{your-region}` (must be unique)
3. **Region:** Select your region
4. **Block Public Access settings:**
   - Uncheck "Block all public access"
   - Acknowledge that the bucket will be public
5. **CORS configuration** (after creation):
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

### Using AWS CLI:

```bash
# Create bucket
aws s3 mb s3://agrofeed-content-yourname-$(aws configure get region)

# Set bucket policy for public read
aws s3api put-bucket-policy --bucket agrofeed-content-yourname-$(aws configure get region) \
  --policy '{
    "Version": "2012-10-17",
    "Statement": [{
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::agrofeed-content-yourname-*/*"
    }]
  }'
```

## Step 3: Create DynamoDB Table

### Using AWS Console:

1. Go to **DynamoDB** → **Create table**
2. **Table name:** `agrofeed-content`
3. **Partition key:** `PK` (String)
4. **Sort key:** `SK` (String)
5. **Settings:**
   - Use default settings
   - Enable DynamoDB CloudWatch Contributor Insights (optional)

6. **Create Global Secondary Index (GSI):**
   - Index name: `TypeIndex`
   - Partition key: `type` (String)
   - Sort key: (none)
   - Projection: ALL

### Using AWS CLI:

```bash
# Create table with GSI
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

## Step 4: Seed Initial Data

Create an admin user and default content in DynamoDB:

```bash
# Create admin user item
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

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in your AWS credentials:
```env
VITE_AWS_REGION=us-east-1
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
VITE_AWS_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_AWS_S3_BUCKET=agrofeed-content-yourname
VITE_AWS_S3_REGION=us-east-1
VITE_AWS_DYNAMODB_TABLE=agrofeed-content
VITE_AWS_DYNAMODB_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
VITE_AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Step 6: Create IAM Policy (Optional but Recommended)

Create an IAM policy for your application:

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

## Step 7: Test the Integration

1. Start the development server:
```bash
npm run dev
```

2. Test user registration and login
3. Upload an image in the CMS
4. Verify data is saved in DynamoDB
5. Verify images are uploaded to S3

## Cost Estimation

### AWS Free Tier (12 months):
- **Cognito:** 50,000 MAUs free
- **S3:** 5 GB storage, 20,000 GET requests, 2,000 PUT requests
- **DynamoDB:** 25 GB storage, 25 WCUs, 25 RCUs

### Expected Monthly Cost (small app):
- Cognito: $0 (under free tier)
- S3: ~$1-5 (depending on images)
- DynamoDB: $0-5 (depending on usage)

## Security Best Practices

1. **Never commit `.env` file** to version control
2. Use **IAM roles** instead of access keys in production
3. Enable **Cognito MFA** for admin users
4. Use **S3 bucket policies** to restrict access
5. Enable **DynamoDB encryption** at rest (enabled by default)
6. Use **CloudFront** for S3 content delivery in production
7. Implement **request validation** and rate limiting

## Troubleshooting

### CORS Errors with S3:
```bash
aws s3api put-bucket-cors --bucket your-bucket --cors-configuration file://cors.json
```

### Cognito Authentication Failed:
- Check User Pool ID and Client ID
- Ensure USER_PASSWORD_AUTH is enabled
- Verify user is confirmed

### DynamoDB Access Denied:
- Check IAM permissions
- Verify table name and region
- Ensure table exists

## Next Steps

1. Set up **CloudFront** distribution for S3
2. Configure **custom domain** in Cognito
3. Set up **CloudWatch alarms** for monitoring
4. Implement **backup strategy** for DynamoDB
5. Configure **S3 lifecycle policies** for cost optimization
