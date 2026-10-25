# Obsidian Engine — Economia Extrema de Tokens

Mecanismo local universal para reduzir o consumo de tokens das sessões de IA e dos subagentes: em vez de varrer o repositório, o agente consulta um **mapa local universal** (gerado por script Node.js ou Python, sem chamadas de IA e sem internet) com arquivos, funções, classes, structs, componentes e o número da linha de cada um, além do grafo de dependências (`imports.md`), e lê cirurgicamente só o trecho necessário.

## Conteúdo
| Caminho | O que é |
|---|---|
| `SKILL.md` | Skill do agente (protocolo: boot a custo zero, busca cirúrgica, subagentes e mapeamento progressivo) |
| `scripts/codemap_generator.js` | Motor local universal em Node.js (zero dependências — suporta TS/JS/React, Python, C/C++, C#, Rust, Go, Lua, SQL) |
| `scripts/codemap_generator.py` | Motor local alternativo em Python 3 (sem dependências externas) |
| `scripts/avaliar_harness.py` | Script utilitário para auditar a saúde e frescor dos mapas locais |

## Instalação
1. Copie a pasta da skill para a pasta de skills globais:
   - Claude Code: `~/.claude/skills/obsidian-engine/`
   - Antigravity / Gemini: `~/.gemini/config/skills/obsidian-engine/`
2. Reinicie as sessões para carregar a nova instrução.

## Uso
```bash
node ~/.claude/skills/obsidian-engine/scripts/codemap_generator.js <caminho_do_projeto>
```
- Só roda dentro de repositório git (opção `--forcar` disponível se necessário).
- Cria `.memory/` (`00-index`, `01-arquitetura`, `02-codemap`, `03-logs-sessao`) e registra `.memory/` em `.git/info/exclude`: o cofre permanece 100% local e não entra em commits.
- Ignora pastas de build (`node_modules`, `dist`, `build`, `target`, `out`) e arquivos binários/pesados.

## Segurança
O script opera exclusivamente em modo leitura local e escrita na pasta `.memory/` e `.git/info/exclude`. Sem chamadas de rede, sem telemetria e sem exposição de credenciais.
