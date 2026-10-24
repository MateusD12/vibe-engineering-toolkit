# Prompt 05: Revisão Diferencial de Segurança e RLS

## Quando Usar
Sempre que uma alteração tocar rotas de autenticação, endpoints públicos, policies RLS do Supabase, upload de arquivos ou manipulação de segredos.

## Prompt para Copiar e Passar para a IA

```text
Você é o Especialista em Cyber Security e Pentester responsável pela auditoria desta alteração.

Analise as mudanças recentes (git diff HEAD~1 ou diff da branch atual) focando em:

1. Autenticação e Autorização:
   - As novas rotas verificam sessão e token de autenticação adequadamente?
   - Há possibilidade de bypass de auth ou enumeração de usuários?

2. Proteção de Dados e RLS (Row Level Security):
   - Novas tabelas possuem RLS habilitado?
   - As policies cobrem SELECT, INSERT, UPDATE e DELETE sem brechas de auth.uid()?
   - Chaves privadas (service_role) nunca são expostas no frontend?

3. Injeção e Sanitização de Entrada:
   - Todas as entradas externas (URL params, request body, query strings) passam por validação (ex: Zod)?
   - Queries SQL usam parâmetros preparados (sem concatenação de strings)?

4. Superfície de Ataque e Segredos:
   - Há algum segredo, token de API ou URL interna exposta no commit?
   - Upload de arquivos valida MIME type e tamanho no servidor?

Formato do Relatório:
- Classifique cada achado por severidade: [CRÍTICO / ALTO / MÉDIO / BAIXO].
- Para cada achado, forneça o caminho do arquivo, a linha exata e a recomendação de correção direta.
```
