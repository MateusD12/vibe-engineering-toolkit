# Prompt 06: Fatiamento de Arquivos Monolíticos (> 350 Linhas)

## Quando Usar
Quando um componente ou arquivo de serviço ultrapassa o limite de 350 linhas e precisa ser quebrado cirurgicamente sem alterar comportamento visual ou funcional.

## Prompt para Copiar e Passar para a IA

```text
Você é o Especialista em Refatoração e Arquitetura de Software.
Objetivo: Fatiar o arquivo [CAMINHO_DO_ARQUIVO] (que atualmente possui X linhas) para que todos os arquivos resultantes fiquem abaixo de 350 linhas, preservando 100% dos comportamentos e testes existentes.

Siga a estratégia de decomposição:

1. Análise de Responsabilidades:
   - Identifique estados locais, formulários, efeitos colaterais e mutações.
   - Identifique sub-blocos visuais independentes (cabeçalhos de tabela, cards de item, filtros, diálogos/modais).
   - Identifique funções utilitárias ou regras de cálculo.

2. Extração Ordenada:
   - Passo 1: Extrair a lógica de estado e handlers para um Custom Hook dedicado (`use<NomeFeature>.ts`).
   - Passo 2: Extrair sub-componentes visuais para a pasta `components/` ou sub-pasta correspondente.
   - Passo 3: Extrair tipos e schemas para arquivo separado (`types.ts`).

3. Garantia de Invariantes:
   - O arquivo principal deve se tornar um orquestrador enxuto (normalmente < 150 linhas).
   - O build (npm run build) e o typecheck (npx tsc --noEmit) devem passar sem nenhum erro.
   - Nenhuma prop ou comportamento deve ser quebrado.
```
