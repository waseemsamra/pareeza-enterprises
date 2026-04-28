# Hero Slider Management - Admin Dashboard ✅

## Overview
A complete hero slider management system has been integrated into the admin dashboard, allowing you to upload and manage hero section images directly to S3.

## What Was Created

### 1. HeroSliderManager Component
**File:** `src/components/HeroSliderManager.tsx`

**Features:**
- ✅ Upload hero images to S3 (`hero/` folder)
- ✅ Manage multiple slides
- ✅ Reorder slides (move up/down)
- ✅ Edit slide content (headline, description, tagline, buttons)
- ✅ Activate/deactivate slides
- ✅ Delete slides
- ✅ Real-time preview
- ✅ Compact, elegant typography

### 2. Integration with HomepageCMS
**File:** `src/pages/HomepageCMS.tsx`

The HeroSliderManager is now embedded in the HomepageCMS page, accessible from the admin dashboard.

## Typography Updates

All font sizes have been optimized for a clean, professional look:

| Element | Font Size | Weight |
|---------|-----------|--------|
| Section Title | 14px (text-lg) | Bold |
| Description | 10px (text-xs) | Medium |
| Slide Label | 10px (text-[10px]) | Bold |
| Headline Input | 12px (text-xs) | Semibold |
| Button Text | 10px (text-[10px]) | Medium |
| Form Labels | 10px (text-[10px]) | Medium |
| Form Inputs | 12px (text-xs) | Normal |

## How to Use

### Access Hero Slider Management

1. **Log in** to admin dashboard (`/admin-login`)
2. Navigate to **CMS** → **Homepage CMS**
3. Scroll to **"Hero Slider Management"** section

### Upload Hero Image

1. Click **"Upload Image"** button on any slide
2. Select an image file (JPEG, PNG, GIF, WebP - max 5MB)
3. Image uploads to S3: `hero/{filename}.jpg`
4. S3 URL is automatically saved

### Manage Slides

**Add New Slide:**
- Click **"Add Slide"** button
- Configure slide content
- Upload hero image

**Reorder Slides:**
- Use ↑ (up) and ↓ (down) arrow buttons
- Slides are numbered automatically

**Edit Slide:**
- Click the edit (✏️) button
- Expand editor shows all fields:
  - Tagline
  - Description
  - Button 1 Text & Link
  - Button 2 Text & Link
  - Active status

**Delete Slide:**
- Click the delete (🗑️) button
- Minimum 1 slide required

## S3 Storage

### Upload Location
```
s3://agrofeed-content-agrofeed-536217686312/hero/
```

### Public URL Format
```
https://agrofeed-content-agrofeed-536217686312.s3.amazonaws.com/hero/{filename}.jpg
```

### Example
After upload, your hero image will be accessible at:
```
https://agrofeed-content-agrofeed-536217686312.s3.amazonaws.com/hero/hero-image-12345.jpg
```

## Slide Configuration

Each slide has the following fields:

| Field | Description | Example |
|-------|-------------|---------|
| **Tagline** | Small text above headline | "Established 1984 — Global Curators" |
| **Headline** | Main hero text | "Nurturing the Global Harvest." |
| **Description** | Supporting text | "We bridge the distance..." |
| **Button 1 Text** | Primary CTA label | "View Portfolios" |
| **Button 1 Link** | Primary CTA URL | "/products" |
| **Button 2 Text** | Secondary CTA label | "Our Reach" |
| **Button 2 Link** | Secondary CTA URL | "/about" |
| **Image** | Hero background image | Uploaded to S3 |
| **Active** | Show/hide on homepage | ✓/✗ |

## Visual Features

### Slide Card
- Thumbnail preview of uploaded image
- Slide number indicator
- Active status badge
- Quick action buttons (move, edit, delete)
- Compact headline input

### Expanded Editor
When a slide is selected (edit mode):
- Full form with all fields
- 2-column grid layout
- Character-appropriate inputs
- Active/inactive toggle

### Upload Button
- Green background (#00450d)
- Cloud upload icon
- Loading state during upload
- S3 key display after upload

## Files Modified/Created

| File | Status | Purpose |
|------|--------|---------|
| `src/components/HeroSliderManager.tsx` | ✅ Created | Hero slider management UI |
| `src/pages/HomepageCMS.tsx` | ✅ Updated | Integrated HeroSliderManager |

## Build Status
✅ **Build successful** - No TypeScript errors

## Testing

### Test Upload
1. Go to Admin Dashboard → CMS → Homepage CMS
2. Find "Hero Slider Management" section
3. Click "Upload Image" on Slide 1
4. Select an image
5. Verify upload success message
6. Check S3 bucket for uploaded file

### Test Slide Management
1. Add a new slide
2. Fill in all fields
3. Upload an image
4. Move slide up/down
5. Delete the slide

### Verify Homepage
1. Upload hero image
2. Save changes
3. Visit homepage
4. Verify new hero image displays

## Permissions Required

Make sure your Cognito authenticated users have these S3 permissions:
- `s3:PutObject` - Upload images
- `s3:GetObject` - Read images
- `s3:DeleteObject` - Delete images

See `FIX_S3_PERMISSIONS.md` if you encounter permission errors.

## Tips

### Image Optimization
- Use images ≤ 5MB for faster uploads
- Recommended: 1920x1080px for hero images
- Format: JPEG for photos, PNG for graphics

### Multiple Slides
- Create multiple slides for different promotions
- Only mark one slide as "Active" at a time
- Use slide order to prioritize content

### Content Best Practices
- **Headline:** Keep it under 60 characters
- **Description:** 1-2 sentences max
- **Tagline:** Short, memorable phrase
- **Buttons:** Action-oriented text

## Troubleshooting

### Upload Fails
- Check S3 permissions (see `FIX_S3_PERMISSIONS.md`)
- Verify file size ≤ 5MB
- Check file format (JPEG, PNG, GIF, WebP)

### Image Not Displaying
- Verify S3 bucket policy allows public read
- Check CORS configuration
- Clear browser cache

### Changes Not Saving
- Click "Publish Changes" button
- Check browser console for errors
- Verify API connection

---

**Created:** 2024
**Status:** Complete ✅
**Component:** HeroSliderManager
**Integration:** HomepageCMS
