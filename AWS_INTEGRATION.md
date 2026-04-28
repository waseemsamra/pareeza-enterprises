# AWS Integration Summary

## Architecture

The AgroFeed application now uses a **hybrid approach** for data persistence:

### Development (Default)
- **localStorage** - No AWS configuration needed
- Works out of the box for testing and development

### Production (When AWS is configured)
- **AWS Cognito** - User authentication and authorization
- **AWS DynamoDB** - Content storage (single table design)
- **AWS S3** - Image and media file storage

## Files Created

### AWS Services
```
src/lib/
├── aws.ts                      # AWS clients configuration
├── s3Service.ts                # S3 image upload/download
├── dynamoDBService.ts          # DynamoDB CRUD operations
└── cognitoService.ts           # Cognito authentication
```

### Contexts (Hybrid)
```
src/contexts/
├── AuthContextAWS.tsx          # Auth with Cognito or localStorage
└── CMSContextAWS.tsx           # CMS with DynamoDB/S3 or localStorage
```

### Configuration
```
.env.example                    # AWS environment variables template
AWS_SETUP.md                    # Detailed AWS setup guide
```

## How It Works

### Automatic Detection
The app automatically detects if AWS is configured by checking for these environment variables:
- `VITE_AWS_COGNITO_USER_POOL_ID`
- `VITE_AWS_COGNITO_CLIENT_ID`
- `VITE_AWS_ACCESS_KEY_ID`
- `VITE_AWS_SECRET_ACCESS_KEY`

**If configured** → Uses AWS services
**If not configured** → Falls back to localStorage

### DynamoDB Table Design

**Single Table Design** for all content:

```
Table: agrofeed-content
├── Partition Key (PK): STRING  (e.g., "HERO#default")
├── Sort Key (SK): STRING       (always "METADATA")
├── type: STRING                (GSI partition key)
├── data: MAP                   (actual content)
├── createdAt: STRING           (ISO timestamp)
├── updatedAt: STRING           (ISO timestamp)
└── version: NUMBER             (for optimistic locking)

Global Secondary Index:
└── TypeIndex
    ├── Partition Key: type
    └── Sort Key: (none)
```

### Content Types

| Type | PK Format | Description |
|------|-----------|-------------|
| `hero` | `HERO#default` | Hero section content |
| `about` | `ABOUT#default` | About section content |
| `testimonials` | `TESTIMONIALS#default` | Testimonials data |
| `enquiry` | `ENQUIRY#default` | Enquiry form content |
| `siteSettings` | `SITESETTINGS#default` | Site-wide settings |
| `product` | `PRODUCT#{id}` | Product catalog items |
| `user` | `USER#{id}` | User profiles |

### S3 Bucket Structure

```
s3://agrofeed-content-bucket/
├── hero/
│   └── 1711234567-abc123.jpg
├── about/
│   └── 1711234567-def456.jpg
├── products/
│   └── 1711234567-ghi789.jpg
└── uploads/
    └── 1711234567-jkl012.png
```

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure AWS (Optional)
```bash
cp .env.example .env
# Edit .env with your AWS credentials
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Deploy AWS Resources
Follow the guide in `AWS_SETUP.md` to:
1. Create Cognito User Pool
2. Create S3 Bucket
3. Create DynamoDB Table
4. Configure IAM permissions

## Usage Examples

### Upload Image (CMS)
```typescript
const { uploadImage } = useCMS();

const handleFileUpload = async (file: File) => {
  const imageUrl = await uploadImage(file, 'hero');
  // Returns S3 URL if AWS configured, or blob URL if not
};
```

### Authentication
```typescript
const { login, register, logout, user, isAdmin } = useAuth();

// Login
const success = await login('admin@agrofeed.com', 'admin123');

// Register
const success = await register('John', 'john@example.com', 'password123', 'Company');

// Check admin
if (isAdmin) {
  // Show admin features
}
```

### Content Management
```typescript
const { cmsData, updateHero, updateAbout } = useCMS();

// Update hero section
updateHero({
  ...cmsData.hero,
  title: 'New Title',
});

// Data is automatically saved to:
// - DynamoDB (if AWS configured)
// - localStorage (if not configured)
```

## Migration from localStorage to AWS

When you first configure AWS:

1. **Existing localStorage data is preserved** - The app continues to use it
2. **New changes go to AWS** - DynamoDB and S3
3. **Manual migration** (optional):
   ```javascript
   // Run in browser console
   const cmsData = localStorage.getItem('agrofeed_cms_data');
   if (cmsData) {
     const data = JSON.parse(cmsData);
     // Use AWS SDK to save to DynamoDB
   }
   ```

## Cost Estimation

### Free Tier (12 months)
- **Cognito:** 50,000 MAUs free ✅
- **S3:** 5 GB storage + 20K GET requests ✅
- **DynamoDB:** 25 GB storage + 25 WCUs/RCUs ✅

### Small Production App
- **Cognito:** $0 (under 50K MAU)
- **S3:** ~$1-5/month (depending on images)
- **DynamoDB:** $0-5/month (on-demand pricing)
- **Total:** ~$5-10/month

## Security Best Practices

1. ✅ **Never commit `.env`** to version control
2. ✅ **Use IAM roles** in production (EC2, Lambda, ECS)
3. ✅ **Enable Cognito MFA** for admin users
4. ✅ **Configure S3 CORS** properly
5. ✅ **Use CloudFront** for S3 content delivery
6. ✅ **Enable DynamoDB encryption** (enabled by default)
7. ✅ **Implement rate limiting** for API calls

## Troubleshooting

### "Credentials not loaded"
- Check `.env` file exists and has correct values
- Restart dev server after changing `.env`
- Verify AWS credentials are valid

### "CORS error with S3"
```bash
aws s3api put-bucket-cors --bucket your-bucket --cors-configuration file://cors.json
```

### "DynamoDB access denied"
- Check IAM policy permissions
- Verify table name matches
- Ensure table exists in the same region

### "Cognito authentication failed"
- Verify User Pool ID and Client ID
- Enable `USER_PASSWORD_AUTH` flow in Cognito
- Confirm user email is verified

## Next Steps

1. **Set up CloudFront** for faster image delivery
2. **Configure custom domain** in Cognito
3. **Enable CloudWatch monitoring** for errors
4. **Set up DynamoDB backups** (Point-in-time recovery)
5. **Configure S3 lifecycle policies** for cost optimization
6. **Add image optimization** (Lambda@Edge or CloudFront functions)

## Support

For detailed setup instructions, see `AWS_SETUP.md`

For AWS pricing, visit: https://aws.amazon.com/pricing/
