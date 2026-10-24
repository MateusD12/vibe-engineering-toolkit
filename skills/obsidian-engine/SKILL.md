---
name: obsidian-engine
description: Motor global de economia de tokens estilo Obsidian. Inicializa cofres .memory, gera mapas de código via script local (Node.js/Python) a custo zero e guia subagentes com leitura cirúrgica de linhas.
---

# Obsidian Engine (Global Token Saver)

Você utiliza um grafo local na pasta `.memory/` de cada projeto para evitar leituras completas de arquivos e varreduras às cegas, tanto na sessão principal quanto nos subagentes. Documentação completa: `README.md` desta pasta.

## 1. Inicialização a Custo Zero (Boot)
Ao começar a trabalhar no repositório de um projeto (`C:\Projetos\<app>`):
1. Verifique se existe `<app>/.memory/02-codemap/tree-signatures.md`.
2. Se **não existir**, rode passando a pasta do projeto:
   `node "C:/Users/Pichau/.claude/skills/obsidian-engine/scripts/codemap_generator.js" "C:/Projetos/<app>"`
   *(Também disponível em Python via `codemap_generator.py` se houver Python instalado, mas no PC pessoal `node` é nativo e zero-dependências).*
3. O script só roda dentro de repositório git (recusa Downloads/OneDrive) e registra `.memory/` em `.git/info/exclude` (exclusão local, que não é versionada): o cofre não entra em commit, não sobe para o remoto e não mexe no `.gitignore`. A opção `--forcar` (rodar fora de repo) só com pedido explícito do Mateus.
4. Não mapeie o projeto à mão: o script cria a estrutura `.memory/` e extrai funções, classes, componentes tipados e linhas a custo zero.

## 2. Protocolo de Busca Cirúrgica (Leitura Parcial)
Antes de abrir código:
1. Leia `.memory/00-index/MOC-geral.md` e o topo do `Historico.md` (primeiras ~60 linhas, se existir).
2. Se houver `[[wikilink]]` do módulo em `.memory/01-arquitetura/`, leia só essa nota.
3. Ache o arquivo e a linha no `tree-signatures.md` **buscando pelo nome** (Grep no mapa), em vez de abrir o mapa inteiro — em repositório grande ele tem milhares de linhas.
4. Prefira leitura parcial com `offset`/`limit` (`StartLine`/`EndLine`, janela de 40–80 linhas) em arquivos grandes. Ler o arquivo inteiro continua permitido quando o contexto completo for necessário para não errar.
5. Busca por texto (Grep) continua liberada para achar um termo específico; o que se evita é varrer o repositório sem alvo.

## 3. Economia nos Subagentes (CRÍTICO)
Sempre que invocar um subagente (`revisor-codigo`, `seguranca`, `testador`, `pentester`, `supabase-sql`, etc.):
- **Passe no prompt do subagente** os arquivos exatos e os intervalos de linhas que você alterou ou mapeou via `tree-signatures.md`.
- Instrua o subagente: *"Não escaneie o repositório inteiro. Analise diretamente os arquivos X nas linhas Y-Z e consulte `.memory/02-codemap/tree-signatures.md` se precisar de contexto adjacente."*
- **Exceção — revisores de risco:** `seguranca`, `pentester`, `auditor-agentes` e `tech-lead` recebem as linhas alteradas como ponto de partida, mas PODEM ampliar a busca (rotas, RLS, migrations, uso de segredo) quando houver risco. Não limite a cobertura deles.

## 4. Mapeamento Progressivo (No Fechamento da Tarefa)
Em projetos antigos, **NUNCA** documente o repositório inteiro de uma vez. Documente apenas o que tocar na sessão atual:
1. Rode de novo `node "C:/Users/Pichau/.claude/skills/obsidian-engine/scripts/codemap_generator.js" "C:/Projetos/<app>"` para atualizar as linhas.
2. Crie/atualize a nota atômica do módulo alterado em `.memory/01-arquitetura/<modulo>.md` usando `[[wikilinks]]` e referencie no `MOC-geral.md`.
3. Acione a skill `atualizar-historico` para registrar a entrega no `Historico.md`.
