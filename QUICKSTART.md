# 🚀 Quick Start Guide - InnovateX 2025

This guide will help you get the InnovateX 2025 platform running on your local machine in under 10 minutes.

---

## ✅ Prerequisites

Ensure you have these installed:

- [x] **Node.js 20+** ([Download](https://nodejs.org/))
- [x] **pnpm 8+** (Installed ✅)
- [ ] **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop)) **⚠️ REQUIRED**
- [x] **Git** (Installed ✅)

---

## 🎯 5-Step Setup

### Step 1: Install Docker Desktop

**Windows:**
1. Download from https://www.docker.com/products/docker-desktop
2. Run installer
3. Restart computer
4. Start Docker Desktop
5. Verify: `docker --version`

**After Docker is installed, continue below:**

---

### Step 2: Start Infrastructure Services

```bash
# Navigate to project root
cd c:\Users\shlok\tarkash

# Start PostgreSQL, Redis, MinIO
docker-compose -f infra/docker/docker-compose.yml up -d postgres redis minio

# Verify services are running
docker-compose -f infra/docker/docker-compose.yml ps
```

Expected output:
```
NAME                    STATUS
innovatex-postgres      Up
innovatex-redis         Up
innovatex-minio         Up
```

---

### Step 3: Setup Database

```bash
# Run migrations (creates tables)
cd apps\api
npx prisma migrate dev --name init

# Seed database with demo data
cd ..\..
pnpm seed
```

You should see:
```
✅ Created admin: admin@innovatex2025.edu
✅ Created 3 judges
✅ Created 6 teams
...
🎉 Database seeding completed successfully!
```

---

### Step 4: Start Development Servers

**Open TWO terminal windows:**

**Terminal 1 - Backend API:**
```bash
cd apps\api
pnpm dev
```

Wait for:
```
🚀 InnovateX 2025 API Server Started!
🌐 Server: http://localhost:4000
📚 API Docs: http://localhost:4000/api/docs
```

**Terminal 2 - Frontend:**
```bash
cd apps\web
pnpm dev
```

Wait for:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
✓ Ready in 2.5s
```

---

### Step 5: Verify & Explore

**Open these in your browser:**

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | N/A |
| **Backend API** | http://localhost:4000/api/health | N/A |
| **API Docs** | http://localhost:4000/api/docs | N/A |
| **MinIO Console** | http://localhost:9001 | minioadmin / minioadmin |
| **Prisma Studio** | Run `pnpm prisma:studio` | N/A |

**Test Admin Login:**
- Email: `admin@innovatex2025.edu`
- Password: `Admin123!`

⚠️ **Change this password before production!**

---

## 🎨 What You Can Do Now

✅ View the landing page at http://localhost:3000  
✅ Explore API endpoints at http://localhost:4000/api/docs  
✅ Check database with Prisma Studio: `pnpm prisma:studio`  
✅ View demo data (teams, judges, submissions)  
✅ Test health check: http://localhost:4000/api/health  

---

## 🔧 Common Commands

```bash
# View all running containers
docker ps

# View logs
docker-compose -f infra/docker/docker-compose.yml logs -f

# Stop all services
docker-compose -f infra/docker/docker-compose.yml down

# Restart services
docker-compose -f infra/docker/docker-compose.yml restart

# View database in GUI
pnpm prisma:studio

# Reset database (careful!)
pnpm --filter api prisma migrate reset

# Re-seed database
pnpm seed
```

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to database"
**Solution:** Ensure Docker is running and PostgreSQL container is up
```bash
docker ps
docker-compose -f infra/docker/docker-compose.yml up -d postgres
```

### Issue: "Port 3000 already in use"
**Solution:** Kill process or change port in .env
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: "Prisma Client not generated"
**Solution:** Regenerate Prisma Client
```bash
pnpm prisma:generate
```

### Issue: "Module not found"
**Solution:** Reinstall dependencies
```bash
pnpm install
```

---

## 📁 Project Structure

```
innovatex-2025/
├── apps/
│   ├── web/              → Frontend (Next.js)
│   └── api/              → Backend (NestJS)
├── infra/docker/         → Docker configs
├── scripts/              → Build scripts
├── docs/                 → Documentation
├── .env                  → Your environment (gitignored)
└── pnpm-workspace.yaml   → Workspace config
```

---

## 🎯 Next Steps

1. **Explore the codebase**
   - Check `apps/api/src/modules/` for backend modules
   - Check `apps/web/src/app/` for frontend pages

2. **Read the documentation**
   - `README.md` - Full overview
   - `docs/SECRETS.md` - Security guide
   - `deploy_report.md` - Detailed report

3. **Start developing**
   - Implement authentication endpoints
   - Build team registration forms
   - Create admin dashboard

---

## 🆘 Need Help?

- **Documentation:** Check `/docs` folder
- **API Reference:** http://localhost:4000/api/docs
- **Database Schema:** `apps/api/prisma/schema.prisma`
- **Deployment Report:** `deploy_report.md`

---

## ✅ Success Checklist

After completing setup:

- [ ] Docker Desktop installed and running
- [ ] All services started (postgres, redis, minio)
- [ ] Database migrated successfully
- [ ] Database seeded with demo data
- [ ] Backend running on :4000
- [ ] Frontend running on :3000
- [ ] API docs accessible at :4000/api/docs
- [ ] Can view demo teams in Prisma Studio

---

**🎉 Congratulations! Your InnovateX 2025 platform is now running locally!**

Happy coding! 🚀
