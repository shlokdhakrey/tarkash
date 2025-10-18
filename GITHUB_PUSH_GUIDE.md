# 🚀 Push to GitHub - Step by Step

## Prerequisites

1. **GitHub Account** - Sign up at https://github.com if you don't have one
2. **Git Installed** - Already have it ✅
3. **GitHub Repository** - Create one at https://github.com/new

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `innovatex-2025` (or your choice)
3. Description: "InnovateX 2025 - Full-stack hackathon management platform"
4. **Important:** Keep it **PRIVATE** (contains API keys)
5. **Do NOT** initialize with README (we already have one)
6. Click "Create repository"

## Step 2: Configure Git (First Time Only)

```powershell
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Stage All Files

```powershell
# Add all files to staging
git add .

# Check what will be committed
git status
```

## Step 4: Commit Changes

```powershell
git commit -m "feat: complete InnovateX 2025 platform with fixes and documentation"
```

## Step 5: Add Remote Repository

Replace `YOUR_USERNAME` with your GitHub username:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/innovatex-2025.git

# Verify remote was added
git remote -v
```

## Step 6: Push to GitHub

```powershell
# Push to main/master branch
git push -u origin master

# Or if using 'main' as default branch:
git branch -M main
git push -u origin main
```

## Step 7: Verify Upload

1. Go to https://github.com/YOUR_USERNAME/innovatex-2025
2. You should see all your files!

---

## Quick Command Sequence

Copy and paste these commands (replace YOUR_USERNAME):

```powershell
# Add and commit all files
git add .
git commit -m "feat: complete InnovateX 2025 platform with fixes and documentation"

# Add remote (REPLACE YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/innovatex-2025.git

# Push to GitHub
git push -u origin master
```

---

## If You Get Authentication Error

GitHub requires Personal Access Token (PAT) instead of password:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Classic"
3. Select scopes: `repo` (all sub-options)
4. Generate token and **COPY IT** (you won't see it again!)
5. When pushing, use token as password:
   - Username: your GitHub username
   - Password: paste the token

---

## Alternative: Use GitHub Desktop (Easier)

1. Download GitHub Desktop: https://desktop.github.com
2. Install and sign in
3. Click "Add" → "Add existing repository"
4. Select `c:\Users\shlok\tarkash`
5. Click "Publish repository"
6. Done! ✅

---

## What Gets Pushed

✅ All source code (apps/api, apps/web)
✅ Docker configuration
✅ Documentation (7 markdown files)
✅ Scripts (.bat files)
✅ Configuration files

❌ NOT pushed (in .gitignore):
- node_modules/
- .env (secrets)
- dist/
- .next/

---

## After Pushing

### Enable GitHub Codespaces

1. Go to your repository
2. Click green "Code" button
3. Click "Codespaces" tab
4. Click "Create codespace on master"
5. Wait 2-3 minutes for environment setup
6. In terminal: `docker-compose -f infra/docker/docker-compose.yml up -d`
7. Platform runs perfectly in cloud! ✅

### Or Enable GitHub Actions

CI/CD workflows are already configured in `.github/workflows/`:
- `ci.yml` - Runs tests on every push
- `deploy.yml` - Deploys to production

---

## Troubleshooting

### "fatal: remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/innovatex-2025.git
```

### "Permission denied"
Use Personal Access Token as password (see above)

### "Repository not found"
Make sure you created the repository on GitHub first

### Large files warning
```powershell
# If needed, add to .gitignore:
echo "*.log" >> .gitignore
echo ".pnpm-store/" >> .gitignore
git rm -r --cached apps/api/.pnpm-store
```

---

## Next Steps After Push

1. ✅ Repository is on GitHub
2. 🚀 Open in Codespaces (works perfectly!)
3. 🔄 Enable GitHub Actions for CI/CD
4. 📝 Update repository description and topics
5. 🔒 Review security settings (keep private)
6. 👥 Invite collaborators if team project

---

**Ready to push?** Run the commands above! 🚀
