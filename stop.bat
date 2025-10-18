@echo off
echo ========================================
echo InnovateX 2025 - Stopping Platform
echo ========================================
echo.

cd /d "%~dp0infra\docker"

echo Stopping all services...
docker-compose down

echo.
echo All services stopped.
echo.

pause
