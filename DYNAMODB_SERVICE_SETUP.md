# 🚀 DynamoDB Service with API Gateway - Setup Guide

## ⚠️ Important: This Requires API Gateway + Lambda

The `DynamoDBService.ts` you shared uses AWS Amplify's API module, which requires:

1. **API Gateway** - REST API endpoint
2. **Lambda Functions** - To handle CRUD operations
3. **IAM Permissions** - For Lambda to access DynamoDB

---

## 📋 Option 1: Use Direct SDK (Recommended - Already Working!)

Your app **already has** direct DynamoDB access working:

**File:** `src/lib/dynamoDBService.ts`

**Usage:**
```typescript
import { dynamoDBService } from './lib/dynamoDBService';

// Get content
const content = await dynamoDBService.getContent('hero', 'default');

// Save content
await dynamoDBService.saveContent('hero', data, 'default');

// No API Gateway needed!
```

**Benefits:**
- ✅ Already implemented
- ✅ No extra AWS services
- ✅ No API Gateway setup
- ✅ Works immediately
- ✅ Lower cost

---

## 📋 Option 2: API Gateway + Lambda (Advanced)

If you want to use the Amplify API approach:

### Architecture

```
Frontend (React)
    ↓
Amplify API
    ↓
API Gateway
    ↓
Lambda Function
    ↓
DynamoDB
```

### Step 1: Create Lambda Function

```javascript
// lambda-functions/cms-api/index.js
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'agrofeed-content';

exports.handler = async (event) => {
  const { httpMethod, path, body } = event;
  
  try {
    // Get content by type
    if (httpMethod === 'GET' && path.includes('/content/')) {
      const type = path.split('/').pop();
      const params = {
        TableName: TABLE_NAME,
        Key: { PK: type.toUpperCase(), SK: 'METADATA' }
      };
      
      const result = await dynamoDB.get(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify(result.Item)
      };
    }
    
    // Save content
    if (httpMethod === 'POST' && path === '/content') {
      const { type, data } = JSON.parse(body);
      const params = {
        TableName: TABLE_NAME,
        Item: {
          PK: type.toUpperCase(),
          SK: 'METADATA',
          type: type,
          data: data,
          updatedAt: new Date().toISOString()
        }
      };
      
      await dynamoDB.put(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    }
    
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Not found' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

### Step 2: Deploy Lambda

```bash
# Package Lambda
zip -r cms-api.zip lambda-functions/cms-api/

# Upload to AWS Lambda
aws lambda create-function \
  --function-name cms-api \
  --runtime nodejs18.x \
  --handler index.handler \
  --role arn:aws:iam::ACCOUNT_ID:role/lambda-execution-role \
  --zip-file fileb://cms-api.zip
```

### Step 3: Create API Gateway

```bash
# Create REST API
aws apigateway create-rest-api --name cms-api

# Create resource
aws apigateway create-resource \
  --rest-api-id YOUR_API_ID \
  --parent-id ROOT_RESOURCE_ID \
  --path-part content

# Create method
aws apigateway put-method \
  --rest-api-id YOUR_API_ID \
  --resource-id RESOURCE_ID \
  --http-method POST \
  --authorization-type NONE

# Create integration
aws apigateway put-integration \
  --rest-api-id YOUR_API_ID \
  --resource-id RESOURCE_ID \
  --http-method POST \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri arn:aws:apigateway:REGION:lambda:path/2015-03-31/functions/arn:aws:lambda:REGION:ACCOUNT_ID:function:cms-api/invocations
```

### Step 4: Update amplifyConfig

```typescript
// src/lib/amplifyConfig.ts
export const awsConfig = {
  // ... existing config
  API: {
    endpoints: [
      {
        name: 'cmsApi',
        endpoint: 'https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod'
      }
    ]
  }
};
```

### Step 5: Use DynamoDBService

```typescript
import DynamoDBService from './lib/DynamoDBService';

// Get content
const content = await DynamoDBService.getContent('hero');

// Save content
await DynamoDBService.saveContent('hero', data);

// Get testimonials
const testimonials = await DynamoDBService.getTestimonials();
```

---

## 🎯 Recommendation: Use Direct SDK

**Why Direct SDK is Better for Your Case:**

1. **Simpler** - No API Gateway needed
2. **Faster** - Direct access to DynamoDB
3. **Cheaper** - No API Gateway costs
4. **Already Working** - No code changes
5. **Less Maintenance** - Fewer AWS services

**Your Current Setup:**
```typescript
// src/contexts/CMSContext.tsx
import { dynamoDBService } from '../lib/dynamoDBService';

const updateHero = async (data) => {
  await dynamoDBService.saveContent('hero', data, 'default');
  // Direct to DynamoDB - No API Gateway!
};
```

---

## 📊 Comparison

| Feature | Direct SDK | API Gateway + Lambda |
|---------|-----------|---------------------|
| **Setup Complexity** | ✅ Easy | ⚠️ Complex |
| **AWS Services** | ✅ 1 (DynamoDB) | ⚠️ 3 (API Gateway, Lambda, DynamoDB) |
| **Cost** | ✅ Low | ⚠️ Higher |
| **Latency** | ✅ Low | ⚠️ Higher (extra hop) |
| **Maintenance** | ✅ Low | ⚠️ Higher |
| **Scalability** | ✅ Auto | ✅ Auto |
| **Security** | ✅ IAM | ✅ IAM + API Gateway |

---

## ✅ What You Have Now

Your app already works perfectly with direct SDK:

**Files:**
- `src/lib/dynamoDBService.ts` - Direct DynamoDB access
- `src/lib/s3Service.ts` - Direct S3 access
- `src/lib/cognitoService.ts` - Direct Cognito access

**No API Gateway needed!**

---

## 🚀 Deploy as-Is

Your current setup is production-ready:

```bash
# Push to Git
git add .
git commit -m "Deploy to Amplify"
git push

# Deploy in Amplify Console
# Add environment variables
# Done!
```

---

## 📚 If You Still Want API Gateway

**Steps:**
1. Create Lambda functions
2. Set up API Gateway
3. Configure IAM permissions
4. Update amplifyConfig
5. Deploy API Gateway
6. Update frontend to use API

**Time:** 2-4 hours

**Alternative:** Use direct SDK (already working!)

**Time:** 0 hours ✅

---

## 🎉 Final Recommendation

**Stick with Direct SDK!**

Your app is already production-ready with:
- ✅ Direct DynamoDB access
- ✅ Direct S3 uploads
- ✅ Direct Cognito auth
- ✅ No API Gateway complexity
- ✅ Lower costs
- ✅ Faster deployment

**Deploy now, optimize later!** 🚜☁️
