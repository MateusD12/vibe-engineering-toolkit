---
name: atualizar-historico
description: Atualiza o Historico.md do projeto ao fim de qualquer tarefa (inclusive diagnostico sem codigo). Use sempre antes de encerrar/commitar.
---

# Skill: Atualizar Historico.md do Projeto

## Quando usar
Obrigatório ao final de QUALQUER interação que envolva:
- Diagnóstico de bug (mesmo sem alterar código)
- Alteração de código
- Decisão de arquitetura
- Passos manuais executados (SQL, dashboard Supabase, Vercel, etc.)

## Onde fica o arquivo
Dentro da pasta do projeto registrado em `.claude/projects/<nome>.md`.
O campo "Contexto Completo do Projeto" aponta o caminho exato.

---

## O que atualizar

### 1. Seção "Estado Atual do Projeto" (topo do arquivo)
Substituir pela data de hoje e resumir o que foi feito/diagnosticado:

```markdown
## Estado Atual do Projeto (<dia> de <mês> de <ano>)

### <Título curto do que foi feito> (<dd/mm/aaaa>)
- **<contexto>:** <descrição objetiva do problema ou motivação>
- **<solução/ação>:** <o que foi feito, incluindo arquivos e trechos relevantes>
- **<impacto>:** <comportamento esperado após a mudança>
```

### 2. Seção "Histórico de Alterações" (final do arquivo)
Adicionar entrada nova sem remover as anteriores:

```markdown
### <dia> de <mês> de <ano> — <título>

- **O que foi feito:** <descrição>
- **Arquivos alterados:** `arquivo1`, `arquivo2` (se houver)
- **SQL executado:** (se houver — colar o bloco completo)
- **Passos manuais:** (se houver — ex: "configurado no Supabase Dashboard")
- **Decisão técnica:** (se houver algo não óbvio ou que impacte o futuro)
```

---

## Regras de escrita

- Datas sempre por extenso na seção de estado (`20 de maio de 2026`), numéricas no histórico (`20/05/2026`)
- Se o diagnóstico foi feito mas nenhum código foi alterado, registrar assim mesmo — contexto vale tanto quanto código
- SQL executado manualmente deve ser colado integralmente — nunca "executamos uma query de update"
- Não resumir demais: outra IA (ou você mesmo em outra sessão) precisa entender o que aconteceu sem contexto adicional
- Não duplicar informação que já está em seções permanentes do arquivo (stack, estrutura de arquivos) — só atualizar se houve mudança real

---

## Estratégia de archive (anti-inchaço)

Antes de escrever uma nova entrada, verificar o tamanho do arquivo:

```powershell
(Get-Content "<projeto>\Historico.md" | Measure-Object -Line).Lines
```

Se **mais de 100 linhas**: mover todas as seções `### <data>` com mais de 90 dias para `Historico_arquivo.md`, mantendo sempre: seção "Estado Atual", últimas 3 entradas, e qualquer nota com "IMPORTANTE".

Adicionar no topo do `Historico.md` após arquivar:
```markdown
> Entradas anteriores a <data> arquivadas em `Historico_arquivo.md`
```

---

## Quando NÃO é necessário
- Leituras/análises sem nenhuma alteração ou diagnóstico conclusivo
- Conversas exploratórias sem decisão tomada
