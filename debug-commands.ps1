# Expo/React Native 调试命令快捷脚本
# 使用方式: powershell -ExecutionPolicy Bypass -File debug-commands.ps1 [command]

param(
    [string]$command = "menu"
)

$adbPath = "C:\Users\Administrator\AppData\Local\Android\Sdk\platform-tools\adb.exe"
$device = "127.0.0.1:7555"

Write-Host "=" -NoNewline -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host " React Native 调试工具" -ForegroundColor Yellow
Write-Host "=" -NoNewline -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

switch ($command) {
    "menu" {
        Write-Host "📱 打开开发者菜单..." -ForegroundColor Green
        & $adbPath -s $device shell input keyevent 82
        Write-Host "✓ 开发者菜单已打开" -ForegroundColor Green
    }
    "reload" {
        Write-Host "🔄 重新加载应用..." -ForegroundColor Green
        & $adbPath -s $device shell input keyevent 82
        Start-Sleep -Milliseconds 500
        & $adbPath -s $device shell input keyevent 66
        Write-Host "✓ 应用已重新加载" -ForegroundColor Green
    }
    "logs" {
        Write-Host "📋 查看实时日志 (Ctrl+C 退出)..." -ForegroundColor Green
        Write-Host ""
        & $adbPath -s $device logcat *:E
    }
    "clear" {
        Write-Host "🗑️  清除日志..." -ForegroundColor Green
        & $adbPath -s $device logcat -c
        Write-Host "✓ 日志已清除" -ForegroundColor Green
    }
    "devices" {
        Write-Host "📱 已连接的设备:" -ForegroundColor Green
        Write-Host ""
        & $adbPath devices -l
    }
    "help" {
        Write-Host "可用命令:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "  menu      - 打开开发者菜单 (默认)" -ForegroundColor White
        Write-Host "  reload    - 重新加载应用" -ForegroundColor White
        Write-Host "  logs      - 查看实时错误日志" -ForegroundColor White
        Write-Host "  clear     - 清除日志" -ForegroundColor White
        Write-Host "  devices   - 列出已连接的设备" -ForegroundColor White
        Write-Host "  help      - 显示此帮助信息" -ForegroundColor White
        Write-Host ""
        Write-Host "示例:" -ForegroundColor Yellow
        Write-Host "  powershell -ExecutionPolicy Bypass -File debug-commands.ps1 menu" -ForegroundColor Gray
        Write-Host "  powershell -ExecutionPolicy Bypass -File debug-commands.ps1 logs" -ForegroundColor Gray
    }
    default {
        Write-Host "❌ 未知命令: $command" -ForegroundColor Red
        Write-Host "使用 'help' 查看可用命令" -ForegroundColor Yellow
    }
}

Write-Host ""
