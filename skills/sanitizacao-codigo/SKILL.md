---
name: sanitizacao-codigo
description: Executa um pente-fino cirúrgico no código (código morto, warnings de lint/typecheck, dependências órfãs, TODOs obsoletos) medindo antes e depois sem quebrar o baseline. Use ao limpar código legado, preparar release ou refatorar.
---

# Pente-Fino e Sanitização de Código (Codebase Sanitation)

Esta skill estabelece o processo de limpeza cirúrgica de uma base de código sem alterar comportamento e sem adivinhar métricas de qualidade.

---

## 1. Passo 0 — Ground Truth (Medir o Baseline Real)
Antes de editar qualquer arquivo, rode e anote os números literais reais:
- **Lint:** `npm run lint` ou equivalente
- **Typecheck:** `npm run typecheck` ou `npx tsc --noEmit`
- **Testes:** `npm test` ou `vitest run`
- **Build:** `npm run build`
- **Auditoria / Dependências:** `npm audit` / `npx depcheck`

Se qualquer um desses já estiver quebrando antes de começar, **avise imediatamente**. Não construa refatoração sobre um baseline já quebrado.

---

## 2. Passo 1 — Inventário (Buscar, não mexer ainda)
Mapeie os candidatos a limpeza:
1. **Código Morto:** Exports nunca importados, branches inacessíveis, arquivos órfãos não linkados.
2. **Marcadores:** `TODO`, `FIXME`, `XXX` com caminho de arquivo, linha e avaliação se o item já foi resolvido ou é um débito real.
3. **Dependências Órfãs:** Pacotes declarados no `package.json` que nunca são importados no código.
4. **Arquivos fora do limite de 350 linhas:** Mapear arquivos monolíticos que precisam de fatiamento.

---

## 3. Passo 2 — Classificação em Duas Frentes
Divida os achados em:
- **Grupo 1: Seguro / Mecânico (Execução livre):**
  - Remover imports não utilizados.
  - Deletar arquivos órfãos comprovadamente sem referência.
  - Remover comentários `TODO` de tarefas já entregues.
  - Formatar e corrigir warnings simples de linter.
- **Grupo 2: Exige Confirmação (Pede sinal verde):**
  - Remoção de exports públicos ou dependências que possam ser consumidas dinamicamente ou como peer dependencies.
  - Débitos arquiteturais ou `TODO`s que documentam limitações de negócio conhecidas.

---

## 4. Passo 3 — Execução Atômica
- Resolva **um item por vez** — nunca um pacote monolítico de 15 arquivos misturando correções não relacionadas.
- Após cada alteração, rode o teste ou comando específico que comprova a correção.

---

## 5. Passo 4 — Relatório Antes vs. Depois
Re-execute todos os comandos do Passo 0 e mostre a tabela comparativa:
| Verificação | Antes | Depois | Status |
|---|---|---|---|
| Lint Warnings | X | 0 | ✔ |
| Erros TypeScript | Y | 0 | ✔ |
| Testes Unitários | Z passando | Z passando | ✔ |
| Build Produção | OK / Falhou | OK | ✔ |
| Deps Não Usadas | N | 0 | ✔ |
