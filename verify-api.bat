@echo off
setlocal EnableDelayedExpansion
title QWIZZ - API Verification Script
color 0A

echo.
echo ============================================
echo         🔍 QWIZZ API VERIFICATION 🔍
echo ============================================
echo.

set "GATEWAY_URL=http://localhost:8080/api"
set "ERROR_COUNT=0"

echo 📊 Testing API endpoints...

:: Test 1: Gateway Health Check
echo [1/8] 🏥 Gateway Health Check...
curl -s -w "%%{http_code}" "%GATEWAY_URL%/../actuator/health" > temp_response.txt 2>nul
set /p STATUS=<temp_response.txt
if "!STATUS!" == "200" (
    echo    ✅ Gateway: HEALTHY
) else (
    echo    ❌ Gateway: FAILED (Status: !STATUS!)
    set /a ERROR_COUNT+=1
)

:: Test 2: Auth Service Test
echo [2/8] 🔐 Auth Service Test...
curl -s -w "%%{http_code}" "%GATEWAY_URL%/auth/test" > temp_response.txt 2>nul
set /p STATUS=<temp_response.txt
if "!STATUS!" == "200" (
    echo    ✅ User Service: ACCESSIBLE
) else (
    echo    ❌ User Service: FAILED (Status: !STATUS!)
    set /a ERROR_COUNT+=1
)

:: Test 3: Register Test User
echo [3/8] 👤 Testing User Registration...
curl -s -w "%%{http_code}" -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"TestPass123!\",\"firstName\":\"Test\",\"lastName\":\"User\",\"role\":\"STUDENT\"}" "%GATEWAY_URL%/auth/register" > temp_response.txt 2>nul
set /p REGISTER_RESPONSE=<temp_response.txt
echo !REGISTER_RESPONSE! | findstr "token" >nul
if !errorlevel! == 0 (
    echo    ✅ Registration: SUCCESS
    :: Extract token for further tests
    for /f "tokens=2 delims=:" %%a in ('echo !REGISTER_RESPONSE! ^| findstr token') do (
        set TOKEN=%%a
        set TOKEN=!TOKEN:"=!
        set TOKEN=!TOKEN:,=!
        set TOKEN=!TOKEN: =!
    )
) else (
    echo    ⚠️  Registration: User may already exist
    :: Try login instead
    curl -s -w "%%{http_code}" -H "Content-Type: application/json" -d "{\"usernameOrEmail\":\"testuser\",\"password\":\"TestPass123!\"}" "%GATEWAY_URL%/auth/login" > temp_response.txt 2>nul
    set /p LOGIN_RESPONSE=<temp_response.txt
    echo !LOGIN_RESPONSE! | findstr "token" >nul
    if !errorlevel! == 0 (
        echo    ✅ Login: SUCCESS
        for /f "tokens=2 delims=:" %%a in ('echo !LOGIN_RESPONSE! ^| findstr token') do (
            set TOKEN=%%a
            set TOKEN=!TOKEN:"=!
            set TOKEN=!TOKEN:,=!
            set TOKEN=!TOKEN: =!
        )
    ) else (
        echo    ❌ Auth: FAILED
        set /a ERROR_COUNT+=1
    )
)

:: Test 4: Protected Endpoint (User Profile)
if defined TOKEN (
    echo [4/8] 🛡️  Testing Protected Endpoint...
    curl -s -w "%%{http_code}" -H "Authorization: Bearer !TOKEN!" "%GATEWAY_URL%/users/profile/1" > temp_response.txt 2>nul
    set /p STATUS=<temp_response.txt
    if "!STATUS!" == "200" (
        echo    ✅ JWT Protection: WORKING
    ) else (
        echo    ❌ JWT Protection: FAILED (Status: !STATUS!)
        set /a ERROR_COUNT+=1
    )
) else (
    echo [4/8] ❌ JWT Protection: SKIPPED (No token)
    set /a ERROR_COUNT+=1
)

:: Test 5: Quiz Service
echo [5/8] 📝 Testing Quiz Service...
curl -s -w "%%{http_code}" "%GATEWAY_URL%/quizzes?page=0&size=10" > temp_response.txt 2>nul
set /p STATUS=<temp_response.txt
if "!STATUS!" == "401" (
    echo    ✅ Quiz Service: PROTECTED (401 Expected)
) else if "!STATUS!" == "200" (
    echo    ✅ Quiz Service: ACCESSIBLE
) else (
    echo    ❌ Quiz Service: FAILED (Status: !STATUS!)
    set /a ERROR_COUNT+=1
)

:: Test 6: Result Service
echo [6/8] 📊 Testing Result Service...
curl -s -w "%%{http_code}" "%GATEWAY_URL%/results" > temp_response.txt 2>nul
set /p STATUS=<temp_response.txt
if "!STATUS!" == "401" (
    echo    ✅ Result Service: PROTECTED (401 Expected)
) else if "!STATUS!" == "405" (
    echo    ✅ Result Service: ACCESSIBLE (Method not allowed expected)
) else (
    echo    ❌ Result Service: FAILED (Status: !STATUS!)
    set /a ERROR_COUNT+=1
)

:: Test 7: Analytics Service
echo [7/8] 📈 Testing Analytics Service...
curl -s -w "%%{http_code}" "%GATEWAY_URL%/analytics" > temp_response.txt 2>nul
set /p STATUS=<temp_response.txt
if "!STATUS!" == "401" (
    echo    ✅ Analytics Service: PROTECTED (401 Expected)
) else if "!STATUS!" == "405" (
    echo    ✅ Analytics Service: ACCESSIBLE (Method not allowed expected)
) else (
    echo    ❌ Analytics Service: FAILED (Status: !STATUS!)
    set /a ERROR_COUNT+=1
)

:: Test 8: CORS Test
echo [8/8] 🌐 Testing CORS Configuration...
curl -s -w "%%{http_code}" -H "Origin: http://localhost:3000" -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: authorization,content-type" -X OPTIONS "%GATEWAY_URL%/auth/login" > temp_response.txt 2>nul
set /p STATUS=<temp_response.txt
if "!STATUS!" == "200" (
    echo    ✅ CORS: CONFIGURED
) else (
    echo    ❌ CORS: FAILED (Status: !STATUS!)
    set /a ERROR_COUNT+=1
)

:: Cleanup
del temp_response.txt >nul 2>&1

echo.
echo ============================================
echo              📋 VERIFICATION RESULTS
echo ============================================

if !ERROR_COUNT! == 0 (
    echo 🎉 ALL TESTS PASSED! API is ready for use.
    echo.
    echo ✅ Gateway: Working
    echo ✅ Authentication: Working  
    echo ✅ JWT Protection: Working
    echo ✅ Microservices: Working
    echo ✅ CORS: Configured
    echo.
    echo 🌐 Frontend URL: http://localhost:3000
    echo 🔗 API Gateway: http://localhost:8080
    echo 📊 Eureka Dashboard: http://localhost:8761
) else (
    echo ⚠️  !ERROR_COUNT! test(s) failed. Please check:
    echo    1. All services are running
    echo    2. Database is accessible
    echo    3. Environment variables are set
    echo.
    echo 🔧 Run ./health-check.bat for detailed service status
)

echo.
echo Press any key to exit...
pause >nul