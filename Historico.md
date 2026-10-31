# Histórico do Projeto — Vibe Engineering Toolkit

## Estado Atual do Projeto (31 de Outubro de 2026)

### Central Powerhouse v2.5, Gather.town 2D Office, Multi-Agent Pipeline & Push Notifier (31/10/2026)
- **Contexto:** Lançamento da interface visual imersiva estilo Gather.town (16-bit RPG) e esteira de pipeline neon para a orquestração em tempo real dos 103 agentes e 194 skills, com controle remoto de voz via Telegram e proteção estrita de créditos ($0 Tokens).
- **O que foi feito:**
  - **Skill `ceia-lumi` (`skills/ceia-lumi/SKILL.md`):** Formalizada a documentação da IA soberana brasileira de 4B de parâmetros rodando na porta 8000 a $0 de tokens.
  - **Escritório Virtual Gather.town:** Layout contínuo de 4.400px com 9 setores, 103 estações de trabalho, card flutuante oficial no topo direito, área externa com bétulas e grama, cafeteria com vapor animado, lounge com mesa de ping-pong e navegação por Pan & Drag com o mouse.
  - **Dashboard Multi-Agent Pipeline:** Esteira de cards neon integrada (`New Request` ➔ `Lead Qualifier` ➔ `Auto-Responder` ➔ `Task Manager`), Integration Layer com 5 conectores e 3 KPIs em tempo real.
  - **Telegram Agent Bridge v2.2:** Transcrição offline via Faster-Whisper, heartbeats de progresso ao vivo durante tarefas longas, Smart Auto-Routing para IAs locais ($0) e auto-fallback transparente caso os créditos de nuvem acabem.
  - **Sistema de Notificações Remotas (`notifier.py`):** Push notifications diretas no celular para rotinas periódicas de 2 em 2 horas e ações concluídas no computador.
  - **Rotina Autônoma Periódica (2h):** Varredura nos projetos, limpeza automática de centenas de pastas de cache (`__pycache__`) e fiscalização da Regra das 350 Linhas.
- **Impacto:** O toolkit passa a oferecer visualização viva e espacial de todos os agentes trabalhando simultaneamente, com total transparência e acompanhamento no celular.

---

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

### Blindagem Global de Privacidade, Sanitização & Propagação de Boas Práticas (25/10/2026)
- **Contexto:** Garantir que nenhuma sessão nova contenha ou comite caminhos da máquina local (`C:\Users\...`), perfis pessoais ou credenciais, e que o hook global `lembrar-fluxo.js` e as diretrizes propaguem essas boas práticas para qualquer repositório.
- **Ação:**
  - **Hook Global `lembrar-fluxo.js`:** Expandido com novos gatilhos para SEO técnico, síntese de voz local, scraping indetectável e alerta estrito contra caminhos absolutos locais em commits.
  - **Diretrizes Globais (`CLAUDE.md` e `GEMINI.md`):** Formalização da Regra 5 de Higiene de Código, Privacidade e Escopo 100% Pessoal / Open Source.
  - **Auditoria de Sanitização:** Varredura em 100% dos arquivos do repositório confirmando ausência total de caminhos de hardware pessoal ou nomes corporativos.
  - **Sincronização Global:** Execução do `install.ps1` propagando as atualizações para `~/.claude` e `~/.gemini/config/skills`.
- **Impacto:** Todas as novas conversas em qualquer projeto herdam automaticamente as diretrizes de privacidade e as 34 skills do toolkit.

---

## Histórico de Alterações

### 28 de Outubro de 2026 — Integração Soberana Lumi 4B, Telegram Agent Bridge v2.0, TRIBE v2 & Auditoria 360°
- **Contexto:** Incorporação das novidades apresentadas no *AI Brasil Experience 2026*: o modelo soberano brasileiro CEIA Lumi 4B, o modelo preditivo neurocientífico TRIBE v2 da Meta FAIR, a ponte de controle remoto via Telegram com memória contínua (`agy` CLI) e a formalização do Conselho de IAs para auditoria unificada 360°.
- **O que foi feito:**
  - **CEIA Lumi 4B Local (`C:\Projetos\ceia-lumi`):** Download dos pesos oficiais (7.95 GB) no SSD, auto-cura para compatibilidade com Windows/CPU (eliminando dependência de Triton/mamba_ssm, corrigindo cache_position e removendo torch.cuda.stream forçado). Scripts de chat interativo e API local OpenAI-compatible na porta 8000.
  - **Telegram Agent Bridge v2.0 (`C:\Projetos\telegram-agent`):** Bot de controle remoto do PC via Telegram com pareamento seguro de ID, `/status` de hardware e IAs, `/print` de tela do PC, memória contínua de contexto via `agy --continue`, recebimento de fotos/áudios e envio automático de documentos gerados (`.docx`, `.txt`).
  - **Skill `auditoria-360` (`skills/auditoria-360/SKILL.md`):** Protocolo do Conselho de IAs disparado pelo comando único *"Avalia o app e veja possíveis erros, melhorias e etc"*, orquestrando Qwen (código), Lumi (PT-BR e privacidade) e TRIBE v2 (cognitivo).
  - **Skill `telegram-agent-bridge` (`skills/telegram-agent-bridge/SKILL.md`):** Documentação técnica completa da ponte móvel Telegram-PC.
  - **Skill `tribe-v2-cognitivo` (`skills/tribe-v2-cognitivo/SKILL.md`):** Mapeamento do modelo fundacional trimodal da Meta FAIR para avaliação de estímulo e sobrecarga cognitiva.
  - **Atualização de `skills/ollama-local-llm`:** Inclusão do Lumi 4B como motor soberano brasileiro de texto e análise.
- **Arquivos alterados:** `Historico.md`, `skills/auditoria-360/SKILL.md`, `skills/telegram-agent-bridge/SKILL.md`, `skills/tribe-v2-cognitivo/SKILL.md`, `skills/ollama-local-llm/SKILL.md`.

### 25 de Outubro de 2026 — Blindagem de Privacidade & Hook Global
- **O que foi feito:** Adição da Regra 5 em `CLAUDE.md` e `GEMINI.md`, expansão de `hooks/lembrar-fluxo.js`, atualização do `Historico.md`, validação de sanitização e sincronização global.
- **Arquivos alterados:** `CLAUDE.md`, `GEMINI.md`, `hooks/lembrar-fluxo.js`, `Historico.md`.

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
