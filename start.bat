@echo off
echo ========================================
echo InnovateX 2025 - Platform Startup
echo ========================================
echo.

cd /d "%~dp0infra\docker"

echo [1/3] Stopping any existing containers...
docker-compose down
echo.

echo [2/3] Starting all services...
docker-compose up -d
echo.

echo [3/3] Waiting for services to be healthy...
timeout /t 15 /nobreak >nul
echo.

echo ========================================
echo Platform Status:
echo ========================================
docker-compose ps
echo.

echo ========================================
echo Access URLs:
echo ========================================
echo Frontend:    http://localhost:3000
echo Backend API:  http://localhost:4000
echo API Docs:     http://localhost:4000/api/docs
echo Health Check: http://localhost:4000/api/health
echo MinIO Console: http://localhost:9001
echo.
echo ========================================
echo Login Credentials (password: Admin123!):
echo ========================================
echo Admin:   admin@innovatex2025.edu
echo Judge 1: judge1@innovatex2025.edu
echo Judge 2: judge2@innovatex2025.edu
echo Judge 3: judge3@innovatex2025.edu
echo.
echo ========================================
echo View Logs:
echo ========================================
echo   docker-compose -f infra\docker\docker-compose.yml logs -f
echo.
echo Press any key to view live logs...
pause >nul

docker-compose logs -f
