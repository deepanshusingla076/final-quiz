@echo off
echo =========================================
echo Stopping Online Quiz Application...
echo =========================================
echo.

echo Stopping all Java processes...
for /f "tokens=2" %%i in ('tasklist ^| findstr java') do (
    echo Terminating Java process: %%i
    taskkill /PID %%i /F >nul 2>&1
)

echo Stopping Node.js processes...
for /f "tokens=2" %%i in ('tasklist ^| findstr node') do (
    echo Terminating Node.js process: %%i
    taskkill /PID %%i /F >nul 2>&1
)

echo.
echo =========================================
echo All services have been stopped.
echo You can now safely close any remaining command windows.
echo =========================================

timeout /t 3 /nobreak >nul