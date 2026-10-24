---
description: Altera um projeto ou jogo existente no Modo Turbo (especialista → histórico → mapa Obsidian → ondas paralelas / 350 linhas → pipeline → commit)
---

Vou alterar o projeto existente seguindo O FLUXO OBRIGATÓRIO (Modo Turbo) do CLAUDE.md.

Pedido do usuário: $ARGUMENTS

Execute na ordem:
1. **Identificar o projeto** em `C:\Projetos\<app>` e ler o topo do `Historico.md` (primeiras ~60 linhas, se existir).
2. **Especialista do domínio:**
   - Para apps/sistemas: acionar `descoberta-agentes` e ler o `especialista-<dominio>` do projeto.
   - Para jogos/ports/mods/decomp: acionar `engenheiro-reversa-jogos` + `mod-orchestrator` + CLI `um` (`vr-game-modding` para VR, `wasm-game-ports` para navegador).
3. **Mapa Obsidian antes de abrir código (OBRIGATÓRIO, custo zero):**
   - Se `<app>/.memory/02-codemap/tree-signatures.md` não existir, rodar:
     `node "C:/Users/Pichau/.claude/skills/obsidian-engine/scripts/codemap_generator.js" "C:/Projetos/<app>"`
   - Ler `.memory/00-index/MOC-geral.md` e achar arquivo/linha no `.memory/02-codemap/tree-signatures.md` (buscando pelo nome). Ler só as janelas de linha necessárias e passar arquivos/linhas exatos aos subagentes.
4. **Implementar (Quality Gate 350 Linhas + Ondas Paralelas):**
   - Nenhum arquivo de código de aplicação pode exceder **350 linhas** (fatiar estado em Hooks, UI em sub-componentes, dados em services).
   - Se usar subagentes em paralelo (`orquestracao-ondas`), garantir conjuntos de arquivos disjuntos (`Files(A) ∩ Files(B) = ∅`). Subagentes nunca commitam.
5. **Pipeline de qualidade:** `revisor-codigo` → `seguranca` → `testador` (build + preview/jogo) → `pentester` → `tech-lead`. Reprovou → corrigir e retestar.
6. **Entrega:** rodar de novo o codemap (`codemap_generator.js`) + nota do módulo tocado em `.memory/01-arquitetura/` → skill `atualizar-historico` → commit atômico no `HEAD` → push (`origin main`).

Regras sempre ativas: Auto-Pilot no PC pessoal · economia estrita de tokens via Obsidian Engine · limite de 350 linhas.
