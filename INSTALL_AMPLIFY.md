# Install AWS Amplify for Amplify Deployment

## Install Required Packages

```bash
npm install aws-amplify @aws-amplify/ui-react
```

## Or Add to package.json

Add these to your dependencies:

```json
{
  "dependencies": {
    "aws-amplify": "^6.0.0",
    "@aws-amplify/ui-react": "^6.0.0"
  }
}
```

## Usage

Once installed, import the config in your main app file (main.tsx or App.tsx):

```typescript
import { Amplify } from 'aws-amplify';
import awsConfig from './lib/amplifyConfig';

Amplify.configure(awsConfig);
```

## For S3 Uploads

The config is already set up in `src/lib/amplifyConfig.ts` with:

- Cognito authentication
- S3 storage with custom paths
- Identity pool for authorized access

## Environment Variables Required

Make sure these are set in Amplify Console:

```
VITE_AWS_REGION=us-east-1
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_JxtucAU3s
VITE_AWS_COGNITO_CLIENT_ID=4bp3ron4t3v2n1q8qvu2j795ov
VITE_AWS_COGNITO_IDENTITY_POOL_ID=us-east-1:7d4e0b0c-2a44-4be1-94c6-1c73af02e000
VITE_AWS_S3_BUCKET=agrofeed-content-agrofeed-536217686312
VITE_AWS_ACCESS_KEY_ID=<your-key>
VITE_AWS_SECRET_ACCESS_KEY=<your-secret>
```

## Test S3 Upload

```typescript
import { Storage } from 'aws-amplify';

// Upload file
const result = await Storage.put('test.txt', file, {
  level: 'private',
  contentType: 'text/plain'
});

console.log('Uploaded:', result);
```
