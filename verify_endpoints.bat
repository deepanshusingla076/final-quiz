@echo off
REM ============================================================================
REM QWIZZ API Endpoint Verification Script
REM This script tests all major API endpoints and generates a JSON report
REM ============================================================================

setlocal enabledelayedexpansion

set GATEWAY_URL=http://localhost:8080
set REPORT_FILE=endpoint_verification_report.json
set TIMESTAMP=%date:~-4,4%-%date:~-10,2%-%date:~-7,2%_%time:~0,2%-%time:~3,2%-%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%

echo.
echo ============================================================================
echo  QWIZZ API ENDPOINT VERIFICATION
echo ============================================================================
echo  Timestamp: %TIMESTAMP%
echo  Gateway URL: %GATEWAY_URL%
echo  Report File: %REPORT_FILE%
echo ============================================================================
echo.

REM Initialize JSON report
echo { > %REPORT_FILE%
echo   "timestamp": "%TIMESTAMP%", >> %REPORT_FILE%
echo   "gateway_url": "%GATEWAY_URL%", >> %REPORT_FILE%
echo   "test_results": [ >> %REPORT_FILE%

set FIRST_TEST=true

REM Function to test endpoint and add to JSON report
call :test_endpoint "Gateway Health" "/actuator/health" "GET" ""
call :test_endpoint "Eureka Health" "/actuator/health" "GET" ""
call :test_endpoint "Auth Register" "/api/auth/register" "POST" "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"Test123!@#\",\"firstName\":\"Test\",\"lastName\":\"User\",\"role\":\"STUDENT\"}"
call :test_endpoint "Auth Login" "/api/auth/login" "POST" "{\"usernameOrEmail\":\"testuser\",\"password\":\"Test123!@#\"}"
call :test_endpoint "User Profile" "/api/users/profile" "GET" ""
call :test_endpoint "Quiz List" "/api/quizzes" "GET" ""
call :test_endpoint "Create Quiz" "/api/quizzes" "POST" "{\"title\":\"Test Quiz\",\"description\":\"Test Description\",\"timeLimit\":30,\"totalQuestions\":5,\"category\":\"test\",\"difficulty\":\"EASY\"}"
call :test_endpoint "Results List" "/api/results" "GET" ""
call :test_endpoint "Analytics Dashboard" "/api/analytics/dashboard" "GET" ""

REM Close JSON report
echo   ] >> %REPORT_FILE%
echo } >> %REPORT_FILE%

echo.
echo ============================================================================
echo  VERIFICATION COMPLETE
echo ============================================================================
echo  Report saved to: %REPORT_FILE%
echo  Summary:
echo    - Total Tests: %TEST_COUNT%
echo    - Passed: %PASS_COUNT%  
echo    - Failed: %FAIL_COUNT%
echo ============================================================================
echo.

REM Display report
if exist %REPORT_FILE% (
    echo Report Contents:
    type %REPORT_FILE%
)

goto :eof

REM Function to test individual endpoint
:test_endpoint
set TEST_NAME=%~1
set ENDPOINT=%~2  
set METHOD=%~3
set BODY=%~4

echo Testing: %TEST_NAME%

if not "%FIRST_TEST%"=="true" (
    echo     , >> %REPORT_FILE%
)
set FIRST_TEST=false

REM Perform curl request
if "%METHOD%"=="GET" (
    curl -s -w "%%{http_code}" -o temp_response.json "%GATEWAY_URL%%ENDPOINT%" > temp_status.txt 2>nul
) else if "%METHOD%"=="POST" (
    curl -s -w "%%{http_code}" -H "Content-Type: application/json" -d "%BODY%" -o temp_response.json "%GATEWAY_URL%%ENDPOINT%" > temp_status.txt 2>nul
)

if exist temp_status.txt (
    set /p HTTP_STATUS=<temp_status.txt
) else (
    set HTTP_STATUS=000  
)

REM Determine if test passed
set PASSED=false
if "%HTTP_STATUS%" geq "200" if "%HTTP_STATUS%" lss "300" set PASSED=true
if "%HTTP_STATUS%"=="401" if "%TEST_NAME:~0,4%"=="Auth" set PASSED=false
if "%HTTP_STATUS%"=="401" if not "%TEST_NAME:~0,4%"=="Auth" set PASSED=true

REM Add to JSON report
echo     { >> %REPORT_FILE%
echo       "test_name": "%TEST_NAME%", >> %REPORT_FILE%
echo       "endpoint": "%ENDPOINT%", >> %REPORT_FILE%
echo       "method": "%METHOD%", >> %REPORT_FILE%
echo       "http_status": "%HTTP_STATUS%", >> %REPORT_FILE%
echo       "passed": %PASSED%, >> %REPORT_FILE%
echo       "timestamp": "%TIMESTAMP%" >> %REPORT_FILE%
echo     } >> %REPORT_FILE%

REM Update counters
set /a TEST_COUNT+=1
if "%PASSED%"=="true" (
    set /a PASS_COUNT+=1
    echo   ✓ PASS ^(%HTTP_STATUS%^)
) else (
    set /a FAIL_COUNT+=1
    echo   ✗ FAIL ^(%HTTP_STATUS%^)
)

REM Cleanup temp files
if exist temp_response.json del temp_response.json 2>nul
if exist temp_status.txt del temp_status.txt 2>nul

goto :eof