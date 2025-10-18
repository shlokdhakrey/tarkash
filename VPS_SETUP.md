# InnovateX 2025 - Linux VPS Setup Guide

## ✅ Current Status
You've successfully cloned the repository to your Linux VPS! Now let's get everything running.

## 📋 Prerequisites Installation

### Step 1: Install Node.js 20 LTS
```bash
# Update package list
sudo apt update

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

### Step 2: Install pnpm
```bash
# Install pnpm globally
npm install -g pnpm

# Verify installation
pnpm --version  # Should show 8.15.9 or higher
```

### Step 3: Install Docker & Docker Compose
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add current user to docker group (avoid sudo)
sudo usermod -aG docker $USER

# Apply group changes (or logout/login)
newgrp docker

# Verify Docker installation
docker --version
docker compose version
```

## 🚀 Project Setup

### Step 4: Install Dependencies
```bash
# You're already in ~/tarkash directory
cd ~/tarkash

# Install all project dependencies
pnpm install
```
**⏱️ This will take 2-3 minutes**

### Step 5: Start Infrastructure Services
```bash
# Start PostgreSQL, Redis, and MinIO
docker compose -f infra/docker/docker-compose.yml up -d postgres redis minio

# Wait 10 seconds for services to be ready
sleep 10

# Check services are running
docker compose -f infra/docker/docker-compose.yml ps
```

You should see:
- ✅ `innovatex-postgres` - healthy
- ✅ `innovatex-redis` - healthy
- ✅ `innovatex-minio` - healthy

### Step 6: Setup Database Schema
```bash
# Generate Prisma Client
cd apps/api
npx prisma generate

# Run database migrations
npx prisma db push

# Seed the database with initial data
docker exec -i innovatex-postgres psql -U postgres -d innovatex < seed-authless.sql
```

### Step 7: Start Application Services

#### Option A: Start with Docker Compose (Recommended)
```bash
# Go back to project root
cd ~/tarkash

# Start all services (API + Web + Infrastructure)
docker compose -f infra/docker/docker-compose.yml up -d

# Check all services
docker compose -f infra/docker/docker-compose.yml ps
```

You should now see **5 services running**:
- ✅ `innovatex-postgres` - Port 5432
- ✅ `innovatex-redis` - Port 6379
- ✅ `innovatex-minio` - Port 9000, 9001
- ✅ `innovatex-api` - Port 4000
- ✅ `innovatex-web` - Port 3000

#### Option B: Start Manually (Development)
```bash
# Terminal 1 - Start API
cd ~/tarkash/apps/api
pnpm dev

# Terminal 2 - Start Web (in another SSH session)
cd ~/tarkash/apps/web
pnpm dev
```

## 🔍 Verify Everything Works

### Check API Health
```bash
curl http://localhost:4000/api/health
```
Should return: `{"status":"ok","timestamp":"..."}`

### Check Database
```bash
docker exec innovatex-postgres psql -U postgres -d innovatex -c "SELECT COUNT(*) FROM users;"
```
Should return: `count: 4` (1 admin + 3 judges)

### Check All Services
```bash
docker compose -f infra/docker/docker-compose.yml logs --tail=50
```

## 🌐 Access Your Application

### Local Access (from VPS)
- **Frontend**: http://localhost:3000
- **API**: http://localhost:4000
- **API Docs**: http://localhost:4000/api
- **MinIO Console**: http://localhost:9001

### Remote Access (from your computer)

#### Option 1: SSH Tunnel (Quick Test)
```bash
# Run this on YOUR LOCAL MACHINE (not VPS)
ssh -L 3000:localhost:3000 -L 4000:localhost:4000 root@YOUR_VPS_IP
```
Then access:
- Frontend: http://localhost:3000
- API: http://localhost:4000

#### Option 2: Configure Firewall (Production)
```bash
# Open ports on VPS
sudo ufw allow 3000/tcp  # Frontend
sudo ufw allow 4000/tcp  # API
sudo ufw allow 22/tcp    # SSH (if not already open)
sudo ufw enable

# Check firewall status
sudo ufw status
```

Then access via VPS IP:
- Frontend: http://YOUR_VPS_IP:3000
- API: http://YOUR_VPS_IP:4000

#### Option 3: Setup Nginx Reverse Proxy (Best for Production)
```bash
# Install Nginx
sudo apt install -y nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/innovatex
```

**Nginx Configuration** (paste this):
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API
    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/innovatex /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

Now access via: http://YOUR_VPS_IP

## 🔐 Default Login Credentials

**Admin Account:**
- Email: `admin@innovatex2025.edu`
- Password: `Admin123!`

**Judge Accounts:**
- `judge-001@innovatex2025.edu` / `Admin123!`
- `judge-002@innovatex2025.edu` / `Admin123!`
- `judge-003@innovatex2025.edu` / `Admin123!`

## 📊 Useful Commands

### View Logs
```bash
# All services
docker compose -f infra/docker/docker-compose.yml logs -f

# Specific service
docker compose -f infra/docker/docker-compose.yml logs -f api
docker compose -f infra/docker/docker-compose.yml logs -f web
```

### Restart Services
```bash
# Restart all
docker compose -f infra/docker/docker-compose.yml restart

# Restart specific service
docker compose -f infra/docker/docker-compose.yml restart api
```

### Stop Services
```bash
# Stop all services
docker compose -f infra/docker/docker-compose.yml down

# Stop and remove volumes (CAUTION: Deletes database!)
docker compose -f infra/docker/docker-compose.yml down -v
```

### Database Access
```bash
# Connect to PostgreSQL
docker exec -it innovatex-postgres psql -U postgres -d innovatex

# Common queries
\dt                          # List tables
SELECT * FROM users;         # View users
SELECT * FROM submissions;   # View submissions
\q                          # Quit
```

### Update Code
```bash
# Pull latest changes
git pull origin master

# Reinstall dependencies (if package.json changed)
pnpm install

# Rebuild and restart
docker compose -f infra/docker/docker-compose.yml up -d --build
```

## 🛠️ Troubleshooting

### Issue: Port already in use
```bash
# Find process using port
sudo lsof -i :3000
sudo lsof -i :4000

# Kill process
sudo kill -9 <PID>
```

### Issue: Docker permission denied
```bash
# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Or use sudo
sudo docker compose -f infra/docker/docker-compose.yml up -d
```

### Issue: Database connection failed
```bash
# Check if PostgreSQL is running
docker compose -f infra/docker/docker-compose.yml ps postgres

# Check logs
docker compose -f infra/docker/docker-compose.yml logs postgres

# Restart PostgreSQL
docker compose -f infra/docker/docker-compose.yml restart postgres
```

### Issue: Out of disk space
```bash
# Check disk usage
df -h

# Clean Docker
docker system prune -a
```

## 🎯 Next Steps

1. **Change Default Passwords** (IMPORTANT for production!)
2. **Configure Environment Variables** in `.env` files
3. **Setup SSL Certificate** (Let's Encrypt with Certbot)
4. **Configure Domain Name** (if you have one)
5. **Setup Monitoring** (PM2, Prometheus, Grafana)
6. **Configure Backups** (Database, Files)
7. **Setup CI/CD** (GitHub Actions already configured!)

## 🔒 Production Security Checklist

- [ ] Change all default passwords
- [ ] Update DATABASE_URL with strong password
- [ ] Configure JWT_SECRET and JWT_REFRESH_SECRET
- [ ] Enable HTTPS (SSL/TLS)
- [ ] Configure CORS properly
- [ ] Setup firewall rules
- [ ] Enable Docker security features
- [ ] Regular security updates (`apt update && apt upgrade`)
- [ ] Setup automated backups
- [ ] Configure rate limiting
- [ ] Enable audit logging

## 📚 Additional Resources

- **API Documentation**: http://YOUR_VPS_IP:4000/api
- **GitHub Repository**: https://github.com/shlokdhakrey/tarkash
- **Prisma Studio**: `npx prisma studio` (Port 5555)
- **Docker Docs**: https://docs.docker.com
- **NestJS Docs**: https://docs.nestjs.com
- **Next.js Docs**: https://nextjs.org/docs

---

**Need Help?** Check the other documentation files:
- `README.md` - Project overview
- `COMPLETE_STATUS.md` - Full feature list
- `START_HERE.md` - Quick start guide
- `WINDOWS_DOCKER_ISSUE.md` - Why Windows didn't work

**Your platform is ready to revolutionize hackathon management! 🚀**
