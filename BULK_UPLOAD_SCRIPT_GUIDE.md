# Bulk Image Upload Script - Setup Guide ✅

## Overview
A complete bulk upload solution has been created to automatically download all homepage images and upload them to your S3 bucket with proper naming and folder structure.

## What Was Created

### 1. Image Configuration File
**File:** `src/data/homepageImages.ts`

Contains all **14 homepage images** with proper naming:

| # | Name | Section | Folder |
|---|------|---------|--------|
| 01 | `01-hero-main-tea-plantation.jpg` | Hero | `hero/` |
| 02 | `02-portfolio-rice-spices.jpg` | Portfolio | `portfolio/` |
| 03 | `03-portfolio-seasonal-citrus.jpg` | Portfolio | `portfolio/` |
| 04 | `04-portfolio-global-grains.jpg` | Portfolio | `portfolio/` |
| 05 | `05-portfolio-organic-produce.jpg` | Portfolio | `portfolio/` |
| 06 | `06-leadership-ceo-portrait.jpg` | Leadership | `leadership/` |
| 07 | `07-infrastructure-logistics-center.jpg` | Infrastructure | `infrastructure/` |
| 08 | `08-network-global-map.jpg` | Global Network | `network/` |
| 09 | `09-csr-soil-hands.jpg` | CSR | `csr/` |
| 10 | `10-csr-solar-panels.jpg` | CSR | `csr/` |
| 11 | `11-news-geneva-meeting.jpg` | News | `news/` |
| 12 | `12-news-agricultural-lab.jpg` | News | `news/` |
| 13 | `13-news-coffee-handshake.jpg` | News | `news/` |
| 14 | `14-cta-wheat-pattern-bg.jpg` | CTA | `cta/` |

### 2. Bulk Upload Component
**File:** `src/components/BulkImageUpload.tsx`

**Features:**
- ✅ One-click bulk upload
- ✅ Downloads images from current URLs
- ✅ Uploads to S3 with proper folder structure
- ✅ Batch processing (3 images at a time)
- ✅ Real-time progress tracking
- ✅ Success/Error status for each image
- ✅ Automatic retry on failure

### 3. Updated Image Management Page
**File:** `src/pages/ImageManagement.tsx`

Now includes:
- Bulk upload script at the top
- Individual manual upload option
- Progress tracking
- Search and filter

## S3 Folder Structure

Images will be uploaded to:

```
s3://agrofeed-content-agrofeed-536217686312/
└── homepage-images/
    ├── hero/
    │   └── 01-hero-main-tea-plantation.jpg
    ├── portfolio/
    │   ├── 02-portfolio-rice-spices.jpg
    │   ├── 03-portfolio-seasonal-citrus.jpg
    │   ├── 04-portfolio-global-grains.jpg
    │   └── 05-portfolio-organic-produce.jpg
    ├── leadership/
    │   └── 06-leadership-ceo-portrait.jpg
    ├── infrastructure/
    │   └── 07-infrastructure-logistics-center.jpg
    ├── network/
    │   └── 08-network-global-map.jpg
    ├── csr/
    │   ├── 09-csr-soil-hands.jpg
    │   └── 10-csr-solar-panels.jpg
    ├── news/
    │   ├── 11-news-geneva-meeting.jpg
    │   ├── 12-news-agricultural-lab.jpg
    │   └── 13-news-coffee-handshake.jpg
    └── cta/
        └── 14-cta-wheat-pattern-bg.jpg
```

## How to Use the Bulk Upload Script

### Step 1: Access Admin Dashboard
1. Navigate to `/admin-login`
2. Log in with admin credentials
3. Click **"Images"** in the sidebar

### Step 2: Run Bulk Upload
1. Click the **"Start Bulk Upload"** button
2. The script will:
   - Download all 14 images from their current URLs
   - Upload them to S3 with proper names
   - Show real-time progress
3. Wait for completion (~2-3 minutes)

### Step 3: Verify Upload
After completion:
- ✅ Green checkmarks indicate successful uploads
- Click on any image to see its S3 key
- Public URLs will be: `https://{bucket}.s3.amazonaws.com/homepage-images/{folder}/{filename}`

## Manual Upload (Alternative)

If you prefer to upload images individually:

1. Scroll down to any image card
2. Click **"Upload"** button
3. Select an image file
4. Image uploads to S3 immediately

## CORS Configuration

Make sure your S3 bucket has CORS enabled for the download to work:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

## Troubleshooting

### Download Failed
If images fail to download:
- Check CORS settings on S3 bucket
- Verify the source URLs are accessible
- Some Google URLs may have restrictions

### Upload Failed
If upload fails:
- Check AWS credentials in Amplify
- Verify S3 bucket permissions
- Check file size (max 5MB per image)

### Browser Memory
For large images:
- The script processes 3 images at a time
- If browser slows down, refresh and retry
- Failed uploads can be retried individually

## Testing

To test if the script is working:

```bash
# After running bulk upload, verify a file exists
aws s3 ls s3://agrofeed-content-agrofeed-536217686312/homepage-images/hero/

# Should show:
# 2024-01-01 00:00:00  1234567 01-hero-main-tea-plantation.jpg
```

## Public URL Access

After upload, images are publicly accessible at:

```
https://agrofeed-content-agrofeed-536217686312.s3.amazonaws.com/homepage-images/hero/01-hero-main-tea-plantation.jpg
```

## Files Summary

| File | Purpose |
|------|---------|
| `src/data/homepageImages.ts` | Image configuration with names |
| `src/components/BulkImageUpload.tsx` | Bulk upload script component |
| `src/pages/ImageManagement.tsx` | Updated with bulk upload UI |
| `src/lib/S3Service.ts` | S3 upload service (existing) |

## Build Status
✅ **Build successful** - Ready to deploy

## Next Steps

1. **Deploy** the updated code to Amplify
2. **Log in** to admin dashboard
3. **Navigate** to Images section
4. **Click** "Start Bulk Upload"
5. **Wait** for all 14 images to upload
6. **Verify** images in S3 console
7. **Update** Home.tsx to use S3 URLs (optional)
