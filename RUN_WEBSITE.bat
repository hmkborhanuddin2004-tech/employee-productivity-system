@echo off
title Employee Productivity System - Web Portal
color 0A
echo ====================================================================
echo   Employee Productivity & Work Update Management System
echo   Assalamu Alaikum Borhan Bhai! Launching Web Dashboard...
echo ====================================================================
echo.
echo 1. Opening web browser to http://localhost:3000 ...
start http://localhost:3000
echo.
echo 2. Starting Next.js development server...
echo    (To stop the server later, simply close this black window)
echo.
cd /d "c:\Users\assdi\Documents\Downloads\employee-productivity-system\web"
npm run dev
pause
