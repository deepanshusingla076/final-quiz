@echo off
echo =========================================
echo Starting Online Quiz Application...
echo =========================================
echo.
echo Starting services in correct order:
echo 1. Eureka Server (Service Discovery)
echo 2. API Gateway
echo 3. Individual Services
echo 4. Frontend
echo.

:: Start Eureka Server (Must be first)
echo [1/4] Starting Eureka Server on port 8761...
start "Eureka Server" cmd /k "cd backend\eureka-server && mvn spring-boot:run"
echo Waiting for Eureka Server to start...
timeout /t 10 /nobreak >nul

:: Start API Gateway
echo [2/4] Starting API Gateway on port 8080...
start "API Gateway" cmd /k "cd backend\api-gateway && mvn spring-boot:run"
echo Waiting for API Gateway to start...
timeout /t 8 /nobreak >nul

:: Start Individual Services
echo [3/4] Starting Individual Services...

echo Starting User Service on port 8083...
start "User Service" cmd /k "cd backend\user-service && mvn spring-boot:run"
timeout /t 3 /nobreak >nul

echo Starting Question Bank Service on port 8081...
start "Question Bank Service" cmd /k "cd backend\question-bank-service && mvn spring-boot:run"
timeout /t 3 /nobreak >nul

echo Starting Result Service on port 8082...
start "Result Service" cmd /k "cd backend\result-service && mvn spring-boot:run"
timeout /t 3 /nobreak >nul

echo Starting Analytics Service on port 8084...
start "Analytics Service" cmd /k "cd backend\analytics-service && mvn spring-boot:run"
timeout /t 3 /nobreak >nul

:: Start Frontend React App
echo [4/4] Starting React Frontend on port 3000...
start "React Frontend" cmd /k "cd frontend && npm start"

echo.
echo =========================================
echo All services are starting in the background...
echo.
echo Service URLs:
echo - Frontend:        http://localhost:3000
echo - API Gateway:     http://localhost:8080
echo - Eureka Server:   http://localhost:8761
echo - User Service:    http://localhost:8083
echo - Question Bank:   http://localhost:8081
echo - Result Service:  http://localhost:8082
echo - Analytics:       http://localhost:8084
echo.
echo Eureka Dashboard: http://localhost:8761
echo.
echo Sample Credentials:
echo Teacher: teacher / Teacher@123
echo Student: student / Student@123
echo.
echo =========================================
echo Press any key to close this window...
echo Services will continue running in background terminals.
echo =========================================

pause >nul