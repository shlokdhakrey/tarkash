@echo off
echo ========================================
echo InnovateX 2025 - Infrastructure Only
echo ========================================
echo.

cd /d "%~dp0infra\docker"

echo [1/2] Starting infrastructure services...
docker-compose up -d postgres redis minio
echo.

echo [2/2] Waiting for services to be healthy...
timeout /t 15 /nobreak >nul
echo.

echo ========================================
echo Infrastructure Status:
echo ========================================
docker-compose ps
echo.

echo ========================================
echo Services Running:
echo ========================================
echo PostgreSQL: localhost:5432 (user: postgres, no password)
echo Redis:      localhost:6379
echo MinIO:      localhost:9000-9001
echo.

echo ========================================
echo Database Status:
echo ========================================
docker exec innovatex-postgres psql -U postgres -d innovatex -c "SELECT 'Database: ' || current_database() || ', Tables: ' || count(*) FROM information_schema.tables WHERE table_schema = 'public';"
echo.

echo ========================================
echo IMPORTANT: Cannot run API/Web from Docker
echo due to node_modules file access issues.
echo ========================================
echo.
echo To start the API manually:
echo   1. Open new terminal
echo   2. cd c:\Users\shlok\tarkash\apps\api
echo   3. Set DATABASE_URL=postgresql://postgres@host.docker.internal:5432/innovatex
echo   4. npm run start:dev
echo.
echo To start the Web manually:
echo   1. Open new terminal  
echo   2. cd c:\Users\shlok\tarkash\apps\web
echo   3. npm run dev
echo.
echo ========================================
echo Alternative: Use WSL2 or Linux
echo ========================================
echo Windows Docker Desktop + node_modules
echo have compatibility issues. For best
echo experience, use WSL2 or native Linux.
echo.

pause
