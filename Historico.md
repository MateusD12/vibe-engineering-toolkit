# Histórico do Projeto — Vibe Engineering Toolkit

## Estado Atual do Projeto (24 de Outubro de 2026)

### Expansão VR Modding, WebAssembly Ports & Matching Decompilation (24/10/2026)
- **Contexto:** Análise do cenário de ponta da indústria (vídeo sobre a revolução de mods com IA no canal ORD Jogos, casos Maurice Heuman no MW2, Praydog UEVR e ports em browser).
- **Ação:**
  - Criação da skill `vr-game-modding`: desacoplamento de câmera, matrizes estéreo, injeção OpenXR/OpenVR e perfis UEVR (Unreal Engine 4/5) com mira 6DOF.
  - Criação da skill `wasm-game-ports`: compilação C/C++/Rust para WebAssembly/WebGPU via Emscripten com arquitetura Clean-Room 100% imune a DMCA (montagem virtual de assets locais via File System Access API).
  - Formalização do pipeline de Matching Decompilation no `mod-orchestrator` e `engenheiro-reversa-jogos` com validação de paridade de registradores via `objdiff`.
  - Atualização do catálogo para 25 agentes e 25 skills globais.
- **Impacto:** O toolkit cobre todo o ciclo de vida moderno de engenharia de jogos: de mods convencionais a portas de realidade virtual e execuções no navegador sem risco jurídico.

---

## Histórico de Alterações

### 24 de Outubro de 2026 — Adição de VR Modding, Ports Wasm e Matching Decomp
- **O que foi feito:** Integração das skills `vr-game-modding` e `wasm-game-ports`, formalização da esteira de matching decompilation inspirada no caso MW2/Hex-Rays, e atualização dos agentes `mod-orchestrator` e `engenheiro-reversa-jogos`.
- **Arquivos alterados:** `skills/vr-game-modding/SKILL.md`, `skills/wasm-game-ports/SKILL.md`, `agents/mod-orchestrator.md`, `agents/engenheiro-reversa-jogos.md`, `README.md`, `CLAUDE.md`, `GEMINI.md`.

### 24 de Outubro de 2026 — Integração do Pipeline de Engenharia Reversa e CLI `um`
- **O que foi feito:** Incorporação das ferramentas, playbooks e skills do `universal-modder`, elevação do catálogo para 25 agentes e 23 skills, instalação global do CLI `um` no Windows e atualização da documentação.
- **Arquivos alterados:** `README.md`, `CLAUDE.md`, `GEMINI.md`, `scripts/install.ps1`, `agents/engenheiro-reversa-jogos.md`, `skills/engenharia-reversa-jogos/SKILL.md`, novos agentes e skills em `agents/` e `skills/`.
- **Decisão técnica:** Configuração do cache offline permanente em `~/.universal-modder` com apontamento por `UM_KB` para garantir que comandos de busca na base de conhecimento (`um kb search`) operem instantaneamente sem depender de conexão de rede ou chamadas de API externas.

### 23 de Outubro de 2026 — Lançamento Inicial do Vibe Engineering Toolkit
- **O que foi feito:** Consolidação dos agentes especialistas, motor Obsidian Engine para geração de codemaps com zero tokens, protocolo de orquestração em ondas paralelas (Parallel Wave Dispatch) e regras de ESLint para corte de arquivos em 350 linhas. Criação e publicação do repositório no GitHub `MateusD12/vibe-engineering-toolkit`.
