# React Native 日志查看工具
# 使用方式: powershell -ExecutionPolicy Bypass -File view-logs.ps1

$adbPath = "C:\Users\Administrator\AppData\Local\Android\Sdk\platform-tools\adb.exe"
$device = "127.0.0.1:7555"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  React Native 实时日志查看" -ForegroundColor Yellow
Write-Host "  按 Ctrl+C 退出" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 清除旧日志
Write-Host "清除旧日志..." -ForegroundColor Gray
& $adbPath -s $device logcat -c

Write-Host "开始监听日志..." -ForegroundColor Green
Write-Host ""

# 只显示 ReactNative 和错误信息
& $adbPath -s $device logcat `
    -v time `
    ReactNativeJS:V `
    ReactNative:V `
    *:E `
    *:W
