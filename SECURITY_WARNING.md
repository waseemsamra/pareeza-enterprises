# ⚠️ SECURITY WARNING

## Never Share Your Credentials!

You just shared your admin credentials in a public/unsecured channel. This is a **serious security risk**.

### Immediate Actions Required

1. **Change the password immediately** in AWS Cognito:
   - Go to: https://console.aws.amazon.com/cognito/users/us-east-1_JxtucAU3s
   - Find user: `waseemsamra@gmail.com`
   - Click "Disable" then "Delete"
   - Create a new user with a **different password**

2. **Rotate IAM Access Keys**:
   - Go to: https://console.aws.amazon.com/iam
   - Find your IAM user
   - Delete current access keys
   - Create new access keys
   - Update `.env` file

3. **Never commit `.env` to Git**:
   ```bash
   # Verify .env is in .gitignore
   cat .gitignore | grep .env
   
   # Never run:
   git add .env  # ❌ WRONG
   git commit -m "add credentials"  # ❌ WRONG
   ```

---

## Secure Credential Management

### For Development (Local)

```bash
# .env file (NEVER commit this!)
VITE_AWS_ACCESS_KEY_ID=AKIA...
VITE_AWS_SECRET_ACCESS_KEY=...

# Add to .gitignore
echo ".env" >> .gitignore
```

### For Production (Amplify/Deployment)

Use environment variables in your deployment platform:

**AWS Amplify:**
```
Amplify Console → App settings → Environment variables
Add VITE_AWS_ACCESS_KEY_ID and VITE_AWS_SECRET_ACCESS_KEY there
```

**Vercel:**
```
Settings → Environment Variables
Add variables there (never in code)
```

---

## Best Practices

### ✅ DO:
- Use environment variables
- Keep `.env` in `.gitignore`
- Use IAM roles in production
- Rotate credentials regularly
- Use strong passwords
- Enable MFA on admin accounts

### ❌ DON'T:
- Share credentials in chat/email
- Commit `.env` to version control
- Hardcode credentials in source code
- Use the same password everywhere
- Leave unused access keys active

---

## Secure Setup Steps

### 1. Delete Compromised Credentials

```
AWS Console → Cognito → User pools → us-east-1_JxtucAU3s
→ Users → waseemsamra@gmail.com → Delete

AWS Console → IAM → Users → Your User 
→ Security credentials → Delete access keys
```

### 2. Create New Secure Credentials

**New Cognito User:**
```
1. Cognito → User pools → us-east-1_JxtucAU3s
2. Users → Create user
3. Email: your-email@gmail.com
4. Set temporary password (use a password manager!)
5. Custom attributes:
   - role: admin
6. Create user
```

**New IAM Access Keys:**
```
1. IAM → Users → Your User
2. Security credentials → Create access key
3. Copy immediately (only shown once!)
4. Add to .env file
5. Delete old keys
```

### 3. Update .env File

```env
# NEW credentials (keep this file secure!)
VITE_AWS_ACCESS_KEY_ID=AKIA...NEW_KEY
VITE_AWS_SECRET_ACCESS_KEY=...NEW_SECRET

# Cognito (these are public, OK to share)
VITE_AWS_COGNITO_USER_POOL_ID=us-east-1_JxtucAU3s
VITE_AWS_COGNITO_CLIENT_ID=4bp3ron4t3v2n1q8qvu2j795ov
```

### 4. Test Securely

```bash
# Start app
npm run dev

# Login with NEW credentials
http://localhost:5173/login
```

---

## Password Security

### Strong Password Requirements

```
✅ Minimum 12 characters
✅ Mix of uppercase and lowercase
✅ Numbers and special characters
✅ No dictionary words
✅ Unique (not used elsewhere)
```

### Use a Password Manager

Recommended:
- 1Password
- Bitwarden
- LastPass
- KeePass

Generate passwords like:
```
xK9#mP2$vL5@nQ8
NOT: Admin123!  ❌
```

---

## Monitoring & Alerts

### Enable CloudTrail

```
AWS Console → CloudTrail → Create trail
Log all API calls
Set up alerts for suspicious activity
```

### Set Up CloudWatch Alarms

```
CloudWatch → Alarms → Create alarm

Monitor:
- Failed login attempts
- API call errors
- Unusual access patterns
```

---

## Checklist

- [ ] Deleted compromised Cognito user
- [ ] Created new Cognito user with strong password
- [ ] Deleted old IAM access keys
- [ ] Created new IAM access keys
- [ ] Updated `.env` with new credentials
- [ ] Verified `.env` is in `.gitignore`
- [ ] Enabled MFA on admin account
- [ ] Tested login with new credentials
- [ ] Set up monitoring/alerts

---

## Resources

### AWS Security Documentation

- [IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [Cognito Security](https://docs.aws.amazon.com/cognito/latest/developerguide/security.html)
- [AWS Security Blog](https://aws.amazon.com/blogs/security/)

### Tools

- [AWS Credential Scanner](https://github.com/awslabs/git-secrets)
- [Git Secrets](https://github.com/awslabs/git-secrets) - Prevent committing credentials
- [AWS Vault](https://github.com/99designs/aws-vault) - Secure credential storage

---

## Emergency Contacts

If you suspect unauthorized access:

1. **Immediately rotate all credentials**
2. **Check CloudTrail logs** for suspicious activity
3. **Contact AWS Support** if needed
4. **Review IAM policies** for excessive permissions

---

**Stay Secure! 🔒**

Remember: Security is everyone's responsibility. Always treat credentials as sensitive data.
