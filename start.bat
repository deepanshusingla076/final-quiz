@echo off
color 0A
title QWIZZ Application Startup

echo.
echo =========================================
echo         🚀 QWIZZ STARTUP SCRIPT 🚀
echo =========================================
echo.

:: Check if .env file exists
if not exist ".env" (
    echo ❌ ERROR: .env file not found!
    echo.
    echo Please create .env file with your configuration:
    echo 1. Copy .env.example to .env
    echo 2. Set your DB_PASSWORD
    echo 3. Set your JWT_SECRET
    echo 4. Optionally set GEMINI_API_KEY
    echo.
    pause
    exit /b 1
)

:: Check if MySQL is running
echo 🔍 Checking prerequisites...
netstat -an | find "3306" >nul 2>&1
if errorlevel 1 (
    echo ⚠️  WARNING: MySQL not detected on port 3306
    echo Please ensure MySQL is running before continuing.
    echo.
    choice /c YN /m "Continue anyway? (Y/N)"
    if errorlevel 2 exit /b 1
)

:: Check if ports are free
echo 🔍 Checking if required ports are available...
netstat -an | find ":8761" >nul 2>&1
if not errorlevel 1 (
    echo ❌ Port 8761 ^(Eureka^) is already in use!
    pause
    exit /b 1
)

echo ✅ Prerequisites check complete!
echo.
echo 🚀 Starting QWIZZ services in proper order...
echo Please wait, this may take 2-3 minutes for full startup.
echo.

:: Start Eureka Server first (Service Discovery)
echo [1/7] 🟡 Starting Eureka Server (Service Discovery)...
start "🌟 QWIZZ - Eureka Server" cmd /c "cd backend\eureka-server && mvn spring-boot:run && pause"
echo    ⏳ Waiting for Eureka Server to initialize (30 seconds)...
timeout /t 30 /nobreak > nul
echo    ✅ Eureka Server should be starting...

:: Start API Gateway (needs Eureka to be up)
echo [2/7] 🟡 Starting API Gateway...
start "🚪 QWIZZ - API Gateway" cmd /c "cd backend\api-gateway && mvn spring-boot:run && pause"
echo    ⏳ Waiting for API Gateway to register (20 seconds)...
timeout /t 20 /nobreak > nul
echo    ✅ API Gateway should be starting...

:: Start User Service
echo [3/7] 🟡 Starting User Service...
start "👤 QWIZZ - User Service" cmd /c "cd backend\user-service && mvn spring-boot:run && pause"
echo    ⏳ Waiting for User Service to register (15 seconds)...
timeout /t 15 /nobreak > nul
echo    ✅ User Service should be starting...

:: Start Question Bank Service
echo [4/7] 🟡 Starting Question Bank Service...
start "❓ QWIZZ - Question Bank Service" cmd /c "cd backend\question-bank-service && mvn spring-boot:run && pause"
echo    ⏳ Waiting for Question Bank Service (10 seconds)...
timeout /t 10 /nobreak > nul
echo    ✅ Question Bank Service should be starting...

:: Start Result Service
echo [5/7] 🟡 Starting Result Service...
start "📊 QWIZZ - Result Service" cmd /c "cd backend\result-service && mvn spring-boot:run && pause"
echo    ⏳ Waiting for Result Service (10 seconds)...
timeout /t 10 /nobreak > nul
echo    ✅ Result Service should be starting...

:: Start Analytics Service
echo [6/7] 🟡 Starting Analytics Service...
start "📈 QWIZZ - Analytics Service" cmd /c "cd backend\analytics-service && mvn spring-boot:run && pause"
echo    ⏳ Waiting for Analytics Service (10 seconds)...
timeout /t 10 /nobreak > nul
echo    ✅ Analytics Service should be starting...

:: Install frontend dependencies if needed
if not exist "frontend\node_modules" (
    echo [7/7] 📦 Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

:: Start Frontend
echo [7/7] 🟡 Starting Frontend Application...
start "💻 QWIZZ - Frontend" cmd /c "cd frontend && npm start && pause"

echo.
echo =========================================
echo      🎉 QWIZZ APPLICATION STARTED! 🎉
echo =========================================
echo.
echo ⏳ Services are initializing, please wait 2-3 minutes...
echo.
echo 🌐 ACCESS YOUR APPLICATION:
echo    Frontend:  http://localhost:3000
echo    API:       http://localhost:8080
echo    Eureka:    http://localhost:8761
echo.
echo 📝 FIRST TIME SETUP:
echo    1. Go to http://localhost:3000
echo    2. Click "Sign Up" to create your account
echo    3. Choose TEACHER role to create quizzes
echo    4. Choose STUDENT role to take quizzes
echo.
echo 🛑 TO STOP ALL SERVICES: Run stop.bat
echo.
timeout /t 10 /nobreak > nul
echo Opening application in your default browser...
start http://localhost:3000

echo.
echo ✅ Startup complete! Check your browser.
pause
