@echo off
echo ========================================
echo      QWIZZ SIMPLE STARTUP SCRIPT
echo ========================================
echo.

:: Start Eureka Server
start "Eureka Server" cmd /c "cd backend\eureka-server && mvn spring-boot:run"

:: Start API Gateway
start "API Gateway" cmd /c "cd backend\api-gateway && mvn spring-boot:run"

:: Start User Service
start "User Service" cmd /c "cd backend\user-service && mvn spring-boot:run"

:: Start Question Bank Service
start "Question Bank Service" cmd /c "cd backend\question-bank-service && mvn spring-boot:run"

:: Start Result Service
start "Result Service" cmd /c "cd backend\result-service && mvn spring-boot:run"

:: Start Analytics Service
start "Analytics Service" cmd /c "cd backend\analytics-service && mvn spring-boot:run"

:: Start Frontend
start "QWIZZ Frontend" cmd /c "cd frontend && npm start"

echo.
echo ========================================
echo      🚀 QWIZZ APPLICATION STARTED! 🚀
echo ========================================
echo.
pause
