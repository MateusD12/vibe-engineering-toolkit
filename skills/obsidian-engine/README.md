# Obsidian Engine — economia de tokens no Claude Code

Mecanismo do Time de IA da NITRO para reduzir o consumo de tokens das sessões do Claude Code e dos subagentes: em vez de varrer o repositório, o Claude consulta um **mapa local** (gerado por um script Python, sem IA e sem internet) com arquivos, funções, componentes e o número da linha de cada um, e lê só o trecho necessário. O conhecimento de cada módulo fica em notas no estilo Obsidian (`[[links]]`).

Documentação completa: `docs/POP_Obsidian-Engine-Economia-de-Tokens.docx` (POP NITRO-POP-IA-OBSIDIAN-001) e `docs/README-tecnico.md`.

## Conteúdo
| Caminho | O que é |
|---|---|
| `skill/SKILL.md` | Skill do Claude Code (protocolo: boot, busca cirúrgica, subagentes, mapeamento progressivo) |
| `skill/scripts/codemap_generator.py` | Motor local (Python 3, sem dependências) |
| `CLAUDE-snippet.md` | Trecho para colar no seu `~/.claude/CLAUDE.md` (torna o protocolo obrigatório) |
| `docs/` | POP e documentação técnica |

## Instalação (por usuário)
1. Copie a pasta `skill/` para `~/.claude/skills/obsidian-engine/` (no Windows: `%USERPROFILE%\.claude\skills\obsidian-engine\`).
2. Cole o conteúdo de `CLAUDE-snippet.md` no início do seu `~/.claude/CLAUDE.md`.
3. Confira o Python: no Windows use `py` (o comando `python` costuma ser o atalho da Microsoft Store e falha).
4. Reinicie as sessões do Claude Code para elas lerem a regra nova.

## Uso
```
py ~/.claude/skills/obsidian-engine/scripts/codemap_generator.py C:/Projetos/projetos/<app>
```
- Só roda dentro de repositório git (recusa Downloads/OneDrive; `--forcar` só se necessário).
- Cria `<app>/.memory/` (00-index, 01-arquitetura, 02-codemap, 03-logs-sessao) e registra `.memory/` em `.git/info/exclude`: o cofre é local e não entra em commit.
- Ignora `node_modules`, `dist`, `build`, pastas ocultas e arquivos acima de 1 MB.

## Segurança
O script só lê arquivos locais e escreve em `<repo>/.memory/` e `<repo>/.git/info/exclude`. Sem rede, sem credenciais. Mudanças na skill passam pelo agente `auditor-agentes`.

## Branches
Trabalho na `Dev`. Não usar a `main`.

Uso interno NITRO — confidencial.
