# Quick VPS Fix - pnpm Lockfile Issue

The Docker build is failing because the pnpm lockfile was created with a different version.

## 🔧 Quick Fix Commands

Run these on your VPS:

```bash
# Option 1: Regenerate lockfile locally (RECOMMENDED)
cd ~/tarkash

# Update pnpm lockfile
pnpm install

# Commit changes
git add pnpm-lock.yaml
git commit -m "fix: regenerate pnpm lockfile for Linux compatibility"
git push origin master

# Now rebuild
docker compose -f infra/docker/docker-compose.yml up -d --build
```

## OR

```bash
# Option 2: Run without Docker (FASTER - for now)
cd ~/tarkash

# Install dependencies locally
pnpm install

# Start infrastructure only
docker compose -f infra/docker/docker-compose.yml up -d postgres redis minio

# Start API manually
cd apps/api
pnpm dev &

# Start Web manually
cd ../web
pnpm dev &

# Check processes
ps aux | grep node
```

## OR

```bash
# Option 3: Modify Dockerfile to use --force (QUICK FIX)
# This rebuilds the lockfile during Docker build

# We'll update the Dockerfiles to use --force flag
```

Let me create the third option for you - it's the fastest!
