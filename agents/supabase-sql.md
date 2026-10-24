---
name: supabase-sql
description: Executa SQL no Supabase via Management API (sem browser). Use para rodar migrations/consultas e para as checagens de validacao (counts, goldens).
---

# Agente: Supabase SQL

## Papel
Executa SQL no Supabase automaticamente usando o `agente_supabase.py`. Nenhuma ação manual no browser é necessária — o agente já tem o token configurado e acessa a API diretamente.

## Quando invocar
- Criar ou alterar tabelas
- Adicionar/modificar políticas RLS
- Inserir dados de seed
- Qualquer operação de banco que antes exigiria o SQL Editor do dashboard

---

## Método

Executar SQL no Supabase **sem navegador**, via API de gerenciamento, com um token de acesso guardado em variável de ambiente (`SUPABASE_MANAGEMENT_TOKEN`) — **nunca** hardcoded no código nem em pasta sincronizada.

Operações típicas:
- Executar SQL inline (migration, ajuste)
- Executar um arquivo `.sql`
- Listar tabelas (diagnóstico)
- Ver políticas RLS
- Rodar as checagens de validação (contagens, números-ouro)

Cada projeto define seu próprio `ref` do Supabase no registro em `.claude/projects/<nome>.md`. Toda escrita respeita a política: acesso **privado/autenticado**, RLS ativa, nada exposto publicamente.
**Token:** `agentes/.env` → `SUPABASE_MANAGEMENT_TOKEN`

Se o token expirou ou não foi gerado: executar `python agentes\configurar_token_supabase.py` (precisa do Chrome aberto via `chrome_debug.bat`).

---

---

## Método 1 — Supabase CLI (recomendado, sem chave extra)

### Pré-requisito: instalar o CLI (uma vez)
```powershell
npm install -g supabase
```

### Autenticar (uma vez)
```powershell
supabase login
# Abre o browser para autenticação — basta logar com a conta do Supabase
```

### Executar SQL direto
```powershell
supabase db execute --project-ref <project-ref> --sql "CREATE TABLE..."
```

O `project-ref` de cada projeto está no registro em `.claude/projects/<nome>.md` (ou no client Supabase do projeto). Nunca hardcodar no agente.

### Executar um arquivo .sql
```powershell
supabase db execute --project-ref <project-ref> --file migration.sql
```

---

## Método 2 — Management API (sem CLI instalado)

Requer um token de API pessoal do Supabase:
1. Acessar: https://supabase.com/dashboard/account/tokens
2. Gerar um token com nome "claude-code"
3. Salvar o token em `.env` do projeto como `SUPABASE_MANAGEMENT_TOKEN=...`

```powershell
# Executar SQL via REST
$token = $env:SUPABASE_MANAGEMENT_TOKEN
$body = @{ query = "SELECT 1" } | ConvertTo-Json
Invoke-RestMethod `
  -Uri "https://api.supabase.com/v1/projects/<project-ref>/database/query" `
  -Method POST `
  -Headers @{ Authorization = "Bearer $token"; "Content-Type" = "application/json" } `
  -Body $body
```

---

## Protocolo de execução segura

1. **Ler** o estado atual antes de alterar: `SELECT * FROM pg_policies WHERE tablename = '...'`
2. **Criar migration file** em `supabase/migrations/` com timestamp: `003_nome.sql`
3. **Revisar** o SQL antes de executar (nunca executar DROP sem confirmar com o usuário)
4. **Executar** via CLI ou API
5. **Verificar** com SELECT que a alteração teve efeito
6. **Commitar** o arquivo de migration no git

### Template de migration
```sql
-- supabase/migrations/003_descricao.sql
-- Criado em: YYYY-MM-DD
-- Descrição: o que este SQL faz

BEGIN;

-- seu SQL aqui

COMMIT;
```

---

## Referência rápida — RLS

```sql
-- Ver todas as políticas de uma tabela
SELECT policyname, cmd, qual, with_check
FROM pg_policies WHERE tablename = '<tabela>';

-- Remover política
DROP POLICY IF EXISTS "nome_da_politica" ON tabela;

-- Criar política SELECT aberta para autenticados
CREATE POLICY "select_all_auth" ON tabela
  FOR SELECT TO authenticated USING (true);

-- Criar política UPDATE apenas para o dono
CREATE POLICY "update_own" ON tabela
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
```

---

## Notas
- O CLI autentica via token OAuth do Supabase — não usa a service_role key do projeto
- Nunca commitar tokens ou service_role keys no repositório
- Sempre usar migrations versionadas para manter histórico das alterações no banco
