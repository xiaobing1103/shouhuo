# MuMu 模拟器 ADB 配置脚本

Write-Host "=== MuMu 模拟器 ADB 配置 ===" -ForegroundColor Cyan

# 1. 下载 Android Platform Tools
$platformToolsUrl = "https://dl.google.com/android/repository/platform-tools-latest-windows.zip"
$downloadPath = ".\android-tools\platform-tools.zip"
$extractPath = ".\android-tools"

Write-Host "`n正在下载 Android Platform Tools..." -ForegroundColor Yellow
try {
    if (!(Test-Path $extractPath)) {
        New-Item -ItemType Directory -Path $extractPath -Force | Out-Null
    }
    
    if (!(Test-Path "$extractPath\platform-tools\adb.exe")) {
        Write-Host "下载中... 这可能需要几分钟" -ForegroundColor Yellow
        Invoke-WebRequest -Uri $platformToolsUrl -OutFile $downloadPath -UseBasicParsing
        
        Write-Host "正在解压..." -ForegroundColor Yellow
        Expand-Archive -Path $downloadPath -DestinationPath $extractPath -Force
        Remove-Item $downloadPath
        
        Write-Host "✓ Android Platform Tools 已安装" -ForegroundColor Green
    } else {
        Write-Host "✓ Android Platform Tools 已存在" -ForegroundColor Green
    }
} catch {
    Write-Host "✗ 下载失败：$($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`n请手动下载 Platform Tools：" -ForegroundColor Yellow
    Write-Host "1. 访问: https://developer.android.com/studio/releases/platform-tools" -ForegroundColor White
    Write-Host "2. 下载 Windows 版本" -ForegroundColor White
    Write-Host "3. 解压到 .\android-tools\ 目录" -ForegroundColor White
    exit 1
}

# 2. 添加到 PATH（临时）
$adbPath = Resolve-Path "$extractPath\platform-tools"
$env:Path = "$adbPath;$env:Path"

Write-Host "`n=== MuMu 模拟器连接步骤 ===" -ForegroundColor Cyan

# 3. 查找 MuMu 模拟器进程
Write-Host "`n1. 检查 MuMu 模拟器状态..." -ForegroundColor Yellow
$mumuProcess = Get-Process -Name "*MuMu*" -ErrorAction SilentlyContinue

if ($mumuProcess) {
    Write-Host "✓ MuMu 模拟器正在运行" -ForegroundColor Green
} else {
    Write-Host "✗ MuMu 模拟器未运行，请先启动模拟器" -ForegroundColor Red
    Write-Host "`n启动模拟器后，重新运行此脚本" -ForegroundColor Yellow
    exit 1
}

# 4. 连接 MuMu 模拟器
Write-Host "`n2. 连接 MuMu 模拟器..." -ForegroundColor Yellow
Write-Host "   尝试端口 7555 (MuMu 12 默认端口)..." -ForegroundColor Gray

& "$adbPath\adb.exe" connect 127.0.0.1:7555

Write-Host "`n3. 检查连接的设备..." -ForegroundColor Yellow
& "$adbPath\adb.exe" devices

Write-Host "`n=== 配置完成 ===" -ForegroundColor Cyan
Write-Host "`n接下来请运行以下命令启动应用：" -ForegroundColor Yellow
Write-Host "  cd c:\Users\Administrator\Desktop\shouhuo" -ForegroundColor White
Write-Host "  `$env:Path = `"$adbPath;`$env:Path`"" -ForegroundColor White
Write-Host "  npm run android" -ForegroundColor White

Write-Host "`n或者使用 Expo Go 应用（更简单）：" -ForegroundColor Yellow
Write-Host "  1. 在 MuMu 模拟器中安装 Expo Go" -ForegroundColor White
Write-Host "  2. 打开 Expo Go，输入: exp://192.168.1.104:8081" -ForegroundColor White

Write-Host "`n提示：如果连接失败，请尝试以下端口：" -ForegroundColor Gray
Write-Host "  - MuMu 12: 16384" -ForegroundColor Gray
Write-Host "  - MuMu 旧版: 7555" -ForegroundColor Gray
Write-Host "  命令示例: adb connect 127.0.0.1:16384" -ForegroundColor Gray
