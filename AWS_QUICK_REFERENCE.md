# 🚜 AgroFeed AWS CMS - Quick Reference Card

## 🚀 One-Command Deployment

```bash
# Prerequisites: AWS CLI installed and configured
./scripts/deploy-cloudformation.sh
```

That's it! The script will:
- ✅ Create all AWS resources
- ✅ Generate `.env` file automatically
- ✅ Show you next steps

---

## 📋 Manual Deployment (3 Steps)

### 1. Deploy CloudFormation Stack
```bash
aws cloudformation deploy \
  --stack-name agrofeed-cms \
  --template-file aws/cloudformation.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides Environment=production
```

### 2. Copy Outputs to `.env`
```bash
# Stack outputs will show values for:
VITE_AWS_COGNITO_USER_POOL_ID=...
VITE_AWS_COGNITO_CLIENT_ID=...
VITE_AWS_S3_BUCKET=...
VITE_AWS_DYNAMODB_TABLE=...
VITE_AWS_ACCESS_KEY_ID=...
VITE_AWS_SECRET_ACCESS_KEY=...
```

### 3. Start Development
```bash
npm install
npm run dev
```

---

## 🔐 Default Login

```
Email: admin@agrofeed.com
Password: admin123
URL: http://localhost:5173/login
```

Navigate to `/admin` for dashboard.

---

## 📁 File Structure

```
agrofeed/
├── aws/
│   └── cloudformation.yml          # CloudFormation template
├── scripts/
│   ├── setup-aws.sh                # Manual AWS setup script
│   └── deploy-cloudformation.sh    # CloudFormation deploy script
├── .env                            # Environment variables (generated)
├── .env.example                    # Template
└── [Documentation files]
```

---

## 🎯 AWS Resources Created

| Resource | Name | Purpose |
|----------|------|---------|
| **Cognito User Pool** | `agrofeed-users-{env}` | User authentication |
| **Cognito Client** | `agrofeed-web-{env}` | Web app client |
| **S3 Bucket** | `agrofeed-content-{env}-{id}` | Image storage |
| **DynamoDB Table** | `agrofeed-content-{env}` | CMS content |
| **IAM User** | `agrofeed-app-{env}` | App credentials |
| **Lambda** | `agrofeed-seed-data-{env}` | Seed initial data |

---

## 💰 Cost

- **Free Tier:** $0/month (12 months)
- **Production:** ~$5-10/month

---

## 🔧 Common Commands

### Deploy Stack
```bash
./scripts/deploy-cloudformation.sh
```

### Update Stack
```bash
aws cloudformation deploy \
  --stack-name agrofeed-cms \
  --template-file aws/cloudformation.yml \
  --capabilities CAPABILITY_NAMED_IAM
```

### Delete Stack
```bash
aws cloudformation delete-stack --stack-name agrofeed-cms
```

### View Stack Outputs
```bash
aws cloudformation describe-stacks \
  --stack-name agrofeed-cms \
  --query 'Stacks[0].Outputs'
```

---

## 🛠️ Troubleshooting

### CORS Error
```bash
aws s3api put-bucket-cors \
  --bucket YOUR_BUCKET \
  --cors-configuration file://cors.json
```

### Create Admin User
```bash
aws cognito-idp admin-create-user \
  --user-pool-id YOUR_POOL_ID \
  --username admin@agrofeed.com \
  --user-attributes \
    Name=name,Value="Admin User" \
    Name=email,Value="admin@agrofeed.com" \
    Name=custom:role,Value="admin"
```

### Seed Data Manually
```bash
aws lambda invoke \
  --function-name agrofeed-seed-data-production \
  response.json
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| **CLOUDFORMATION_DEPLOYMENT.md** | Complete CF deployment guide |
| **AWS_CMS_INTEGRATION_GUIDE.md** | Full AWS setup guide |
| **AWS_QUICK_START.md** | Quick start checklist |
| **AWS_ARCHITECTURE.md** | Architecture diagrams |
| **AWS_CMS_SUMMARY.md** | Overview and summary |
| **ENV_VARIABLES_REFERENCE.md** | Environment variables guide |

---

## 🔗 Quick Links

- **CloudFormation Console:** https://console.aws.amazon.com/cloudformation
- **Cognito Console:** https://console.aws.amazon.com/cognito
- **S3 Console:** https://console.aws.amazon.com/s3
- **DynamoDB Console:** https://console.aws.amazon.com/dynamodb
- **IAM Console:** https://console.aws.amazon.com/iam

---

## ⚠️ Important Notes

1. **Never commit `.env`** to version control
2. **Save secret access key** when created (only shown once)
3. **Update CORS origins** for production domain
4. **Update Cognito callbacks** for production domain
5. **Enable MFA** for admin users in production

---

## 🎉 You're Ready!

```bash
# Deploy everything
./scripts/deploy-cloudformation.sh

# Start dev server
npm run dev

# Login and manage CMS
# http://localhost:5173/admin
```

---

**Need help?** Read `CLOUDFORMATION_DEPLOYMENT.md` for detailed instructions.
