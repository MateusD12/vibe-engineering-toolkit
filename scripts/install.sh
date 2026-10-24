#!/usr/bin/env bash
set -e

echo "=========================================================="
echo "  🚀 Instalando Vibe Engineering Toolkit..."
echo "=========================================================="

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CLAUDE_DIR="$HOME/.claude"
GEMINI_DIR="$HOME/.gemini/config"

mkdir -p "$CLAUDE_DIR/agents" "$CLAUDE_DIR/skills" "$GEMINI_DIR/skills"

echo "📦 Instalando Agentes Especialistas..."
cp -r "$ROOT/agents/"* "$CLAUDE_DIR/agents/"
echo "   ✔ Agentes instalados em ~/.claude/agents"

echo "📦 Instalando Skills..."
cp -r "$ROOT/skills/"* "$CLAUDE_DIR/skills/"
cp -r "$ROOT/skills/"* "$GEMINI_DIR/skills/"
echo "   ✔ Skills instaladas em ~/.claude/skills e ~/.gemini/config/skills"

echo "📄 Atualizando Instruções Globais..."
cp "$ROOT/CLAUDE.md" "$CLAUDE_DIR/CLAUDE.md"
cp "$ROOT/CLAUDE.md" "$GEMINI_DIR/CLAUDE.md" 2>/dev/null || true
cp "$ROOT/GEMINI.md" "$GEMINI_DIR/GEMINI.md" 2>/dev/null || true
echo "   ✔ CLAUDE.md e GEMINI.md atualizados"

echo "✨ Instalação concluída com sucesso!"
