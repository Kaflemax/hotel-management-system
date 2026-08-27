# Start React admin UI (Hospital Management System)
Set-Location $PSScriptRoot\frontend
Write-Host ""
Write-Host "  HMS Admin UI -> http://localhost:5173/login" -ForegroundColor Cyan
Write-Host "  (Django API runs separately on http://127.0.0.1:8000)" -ForegroundColor DarkGray
Write-Host ""
npm run dev
