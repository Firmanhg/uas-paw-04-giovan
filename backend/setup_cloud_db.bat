@echo off
REM Script untuk setup database cloud setelah update connection string

echo ============================================
echo SETUP CLOUD DATABASE
echo ============================================
echo.

echo [1/3] Activating virtual environment...
call venv\Scripts\activate.bat

echo [2/3] Running migrations...
alembic -c development.ini upgrade head

echo [3/3] Seeding test data (optional)...
set /p SEED="Create test users? (y/n): "
if /i "%SEED%"=="y" (
    python seed_data.py
)

echo.
echo ============================================
echo DONE! Database ready to use.
echo ============================================
echo.
echo Next steps:
echo 1. Commit development.ini to Git
echo 2. Teman pull dari Git
echo 3. Teman restart backend server
echo 4. Data akan sync otomatis!
echo.
pause
