# Vibe Engineering Toolkit — Instalador Global para Windows
# Copia e sincroniza os agentes, skills e instruções em ~/.claude e ~/.gemini

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  🚀 Instalando Vibe Engineering Toolkit..." -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$ROOT = Split-Path -Parent $PSScriptRoot
$CLAUDE_DIR = Join-Path $env:USERPROFILE ".claude"
$GEMINI_DIR = Join-Path $env:USERPROFILE ".gemini\config"

# 1. Pastas de destino
New-Item -ItemType Directory -Force -Path (Join-Path $CLAUDE_DIR "agents") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $CLAUDE_DIR "skills") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $GEMINI_DIR "skills") | Out-Null

# 2. Sincronizar Agentes
Write-Host "📦 Instalando Agentes Especialistas..." -ForegroundColor Yellow
Copy-Item -Path (Join-Path $ROOT "agents\*") -Destination (Join-Path $CLAUDE_DIR "agents") -Recurse -Force
$agentCount = (Get-ChildItem -Path (Join-Path $CLAUDE_DIR "agents") -Filter *.md).Count
Write-Host "   ✔ $agentCount agentes instalados em ~/.claude/agents" -ForegroundColor Green

# 3. Sincronizar Skills
Write-Host "📦 Instalando Skills e Motor Obsidian..." -ForegroundColor Yellow
Copy-Item -Path (Join-Path $ROOT "skills\*") -Destination (Join-Path $CLAUDE_DIR "skills") -Recurse -Force
Copy-Item -Path (Join-Path $ROOT "skills\*") -Destination (Join-Path $GEMINI_DIR "skills") -Recurse -Force
$skillCount = (Get-ChildItem -Path (Join-Path $CLAUDE_DIR "skills") -Directory).Count
Write-Host "   ✔ $skillCount skills instaladas em ~/.claude/skills e ~/.gemini/config/skills" -ForegroundColor Green

# 4. Sincronizar Instruções Globais
Write-Host "📄 Atualizando Instruções Globais..." -ForegroundColor Yellow
Copy-Item -Path (Join-Path $ROOT "CLAUDE.md") -Destination (Join-Path $CLAUDE_DIR "CLAUDE.md") -Force
Copy-Item -Path (Join-Path $ROOT "CLAUDE.md") -Destination (Join-Path $GEMINI_DIR "CLAUDE.md") -Force
Copy-Item -Path (Join-Path $ROOT "GEMINI.md") -Destination (Join-Path $GEMINI_DIR "GEMINI.md") -Force
Write-Host "   ✔ CLAUDE.md e GEMINI.md atualizados com sucesso" -ForegroundColor Green

Write-Host "`n✨ Instalação concluída com sucesso! Todos os agentes e skills estão ativos." -ForegroundColor Cyan
