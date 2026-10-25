---
name: infraestrutura-projetos
description: Referencia de infraestrutura compartilhada (Supabase/Vercel/GitHub/OAuth para projetos pessoais e corporativos). Consulte ao criar projeto, configurar deploy ou registrar recurso novo.
---

# Agente: Infraestrutura de Projetos

## Papel
Define e aplica as regras de infraestrutura para os projetos em `C:\Projetos\`, diferenciando claramente entre **projetos pessoais (`MateusD12`)** e **projetos corporativos (`<org-corporativa>`)**.

---

## 1. Projetos Pessoais (`MateusD12` em `C:\Projetos\`)

| Serviço   | Conta                   | Detalhe                                           |
|-----------|-------------------------|---------------------------------------------------|
| Supabase  | <seu-email-pessoal>     | Projeto "Financeiro" — ref `<project-ref>` |
| Vercel    | <seu-email-pessoal>     | Deploy direto permitido via Vercel                |
| GitHub    | MateusD12               | Repositórios em `github.com/MateusD12`            |
| Google OAuth | <seu-email-pessoal>  | Provider "google" configurado no Supabase Auth    |

### Credenciais Supabase Pessoal (projetos web pessoais)
```typescript
// src/lib/supabase.ts
const SUPABASE_URL      = 'https://<project-ref>.supabase.co'
const SUPABASE_ANON_KEY = '<anon-key-do-projeto>'  // fica no .env, nunca no repositório
```

### Google OAuth — Padrão para Projetos Pessoais
```typescript
export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + '/<rota-principal>' },
  })
}
```

---

## 2. Projetos Corporativos (`<conta-corporativa>` — `<org-corporativa>`)

| Serviço   | Conta / Org             | Regra                                             |
|-----------|-------------------------|---------------------------------------------------|
| GitHub    | `<conta-corporativa>`           | Branch padrão: **`Dev`** (`git clone --branch Dev`). Nunca push direto na `main`. |
| Supabase  | Org corporativa         | Leitura livre; escrita via migration + RLS ativa. |
| Lovable   | Workspace corporativo   | Hospedagem + conexão; alterações de código via commit na branch `Dev`. |

### Alternância de Contas GitHub na Máquina (`gh`)
Como as duas contas (`MateusD12` e `<conta-corporativa>`) estão autenticadas no GitHub CLI:
- Para projetos pessoais: `gh auth switch --user MateusD12`
- Para projetos corporativos: `gh auth switch --user <conta-corporativa>`

---

## Fluxo para Novos Projetos Pessoais
1. Implementar o código em `C:\Projetos\<nome-projeto>`
2. Inicializar o cofre Obsidian:
   `node "C:/Users/Pichau/.claude/skills/obsidian-engine/scripts/codemap_generator.js" "C:/Projetos/<nome-projeto>"`
3. Passar pelo pipeline (`revisor-codigo` → `seguranca` → `testador`)
4. Criar repositório no GitHub (`gh repo create`) e fazer push
5. Deploy na Vercel (se aplicável) e registrar em `.claude/projects/<nome>.md`
