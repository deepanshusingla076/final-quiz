@echo off
echo =========================================
echo         QWIZZ STARTUP SCRIPT
echo =========================================
echo.
echo Starting services in proper order...
echo.

:: Start Eureka Server first (Service Discovery)
echo [1/7] Starting Eureka Server (Service Discovery)...
start "Eureka Server" cmd /c "cd backend\eureka-server && mvn spring-boot:run"
echo Waiting for Eureka Server to start completely...
timeout /t 30 /nobreak > nul

:: Start API Gateway (needs Eureka to be up)
echo [2/7] Starting API Gateway...
start "API Gateway" cmd /c "cd backend\api-gateway && mvn spring-boot:run"
echo Waiting for API Gateway to register with Eureka...
timeout /t 20 /nobreak > nul

:: Start User Service
echo [3/7] Starting User Service...
start "User Service" cmd /c "cd backend\user-service && mvn spring-boot:run"
echo Waiting for User Service to register with Eureka...
timeout /t 15 /nobreak > nul

:: Start Question Bank Service
echo [4/7] Starting Question Bank Service...
start "Question Bank Service" cmd /c "cd backend\question-bank-service && mvn spring-boot:run"
echo Waiting for Question Bank Service to start...
timeout /t 10 /nobreak > nul

:: Start Result Service
echo [5/7] Starting Result Service...
start "Result Service" cmd /c "cd backend\result-service && mvn spring-boot:run"
echo Waiting for Result Service to start...
timeout /t 10 /nobreak > nul

:: Start Analytics Service
echo [6/7] Starting Analytics Service...
start "Analytics Service" cmd /c "cd backend\analytics-service && mvn spring-boot:run"
echo Waiting for Analytics Service to start...
timeout /t 10 /nobreak > nul

:: Start Frontend
echo [7/7] Starting Frontend...
start "QWIZZ Frontend" cmd /c "cd frontend && npm start"

echo.
echo ========================================
echo      🚀 QWIZZ APPLICATION STARTED! 🚀
echo ========================================
echo.
echo Services are starting up...
echo Please wait for all services to fully initialize.
echo.
echo Access the application at: http://localhost:3000
echo Eureka Dashboard: http://localhost:8761
echo API Gateway: http://localhost:8080
echo.
pause
