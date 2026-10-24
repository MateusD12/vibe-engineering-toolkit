---
name: infraestrutura-projetos
description: Referencia de infraestrutura compartilhada (Supabase/Vercel/GitHub/OAuth para projetos pessoais e corporativos). Consulte ao criar projeto, configurar deploy ou registrar recurso novo.
---

# Agente: Infraestrutura de Projetos

## Papel
Define e aplica as regras de infraestrutura para os projetos em `C:\Projetos\`, diferenciando claramente entre **projetos pessoais (`MateusD12`)** e **projetos corporativos (`nitro-vibecoding` / `technitro-delivery`)**.

---

## 1. Projetos Pessoais (`MateusD12` em `C:\Projetos\`)

| Serviço   | Conta                   | Detalhe                                           |
|-----------|-------------------------|---------------------------------------------------|
| Supabase  | madadasa1@gmail.com     | Projeto "Financeiro" — ref `bgoteptsgdqwnlgqdzjg` |
| Vercel    | madadasa1@gmail.com     | Deploy direto permitido via Vercel                |
| GitHub    | MateusD12               | Repositórios em `github.com/MateusD12`            |
| Google OAuth | madadasa1@gmail.com  | Provider "google" configurado no Supabase Auth    |

### Credenciais Supabase Pessoal (projetos web pessoais)
```typescript
// src/lib/supabase.ts
const SUPABASE_URL      = 'https://bgoteptsgdqwnlgqdzjg.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnb3RlcHRzZ2Rxd25sZ3FkempnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NTk4MDgsImV4cCI6MjA5MTEzNTgwOH0.Kt7euMlb17AaT99e_sBzFjdUClXzdkw9dymOI4ws4xo'
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

## 2. Projetos Corporativos Nitro (`MateusDas12` — `nitro-vibecoding` / `technitro-delivery`)

| Serviço   | Conta / Org             | Regra                                             |
|-----------|-------------------------|---------------------------------------------------|
| GitHub    | `MateusDas12`           | Branch padrão: **`Dev`** (`git clone --branch Dev`). Nunca push direto na `main`. |
| Supabase  | Org "Nitro"             | Leitura livre; escrita via migration + RLS ativa. |
| Lovable   | Workspace Nitro         | Hospedagem + conexão; alterações de código via commit na branch `Dev`. |

### Alternância de Contas GitHub na Máquina (`gh`)
Como as duas contas (`MateusD12` e `MateusDas12`) estão autenticadas no GitHub CLI:
- Para projetos pessoais: `gh auth switch --user MateusD12`
- Para projetos Nitro: `gh auth switch --user MateusDas12`

---

## Fluxo para Novos Projetos Pessoais
1. Implementar o código em `C:\Projetos\<nome-projeto>`
2. Inicializar o cofre Obsidian:
   `node "C:/Users/Pichau/.claude/skills/obsidian-engine/scripts/codemap_generator.js" "C:/Projetos/<nome-projeto>"`
3. Passar pelo pipeline (`revisor-codigo` → `seguranca` → `testador`)
4. Criar repositório no GitHub (`gh repo create`) e fazer push
5. Deploy na Vercel (se aplicável) e registrar em `.claude/projects/<nome>.md`
