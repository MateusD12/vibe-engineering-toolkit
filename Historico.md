# Histórico do Projeto — Vibe Engineering Toolkit

## Estado Atual do Projeto (24 de Outubro de 2026)

### Integração do Universal Modder & Pipeline de Engenharia Reversa (24/10/2026)
- **Contexto:** Necessidade de transformar o toolkit em uma máquina completa de engenharia reversa, análise de binários de jogos, ports nativos e modding seguro com economia de tokens e automação nativa.
- **Ação:**
  - Instalação e configuração do pacote `uv` e da ferramenta CLI `um` (`universal-modder`) no Windows.
  - Sincronização offline da base de conhecimento com mais de 100 notas técnicas via variável global `UM_KB`.
  - Integração de 12 novas skills de engenharia reversa e modding (`reverse-engineering`, `game-recon`, `game-automation`, `asset-pipeline`, `fal-assets`, `mod-any-game`, `mashup-mods`, `port-a-mod`, `publish-mod`, `share-field-notes`, `showcase-video`, `game-research-websearch`).
  - Integração do trio de agentes especializados em jogos (`mod-orchestrator`, `mod-game-worker`, `mod-offline-worker`) e atualização profunda do `engenheiro-reversa-jogos`.
  - Atualização dos scripts de instalação global em 1 clique (`scripts/install.ps1` e `scripts/install.sh`).
  - Sincronização de todos os agentes e skills globalmente em `~/.claude/` e `~/.gemini/config/`.
- **Impacto:** O ambiente conta agora com 25 agentes especialistas e 23 skills globais ativas em toda a máquina, com suporte a comandos rápidos como `um scan`, `um backup`, `um win` e `um kb search`.

---

## Histórico de Alterações

### 24 de Outubro de 2026 — Integração do Pipeline de Engenharia Reversa e CLI `um`
- **O que foi feito:** Incorporação das ferramentas, playbooks e skills do `universal-modder`, elevação do catálogo para 25 agentes e 23 skills, instalação global do CLI `um` no Windows e atualização da documentação.
- **Arquivos alterados:** `README.md`, `CLAUDE.md`, `GEMINI.md`, `scripts/install.ps1`, `agents/engenheiro-reversa-jogos.md`, `skills/engenharia-reversa-jogos/SKILL.md`, novos agentes e skills em `agents/` e `skills/`.
- **Decisão técnica:** Configuração do cache offline permanente em `~/.universal-modder` com apontamento por `UM_KB` para garantir que comandos de busca na base de conhecimento (`um kb search`) operem instantaneamente sem depender de conexão de rede ou chamadas de API externas.

### 23 de Outubro de 2026 — Lançamento Inicial do Vibe Engineering Toolkit
- **O que foi feito:** Consolidação dos agentes especialistas, motor Obsidian Engine para geração de codemaps com zero tokens, protocolo de orquestração em ondas paralelas (Parallel Wave Dispatch) e regras de ESLint para corte de arquivos em 350 linhas. Criação e publicação do repositório no GitHub `MateusD12/vibe-engineering-toolkit`.
