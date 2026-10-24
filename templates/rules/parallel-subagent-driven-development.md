# Protocolo de Orquestração em Ondas Paralelas (Parallel Wave Dispatch)

Este protocolo define a matemática e o fluxo operacional seguro para execução concorrente de subagentes.

---

## 1. Problema que este protocolo resolve
- **Colisão de escrita (Write Clobber):** Dois agentes editam seções do mesmo arquivo ao mesmo tempo, e uma alteração sobrescreve a outra silenciosamente.
- **Corrida de Commit (Race Condition Git):** Agentes tentando commitar simultaneamente geram conflitos de `HEAD`, misturam mudanças não relacionadas em commits monolíticos ou quebram o histórico.
- **Colisão de Recursos:** Testes e builds concorrentes disputando a mesma porta, pasta de dist (`dist/`, `.next/`) ou banco de dados de teste.

---

## 2. A Regra Matemática das Ondas (Wave Formation)

Toda tarefa no plano deve ser anotada com 3 campos estritos:
- **`Files:`** Lista exata dos caminhos de arquivos criados ou modificados.
- **`Resources:`** Portas, diretórios de build, tabelas ou variáveis mutáveis (ou `none`).
- **`Depends-on:`** IDs de tarefas anteriores das quais esta tarefa depende (ou `none`).

### Critérios de Agrupamento em Ondas:
Duas tarefas **T_A** e **T_B** só podem rodar na **MESMA ONDA** se TODAS as 3 condições forem verdadeiras:
1. **Sem dependência:** `T_B` não está na cadeia de dependência de `T_A`, nem vice-versa.
2. **Arquivos Estritamente Disjuntos:** `Files(T_A) ∩ Files(T_B) = ∅`. Se tocarem o mesmo arquivo, **NUNCA** rodam na mesma onda (devem rodar em ondas sequenciais ou ser unificadas em uma única tarefa).
3. **Recursos Independentes:** Os recursos mutáveis são isolados ou `none`.

> [!IMPORTANT]
> **Regra do Fail-Safe:** Se houver qualquer dúvida sobre quais arquivos serão tocados ou se o escopo for genérico ("arquivos do frontend"), a tarefa degrada automaticamente para **execução serial** (uma onda só para ela). Nunca adivinhe escopo menor do que você sabe.

---

## 3. Ciclo de Execução por Onda (Onda a Onda)

Para cada onda, em ordem:

1. **Briefing Fechado:** Envie para cada subagente o escopo cirúrgico (arquivos e linhas do `tree-signatures.md`), critérios de aceite e ferramentas.
2. **Despacho Concorrente:** Dispare os subagentes da onda simultaneamente.
3. **Implementadores NUNCA Commit:** Os subagentes fazem edições, rodam typechecks isolados, mas deixam suas alterações na working tree e reportam os arquivos tocados.
4. **Coordenador faz o Commit:** Somente o agente coordenador principal faz o commit de cada tarefa, uma a uma, capturando o `HEAD` fresco imediatamente antes de cada commit.
5. **Revisores Read-Only:** Dispare revisores (`revisor-codigo`, `seguranca`) de forma somente leitura contra os diffs/commits da onda.
6. **Log Único:** Atualize `.memory/` e `Historico.md` uma única vez por onda completa, evitando concorrência no arquivo de log.
