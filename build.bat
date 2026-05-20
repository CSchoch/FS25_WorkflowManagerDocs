@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0"
if not exist "node_modules" npm install
npm run build
