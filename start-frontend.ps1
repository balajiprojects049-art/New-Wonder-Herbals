# Start Frontend Development Server
Write-Host "🌿 Starting New Wonder Herbals Frontend..." -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

$frontendPath = Join-Path $PSScriptRoot "frontend"
Set-Location $frontendPath

Write-Host "Starting Vite development server..." -ForegroundColor Cyan
Write-Host "Frontend will be available at: http://localhost:3000`n" -ForegroundColor Yellow

npm run dev
