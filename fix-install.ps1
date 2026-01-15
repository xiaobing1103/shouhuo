# Fix Android Installation Permission Issues
Write-Host "=== Fixing Android Installation Issues ===" -ForegroundColor Cyan

# Check if ADB is available
$adbPath = ".\android-tools\platform-tools"
if (Test-Path "$adbPath\adb.exe") {
    $env:Path = "$adbPath;" + $env:Path
    Write-Host "[OK] Using local ADB" -ForegroundColor Green
} else {
    Write-Host "[INFO] Using system ADB" -ForegroundColor Yellow
}

Write-Host "`nStep 1: Checking connected devices..." -ForegroundColor Yellow
adb devices

Write-Host "`nStep 2: Uninstalling existing app..." -ForegroundColor Yellow
adb uninstall com.shouhuo.app

Write-Host "`nStep 3: Installing app with permissions..." -ForegroundColor Yellow
$apkPath = ".\android\app\build\outputs\apk\debug\app-debug.apk"

if (Test-Path $apkPath) {
    Write-Host "Installing: $apkPath" -ForegroundColor Gray
    adb install -r -g $apkPath
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n[SUCCESS] App installed successfully!" -ForegroundColor Green
        Write-Host "`nYou can now run: npm run android" -ForegroundColor Yellow
    } else {
        Write-Host "`n[ERROR] Installation failed" -ForegroundColor Red
        Write-Host "`nTroubleshooting steps:" -ForegroundColor Yellow
        Write-Host "1. Make sure MuMu emulator is running" -ForegroundColor White
        Write-Host "2. Run: npm run setup-adb" -ForegroundColor White
        Write-Host "3. In MuMu emulator, go to Settings -> Developer options" -ForegroundColor White
        Write-Host "   - Enable 'USB debugging'" -ForegroundColor White
        Write-Host "   - Enable 'Install via USB'" -ForegroundColor White
        Write-Host "4. Try again" -ForegroundColor White
    }
} else {
    Write-Host "[ERROR] APK not found: $apkPath" -ForegroundColor Red
    Write-Host "Please build the app first with: npm run android" -ForegroundColor Yellow
}
