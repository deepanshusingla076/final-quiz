@echo off
echo Testing Environment Variable Loading...
echo.

:: Load environment variables from .env file
for /f "usebackq tokens=1,2 delims==" %%a in (".env") do (
    if not "%%a"=="" if not "%%a:~0,1"=="#" (
        set "%%a=%%b"
    )
)

echo Environment Variables Loaded:
echo DB_USERNAME=%DB_USERNAME%
echo DB_PASSWORD=%DB_PASSWORD%
echo JWT_SECRET=%JWT_SECRET%
echo GEMINI_API_KEY=%GEMINI_API_KEY%
echo.

echo Testing MySQL connection...
mysql -u %DB_USERNAME% -p"%DB_PASSWORD%" -e "SELECT 'Database connection successful!' as result;"

pause