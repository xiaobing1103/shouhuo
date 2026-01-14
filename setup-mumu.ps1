Write-Host "Downloading Android Platform Tools..." -ForegroundColor Yellow

$url = "https://dl.google.com/android/repository/platform-tools-latest-windows.zip"
$output = "platform-tools.zip"
$extractPath = "android-tools"

if (!(Test-Path "$extractPath\platform-tools\adb.exe")) {
    Write-Host "Downloading..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $url -OutFile $output -UseBasicParsing
    
    Write-Host "Extracting..." -ForegroundColor Yellow
    Expand-Archive -Path $output -DestinationPath $extractPath -Force
    Remove-Item $output
    
    Write-Host "Done!" -ForegroundColor Green
}

$adbPath = Resolve-Path "$extractPath\platform-tools"
$env:Path = "$adbPath;" + $env:Path

Write-Host "`nConnecting to MuMu Emulator..." -ForegroundColor Yellow
Write-Host "Trying port 7555..." -ForegroundColor Gray
& "$adbPath\adb.exe" connect 127.0.0.1:7555

Start-Sleep -Seconds 2

Write-Host "`nTrying port 16384..." -ForegroundColor Gray
& "$adbPath\adb.exe" connect 127.0.0.1:16384

Start-Sleep -Seconds 2

Write-Host "`nChecking devices..." -ForegroundColor Yellow
& "$adbPath\adb.exe" devices

Write-Host "`nTo run the app, execute:" -ForegroundColor Yellow
Write-Host "npm run android" -ForegroundColor White

Write-Host "`nOr use Expo Go app:" -ForegroundColor Yellow
Write-Host "exp://192.168.1.104:8081" -ForegroundColor White
