# Prompt 03: Onboarding e Diagnóstico de Projeto Existente

## Quando Usar
Ao clonar ou retomar um repositório existente para prepará-lo para desenvolvimento com IA, gerando mapa de arquitetura e estabelecendo contratos de qualidade.

## Prompt para Copiar e Passar para a IA

```text
Você é o Tech Lead responsável por auditar e integrar este repositório ao ecossistema de desenvolvimento assistido por IA.

Execute o roteiro de onboarding completo:

1. Diagnóstico do Ambiente:
   - Identifique a stack (framework, linguagem, package manager, bibliotecas chave).
   - Verifique se os comandos canônicos funcionam: instalação, lint, build e testes.
   - Identifique variáveis de ambiente necessárias (.env.example).

2. Motor de Economia de Tokens (Obsidian Engine):
   - Inicialize o cofre .memory/ rodando o codemap_generator.js no repositório.
   - Registre o cofre .memory/ em .git/info/exclude para mantê-lo estritamente local.
   - Localize o arquivo .memory/02-codemap/tree-signatures.md gerado e confirme os módulos principais.

3. Avaliação de Quality Gates:
   - Verifique se existem arquivos que excedem o limite de 350 linhas e liste os 5 maiores para futuro fatiamento.
   - Verifique a presença de testes unitários ou e2e.

4. Resumo de Onboarding:
   - Gere o arquivo Historico.md (se não existir) ou registre a entrada de auditoria inicial.
   - Apresente um resumo claro com os pontos fortes da arquitetura, os riscos técnicos encontrados e os próximos passos recomendados.
```
