# 🔐 Secrets Management Guide

This document explains how to manage secrets and sensitive configuration for InnovateX 2025 in different environments.

## ⚠️ CRITICAL SECURITY GUIDELINES

1. **NEVER commit secrets to Git**
2. **ALWAYS rotate default credentials before production**
3. **Use environment-specific secrets**
4. **Implement the principle of least privilege**
5. **Regularly audit access logs**

---

## 📋 Required Secrets

### Database
```bash
DATABASE_URL=postgresql://user:password@host:5432/dbname
DB_PASSWORD=<strong-password>
```

### JWT Authentication
```bash
JWT_SECRET=<generate-256-bit-random-string>
JWT_REFRESH_SECRET=<generate-256-bit-random-string>
```

Generate secure secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### File Storage (S3/MinIO)
```bash
S3_ACCESS_KEY=<your-access-key>
S3_SECRET_KEY=<your-secret-key>
S3_BUCKET=innovatex-uploads
S3_ENDPOINT=https://s3.amazonaws.com
```

### Email Provider (SendGrid)
```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@innovatex2025.edu
```

### Optional Services
```bash
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

---

## 🏠 Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Update with development values:
   - Use default database credentials from docker-compose
   - Generate development JWT secrets
   - Use local MinIO for storage

---

## ☁️ Production Deployment

### Vercel (Frontend)

Add environment variables in **Project Settings → Environment Variables**:

```
NEXT_PUBLIC_API_URL=https://api.innovatex2025.edu
NEXT_PUBLIC_APP_URL=https://innovatex2025.edu
NEXT_PUBLIC_APP_NAME=InnovateX 2025
NEXT_PUBLIC_EVENT_DATE=2025-03-15T09:00:00+05:30
NEXT_PUBLIC_COLLEGE_NAME=College of Engineering
```

### DigitalOcean / AWS (Backend)

#### Using DigitalOcean App Platform:

1. Go to **App Settings → App-Level Environment Variables**
2. Add all required secrets:
   - `DATABASE_URL` (use managed database connection string)
   - `JWT_SECRET`
   - `JWT_REFRESH_SECRET`
   - `SENDGRID_API_KEY`
   - `S3_ACCESS_KEY`
   - `S3_SECRET_KEY`

3. Mark sensitive variables as **encrypted**

#### Using AWS Elastic Beanstalk:

```bash
# Configure environment variables
eb setenv DATABASE_URL=postgresql://... \\
  JWT_SECRET=xxx \\
  JWT_REFRESH_SECRET=xxx \\
  SENDGRID_API_KEY=xxx
```

---

## 🔧 GitHub Actions Secrets

Add secrets in **Settings → Secrets and variables → Actions**:

### Required Secrets:

```
VERCEL_TOKEN          # Vercel deployment token
VERCEL_ORG_ID         # Vercel organization ID
VERCEL_PROJECT_ID     # Vercel project ID

DIGITALOCEAN_TOKEN    # DO API token
DATABASE_URL          # Production database URL

# Or for Docker deployment:
REGISTRY_URL          # Container registry URL
REGISTRY_USERNAME     # Registry username
REGISTRY_PASSWORD     # Registry password
DEPLOY_HOST          # Server IP/hostname
DEPLOY_USER          # SSH user
DEPLOY_SSH_KEY       # Private SSH key
```

### Setting Secrets:

```bash
# Example: Add secret via GitHub CLI
gh secret set DIGITALOCEAN_TOKEN < token.txt
```

---

## 🗄️ Database Credentials

### Development
```
Host: localhost
Port: 5432
User: postgres
Password: password
Database: innovatex
```

### Production

**Use managed database services:**
- DigitalOcean Managed PostgreSQL
- AWS RDS
- Google Cloud SQL

**Connection string format:**
```
postgresql://user:password@host:5432/dbname?sslmode=require
```

---

## 📧 Email Configuration

### SendGrid

1. Create account at https://sendgrid.com
2. Go to **Settings → API Keys**
3. Create new API key with **Full Access**
4. Add to environment:
   ```
   SENDGRID_API_KEY=SG.xxxxx
   ```

### AWS SES

1. Verify domain in SES console
2. Create IAM user with `ses:SendEmail` permission
3. Generate access credentials
4. Add to environment:
   ```
   AWS_SES_ACCESS_KEY=AKIAxxxxx
   AWS_SES_SECRET_KEY=xxxxx
   AWS_SES_REGION=us-east-1
   ```

---

## 💳 Payment Integration (Optional)

### Stripe

```bash
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

### Razorpay (India)

```bash
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

---

## 🔍 Monitoring & Observability

### Sentry

1. Create project at https://sentry.io
2. Copy DSN from project settings
3. Add to environment:
   ```
   SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
   SENTRY_ENVIRONMENT=production
   ```

---

## 🔄 Secret Rotation

### When to Rotate:

- **Immediately** if credentials are exposed
- **Every 90 days** for production secrets
- **After employee offboarding**
- **After security incidents**

### How to Rotate:

1. Generate new secret
2. Update in all environments
3. Test applications
4. Revoke old secret
5. Document in audit log

---

## 📝 Security Checklist

Before going to production:

- [ ] Changed default admin password (`Admin123!`)
- [ ] Rotated all JWT secrets
- [ ] Configured production database with strong password
- [ ] Enabled SSL/TLS for all connections
- [ ] Set up backup encryption keys
- [ ] Configured SENDGRID_API_KEY
- [ ] Set up S3 with proper IAM policies
- [ ] Enabled Sentry error tracking
- [ ] Configured rate limiting
- [ ] Set NODE_ENV=production
- [ ] Enabled CORS only for production domains
- [ ] Reviewed all environment variables
- [ ] Set up secret scanning in CI/CD
- [ ] Documented secret access procedures

---

## 🆘 In Case of Breach

1. **Immediately revoke** compromised credentials
2. **Rotate all** related secrets
3. **Review** access logs
4. **Notify** affected users (if applicable)
5. **Document** incident in audit log
6. **Implement** additional security measures
7. **Report** to security team

---

## 📞 Support

For security concerns, contact:
- **Email:** security@innovatex2025.edu
- **Emergency:** +91-XXXX-XXXXXX

**Do NOT share secrets via email, Slack, or other unsecured channels.**

---

Last updated: 2025-01-15
