#!/bin/bash

echo "🚀 Uploading public folder images to S3..."
echo "📦 Bucket: agrofeed-content-agrofeed-536217686312"
echo ""

# Navigate to public folder
cd public

# Upload hero images
echo "📷 Uploading hero images..."
aws s3 cp hero-hay.jpg s3://agrofeed-content-agrofeed-536217686312/hero/hero-hay.jpg --region us-east-1
aws s3 cp hero-hay.jpg s3://agrofeed-content-agrofeed-536217686312/hero/default.jpg --region us-east-1

# Upload product images
echo "📦 Uploading product images..."
aws s3 cp product-hay.jpg s3://agrofeed-content-agrofeed-536217686312/products/hay.jpg --region us-east-1
aws s3 cp product-alfalfa.jpg s3://agrofeed-content-agrofeed-536217686312/products/alfalfa.jpg --region us-east-1
aws s3 cp product-grain.jpg s3://agrofeed-content-agrofeed-536217686312/products/grain.jpg --region us-east-1
aws s3 cp product-pellets.jpg s3://agrofeed-content-agrofeed-536217686312/products/pellets.jpg --region us-east-1
aws s3 cp product-straw.jpg s3://agrofeed-content-agrofeed-536217686312/products/straw.jpg --region us-east-1

# Upload detail images
echo "🔍 Uploading detail images..."
aws s3 cp detail-rhodes.jpg s3://agrofeed-content-agrofeed-536217686312/products/detail-rhodes.jpg --region us-east-1
aws s3 cp detail-rye.jpg s3://agrofeed-content-agrofeed-536217686312/products/detail-rye.jpg --region us-east-1
aws s3 cp detail-silage.jpg s3://agrofeed-content-agrofeed-536217686312/products/detail-silage.jpg --region us-east-1
aws s3 cp detail-timothy.jpg s3://agrofeed-content-agrofeed-536217686312/products/detail-timothy.jpg --region us-east-1

# Upload about images
echo "📖 Uploading about images..."
aws s3 cp about-quality.jpg s3://agrofeed-content-agrofeed-536217686312/about/quality.jpg --region us-east-1
aws s3 cp about-sustainable.jpg s3://agrofeed-content-agrofeed-536217686312/about/sustainable.jpg --region us-east-1
aws s3 cp about-variety.jpg s3://agrofeed-content-agrofeed-536217686312/about/variety.jpg --region us-east-1

# Upload other images
echo "📸 Uploading other images..."
aws s3 cp form-farmer.jpg s3://agrofeed-content-agrofeed-536217686312/misc/form-farmer.jpg --region us-east-1

# Make all objects public
echo "🌍 Making all objects public..."
aws s3 cp s3://agrofeed-content-agrofeed-536217686312/ s3://agrofeed-content-agrofeed-536217686312/ --recursive --acl public-read --region us-east-1

echo ""
echo "✅ Upload complete!"
echo ""
echo "📋 Verify uploads:"
echo "   aws s3 ls s3://agrofeed-content-agrofeed-536217686312/hero/ --region us-east-1"
echo "   aws s3 ls s3://agrofeed-content-agrofeed-536217686312/products/ --region us-east-1"
echo "   aws s3 ls s3://agrofeed-content-agrofeed-536217686312/about/ --region us-east-1"
echo ""
echo "🌐 Test URLs:"
echo "   https://agrofeed-content-agrofeed-536217686312.s3.us-east-1.amazonaws.com/hero/hero-hay.jpg"
echo "   https://agrofeed-content-agrofeed-536217686312.s3.us-east-1.amazonaws.com/products/hay.jpg"
