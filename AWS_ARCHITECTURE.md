# AWS CMS Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         AgroFeed CMS Application                         │
│                           (React + TypeScript)                           │
└─────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │
                    ┌─────────────────┴─────────────────┐
                    │                                   │
                    ▼                                   ▼
        ┌───────────────────┐              ┌───────────────────┐
        │   AuthContextAWS  │              │   CMSContextAWS   │
        │                   │              │                   │
        │  - login()        │              │  - cmsData        │
        │  - register()     │              │  - updateHero()   │
        │  - logout()       │              │  - updateAbout()  │
        │  - isAdmin        │              │  - uploadImage()  │
        └─────────┬─────────┘              └─────────┬─────────┘
                  │                                  │
                  │                                  │
        ┌─────────▼─────────┐              ┌─────────▼─────────┐
        │  CognitoService   │              │   S3Service       │
        │                   │              │                   │
        │  - signUp()       │              │  - uploadImage()  │
        │  - signIn()       │              │  - getSignedUrl() │
        │  - signOut()      │              │  - deleteImage()  │
        └─────────┬─────────┘              └─────────┬─────────┘
                  │                                  │
                  │                                  │
        ┌─────────▼──────────┐             ┌─────────▼─────────┐
        │   DynamoDBService  │             │   S3 Client       │
        │                    │             │                   │
        │  - saveContent()   │             │  - PutObject      │
        │  - getContent()    │             │  - GetObject      │
        │  - updateContent() │             │  - DeleteObject   │
        │  - deleteContent() │             │                   │
        └─────────┬──────────┘             └─────────┬─────────┘
                  │                                  │
                  │                                  │
    ┌─────────────┴──────────────────────────────────┴─────────────┐
    │                       AWS Cloud                               │
    │                                                               │
    │  ┌─────────────────┐         ┌─────────────────────────────┐ │
    │  │   Amazon        │         │      Amazon S3              │ │
    │  │   Cognito       │         │                             │ │
    │  │                 │         │  Bucket:                    │ │
    │  │  User Pool:     │         │  agrofeed-content-{name}    │ │
    │  │  agrofeed-users │         │                             │ │
    │  │                 │         │  Folders:                   │ │
    │  │  Client:        │         │  /hero                      │ │
    │  │  agrofeed-web   │         │  /about                     │ │
    │  │                 │         │  /products                  │ │
    │  │  Auth Flow:     │         │  /uploads                   │ │
    │  │  USER_PASSWORD  │         │                             │ │
    │  └─────────────────┘         └─────────────────────────────┘ │
    │                                                               │
    │  ┌─────────────────────────────────────────────────────────┐ │
    │  │              Amazon DynamoDB                            │ │
    │  │                                                         │ │
    │  │  Table: agrofeed-content                                │ │
    │  │                                                         │ │
    │  │  Keys:                                                  │ │
    │  │  - PK (Partition)                                       │ │
    │  │  - SK (Sort)                                            │ │
    │  │                                                         │ │
    │  │  GSI: TypeIndex (type)                                  │ │
    │  │                                                         │ │
    │  │  Items:                                                 │ │
    │  │  - HERO#default                                         │ │
    │  │  - ABOUT#default                                        │ │
    │  │  - TESTIMONIALS#default                                 │ │
    │  │  - ENQUIRY#default                                      │ │
    │  │  - SITESETTINGS#default                                 │ │
    │  │  - PRODUCT#{id}                                         │ │
    │  │  - USER#{id}                                            │ │
    │  └─────────────────────────────────────────────────────────┘ │
    │                                                               │
    └───────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Authentication Flow

```
┌────────────┐
│   User     │
└─────┬──────┘
      │ 1. Enter credentials
      ▼
┌─────────────────────────────┐
│  Login Form (Login.tsx)     │
└─────┬───────────────────────┘
      │ 2. Call login()
      ▼
┌─────────────────────────────┐
│  AuthContextAWS.login()     │
│                            │
│  if AWS configured:        │
│    → CognitoService        │
│  else:                     │
│    → localStorage          │
└─────┬───────────────────────┘
      │ 3. InitiateAuth
      ▼
┌─────────────────────────────┐
│  Cognito InitiateAuth API   │
│                            │
│  AuthFlow: USER_PASSWORD    │
│  Username: email            │
│  Password: password         │
└─────┬───────────────────────┘
      │ 4. Return tokens
      ▼
┌─────────────────────────────┐
│  Store in localStorage:     │
│  - agrofeed_user            │
│  - agrofeed_access_token    │
└─────┬───────────────────────┘
      │ 5. Update state
      ▼
┌─────────────────────────────┐
│  Redirect to /admin         │
└─────────────────────────────┘
```

### Image Upload Flow

```
┌────────────┐
│   User     │
└─────┬──────┘
      │ 1. Select image file
      ▼
┌─────────────────────────────┐
│  CMS Editor (file input)    │
└─────┬───────────────────────┘
      │ 2. Call uploadImage()
      ▼
┌─────────────────────────────┐
│  CMSContext.uploadImage()   │
│                            │
│  if AWS configured:        │
│    → S3Service             │
│  else:                     │
│    → URL.createObjectURL() │
└─────┬───────────────────────┘
      │ 3. Upload to S3
      ▼
┌─────────────────────────────┐
│  S3Service.uploadImage()    │
│                            │
│  - Generate unique filename │
│  - Convert to Uint8Array    │
│  - PutObjectCommand         │
│  - ACL: public-read         │
└─────┬───────────────────────┘
      │ 4. Store object
      ▼
┌─────────────────────────────┐
│  Amazon S3                  │
│  s3://agrofeed-content/     │
│  hero/1711234567-abc.jpg    │
└─────┬───────────────────────┘
      │ 5. Return URL
      ▼
┌─────────────────────────────┐
│  Return S3 URL:             │
│  https://s3.../hero/...jpg  │
└─────┬───────────────────────┘
      │ 6. Save in content
      ▼
┌─────────────────────────────┐
│  Update CMS data state      │
│  Save to DynamoDB           │
└─────────────────────────────┘
```

### Content Management Flow

```
┌────────────┐
│   Admin    │
└─────┬──────┘
      │ 1. Edit content
      ▼
┌─────────────────────────────┐
│  CMS Editor Form            │
│  (CMSManagement.tsx)        │
└─────┬───────────────────────┘
      │ 2. Call updateHero()
      ▼
┌─────────────────────────────┐
│  CMSContext.updateHero()    │
│                            │
│  - Update local state       │
│  - Save to localStorage     │
│  - If AWS: save to DynamoDB │
└─────┬───────────────────────┘
      │ 3. Save content
      ▼
┌─────────────────────────────┐
│  DynamoDBService.saveContent() │
│                              │
│  - Generate PK: HERO#default │
│  - Set SK: METADATA          │
│  - Include version, timestamps│
└─────┬───────────────────────┘
      │ 4. PutItem
      ▼
┌─────────────────────────────┐
│  Amazon DynamoDB            │
│  Table: agrofeed-content    │
│                            │
│  PK: HERO#default           │
│  SK: METADATA               │
│  type: hero                 │
│  data: { title, subtitle... }│
└─────┬───────────────────────┘
      │ 5. Confirm saved
      ▼
┌─────────────────────────────┐
│  Show success toast         │
│  Refresh frontend data      │
└─────────────────────────────┘
```

---

## Database Schema

### DynamoDB Single Table Design

```
Table: agrofeed-content
┌──────────────────────────────────────────────────────────────────┐
│ PK (HASH)        │ SK (RANGE)  │ type          │ data           │
├──────────────────┼─────────────┼───────────────┼────────────────┤
│ HERO#default     │ METADATA    │ hero          │ {badge, title, │
│                  │             │               │  subtitle...}  │
├──────────────────┼─────────────┼───────────────┼────────────────┤
│ ABOUT#default    │ METADATA    │ about         │ {badge, title, │
│                  │             │               │  features[],   │
│                  │             │               │  stats[]}      │
├──────────────────┼─────────────┼───────────────┼────────────────┤
│ TESTIMONIALS#... │ METADATA    │ testimonials  │ {badge, title, │
│                  │             │               │  testimonials[]}│
├──────────────────┼─────────────┼───────────────┼────────────────┤
│ ENQUIRY#default  │ METADATA    │ enquiry       │ {badge, title, │
│                  │             │               │  contact...}   │
├──────────────────┼─────────────┼───────────────┼────────────────┤
│ SITESETTINGS#... │ METADATA    │ siteSettings  │ {siteName,     │
│                  │             │               │  socialLinks}  │
├──────────────────┼─────────────┼───────────────┼────────────────┤
│ PRODUCT#abc123   │ METADATA    │ product       │ {title, desc,  │
│                  │             │               │  items[],      │
│                  │             │               │  features[]}   │
├──────────────────┼─────────────┼───────────────┼────────────────┤
│ USER#admin-001   │ METADATA    │ user          │ {email, name,  │
│                  │             │               │  role: admin}  │
└──────────────────────────────────────────────────────────────────┘

Global Secondary Index: TypeIndex
┌──────────────────────────────────────────────────────────────────┐
│ type (HASH)      │ (no sort key)                                 │
├──────────────────┼───────────────────────────────────────────────┤
│ hero             │ → Returns all hero items                      │
│ about            │ → Returns all about items                     │
│ testimonials     │ → Returns all testimonials                    │
│ enquiry          │ → Returns all enquiry configs                 │
│ siteSettings     │ → Returns all site settings                   │
│ product          │ → Returns all products                        │
│ user             │ → Returns all users                           │
└──────────────────────────────────────────────────────────────────┘
```

### Item Structure Example

```json
{
  "PK": "HERO#default",
  "SK": "METADATA",
  "type": "hero",
  "data": {
    "badge": "Premium Quality Feed",
    "title": "Premium Animal Feed Products",
    "subtitle": "High-quality hay, alfalfa, straw, and grain products...",
    "primaryButtonText": "Explore Products",
    "secondaryButtonText": "Contact Us",
    "backgroundImage": "https://s3.../hero/1711234567-abc.jpg"
  },
  "createdAt": "2026-03-21T00:00:00Z",
  "updatedAt": "2026-03-21T00:00:00Z",
  "version": 1
}
```

---

## S3 Bucket Structure

```
agrofeed-content-{region}-{suffix}/
│
├── hero/
│   ├── 1711234567-abc123.jpg
│   ├── 1711234568-def456.jpg
│   └── 1711234569-ghi789.jpg
│
├── about/
│   ├── 1711234570-jkl012.jpg
│   ├── 1711234571-mno345.jpg
│   └── 1711234572-pqr678.jpg
│
├── products/
│   ├── 1711234573-stu901.jpg
│   ├── 1711234574-vwx234.jpg
│   └── 1711234575-yza567.jpg
│
└── uploads/
    ├── 1711234576-bcd890.png
    └── 1711234577-efg123.png

All objects have:
- ACL: public-read
- ContentType: image/jpeg or image/png
- Cache-Control: max-age=31536000 (1 year)
```

---

## Component Hierarchy

```
App.tsx
│
├── CMSProvider
│   └── AuthProvider
│       └── Router
│           ├── Navigation
│           ├── Routes
│           │   ├── Home (/)
│           │   ├── Products (/products)
│           │   ├── ProductDetail (/products/:category)
│           │   ├── Contact (/contact)
│           │   ├── Login (/login)
│           │   ├── Register (/register)
│           │   ├── Dashboard (/dashboard) [Protected]
│           │   └── AdminDashboard (/admin) [Protected + Admin]
│           │       ├── CMSManagement (CMS tab)
│           │       ├── Products Management (Products tab)
│           │       ├── Testimonials Management (Testimonials tab)
│           │       ├── Orders Management (Orders tab)
│           │       └── Settings (Settings tab)
│           └── Footer
```

---

## Security Model

```
┌─────────────────────────────────────────────────────────────────┐
│                        Security Layers                           │
└─────────────────────────────────────────────────────────────────┘

Layer 1: Authentication (Cognito)
┌─────────────────────────────────────────────────────────────────┐
│  - Email verification                                           │
│  - Password policy (min 8 chars, uppercase, lowercase, numbers) │
│  - JWT tokens (ID, Access, Refresh)                             │
│  - Token expiration (1 hour access, 30 day refresh)             │
│  - Optional MFA for production                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
Layer 2: Authorization (Admin Role)
┌─────────────────────────────────────────────────────────────────┐
│  - ProtectedRoute component checks isAuthenticated              │
│  - AdminDashboard checks isAdmin flag                           │
│  - Custom role attribute in Cognito (user/admin)                │
│  - Role stored in JWT token                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
Layer 3: S3 Access Control
┌─────────────────────────────────────────────────────────────────┐
│  - Bucket policy: Public read only (GetObject)                  │
│  - Write access: IAM credentials only                           │
│  - CORS: Restricted to allowed origins                          │
│  - No delete from frontend (admin only via SDK)                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
Layer 4: DynamoDB Access Control
┌─────────────────────────────────────────────────────────────────┐
│  - IAM policy restricts to specific table                       │
│  - No direct frontend access (via SDK only)                     │
│  - Optimistic locking with version field                        │
│  - Server-side encryption (enabled by default)                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
Layer 5: Application Security
┌─────────────────────────────────────────────────────────────────┐
│  - Environment variables (never commit .env)                    │
│  - Input validation in forms                                    │
│  - XSS protection (React auto-escapes)                          │
│  - HTTPS in production                                          │
│  - Rate limiting (implement in production)                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Hybrid Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Automatic AWS Detection                       │
└─────────────────────────────────────────────────────────────────┘

Application Start
        │
        ▼
┌─────────────────────┐
│ Check environment   │
│ variables:          │
│                     │
│ - COGNITO_USER_POOL │
│ - COGNITO_CLIENT_ID │
│ - AWS_ACCESS_KEY    │
│ - AWS_SECRET_KEY    │
└─────────┬───────────┘
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
┌─────────┐ ┌──────────┐
│  AWS    │ │  No AWS  │
│ Configured│ │Configured│
└────┬────┘ └────┬─────┘
     │           │
     │           │
     ▼           ▼
┌────────────┐ ┌──────────────┐
│ Use:       │ │ Use:         │
│ - Cognito  │ │ - localStorage│
│ - S3       │ │ - blob URLs  │
│ - DynamoDB │ │ - localStorage│
└────────────┘ └──────────────┘
     │                │
     │                │
     └────────┬───────┘
              │
              ▼
     ┌────────────────┐
     │ Same API for   │
     │ both modes     │
     │ (useAuth, useCMS)│
     └────────────────┘
```

---

## Cost Breakdown

```
┌─────────────────────────────────────────────────────────────────┐
│              AWS Free Tier (12 months)                           │
└─────────────────────────────────────────────────────────────────┘

Cognito
├── 50,000 MAUs free
│   └── Expected: 1,000 users = $0
│
S3
├── 5 GB storage free
│   └── Expected: 1 GB = $0
├── 20,000 GET requests free
│   └── Expected: 5,000 requests = $0
└── 2,000 PUT requests free
    └── Expected: 500 requests = $0

DynamoDB
├── 25 GB storage free
│   └── Expected: 100 MB = $0
├── 25 WCUs free
│   └── Expected: 10 WCUs = $0
└── 25 RCUs free
    └── Expected: 10 RCUs = $0

TOTAL: $0/month (within free tier)


┌─────────────────────────────────────────────────────────────────┐
│              Production (Small Business)                         │
└─────────────────────────────────────────────────────────────────┘

Cognito
├── 10,000 MAUs
│   └── $0 (under 50K threshold)
│
S3
├── 10 GB storage
│   └── ~$0.23/GB = $2.30
├── 50,000 GET requests
│   └── $0.40 per 10K = $2.00
└── 5,000 PUT requests
    └── $5.00 per 1K = $25.00 (but most are reads)

DynamoDB
├── 1 GB storage
│   └── $0.25/GB = $0.25
├── On-demand writes (10 WCU avg)
│   └── $1.25 per WU = ~$1.00
└── On-demand reads (10 RCU avg)
    └── $0.25 per RU = ~$0.50

TOTAL: ~$5-10/month
```

---

## Deployment Options

### Option 1: Vercel/Netlify (Recommended for Start)

```
┌──────────────┐
│   GitHub     │
│   Repository │
└──────┬───────┘
       │ Push
       ▼
┌──────────────┐
│   Vercel     │
│   Build      │
└──────┬───────┘
       │ Deploy
       ▼
┌──────────────┐
│  CDN Edge    │
│  Network     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Users      │
└──────────────┘

.env variables set in Vercel dashboard
AWS resources accessed via HTTPS
```

### Option 2: S3 + CloudFront

```
┌──────────────┐
│   npm run    │
│   build      │
└──────┬───────┘
       │ Upload
       ▼
┌──────────────┐
│   S3 Bucket  │
│   (static)   │
└──────┬───────┘
       │ Origin
       ▼
┌──────────────┐
│  CloudFront  │
│  Distribution│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Users      │
└──────────────┘
```

### Option 3: Amplify Hosting

```
┌──────────────┐
│   GitHub     │
│   Repository │
└──────┬───────┘
       │ Connect
       ▼
┌──────────────┐
│   Amplify    │
│   Console    │
└──────┬───────┘
       │ Auto-build
       ▼
┌──────────────┐
│  Amplify     │
│  Hosting     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Users      │
└──────────────┘

Integrated with Cognito, S3, DynamoDB
Single AWS console for everything
```

---

This architecture provides:
- ✅ Scalability (serverless AWS services)
- ✅ Security (multiple layers)
- ✅ Cost-effectiveness (free tier friendly)
- ✅ Developer experience (hybrid mode)
- ✅ Production-ready (enterprise patterns)
