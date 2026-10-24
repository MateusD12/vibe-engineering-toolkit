# Instruções Globais — Mateus (PC Pessoal + Ecossistema Nitro — Modo Turbo)

## 0. Autonomia no PC Pessoal (Auto-Pilot / Modo Turbo)
Você está rodando no PC pessoal do Mateus (`C:\Users\Pichau`), **sem as travas de rede/proxy corporativo (Trend Micro) e sem bloqueio anti-download**.
- Comandos como `git clone`, `curl`, `Invoke-WebRequest`, `npm install`, `vercel`, `gh`, `um`, `cmake`, `clang++`, `cargo`, `7z` são **totalmente permitidos**.
- Pule etapas desnecessárias de espera de aprovação de plano e execute de forma fluida, autônoma e assíncrona.
- Qualquer projeto aberto numa conversa nova — seja **app web/mobile, backend/SQL, sistema corporativo, engenharia reversa, recompilação, port nativo ou mod de jogo** — opera automaticamente neste **Modo Turbo**.
- Só interrompa a execução se houver decisão de negócio ambígua, escrita destrutiva em banco de produção ou push em branch protegida que exija "sim" explícito.

## 1. Economia Estrita de Tokens (Obsidian Engine Universal — OBRIGATÓRIO)
Em **qualquer projeto** (Web/TS/React, Python, C/C++, C#, Rust, Go, Lua, SQL, jogos ou apps em `C:\Projetos\<app>`), operamos com `.memory/` + skill `obsidian-engine`:
- **Boot a custo zero:** Ao trabalhar no repositório de um projeto (`C:\Projetos\<app>`), se `<app>/.memory/02-codemap/tree-signatures.md` não existir, rode passando a pasta do projeto:
  `node "C:/Users/Pichau/.claude/skills/obsidian-engine/scripts/codemap_generator.js" "C:/Projetos/<app>"`
  O script suporta multi-linguagem (`.ts`, `.tsx`, `.js`, `.py`, `.c`, `.cpp`, `.h`, `.hpp`, `.cs`, `.rs`, `.go`, `.lua`, `.sql`), recusa pasta que não é repo git (a menos que passe `--forcar` para pastas de análise de binários) e registra `.memory/` em `.git/info/exclude` (cofre local: não entra em commit nem sobe para o remoto).
- **Sem varredura cega:** Consulte primeiro `.memory/00-index/MOC-geral.md` e o `tree-signatures.md` (buscando pelo nome via Grep, sem abrir o mapa inteiro) para achar arquivo e linha. Prefira `Read` parcial com `offset`/`limit` (`StartLine`/`EndLine`) em arquivos grandes; Grep para termo específico e leitura completa quando o contexto exigir continuam liberados.
- **Subagentes cirúrgicos:** Ao chamar um subagente (`Agent`), envie no prompt os arquivos e linhas exatas afetadas e peça para não varrer o repositório do zero. Exceção: `seguranca`, `pentester`, `auditor-agentes` e `tech-lead` partem dessas linhas mas podem ampliar a busca quando houver risco.
- **Mapeamento progressivo:** Não gaste tokens mapeando módulos não tocados na tarefa. Ao concluir código, atualize o codemap via `codemap_generator.js`, registre a nota do módulo em `.memory/01-arquitetura/` com `[[wikilinks]]` e rode a skill `atualizar-historico`.

## 2. Pipeline de Agentes & Orquestração em Ondas (`orquestracao-ondas`)
Vale para **todas as sessões** e todos os projetos em `C:\Projetos\`.

- **Orquestração em Ondas Paralelas (Parallel Wave Dispatch):**
  - Ao dividir tarefas entre múltiplos subagentes, anote: `Files: [...]`, `Resources: [...]` e `Depends-on: [...]`.
  - Tarefas só rodam na mesma onda se os arquivos forem **estritamente disjuntos** (`Files(A) ∩ Files(B) = ∅`) e não houver dependência mútua. Se tocarem o mesmo arquivo, rodam em série.
  - **Subagentes implementadores NUNCA commitam:** eles deixam as edições na working tree e reportam. Apenas o agente coordenador principal realiza commits atômicos, capturando o `HEAD` fresco.
- **Regra de Ouro das 350 Linhas (Quality Gate):**
  - Arquivos de código de aplicação **não devem exceder 350 linhas**.
  - Passou de 350 linhas? Fatie imediatamente: lógica de estado vai para *Custom Hooks*, blocos visuais para *sub-componentes*, chamadas de dados para *services/repositories* (ou módulos C++/Python/C# coesos).
- **Alterou código (antes do commit, proporcional ao risco):**
  1. `revisor-codigo` (qualidade, limites de 350 linhas, tipos, no-console);
  2. `seguranca` (se tocar auth/SSO, RLS, dados, rotas, uploads ou segredos);
  3. `testador` (build/typecheck e teste funcional no preview/local/jogo);
  4. `pentester` + `tech-lead` (mudança grande/sensível; `tech-lead` consolida).
  Corrija falhas e reteste. Mudança só de texto/cor/tamanho pode pular (declarando no relatório).
- **APP / JOGO NOVO / SESSÃO NOVA / Clone inicial (NESTA ordem, antes do 1º código):**
  - **Apps e Sistemas:** 1. `descoberta-agentes` → 2. `engenheiro-prompts` → 3. `arquiteto` → 4. `infraestrutura-projetos` → 5. `git-workflow` (`Historico.md` + `codemap_generator.js`). Se usar IA → `revisor-ia` já no desenho.
  - **Jogos, Ports e Mods:** 1. `engenheiro-reversa-jogos` + `mod-orchestrator` (`um scan` / `um kb search` / `ps2_native_port.py`) → 2. `codemap_generator.js` → 3. Workers (`mod-offline-worker` / `mod-game-worker`) → 4. `testador` + `git-workflow`.
- **Gatilhos obrigatórios por contexto:**
  - Pente-fino/limpeza de legado: `sanitizacao-codigo` | Subagentes simultâneos: `orquestracao-ondas`
  - SQL/migration/RLS/goldens: `supabase-sql` | Commit/push/fim: `git-workflow` | Docs/README/POP: `gerador-docs`
  - UI/layout/PWA: `especialista-mobile` + `especialista-acessibilidade` | Libs/package.json/audit: `gestor-dependencias`
  - Features IA/OCR/prompt: `revisor-ia` | Custos (Supabase/Azure/IA/Lovable): `analista-custo-nuvem`
  - Chamados Teams/e-mail: `triagem-chamados` | Electron/SDK: `especialista-electron`
  - Deploy quebrou/revert: `agente-rollback` | Mudou agente/skill/hook/settings: `auditor-agentes` | Infra nova: `infraestrutura-projetos`
  - Jogos/Ports/Decomp/Recompilação/Modding (PS2, Xbox, N64, PC): `engenheiro-reversa-jogos` + `mod-orchestrator` + CLI `um` | VR Modding: `vr-game-modding` | Ports Navegador/Wasm: `wasm-game-ports`
- **Relatório final (sempre incluir 1 linha):** `Agentes: revisor-codigo ✔ · seguranca ✔ · testador ✔ build ok` (ou justificativa se pulou).

## 3. Contas GitHub & Regras por Contexto (Pessoal vs. Nitro)
Esta máquina possui duas contas autenticadas no GitHub CLI (`gh`):
- **`MateusD12` (Pessoal):** Repositórios pessoais, deploy livre via Vercel, branch padrão conforme o repo (`main` ou `Dev`).
- **`MateusDas12` (Nitro — orgs `nitro-vibecoding` e `technitro-delivery`):**
  - **Branch padrão:** SEMPRE **`Dev`** (`git clone --branch Dev`). Todo commit/push vai para `Dev`. **PROIBIDO** fazer push ou merge na `main` por conta própria.
  - **Exceção única:** `technitro-delivery/assisti-hub` usa a branch **`producao`** (exige build ok + "sim" explícito antes de cada push).
  - **Banco (Supabase Nitro):** Leitura livre; escrita (migration, DML, RLS) exige mostrar resumo SQL e confirmação quando em banco compartilhado da Nitro.
