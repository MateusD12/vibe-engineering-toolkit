# Histórico do Projeto — Vibe Engineering Toolkit

## Estado Atual do Projeto (25 de Outubro de 2026)

### Upgrade Powerhouse: Inferência Local $0, APIs Gratuitas, Stealth Scraping & Auto-Cura (25/10/2026)
- **Contexto:** Transformar a máquina local e o toolkit em uma potência de desenvolvimento livre de custos de tokens e assinaturas de APIs, aproveitando as melhores práticas dos 10 repositórios de referência (`ollama`, `Scrapling`, `public-apis`, `free-for-dev`, `OpenHands`, `awesome-mcp-servers`).
- **Ação:**
  - **Inferência Local $0 Tokens (`skills/ollama-local-llm`):** Padrão de integração com Ollama via endpoint OpenAI compatível (`http://localhost:11434/v1`). Roteamento de tarefas em lote, categorização de extratos para o `app-cartao`, regras de cartas para o `mesa-tcg` e rotinas de treino para o `fitquest` sem consumir créditos do Gemini ou Claude.
  - **Stealth Web Scraping (`skills/scrapling-crawler`):** Framework de scraping ultrarrápido em Python com Scrapling + Camoufox para contornar Cloudflare e Turnstile e extrair documentação e dados públicos de forma indetectável.
  - **Catálogo de APIs Abertas & Free-for-Dev (`skills/catalogo-apis-gratuitas`):** Mapeamento cirúrgico de APIs gratuitas e sem chave por projeto (Scryfall para TCG, Open Food Facts para Fitness, Banco Central/AwesomeAPI para Finanças) e arquitetura de infraestrutura com custo zero (Supabase Free, Cloudflare R2/Workers, Neon, Turso).
  - **Catálogo Curado MCP (`skills/mcp-catalog`):** Seleção dos melhores servidores MCP para Ollama local, SQLite, PostgreSQL e Playwright.
  - **Ciclo de Auto-Cura Autônomo (`skills/ciclo-auto-cura`):** Padrão inspirado no OpenHands para auto-correção de código via análise de stderr/diagnósticos em até 3 iterações antes de solicitar intervenção humana.
  - **Atualização das Diretrizes Globais:** `CLAUDE.md` e `GEMINI.md` atualizados com as regras da Stack $0.
- **Impacto:** O ecossistema passa a permitir prototipagem e desenvolvimento de features de IA ilimitadas com R$ 0,00 de custo de API.

### Expansão Multimodal & Inteligência: Voz Local, SEO Técnico & Benchmarks Financeiros (25/10/2026)
- **Contexto:** Incorporação de superpoderes derivados dos repositórios VoiceStudio, Paperclip, Vibe-Trading, Gods-Eye-View, OpenMAIC, Magnitude e OpenSEO.
- **Ação:**
  - **Síntese de Voz Local ($0 ElevenLabs):** Criação da skill `skills/voz-audio-local` baseada no VoiceStudio, permitindo gerar falas de NPCs para mods, locução para o Mesa TCG e áudio-coach para o FitQuest sem gastar tokens.
  - **SEO Técnico & Core Web Vitals:** Criação da skill `skills/seo-tecnico` inspirada no OpenSEO para auditoria de SSR/SSG, metatags, schema JSON-LD e Web Vitals.
  - **Inteligência de Mercado no App Cartão:** Incorporação de benchmarks de CDI/Selic e dados abertos inspirados no Vibe-Trading em `skills/catalogo-apis-gratuitas`.
- **Impacto:** O toolkit cobre agora áudio neural local, SEO técnico completo e inteligência financeira sem custos de API.

---

## Histórico de Alterações

### 25 de Outubro de 2026 — Expansão Multimodal (Voz Local, SEO Técnico & Vibe-Trading)
- **O que foi feito:** Criação de `skills/voz-audio-local/SKILL.md` e `skills/seo-tecnico/SKILL.md`. Atualização de `skills/catalogo-apis-gratuitas/SKILL.md`, `README.md` e sincronização global.
- **Arquivos alterados:** `skills/voz-audio-local/SKILL.md`, `skills/seo-tecnico/SKILL.md`, `skills/catalogo-apis-gratuitas/SKILL.md`, `README.md`, `Historico.md`.

### 25 de Outubro de 2026 — Upgrade Powerhouse (Ollama, Scrapling, Free APIs & Auto-Cura)
- **O que foi feito:** Criação das skills `ollama-local-llm`, `scrapling-crawler`, `catalogo-apis-gratuitas`, `mcp-catalog`, `ciclo-auto-cura` e upgrade de `analista-custo-nuvem`. Atualização de `CLAUDE.md` e `GEMINI.md`.
- **Arquivos alterados:** `skills/ollama-local-llm/SKILL.md`, `skills/scrapling-crawler/SKILL.md`, `skills/catalogo-apis-gratuitas/SKILL.md`, `skills/mcp-catalog/SKILL.md`, `skills/ciclo-auto-cura/SKILL.md`, `skills/analista-custo-nuvem/SKILL.md`, `CLAUDE.md`, `GEMINI.md`, `Historico.md`.

### 24 de Outubro de 2026 — Pente-Fino Global & Modo Turbo Universal
- **O que foi feito:** Upgrade multi-linguagem no `codemap_generator.js` (C/C++/C#/Rust/Go/Lua), criação de `hooks/lembrar-fluxo.js`, `commands/atualizar.md`, `commands/novo-projeto.md` e `templates/claude-settings.json`, evolução do `scripts/install.ps1` e pré-indexação `.memory/` em todos os repositórios do workspace.
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
