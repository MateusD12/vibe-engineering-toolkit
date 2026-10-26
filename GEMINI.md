# Vibe Engineering Toolkit — Diretrizes de Engenharia & Modo Turbo

## 0. Autonomia & Modo Turbo
O toolkit opera em **Modo Turbo** com execução fluida, autônoma e assíncrona.
- Comandos como `git clone`, `curl`, `npm install`, `gh`, `um`, `cmake`, `clang++`, `cargo` são executados diretamente sem bloqueios desnecessários.
- Pule etapas burocráticas de espera de aprovação de plano e execute de forma contínua e técnica.
- Qualquer projeto novo ou existente — seja **app web/mobile, backend/SQL, sistema, engenharia reversa, recompilação, port nativo ou mod de jogo** — opera automaticamente neste **Modo Turbo**.
- Interrompa a execução apenas se houver decisão de negócio ambígua ou escrita destrutiva em banco de produção.

## 1. Economia Estrita de Tokens (Obsidian Engine Universal — OBRIGATÓRIO)
Em **qualquer projeto** (Web/TS/React, Python, C/C++, C#, Rust, Go, Lua, SQL, jogos ou sistemas), operamos com `.memory/` + skill `obsidian-engine`:
- **Boot a custo zero:** Ao trabalhar no repositório de um projeto, se `.memory/02-codemap/tree-signatures.md` não existir, gere o mapa local passando a pasta do projeto:
  `node ~/.claude/skills/obsidian-engine/scripts/codemap_generator.js <pasta-do-projeto>`
  O script suporta multi-linguagem (`.ts`, `.tsx`, `.js`, `.py`, `.c`, `.cpp`, `.h`, `.hpp`, `.cs`, `.rs`, `.go`, `.lua`, `.sql`), gera o grafo de dependências `.memory/02-codemap/imports.md`, alerta arquivos `⚠ acima de 350 linhas` e registra `.memory/` em `.git/info/exclude` (cofre local: não entra em commit nem sobe para o remoto).
- **Sem varredura cega:** Consulte primeiro `.memory/00-index/MOC-geral.md`, `tree-signatures.md` (buscando pelo nome via Grep) e `imports.md` (para ver quem o arquivo usa e quem o usa). Prefira leitura parcial com `offset`/`limit` em arquivos grandes.
- **Subagentes cirúrgicos:** Ao chamar subagentes, envie no prompt os arquivos e linhas exatas afetadas sem varredura do zero.
- **Mapeamento progressivo:** Ao concluir alterações de código, atualize o codemap via `codemap_generator.js`, registre a nota do módulo em `.memory/01-arquitetura/` com `[[wikilinks]]` e rode a skill `atualizar-historico`.

## 2. Pipeline de Agentes & Orquestração em Ondas (`orquestracao-ondas`)
- **Orquestração em Ondas Paralelas (Parallel Wave Dispatch):**
  - Ao dividir tarefas entre múltiplos subagentes, anote: `Files: [...]`, `Resources: [...]` e `Depends-on: [...]`.
  - Tarefas só rodam na mesma onda se os arquivos forem **estritamente disjuntos** (`Files(A) ∩ Files(B) = ∅`).
  - **Subagentes implementadores NUNCA commitam:** deixam as alterações na working tree e reportam. Apenas o agente coordenador principal realiza commits atômicos no `HEAD`.
- **Regra de Ouro das 350 Linhas (Quality Gate):**
  - Arquivos de código de aplicação **não devem exceder 350 linhas**.
  - Passou de 350 linhas? Fatie imediatamente: lógica de estado vai para *Custom Hooks*, blocos visuais para *sub-componentes*, chamadas de dados para *services/repositories* (ou módulos C++/Python/C# coesos).
- **Alterou código (antes do commit, proporcional ao risco):**
  1. `revisor-codigo` (qualidade, limites de 350 linhas, tipos);
  2. `seguranca` (se tocar auth, RLS, dados, rotas, uploads ou segredos);
  3. `testador` (build/typecheck e teste funcional no preview/local/jogo);
  4. `pentester` + `tech-lead` (mudança grande/sensível; `tech-lead` consolida).
- **APP / JOGO NOVO / SESSÃO NOVA (antes do 1º código):**
  - **Apps e Sistemas:** 1. `descoberta-agentes` → 2. `engenheiro-prompts` → 3. `arquiteto` → 4. `infraestrutura-projetos` → 5. `git-workflow` (`Historico.md` + `codemap_generator.js`).
  - **Jogos, Ports e Mods:** 1. `engenheiro-reversa-jogos` + `mod-orchestrator` (`um scan` / `um kb search` / `ps2_native_port.py`) → 2. `codemap_generator.js` → 3. Workers (`mod-offline-worker` / `mod-game-worker`) → 4. `testador` + `git-workflow`.

## 3. Stack $0: Inferência Local, APIs Gratuitas & Auto-Cura
- **Inferência Local a Custo Zero ($0 Tokens):** Tarefas em lote, categorização em massa de transações/dados, simulações de jogadas e rascunhos de código podem ser roteados para o **Ollama local** (`http://localhost:11434/v1`) usando `skills/ollama-local-llm` com modelos leves (`qwen2.5-coder:7b`, `llama3.2:3b`, `deepseek-r1:8b`). Custo zero de cota ou cartão.
- **Web Scraping Indetectável:** Coleta de dados web e extração de documentação protegida usam `skills/scrapling-crawler` (Scrapling + Camoufox) com bypass automático de Cloudflare/Turnstile.
- **APIs Gratuitas & Free-for-Dev:** Consulte `skills/catalogo-apis-gratuitas` antes de integrar serviços pagos. Priorize Scryfall (TCG), Open Food Facts (Fitness), Banco Central/AwesomeAPI (Finanças) e infraestrutura sem custo (Supabase Free, Cloudflare R2/Workers, Neon, Turso).
- **Ciclo de Auto-Cura Autônomo:** Ao encontrar erros de compilação ou testes, execute o loop autônomo de auto-cura (`skills/ciclo-auto-cura` inspirado no OpenHands): leia o erro no stderr, aplique a correção cirúrgica e re-teste até 100% verde sem interromper o usuário para falhas mecânicas.

## 4. Git & Workflow (Branch Padrão: `main`)
- Todos os repositórios trabalham direto na branch `main` (`git push origin main`).

## 5. Higiene de Código, Privacidade & Boas Práticas Globais (OBRIGATÓRIO)
- **Zero Vazamento de Dados Pessoais / Máquina:** NUNCA escrever ou commitar caminhos absolutos locais com nomes de usuários do Windows (ex: `C:\Users\...`, perfis de hardware pessoal), senhas, segredos ou arquivos `.env`. Utilize sempre variáveis de ambiente genéricas (`$env:USERPROFILE`, `~`, `%LOCALAPPDATA%`) ou caminhos relativos ao projeto.
- **Escopo 100% Pessoal / Open Source:** Nenhuma menção, token, repositório ou dependência corporativa deve ser vinculada ou comitada neste ambiente.
- **Verificação Pré-Commit:** Antes de executar `git commit`, verifique `git diff` e `git status` para garantir que arquivos de configuração sensíveis ou lixo de build não foram incluídos.
