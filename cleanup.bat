@echo off
title QWIZZ - System Cleanup
color 0C
echo.
echo ========================================
echo         🧹 QWIZZ CLEANUP SCRIPT 🧹
echo ========================================
echo.

echo 🗑️  Removing unwanted files and directories...

:: Remove target directories (will be rebuilt)
echo [1/6] Removing Maven target directories...
for /D %%d in (backend\*) do (
    if exist "%%d\target" (
        echo    Removing %%d\target
        rmdir /s /q "%%d\target" 2>nul
    )
)

:: Remove node_modules if exists
echo [2/6] Removing node_modules...
if exist "frontend\node_modules" (
    echo    Removing frontend\node_modules
    rmdir /s /q "frontend\node_modules" 2>nul
)

:: Remove temporary files
echo [3/6] Removing temporary files...
del /s /q "*.tmp" 2>nul
del /s /q "*.log" 2>nul
del /s /q "*.bak" 2>nul

:: Remove IDE files
echo [4/6] Removing IDE files...
del /s /q ".DS_Store" 2>nul
del /s /q "Thumbs.db" 2>nul
del /s /q "*.swp" 2>nul

:: Remove build artifacts
echo [5/6] Removing build artifacts...
if exist "frontend\build" (
    echo    Removing frontend\build
    rmdir /s /q "frontend\build" 2>nul
)

:: Remove package-lock files for fresh install
echo [6/6] Removing package-lock.json for fresh install...
if exist "frontend\package-lock.json" (
    del "frontend\package-lock.json" 2>nul
)

echo.
echo ✅ Cleanup complete!
echo.
echo 📦 To rebuild everything, run:
echo    ./start.bat
echo.
pause