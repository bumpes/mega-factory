@echo off
chcp 65001 >nul
echo ====================================
echo   巨构工厂 - 生产模式启动
echo ====================================
echo.

echo [1/3] 安装依赖...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo 依赖安装失败
    pause
    exit /b 1
)

echo.
echo [2/3] 构建前端...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo 前端构建失败
    pause
    exit /b 1
)

echo.
echo [3/3] 启动服务器...
echo.
call npm start

pause
