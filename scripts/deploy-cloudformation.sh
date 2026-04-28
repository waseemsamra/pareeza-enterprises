#!/bin/bash

# CloudFormation Deployment Script for AgroFeed CMS
# This script deploys the CloudFormation stack and helps you configure the .env file

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}==================================${NC}"
echo -e "${BLUE}AgroFeed CMS - CloudFormation Deploy${NC}"
echo -e "${BLUE}==================================${NC}"
echo ""

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo -e "${RED}AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check AWS configuration
if ! aws configure get region &> /dev/null; then
    echo -e "${RED}AWS CLI is not configured. Run 'aws configure' first.${NC}"
    exit 1
fi

REGION=$(aws configure get region)
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo -e "${GREEN}✓ AWS CLI configured${NC}"
echo -e "${YELLOW}Region: ${REGION}${NC}"
echo -e "${YELLOW}Account ID: ${ACCOUNT_ID}${NC}"
echo ""

# Get stack name
STACK_NAME="agrofeed-cms"
read -p "Enter stack name (default: agrofeed-cms): " input_stack_name
if [ -n "$input_stack_name" ]; then
    STACK_NAME="$input_stack_name"
fi
echo ""

# Get environment name
ENVIRONMENT="production"
read -p "Enter environment name (default: production): " input_env
if [ -n "$input_env" ]; then
    ENVIRONMENT="$input_env"
fi
echo ""

# Get admin email (optional)
ADMIN_EMAIL=""
read -p "Enter admin email address (optional, press Enter to skip): " ADMIN_EMAIL
echo ""

# Validate template
echo -e "${YELLOW}Validating CloudFormation template...${NC}"
if aws cloudformation validate-template --template-body file://aws/cloudformation.yml > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Template is valid${NC}"
else
    echo -e "${RED}✗ Template validation failed${NC}"
    exit 1
fi
echo ""

# Check if stack exists
if aws cloudformation describe-stacks --stack-name "$STACK_NAME" > /dev/null 2>&1; then
    echo -e "${YELLOW}Stack '$STACK_NAME' already exists. Do you want to update it?${NC}"
    read -p "Update existing stack? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        UPDATE_EXISTING=true
    else
        echo -e "${YELLOW}Please use a different stack name or delete the existing stack.${NC}"
        exit 0
    fi
else
    UPDATE_EXISTING=false
fi
echo ""

# Deploy stack
if [ "$UPDATE_EXISTING" = true ]; then
    echo -e "${GREEN}Updating CloudFormation stack...${NC}"
    if [ -n "$ADMIN_EMAIL" ]; then
        aws cloudformation deploy \
            --stack-name "$STACK_NAME" \
            --template-file aws/cloudformation.yml \
            --capabilities CAPABILITY_NAMED_IAM \
            --parameter-overrides \
                Environment="$ENVIRONMENT" \
                EmailAddress="$ADMIN_EMAIL" \
            --tags Project=AgroFeed Environment="$ENVIRONMENT"
    else
        aws cloudformation deploy \
            --stack-name "$STACK_NAME" \
            --template-file aws/cloudformation.yml \
            --capabilities CAPABILITY_NAMED_IAM \
            --parameter-overrides \
                Environment="$ENVIRONMENT" \
            --tags Project=AgroFeed Environment="$ENVIRONMENT"
    fi
else
    echo -e "${GREEN}Creating CloudFormation stack...${NC}"
    if [ -n "$ADMIN_EMAIL" ]; then
        aws cloudformation deploy \
            --stack-name "$STACK_NAME" \
            --template-file aws/cloudformation.yml \
            --capabilities CAPABILITY_NAMED_IAM \
            --parameter-overrides \
                Environment="$ENVIRONMENT" \
                EmailAddress="$ADMIN_EMAIL" \
            --tags Project=AgroFeed Environment="$ENVIRONMENT"
    else
        aws cloudformation deploy \
            --stack-name "$STACK_NAME" \
            --template-file aws/cloudformation.yml \
            --capabilities CAPABILITY_NAMED_IAM \
            --parameter-overrides \
                Environment="$ENVIRONMENT" \
            --tags Project=AgroFeed Environment="$ENVIRONMENT"
    fi
fi

echo ""
echo -e "${GREEN}✓ Stack deployment complete!${NC}"
echo ""

# Get stack outputs
echo -e "${YELLOW}Retrieving stack outputs...${NC}"
OUTPUTS=$(aws cloudformation describe-stacks --stack-name "$STACK_NAME" --query 'Stacks[0].Outputs')

# Extract values
COGNITO_USER_POOL_ID=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="CognitoUserPoolId") | .OutputValue')
COGNITO_CLIENT_ID=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="CognitoClientId") | .OutputValue')
S3_BUCKET=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="S3BucketName") | .OutputValue')
DYNAMODB_TABLE=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="DynamoDBTableName") | .OutputValue')
IAM_USER=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="IAMUserName") | .OutputValue')
ACCESS_KEY_ID=$(echo "$OUTPUTS" | jq -r '.[] | select(.OutputKey=="IAMUserAccessKeyId") | .OutputValue')

echo -e "${GREEN}✓ Retrieved all outputs${NC}"
echo ""

# Get secret access key
echo -e "${YELLOW}Retrieving IAM access key secret...${NC}"
echo -e "${RED}⚠️  IMPORTANT: Save this secret key securely. It will only be shown once!${NC}"
echo ""

SECRET_ACCESS_KEY=$(aws iam list-access-keys --user-name "$IAM_USER" --query 'AccessKeyMetadata[0].AccessKeyId' --output text)

if [ "$SECRET_ACCESS_KEY" = "$ACCESS_KEY_ID" ]; then
    # Get the actual secret key (this only works right after creation)
    # For existing keys, user needs to retrieve from AWS console
    SECRET_ACCESS_KEY="RETRIEVE_FROM_AWS_CONSOLE_OR_CREATE_NEW_KEY"
    echo -e "${YELLOW}Note: Secret access key cannot be retrieved for existing keys.${NC}"
    echo -e "${YELLOW}Please go to AWS Console → IAM → Users → ${IAM_USER} → Security credentials${NC}"
    echo -e "${YELLOW}Create a new access key if needed.${NC}"
    echo ""
fi

# Display summary
echo -e "${BLUE}==================================${NC}"
echo -e "${BLUE}Deployment Summary${NC}"
echo -e "${BLUE}==================================${NC}"
echo ""
echo -e "${GREEN}Stack Name:${NC} $STACK_NAME"
echo -e "${GREEN}Environment:${NC} $ENVIRONMENT"
echo -e "${GREEN}Region:${NC} $REGION"
echo ""
echo -e "${YELLOW}Resources Created:${NC}"
echo "  ✓ Cognito User Pool: $COGNITO_USER_POOL_ID"
echo "  ✓ Cognito Client ID: $COGNITO_CLIENT_ID"
echo "  ✓ S3 Bucket: $S3_BUCKET"
echo "  ✓ DynamoDB Table: $DYNAMODB_TABLE"
echo "  ✓ IAM User: $IAM_USER"
if [ -n "$ADMIN_EMAIL" ]; then
    echo "  ✓ Admin User Created: $ADMIN_EMAIL"
fi
echo ""

# Generate .env file
echo -e "${BLUE}==================================${NC}"
echo -e "${BLUE}Environment Configuration${NC}"
echo -e "${BLUE}==================================${NC}"
echo ""

cat > .env << EOF
# AWS Configuration - Generated by CloudFormation
# Stack: $STACK_NAME
# Environment: $ENVIRONMENT
# Region: $REGION
# Generated: $(date -u +"%Y-%m-%dT%H:%M:%SZ")

# AWS Region
VITE_AWS_REGION=$REGION

# AWS Cognito Configuration
VITE_AWS_COGNITO_USER_POOL_ID=$COGNITO_USER_POOL_ID
VITE_AWS_COGNITO_CLIENT_ID=$COGNITO_CLIENT_ID

# AWS S3 Configuration
VITE_AWS_S3_BUCKET=$S3_BUCKET
VITE_AWS_S3_REGION=$REGION

# AWS DynamoDB Configuration
VITE_AWS_DYNAMODB_TABLE=$DYNAMODB_TABLE
VITE_AWS_DYNAMODB_REGION=$REGION

# AWS Credentials (Development)
VITE_AWS_ACCESS_KEY_ID=$ACCESS_KEY_ID
VITE_AWS_SECRET_ACCESS_KEY=$SECRET_ACCESS_KEY
EOF

echo -e "${GREEN}✓ Created .env file${NC}"
echo ""
echo -e "${YELLOW}Contents of .env:${NC}"
echo "---"
cat .env
echo "---"
echo ""

echo -e "${BLUE}==================================${NC}"
echo -e "${BLUE}Next Steps${NC}"
echo -e "${BLUE}==================================${NC}"
echo ""

if [ -n "$ADMIN_EMAIL" ]; then
    echo "1. Check your email (${ADMIN_EMAIL}) for temporary password"
    echo "2. Login with the temporary password and set a new one"
    echo ""
else
    echo "1. Create an admin user in Cognito console:"
    echo "   - Go to AWS Console → Cognito → User Pools → ${COGNITO_USER_POOL_ID}"
    echo "   - Click 'Create user' and add custom attribute: role = admin"
    echo ""
fi

echo "2. Update S3 CORS origins in AWS Console:"
echo "   - Go to S3 → ${S3_BUCKET} → Permissions → Cross-origin resource sharing"
echo "   - Add your production domain to AllowedOrigins"
echo ""
echo "3. Update Cognito callback URLs:"
echo "   - Go to Cognito → ${COGNITO_USER_POOL_ID} → App clients"
echo "   - Edit 'agrofeed-web-${ENVIRONMENT}' and add your production domain"
echo ""
echo "4. Start development server:"
echo "   npm run dev"
echo ""
echo "5. Login at: http://localhost:5173/login"
echo "   - Use admin credentials"
echo "   - Navigate to /admin dashboard"
echo ""

if [ "$SECRET_ACCESS_KEY" = "RETRIEVE_FROM_AWS_CONSOLE_OR_CREATE_NEW_KEY" ]; then
    echo -e "${RED}⚠️  ACTION REQUIRED:${NC}"
    echo "   You need to retrieve or create a new secret access key."
    echo "   Go to: AWS Console → IAM → Users → ${IAM_USER} → Security credentials"
    echo "   Create a new access key and update VITE_AWS_SECRET_ACCESS_KEY in .env"
    echo ""
fi

echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
