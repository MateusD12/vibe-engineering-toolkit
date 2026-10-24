# Vibe Engineering Toolkit - Instalador Global Modo Turbo para Windows
$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Instalando Vibe Engineering Toolkit (Modo Turbo)..." -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$ROOT = Split-Path -Parent $PSScriptRoot
$CLAUDE_DIR = Join-Path $env:USERPROFILE ".claude"
$GEMINI_ROOT = Join-Path $env:USERPROFILE ".gemini"
$GEMINI_DIR = Join-Path $GEMINI_ROOT "config"

# 1. Pastas de destino
New-Item -ItemType Directory -Force -Path (Join-Path $CLAUDE_DIR "agents") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $CLAUDE_DIR "skills") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $CLAUDE_DIR "hooks") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $CLAUDE_DIR "commands") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $GEMINI_DIR "skills") | Out-Null

# 2. Sincronizar Agentes
Write-Host "Instalando Agentes Especialistas..." -ForegroundColor Yellow
Copy-Item -Path (Join-Path $ROOT "agents\*") -Destination (Join-Path $CLAUDE_DIR "agents") -Recurse -Force
$agentCount = (Get-ChildItem -Path (Join-Path $CLAUDE_DIR "agents") -Filter *.md).Count
Write-Host "   OK: $agentCount agentes instalados em ~/.claude/agents" -ForegroundColor Green

# 3. Sincronizar Skills
Write-Host "Instalando Skills e Motor Obsidian Universal..." -ForegroundColor Yellow
Copy-Item -Path (Join-Path $ROOT "skills\*") -Destination (Join-Path $CLAUDE_DIR "skills") -Recurse -Force
Copy-Item -Path (Join-Path $ROOT "skills\*") -Destination (Join-Path $GEMINI_DIR "skills") -Recurse -Force
$skillCount = (Get-ChildItem -Path (Join-Path $CLAUDE_DIR "skills") -Directory).Count
Write-Host "   OK: $skillCount skills instaladas em ~/.claude/skills e ~/.gemini/config/skills" -ForegroundColor Green

# 4. Sincronizar Hooks, Comandos e Settings Turbo
Write-Host "Instalando Hooks, Slash Commands e Settings Turbo..." -ForegroundColor Yellow
if (Test-Path (Join-Path $ROOT "hooks")) {
    Copy-Item -Path (Join-Path $ROOT "hooks\*") -Destination (Join-Path $CLAUDE_DIR "hooks") -Recurse -Force
}
if (Test-Path (Join-Path $ROOT "commands")) {
    Copy-Item -Path (Join-Path $ROOT "commands\*") -Destination (Join-Path $CLAUDE_DIR "commands") -Recurse -Force
}
if (Test-Path (Join-Path $ROOT "templates\claude-settings.json")) {
    Copy-Item -Path (Join-Path $ROOT "templates\claude-settings.json") -Destination (Join-Path $CLAUDE_DIR "settings.json") -Force
}
Write-Host "   OK: Hook lembrar-fluxo.js, commands e settings.json sincronizados" -ForegroundColor Green

# 5. Sincronizar Instrucoes Globais
Write-Host "Atualizando Instrucoes Globais (CLAUDE.md & GEMINI.md)..." -ForegroundColor Yellow
Copy-Item -Path (Join-Path $ROOT "CLAUDE.md") -Destination (Join-Path $CLAUDE_DIR "CLAUDE.md") -Force
Copy-Item -Path (Join-Path $ROOT "CLAUDE.md") -Destination (Join-Path $GEMINI_DIR "CLAUDE.md") -Force
Copy-Item -Path (Join-Path $ROOT "GEMINI.md") -Destination (Join-Path $GEMINI_DIR "GEMINI.md") -Force
Copy-Item -Path (Join-Path $ROOT "GEMINI.md") -Destination (Join-Path $GEMINI_ROOT "GEMINI.md") -Force
Write-Host "   OK: CLAUDE.md e GEMINI.md atualizados em todos os ambientes" -ForegroundColor Green

# 6. Configurar CLI um (Universal Modder) se disponivel
if (Test-Path "C:\Projetos\universal-modder") {
    Write-Host "Configurando CLI um e base offline..." -ForegroundColor Yellow
    try {
        [System.Environment]::SetEnvironmentVariable("UM_KB", "C:\Projetos\universal-modder\knowledge", "User")
        Write-Host "   OK: Variavel UM_KB apontada para a base offline" -ForegroundColor Green
    }
    catch {
        Write-Host "   Aviso ao configurar UM_KB: $_" -ForegroundColor DarkYellow
    }
}

Write-Host "Instalacao concluida com sucesso! Modo Turbo ativo em todos os projetos." -ForegroundColor Cyan
