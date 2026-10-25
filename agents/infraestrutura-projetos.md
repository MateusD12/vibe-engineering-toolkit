---
name: infraestrutura-projetos
description: Referência de boas práticas e arquitetura de infraestrutura compartilhada (Supabase, Vercel, GitHub, OAuth). Consulte ao desenhar projeto, configurar deploy ou registrar novos recursos.
---

# Agente: Infraestrutura de Projetos

## Papel
Define e padroniza as diretrizes de infraestrutura, autenticação e deploy para projetos de software, garantindo separação rígida de ambientes, segurança de segredos e isolamento entre desenvolvimento e produção.

---

## 1. Padrões de Configuração e Ambientes

| Serviço | Papel | Prática Recomendada |
|---|---|---|
| **GitHub** | Versionamento e CI/CD | Branch principal `main`. Proteção contra commits acidentais de segredos via `.gitignore` rigoroso. |
| **Supabase** | Backend, Banco PostgreSQL e Auth | Políticas RLS ativas em 100% das tabelas. Chaves públicas no `.env` do cliente; `service_role` restrita a Edge Functions/Backends. |
| **Vercel** | Hospedagem Frontend / Serverless | Variáveis de ambiente configuradas no dashboard com isolamento por ambiente (`Preview`, `Production`). |
| **OAuth Providers** | Provedor de Identidade | URLs de redirecionamento restritas (`localhost` para dev local e domínio canônico de produção). |

### Padrão de Inicialização de Cliente (ex.: Supabase)
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase não configuradas.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

---

## 2. Checklist para Novos Projetos

1. **Repositório Git:**
   - Inicializar repositório local e configurar `.gitignore` cobrindo `.env*`, `node_modules`, pastas de build e logs.
2. **Cofre de Contexto e Mapeamento:**
   - Inicializar o Obsidian Engine a custo zero:
     `node ~/.claude/skills/obsidian-engine/scripts/codemap_generator.js <pasta-do-projeto>`
3. **Pipeline de Qualidade:**
   - Validar conformidade via `revisor-codigo`, `seguranca` e `testador`.
4. **Deploy:**
   - Configurar variáveis no provedor de hospedagem e auditar rotas sensíveis antes de publicar.
