@echo off
REM Quick start script for VitePress docs (Windows)
REM Opens a new terminal to run the dev server and opens the browser.
cd /d %~dp0
echo Starting VitePress docs dev server...
start "" cmd /k "npm run docs:dev"
timeout /t 2 >nul
echo Opening browser at http://localhost:5173/
start "" "http://localhost:5173/"
exit /b 0