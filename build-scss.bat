@echo off
echo ========================================
echo DCJS SCSS编译工具
echo ========================================
echo.

echo 正在编译SCSS文件...
node compile-scss-manual.js

echo.
echo ========================================
echo 编译完成！
echo ========================================
echo.
echo 生成的CSS文件可以直接用于生产环境
echo 如需重新编译，请再次运行此脚本
echo.
pause