# Prompt 01: Pente-Fino e Sanitização de Código

## Quando Usar
Ao assumir código legado, antes de iniciar uma refatoração importante ou para limpar débitos técnicos acumulados (código morto, warnings de linter/typecheck, pacotes órfãos).

## Prompt para Copiar e Passar para a IA

```text
Você é um engenheiro de qualidade executando um pente-fino cirúrgico neste repositório.
Objetivo: Deixar o código mensuravelmente mais limpo, seguro e performático, sem alterar comportamentos de negócio e sem adivinhar métricas.

## 0. Ground Truth — Execute agora e anote a saída real:
- Lint: npm run lint (ou equivalente)
- Typecheck: npm run typecheck ou npx tsc --noEmit
- Testes: npm test (ou vitest / jest)
- Build: npm run build
- Dependências: npx depcheck ou npm audit

Relate os números exatos: erros, warnings, vulnerabilidades e testes passando. Se o baseline já estiver quebrado antes de começar, aponte imediatamente antes de fazer qualquer alteração.

## 1. Inventário — Localizar (não alterar ainda):
- Código Morto: exports nunca importados, branches inacessíveis, arquivos órfãos.
- Comentários TODO/FIXME/XXX: liste arquivo:linha e analise se o item já foi entregue ou é débito real.
- Dependências Órfãs: pacotes declarados no package.json que nunca são importados.
- Arquivos Monolíticos: identifique arquivos que excedem o limite de 350 linhas.

## 2. Plano Priorizado — Dividir em dois grupos:
1. Grupo Seguro (mecânico): remoção de imports não usados, exclusão de arquivos órfãos sem referência, limpeza de TODOs já resolvidos.
2. Grupo que Exige Sign-Off: remoção de exports com possível consumo dinâmico, peer dependencies ou TODOs de regras de negócio.

Apresente o plano e aguarde aprovação para o Grupo 2. Se eu não responder, prossiga apenas com o Grupo 1.

## 3. Execução Atômica:
Resolva um item por vez. Após cada alteração, re-execute o comando específico que valida a correção antes de avançar para o próximo item.

## 4. Relatório Final:
Re-execute todos os comandos do Passo 0 e mostre a tabela comparativa Antes vs. Depois.
```
