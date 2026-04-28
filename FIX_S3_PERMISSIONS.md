# Fix S3 Upload Permission Error

## Error
```
User: arn:aws:sts::536217686312:assumed-role/agrofeed-authenticated-role/CognitoIdentityCredentials 
is not authorized to perform: s3:PutObject on resource: 
"arn:aws:s3:::agrofeed-content-agrofeed-536217686312/public/homepage-images/hero/*.jpg" 
because no identity-based policy allows the s3:PutObject action
```

## Solution: Update Cognito Identity Pool IAM Role

You need to add S3 permissions to your Cognito authenticated users role.

### Option 1: Via AWS Console (Recommended)

1. **Go to IAM Console**
   - Navigate to: https://console.aws.amazon.com/iam/

2. **Find the Role**
   - Click on "Roles" in the left sidebar
   - Search for: `agrofeed-authenticated-role`
   - Click on the role name

3. **Add Inline Policy**
   - Click "Add permissions" → "Create inline policy"
   - Click "JSON" tab
   - Paste the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3UploadAccess",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::agrofeed-content-agrofeed-536217686312/*"
    },
    {
      "Sid": "S3ListAccess",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:ListBucketMultipartUploads"
      ],
      "Resource": "arn:aws:s3:::agrofeed-content-agrofeed-536217686312"
    },
    {
      "Sid": "S3MultipartUpload",
      "Effect": "Allow",
      "Action": [
        "s3:AbortMultipartUpload"
      ],
      "Resource": "arn:aws:s3:::agrofeed-content-agrofeed-536217686312/*"
    }
  ]
}
```

   - Click "Next"
   - Policy name: `S3UploadPolicy`
   - Click "Create policy"

4. **Save Changes**
   - The policy is now attached to the role

### Option 2: Via AWS CLI

Run this command in your terminal:

```bash
aws iam put-role-policy \
  --role-name agrofeed-authenticated-role \
  --policy-name S3UploadPolicy \
  --policy-document file://s3-upload-policy.json
```

Create a file `s3-upload-policy.json` with the policy JSON above first.

### Option 3: Via CloudFormation

If you're using CloudFormation, add this to your template:

```yaml
AuthenticatedUserRolePolicy:
  Type: AWS::IAM::Policy
  Properties:
    PolicyName: S3UploadPolicy
    Roles:
      - !Ref AuthenticatedUserRole
    PolicyDocument:
      Version: '2012-10-17'
      Statement:
        - Effect: Allow
          Action:
            - s3:PutObject
            - s3:GetObject
            - s3:DeleteObject
          Resource: !Sub 'arn:aws:s3:::${S3Bucket}/*'
        - Effect: Allow
          Action:
            - s3:ListBucket
            - s3:ListBucketMultipartUploads
          Resource: !Sub 'arn:aws:s3:::${S3Bucket}'
```

## Verify the Fix

After adding the policy:

1. **Wait 1-2 minutes** for the policy to propagate
2. **Clear browser cache** and localStorage
3. **Log out and log back in** to get new credentials
4. **Try uploading again** from the admin dashboard

## Test Upload

You can test with this command:

```bash
# Create a test file
echo "Test upload" > test.txt

# Try to upload (should work now)
aws s3 cp test.txt \
  s3://agrofeed-content-agrofeed-536217686312/test-upload.txt \
  --profile your-profile
```

## Additional: Update Bucket Policy (Optional)

If you want to ensure public read access for uploaded images, also update the S3 bucket policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::agrofeed-content-agrofeed-536217686312/homepage-images/*"
    }
  ]
}
```

## Common Issues

### Still Getting Permission Errors?

1. **Check Role Name**
   - Verify the role name is exactly `agrofeed-authenticated-role`
   - It might be different in your setup

2. **Check Identity Pool**
   - Go to Cognito → Identity Pools
   - Find your identity pool
   - Check "Edit" → See which roles are assigned to authenticated users

3. **Clear Cached Credentials**
   ```javascript
   // In browser console
   localStorage.clear();
   sessionStorage.clear();
   ```

4. **Verify Policy is Attached**
   - Go to IAM → Roles → `agrofeed-authenticated-role`
   - Check "Permissions" tab
   - Should see `S3UploadPolicy` listed

## Security Notes

⚠️ **Important Security Considerations:**

- The policy allows uploads to the **entire bucket** (`/*`)
- For better security, restrict to specific folders:
  ```json
  "Resource": "arn:aws:s3:::agrofeed-content-agrofeed-536217686312/homepage-images/*"
  ```
- Consider adding size limits via bucket policies
- Enable S3 access logging for audit trails
- Rotate credentials regularly

## Quick Fix Summary

```
1. IAM Console → Roles → agrofeed-authenticated-role
2. Add Permissions → Create Inline Policy
3. Paste the JSON policy above
4. Name it "S3UploadPolicy"
5. Create policy
6. Wait 1-2 minutes
7. Refresh browser and try again
```
