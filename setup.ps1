# New Wonder Herbals - Setup Script
# This script will install dependencies for both frontend and backend

Write-Host "🌿 New Wonder Herbals - Setup Script" -ForegroundColor Green
Write-Host "====================================`n" -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Get current directory
$rootDir = $PSScriptRoot

Write-Host "`n📦 Installing Frontend Dependencies..." -ForegroundColor Cyan
Set-Location "$rootDir\frontend"
npm install

Write-Host "`n📦 Installing Backend Dependencies..." -ForegroundColor Cyan
Set-Location "$rootDir\backend"
npm install

Write-Host "`n✅ Setup Complete!" -ForegroundColor Green
Write-Host "`nTo start the development servers:" -ForegroundColor Yellow
Write-Host "1. Frontend: cd frontend && npm run dev" -ForegroundColor White
Write-Host "2. Backend:  cd backend && npm run dev" -ForegroundColor White
Write-Host "`nThe frontend will run on http://localhost:3000" -ForegroundColor Cyan
Write-Host "The backend will run on http://localhost:5000" -ForegroundColor Cyan

Set-Location $rootDir
