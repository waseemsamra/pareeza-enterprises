#!/bin/bash

# AWS CMS Setup Script for AgroFeed
# This script automates the creation of AWS resources

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}==================================${NC}"
echo -e "${GREEN}AgroFeed AWS Setup Script${NC}"
echo -e "${GREEN}==================================${NC}"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}AWS CLI is not installed. Please install it first.${NC}"
    echo "Visit: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if AWS is configured
if ! aws configure get region &> /dev/null; then
    echo -e "${RED}AWS CLI is not configured. Run 'aws configure' first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ AWS CLI is configured${NC}"
echo ""

# Get region
REGION=$(aws configure get region)
echo -e "${YELLOW}Using region: ${REGION}${NC}"
echo ""

# Generate unique suffix for bucket name
SUFFIX=$(date +%s | tail -c 6)
BUCKET_NAME="agrofeed-content-${SUFFIX}"
USER_POOL_NAME="agrofeed-users"
TABLE_NAME="agrofeed-content"

echo -e "${YELLOW}Resources to create:${NC}"
echo "  - Cognito User Pool: ${USER_POOL_NAME}"
echo "  - S3 Bucket: ${BUCKET_NAME}"
echo "  - DynamoDB Table: ${TABLE_NAME}"
echo ""

read -p "Continue with setup? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Setup cancelled.${NC}"
    exit 0
fi

echo ""
echo -e "${GREEN}Step 1: Creating Cognito User Pool...${NC}"

# Create Cognito User Pool
USER_POOL_OUTPUT=$(aws cognito-idp create-user-pool \
  --pool-name "${USER_POOL_NAME}" \
  --username-attributes email \
  --auto-verified-attributes email \
  --policies '{
    "PasswordPolicy": {
      "MinimumLength": 8,
      "RequireUppercase": true,
      "RequireLowercase": true,
      "RequireNumbers": true,
      "RequireSymbols": false
    }
  }' \
  --schema '[
    {
      "Name": "name",
      "AttributeDataType": "String",
      "Required": true
    },
    {
      "Name": "email",
      "AttributeDataType": "String",
      "Required": true,
      "AutoVerifiedAttributes": ["email"]
    },
    {
      "Name": "company",
      "AttributeDataType": "String",
      "Required": false
    }
  ]' \
  --query 'UserPool.{Id:Id,Arn:Arn}' \
  --output json)

USER_POOL_ID=$(echo $USER_POOL_OUTPUT | jq -r '.Id')
USER_POOL_ARN=$(echo $USER_POOL_OUTPUT | jq -r '.Arn')

echo -e "${GREEN}✓ Created Cognito User Pool: ${USER_POOL_ID}${NC}"

# Create User Pool Client
echo ""
echo -e "${GREEN}Step 2: Creating Cognito User Pool Client...${NC}"

CLIENT_OUTPUT=$(aws cognito-idp create-user-pool-client \
  --user-pool-id "${USER_POOL_ID}" \
  --client-name "agrofeed-web" \
  --explicit-auth-flows USER_PASSWORD_AUTH \
  --allowed-auth-flows USER_PASSWORD_AUTH \
  --query 'UserPoolClient.{ClientId:ClientId,ClientName:ClientName}' \
  --output json)

CLIENT_ID=$(echo $CLIENT_OUTPUT | jq -r '.ClientId')

echo -e "${GREEN}✓ Created User Pool Client: ${CLIENT_ID}${NC}"

echo ""
echo -e "${GREEN}Step 3: Creating S3 Bucket...${NC}"

# Create S3 Bucket
aws s3 mb "s3://${BUCKET_NAME}"

echo -e "${GREEN}✓ Created S3 Bucket: ${BUCKET_NAME}${NC}"

# Configure CORS
echo ""
echo -e "${GREEN}Step 4: Configuring S3 CORS...${NC}"

cat > /tmp/s3-cors.json << EOF
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["http://localhost:5173", "http://localhost:3000"],
    "ExposeHeaders": []
  }
]
EOF

aws s3api put-bucket-cors \
  --bucket "${BUCKET_NAME}" \
  --cors-configuration file:///tmp/s3-cors.json

echo -e "${GREEN}✓ Configured S3 CORS${NC}"

# Set bucket policy for public read
echo ""
echo -e "${GREEN}Step 5: Setting S3 Bucket Policy...${NC}"

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

cat > /tmp/s3-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${BUCKET_NAME}/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy \
  --bucket "${BUCKET_NAME}" \
  --policy file:///tmp/s3-policy.json

echo -e "${GREEN}✓ Set S3 Bucket Policy${NC}"

echo ""
echo -e "${GREEN}Step 6: Creating DynamoDB Table...${NC}"

# Create DynamoDB Table
aws dynamodb create-table \
  --table-name "${TABLE_NAME}" \
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
  --query 'TableDescription.{TableName:TableName,TableArn:TableArn}' \
  > /dev/null

echo -e "${GREEN}✓ Created DynamoDB Table: ${TABLE_NAME}${NC}"

# Wait for table to be active
echo ""
echo -e "${YELLOW}Waiting for DynamoDB table to become active...${NC}"
aws dynamodb wait table-exists --table-name "${TABLE_NAME}"
echo -e "${GREEN}✓ DynamoDB table is active${NC}"

echo ""
echo -e "${GREEN}Step 7: Seeding initial data...${NC}"

# Seed admin user
aws dynamodb put-item --table-name "${TABLE_NAME}" --item '{
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
  "createdAt": {"S": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"},
  "updatedAt": {"S": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"},
  "version": {"N": "1"}
}'

echo -e "${GREEN}✓ Seeded admin user${NC}"

# Seed hero content
aws dynamodb put-item --table-name "${TABLE_NAME}" --item '{
  "PK": {"S": "HERO#default"},
  "SK": {"S": "METADATA"},
  "type": {"S": "hero"},
  "data": {"M": {
    "badge": {"S": "Premium Quality Feed"},
    "title": {"S": "Premium Animal Feed Products"},
    "subtitle": {"S": "High-quality hay, alfalfa, straw, and grain products for your livestock needs."},
    "primaryButtonText": {"S": "Explore Products"},
    "secondaryButtonText": {"S": "Contact Us"},
    "backgroundImage": {"S": "/hero-hay.jpg"}
  }},
  "createdAt": {"S": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"},
  "updatedAt": {"S": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"},
  "version": {"N": "1"}
}'

echo -e "${GREEN}✓ Seeded hero content${NC}"

# Clean up temp files
rm -f /tmp/s3-cors.json /tmp/s3-policy.json

echo ""
echo -e "${GREEN}==================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}==================================${NC}"
echo ""
echo -e "${YELLOW}Your AWS Resources:${NC}"
echo "  Region:           ${REGION}"
echo "  Cognito User Pool: ${USER_POOL_ID}"
echo "  Cognito Client ID: ${CLIENT_ID}"
echo "  S3 Bucket:         ${BUCKET_NAME}"
echo "  DynamoDB Table:    ${TABLE_NAME}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "  1. Copy .env.example to .env"
echo "  2. Fill in the following values:"
echo ""
echo "     VITE_AWS_REGION=${REGION}"
echo "     VITE_AWS_COGNITO_USER_POOL_ID=${USER_POOL_ID}"
echo "     VITE_AWS_COGNITO_CLIENT_ID=${CLIENT_ID}"
echo "     VITE_AWS_S3_BUCKET=${BUCKET_NAME}"
echo "     VITE_AWS_S3_REGION=${REGION}"
echo "     VITE_AWS_DYNAMODB_TABLE=${TABLE_NAME}"
echo "     VITE_AWS_DYNAMODB_REGION=${REGION}"
echo "     VITE_AWS_ACCESS_KEY_ID=<your-access-key>"
echo "     VITE_AWS_SECRET_ACCESS_KEY=<your-secret-key>"
echo ""
echo -e "${YELLOW}Note: You still need to create an IAM user with access keys.${NC}"
echo "      Go to AWS Console → IAM → Users → Create User"
echo "      Attach policies: AmazonDynamoDBFullAccess, AmazonS3FullAccess, AmazonCognitoPowerUser"
echo ""
echo -e "${GREEN}Default Admin Credentials (localStorage fallback):${NC}"
echo "  Email: admin@agrofeed.com"
echo "  Password: admin123"
echo ""
echo -e "${GREEN}Run 'npm run dev' to start the development server.${NC}"
echo ""
