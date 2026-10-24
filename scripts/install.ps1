# Vibe Engineering Toolkit - Instalador Global para Windows
$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Instalando Vibe Engineering Toolkit..." -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$ROOT = Split-Path -Parent $PSScriptRoot
$CLAUDE_DIR = Join-Path $env:USERPROFILE ".claude"
$GEMINI_DIR = Join-Path $env:USERPROFILE ".gemini\config"

# 1. Pastas de destino
New-Item -ItemType Directory -Force -Path (Join-Path $CLAUDE_DIR "agents") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $CLAUDE_DIR "skills") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $GEMINI_DIR "skills") | Out-Null

# 2. Sincronizar Agentes
Write-Host "Instalando Agentes Especialistas..." -ForegroundColor Yellow
Copy-Item -Path (Join-Path $ROOT "agents\*") -Destination (Join-Path $CLAUDE_DIR "agents") -Recurse -Force
$agentCount = (Get-ChildItem -Path (Join-Path $CLAUDE_DIR "agents") -Filter *.md).Count
Write-Host "   OK: $agentCount agentes instalados em ~/.claude/agents" -ForegroundColor Green

# 3. Sincronizar Skills
Write-Host "Instalando Skills e Motor Obsidian..." -ForegroundColor Yellow
Copy-Item -Path (Join-Path $ROOT "skills\*") -Destination (Join-Path $CLAUDE_DIR "skills") -Recurse -Force
Copy-Item -Path (Join-Path $ROOT "skills\*") -Destination (Join-Path $GEMINI_DIR "skills") -Recurse -Force
$skillCount = (Get-ChildItem -Path (Join-Path $CLAUDE_DIR "skills") -Directory).Count
Write-Host "   OK: $skillCount skills instaladas em ~/.claude/skills e ~/.gemini/config/skills" -ForegroundColor Green

# 4. Sincronizar Instrucoes Globais
Write-Host "Atualizando Instrucoes Globais..." -ForegroundColor Yellow
Copy-Item -Path (Join-Path $ROOT "CLAUDE.md") -Destination (Join-Path $CLAUDE_DIR "CLAUDE.md") -Force
Copy-Item -Path (Join-Path $ROOT "CLAUDE.md") -Destination (Join-Path $GEMINI_DIR "CLAUDE.md") -Force
Copy-Item -Path (Join-Path $ROOT "GEMINI.md") -Destination (Join-Path $GEMINI_DIR "GEMINI.md") -Force
Write-Host "   OK: CLAUDE.md e GEMINI.md atualizados com sucesso" -ForegroundColor Green

# 5. Configurar CLI um (Universal Modder) se disponivel
if (Test-Path "C:\Projetos\universal-modder") {
    Write-Host "Configurando CLI um e base offline..." -ForegroundColor Yellow
    try {
        $hasUv = Get-Command uv -ErrorAction SilentlyContinue
        if (-not $hasUv) {
            python -m pip install uv
        }
        uv tool install C:\Projetos\universal-modder
        uv tool update-shell
        [System.Environment]::SetEnvironmentVariable("UM_KB", "C:\Projetos\universal-modder\knowledge", "User")
        Write-Host "   OK: CLI um configurado com sucesso e adicionado ao PATH" -ForegroundColor Green
    }
    catch {
        Write-Host "   Aviso ao configurar CLI um: $_" -ForegroundColor DarkYellow
    }
}

Write-Host "Instalacao concluida com sucesso! Todos os agentes, skills e pipelines estao ativos." -ForegroundColor Cyan
