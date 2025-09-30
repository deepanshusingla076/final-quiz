@echo off

echo =========================================
echo         QWIZZ SHUTDOWN SCRIPT
echo =========================================
echo.
echo Stopping all QWIZZ services...
echo.

:: Stop all Java Spring Boot services by killing their windows
for %%T in ("Eureka Server","API Gateway","User Service","Question Bank Service","Result Service","Analytics Service") do (
    taskkill /FI "WINDOWTITLE eq %%T*" /T /F >nul 2>&1
    echo Stopped %%T (if running)
)

:: Stop Frontend (React)
taskkill /FI "WINDOWTITLE eq QWIZZ Frontend*" /T /F >nul 2>&1
echo Stopped QWIZZ Frontend (if running)

echo.
echo =========================================
echo      🛑 QWIZZ APPLICATION STOPPED 🛑
echo =========================================
echo.
pause
