# ⚠️ Windows Docker Limitations - IMPORTANT

## Issue Encountered

When running `start.bat`, Docker build fails with:
```
failed to solve: error from sender: open C:\Users\shlok\tarkash\apps\api\node_modules\.pnpm\@angular-devkit+schematics@17.3.11_chokidar@3.6.0\node_modules\ora: The file cannot be accessed by the system.
```

## Root Cause

**Windows Docker Desktop has known issues with:**
1. Copying large `node_modules` folders (247MB+)
2. Long file paths in pnpm virtual store
3. File permission mismatches between Windows and Linux containers
4. Symlinks in node_modules not properly translated

This is a **Windows + Docker + node_modules** compatibility issue, not a code problem.

## ✅ Solutions (Choose One)

### Solution 1: Run Infrastructure in Docker, Apps on Host (RECOMMENDED)

This works because:
- ✅ Database/Redis/MinIO run in Docker (no file access needed)
- ✅ API/Web run on Windows host (direct node_modules access)
- ❌ BUT: Host can't connect to Docker PostgreSQL (separate Windows issue)

**Verdict:** Still blocked by PostgreSQL authentication issue

### Solution 2: Use WSL2 (Windows Subsystem for Linux) ⭐ BEST

1. Install WSL2:
   ```powershell
   wsl --install
   ```

2. Inside WSL2:
   ```bash
   cd /mnt/c/Users/shlok/tarkash
   docker-compose -f infra/docker/docker-compose.yml up -d
   ```

**Benefits:**
- ✅ Native Linux environment
- ✅ Proper file permissions
- ✅ No node_modules issues
- ✅ PostgreSQL connections work

### Solution 3: Build Excluding node_modules (PARTIAL FIX)

The `.dockerignore` file was added, but Docker still tries to copy context.

**What was added:**
```
# .dockerignore
node_modules
.pnpm-store
dist
.next
```

**Issue:** Docker needs to copy source files, which triggers the scan of parent directories containing node_modules.

### Solution 4: Use Docker Compose Build Context (ADVANCED)

Modify `docker-compose.yml` to exclude node_modules at build time:

```yaml
api:
  build:
    context: ../../
    dockerfile: infra/docker/Dockerfile.api
    args:
      - NO_CACHE=1
```

Then update Dockerfile to install in container.

### Solution 5: Run Without Docker (SIMPLEST) ⭐ IMMEDIATE

Just run everything on host:

```powershell
# Terminal 1 - PostgreSQL (use Docker)
cd infra\docker
docker-compose up -d postgres redis minio

# Terminal 2 - API
cd apps\api
# Edit .env: DATABASE_URL="postgresql://postgres@host.docker.internal:5432/innovatex"
npm run start:dev

# Terminal 3 - Web
cd apps\web
npm run dev
```

**Issue:** Host still can't connect to Docker PostgreSQL (Windows networking)

## 🎯 Recommended Path Forward

### Option A: Use WSL2 (Production-Like Environment)
1. Install WSL2
2. Clone project in WSL2 filesystem
3. Run everything from WSL2
4. Access via Windows browser

### Option B: Native PostgreSQL on Windows
1. Install PostgreSQL on Windows
2. Run Redis/MinIO in Docker
3. Run API/Web on host
4. All connections work natively

### Option C: Cloud Development Environment
1. Use GitHub Codespaces
2. Use Gitpod
3. Use cloud VM (AWS, DigitalOcean, etc.)

## 🔧 Immediate Workaround

Since you need it working NOW:

1. **Keep infrastructure running:**
   ```powershell
   cd infra\docker
   docker-compose up -d postgres redis minio
   ```

2. **Install PostgreSQL on Windows:**
   - Download: https://www.postgresql.org/download/windows/
   - Install with default settings
   - Create database: `innovatex`

3. **Update `.env` files:**
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/innovatex"
   ```

4. **Run migrations:**
   ```powershell
   cd apps\api
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

5. **Start services:**
   ```powershell
   # Terminal 1
   cd apps\api
   npm run start:dev

   # Terminal 2
   cd apps\web
   npm run dev
   ```

6. **Access:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000

## 📊 Issue Comparison

| Approach | Docker Build | DB Connection | Complexity | Works Now? |
|----------|--------------|---------------|------------|------------|
| Full Docker | ❌ Failed | ❌ Failed | Low | ❌ No |
| WSL2 | ✅ Works | ✅ Works | Medium | ⏳ After setup |
| Native PG | ✅ N/A | ✅ Works | Low | ✅ Yes |
| Cloud Dev | ✅ Works | ✅ Works | High | ⏳ After setup |

## 🐛 Known Windows + Docker Issues

This affects:
1. **pnpm workspaces** - Virtual store with deep paths
2. **Angular DevKit** - Long nested dependencies
3. **Prisma** - Binary files and node_modules structure
4. **Next.js** - `.next` build artifacts

## ✅ What Works

- ✅ Infrastructure containers (postgres, redis, minio)
- ✅ Database schema and seed data
- ✅ Code compilation outside Docker
- ✅ WSL2 environment
- ✅ Native Windows PostgreSQL

## ❌ What Doesn't Work

- ❌ Building API/Web containers on Windows Docker Desktop
- ❌ Connecting from Windows host to Docker PostgreSQL
- ❌ Copying node_modules to Docker container

## 📝 Status Update

**Current State:**
- Infrastructure: ✅ Running (postgres, redis, minio)
- Database: ✅ Schema created, data seeded
- API Build: ❌ Docker build fails on Windows
- Connection: ❌ Host can't reach Docker PostgreSQL

**Recommendation:**
Install PostgreSQL natively on Windows as immediate fix, or use WSL2 for proper setup.

---

**Updated:** October 18, 2025  
**Issue:** Windows Docker Desktop + node_modules incompatibility  
**Severity:** Blocker for Docker deployment  
**Workaround:** Use WSL2 or native PostgreSQL
