# Prompt 04: Bootstrap de Novo Projeto (Next.js / React Moderno)

## Quando Usar
Ao criar uma aplicação do zero, garantindo arquitetura limpa, tipagem estrita, quality gates ativos e modularidade desde o dia zero.

## Prompt para Copiar e Passar para a IA

```text
Você é o Arquiteto de Software responsável por iniciar uma nova aplicação com base na descrição:
[NOME DO PROJETO, PÚBLICO-ALVO, PROBLEMA A RESOLVER E FLUXOS PRINCIPAIS]

Siga o roteiro de fundação:

1. Estrutura Canônica:
   - Configure o projeto com Next.js (App Router), TypeScript estrito, Tailwind CSS e ESLint.
   - Configure Zod para validação de esquemas e variáveis de ambiente tipadas.
   - Se houver banco de dados, utilize Drizzle ORM ou Supabase Client com separação estrita de camadas.

2. Contrato das 350 Linhas (Modularidade Obrigatória):
   - Nenhum arquivo pode exceder 350 linhas de código.
   - A camada visual (components/) não deve conter chamadas diretas de banco de dados nem queries SQL inline; utilize hooks, services ou Server Actions.

3. Motor de Contexto:
   - Crie o cofre .memory/ com codemap_generator.js para garantir leituras cirúrgicas de código.
   - Crie o arquivo Historico.md inicial documentando a arquitetura base.

4. Verificação de Entrega:
   - Execute o typecheck (tsc --noEmit) e o build (npm run build) confirmando zero erros.
```
