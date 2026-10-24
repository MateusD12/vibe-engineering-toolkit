---
description: Inicia um projeto, app ou port/mod de jogo novo no Modo Turbo (descoberta → prompt → arquiteto → obsidian-engine → 350 linhas → pipeline → entrega)
---

Vou criar ou iniciar o projeto seguindo O FLUXO OBRIGATÓRIO (Modo Turbo) do CLAUDE.md, sem pular etapas.

Ideia do usuário: $ARGUMENTS

Execute na ordem:
1. **Descoberta de Domínio:**
   - Para apps/sistemas: `descoberta-agentes` → `especialista-<dominio>` → `engenheiro-prompts` → `arquiteto` → `infraestrutura-projetos`.
   - Para jogos/ports/mods: `engenheiro-reversa-jogos` + `mod-orchestrator` (`um scan` / `um kb search` / `ps2_native_port.py`).
2. **Implementar com Quality Gate de 350 Linhas:**
   - Respeitar estritamente o teto de **350 linhas por arquivo** desde o primeiro arquivo criado.
   - Logo após inicializar o repositório Git (`C:\Projetos\<app>`), gerar o cofre Obsidian com:
     `node "C:/Users/Pichau/.claude/skills/obsidian-engine/scripts/codemap_generator.js" "C:/Projetos/<app>"`
     (cria `.memory/` + codemap e registra `.memory/` em `.git/info/exclude`).
3. **Pipeline de qualidade:** `revisor-codigo` → `seguranca` → `testador` (build + E2E) → `pentester` → `tech-lead`.
4. **Entrega:** atualizar codemap + nota do módulo em `.memory/01-arquitetura/` (skill `obsidian-engine`) → skill `atualizar-historico` → commit atômico → push (`Dev` para repos Nitro; `main`/`Dev` para repos pessoais).

Regras sempre ativas: Auto-Pilot no PC pessoal · economia estrita de tokens via Obsidian Engine · limite de 350 linhas.
