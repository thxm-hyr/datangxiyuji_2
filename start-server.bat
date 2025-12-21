@echo off
echo 正在启动本地服务器...
echo 请访问: http://localhost:8000

REM 尝试使用Python
python -m http.server 8000

if errorlevel 1 (
    echo Python不可用，尝试其他方法...
    
    REM 检查Node.js
    node -v >nul 2>&1
    if errorlevel 1 (
        echo 请安装Python或Node.js以启动本地服务器
        echo 下载Python: https://www.python.org/downloads/
        echo 下载Node.js: https://nodejs.org/
        pause
    ) else (
        echo 使用Node.js启动...
        npx http-server -p 8080
    )
)

pause