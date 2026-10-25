# Histórico do Projeto — Vibe Engineering Toolkit

## Estado Atual do Projeto (24 de Outubro de 2026)

### Pente-Fino Global & Ativação do Modo Turbo Universal (24/10/2026)
- **Contexto:** Garantir que qualquer sessão nova aberta (seja em jogos, engenharia reversa, aplicativos web/mobile, backend ou ferramentas desktop) opere automaticamente no Modo Turbo (Auto-Pilot + Obsidian Engine Universal + Ondas Paralelas + Quality Gate de 350 linhas + Pipeline de Agentes).
- **Ação:**
  - **Obsidian Engine Universal (`codemap_generator.js`):** Expansão do extrator AST zero-dependências para suportar **C/C++** (`.c`, `.cpp`, `.cc`, `.h`, `.hpp`), **C#** (`.cs`), **Rust** (`.rs`), **Go** (`.go`) e **Lua** (`.lua`), além de TS/JS/React, Python e SQL. Pré-indexação imediata de todos os repositórios locais em `C:\Projetos\` (incluindo 261 arquivos C++ do `PS2Recomp` e 129 arquivos do `universal-modder`).
  - **Hook Global `lembrar-fluxo.js` e Slash Commands (`/atualizar`, `/novo-projeto`):** Incorporados ao toolkit e atualizados para injetar automaticamente os gatilhos de Jogos/Engenharia Reversa, VR 6DOF, Ports Wasm, Sanitização/350 linhas, Ondas Paralelas e Obsidian Engine em toda tarefa técnica.
  - **Auto-Pilot `settings.json` (`templates/claude-settings.json`):** Whitelist expandida com segurança para compiladores e ferramentas do ecossistema (`um`, `uv`, `cmake`, `ninja`, `clang++`, `cargo`, `csc`, `7z`, `vercel`, `curl`, `rg`), eliminando interrupções de permissão sem abrir brechas destrutivas.
  - **Sincronização Cross-Repo:** Alinhamento com os repositórios privados de trabalho (motor de mapa de código, catálogo de agentes e app 3D de acompanhamento), incluindo correção de segurança na validação de `Origin`/`Host` e adição dos 4 agentes de jogos.
- **Impacto:** Qualquer conversa nova já nasce com o mapa de código gerado, permissões liberadas, hook ativo e todos os 25 agentes e 25 skills sincronizados entre Claude Code (`~/.claude`) e Antigravity/Gemini (`~/.gemini`).

---

## Histórico de Alterações

### 24 de Outubro de 2026 — Pente-Fino Global & Modo Turbo Universal
- **O que foi feito:** Upgrade multi-linguagem no `codemap_generator.js` (C/C++/C#/Rust/Go/Lua), criação de `hooks/lembrar-fluxo.js`, `commands/atualizar.md`, `commands/novo-projeto.md` e `templates/claude-settings.json`, evolução do `scripts/install.ps1` e pré-indexação `.memory/` em todos os repositórios de `C:\Projetos\`.
- **Arquivos alterados:** `skills/obsidian-engine/scripts/codemap_generator.js`, `skills/obsidian-engine/README.md`, `hooks/lembrar-fluxo.js`, `commands/atualizar.md`, `commands/novo-projeto.md`, `templates/claude-settings.json`, `scripts/install.ps1`, `CLAUDE.md`, `GEMINI.md`, `Historico.md`.

### 24 de Outubro de 2026 — Adição de VR Modding, Ports Wasm e Matching Decomp
- **O que foi feito:** Integração das skills `vr-game-modding` e `wasm-game-ports`, formalização da esteira de matching decompilation inspirada no caso MW2/Hex-Rays, e atualização dos agentes `mod-orchestrator` e `engenheiro-reversa-jogos`.
- **Arquivos alterados:** `skills/vr-game-modding/SKILL.md`, `skills/wasm-game-ports/SKILL.md`, `agents/mod-orchestrator.md`, `agents/engenheiro-reversa-jogos.md`, `README.md`, `CLAUDE.md`, `GEMINI.md`.

### 24 de Outubro de 2026 — Integração do Pipeline de Engenharia Reversa e CLI `um`
- **O que foi feito:** Incorporação das ferramentas, playbooks e skills do `universal-modder`, elevação do catálogo para 25 agentes e 23 skills, instalação global do CLI `um` no Windows e atualização da documentação.
- **Arquivos alterados:** `README.md`, `CLAUDE.md`, `GEMINI.md`, `scripts/install.ps1`, `agents/engenheiro-reversa-jogos.md`, `skills/engenharia-reversa-jogos/SKILL.md`, novos agentes e skills em `agents/` e `skills/`.
- **Decisão técnica:** Configuração do cache offline permanente em `~/.universal-modder` com apontamento por `UM_KB` para garantir que comandos de busca na base de conhecimento (`um kb search`) operem instantaneamente sem depender de conexão de rede ou chamadas de API externas.

### 23 de Outubro de 2026 — Lançamento Inicial do Vibe Engineering Toolkit
- **O que foi feito:** Consolidação dos agentes especialistas, motor Obsidian Engine para geração de codemaps com zero tokens, protocolo de orquestração em ondas paralelas (Parallel Wave Dispatch) e regras de ESLint para corte de arquivos em 350 linhas. Criação e publicação do repositório no GitHub `MateusD12/vibe-engineering-toolkit`.
