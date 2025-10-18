# Linux VPS Quick Fixes

## 🔧 Fix 1: Redis Port Conflict

Something is already running on port 6379. Let's check and fix:

```bash
# Check what's using port 6379
sudo lsof -i :6379

# If it's another Redis, stop it
sudo systemctl stop redis
sudo systemctl disable redis

# OR kill the process
sudo kill -9 $(sudo lsof -t -i:6379)

# Now start Redis container
docker compose -f infra/docker/docker-compose.yml up -d redis
```

## 🔧 Fix 2: Create packages Directory

The monorepo structure is missing the `packages` directory:

```bash
# Create packages directory with placeholder
mkdir -p packages
echo '{}' > packages/package.json

# Now Docker build will work
docker compose -f infra/docker/docker-compose.yml up -d --build
```

## 🔧 Fix 3: Fix Seed Data (Optional)

The seed SQL has schema mismatches, but you have 4 users already! You can skip this or fix it:

```bash
# Check current users
docker exec innovatex-postgres psql -U postgres -d innovatex -c "SELECT email, role FROM users;"
```

You should see:
- admin@innovatex2025.edu (ADMIN)
- judge1@innovatex2025.edu (JUDGE)
- judge2@innovatex2025.edu (JUDGE)
- judge3@innovatex2025.edu (JUDGE)

**These are enough to login and test!**

## ✅ Complete Fix Commands (Copy & Paste)

```bash
# Stop everything
docker compose -f infra/docker/docker-compose.yml down

# Kill Redis port conflict
sudo kill -9 $(sudo lsof -t -i:6379) 2>/dev/null || true

# Create packages directory
mkdir -p packages
echo '{}' > packages/package.json

# Restart all services
docker compose -f infra/docker/docker-compose.yml up -d

# Wait 15 seconds
sleep 15

# Check status
docker compose -f infra/docker/docker-compose.yml ps

# View logs
docker compose -f infra/docker/docker-compose.yml logs -f
```

## 🎯 Expected Result

You should see **5 services running**:
```
innovatex-postgres   Up (healthy)
innovatex-redis      Up (healthy)
innovatex-minio      Up (healthy)
innovatex-api        Up
innovatex-web        Up
```

## 🌐 Access Your Platform

### Test API Health
```bash
curl http://localhost:4000/api/health
```

### Test Frontend (if running)
```bash
curl -I http://localhost:3000
```

### Check Logs
```bash
# All logs
docker compose -f infra/docker/docker-compose.yml logs -f

# API only
docker compose -f infra/docker/docker-compose.yml logs -f api

# Web only
docker compose -f infra/docker/docker-compose.yml logs -f web
```

## 🔐 Login to Test

**Admin**: `admin@innovatex2025.edu` / `Admin123!`

**Judges**:
- `judge1@innovatex2025.edu` / `Admin123!`
- `judge2@innovatex2025.edu` / `Admin123!`
- `judge3@innovatex2025.edu` / `Admin123!`

## 🚨 If API/Web Still Don't Start

Run manually to see detailed errors:

```bash
# Terminal 1 - API
cd ~/tarkash/apps/api
pnpm dev

# Terminal 2 - Web (open new SSH session)
cd ~/tarkash/apps/web
pnpm dev
```

## 📊 Troubleshooting Commands

```bash
# Check all container logs
docker compose -f infra/docker/docker-compose.yml logs

# Check specific service
docker compose -f infra/docker/docker-compose.yml logs api
docker compose -f infra/docker/docker-compose.yml logs web

# Restart a service
docker compose -f infra/docker/docker-compose.yml restart api
docker compose -f infra/docker/docker-compose.yml restart web

# Rebuild containers
docker compose -f infra/docker/docker-compose.yml up -d --build

# Check disk space
df -h

# Check memory
free -h

# Check Docker resources
docker stats
```
