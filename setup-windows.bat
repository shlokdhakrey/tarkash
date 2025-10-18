@echo off
echo ========================================
echo PostgreSQL Windows Installation Guide
echo ========================================
echo.
echo This platform requires PostgreSQL to run.
echo Windows Docker has compatibility issues.
echo.
echo ========================================
echo OPTION 1: Install PostgreSQL (RECOMMENDED)
echo ========================================
echo.
echo 1. Download PostgreSQL 15:
echo    https://www.postgresql.org/download/windows/
echo.
echo 2. Run installer with these settings:
echo    - Port: 5432
echo    - Username: postgres
echo    - Password: postgres (or your choice)
echo.
echo 3. After installation, run this script again
echo    and press '1' to setup database
echo.
echo ========================================
echo OPTION 2: Use WSL2 (ADVANCED)
echo ========================================
echo.
echo 1. Open PowerShell as Administrator
echo 2. Run: wsl --install
echo 3. Restart computer
echo 4. Open WSL2 and navigate to project
echo 5. Run: docker-compose up -d
echo.
echo ========================================
pause
echo.
choice /C 12 /N /M "Choose option (1=Setup DB, 2=Exit): "

if errorlevel 2 goto :END
if errorlevel 1 goto :SETUP

:SETUP
echo.
echo ========================================
echo Setting up InnovateX database...
echo ========================================
echo.

echo [1/4] Creating database...
psql -U postgres -c "CREATE DATABASE innovatex;" 2>nul
if errorlevel 1 (
    echo ERROR: Could not connect to PostgreSQL.
    echo Make sure PostgreSQL is installed and running.
    pause
    goto :END
)
echo Done!
echo.

echo [2/4] Running migrations...
cd /d "%~dp0apps\api"
call npx prisma migrate deploy
echo.

echo [3/4] Seeding database...
cd /d "%~dp0"
call npx tsx scripts/seed.ts
echo.

echo [4/4] Starting services...
echo.
echo ========================================
echo Database ready! Now start the servers:
echo ========================================
echo.
echo Terminal 1 (API):
echo   cd %~dp0apps\api
echo   npm run start:dev
echo.
echo Terminal 2 (Web):
echo   cd %~dp0apps\web
echo   npm run dev
echo.
echo Then access: http://localhost:3000
echo.

:END
pause
