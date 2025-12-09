# Start Backend Development Server
Write-Host "🌿 Starting New Wonder Herbals Backend..." -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

$backendPath = Join-Path $PSScriptRoot "backend"
Set-Location $backendPath

Write-Host "Starting Express server..." -ForegroundColor Cyan
Write-Host "Backend API will be available at: http://localhost:5000`n" -ForegroundColor Yellow

npm run dev
