# Regras de Qualidade e Limite de 350 Linhas (Quality Gates)

Este template define as regras de ouro para manter qualquer projeto React/Next.js/TypeScript saudável, modular e compatível com a janela de contexto de agentes de IA.

---

## 1. A Regra de Ouro: Máximo de 350 Linhas por Arquivo (`max-lines`)

Arquivos com mais de 350 linhas:
- Degradam o desempenho dos modelos de IA (consomem milhares de tokens a cada leitura).
- Aumentam o risco de alucinação e exclusão acidental de código em refatorações.
- Indicam acoplamento de múltiplas responsabilidades (violação do Single Responsibility Principle).

### Como Fatiar quando um arquivo passar de 350 linhas:
1. **Lógica de Negócio / Estados Complexos:** Extrair para **Custom Hooks** (`use<Feature>.ts`) ou serviços de domínio.
2. **Sub-componentes UI:** Extrair blocos repetidos ou seções visuais específicas (modais, tabelas, cards, filtros) para arquivos dedicados na pasta `components/`.
3. **Acesso a Dados / Queries:** Mover chamadas de API, Supabase ou Drizzle para **Services / Repositories**.
4. **Constantes & Tipos:** Mover enums, schemas Zod e interfaces TypeScript para `types.ts` ou `schemas.ts`.

---

## 2. Configuração ESLint (`eslint.config.mjs`)

Para ativar a verificação automática no ESLint flat config do projeto:

```javascript
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    rules: {
      // Limite rígido de 350 linhas por arquivo de código-fonte
      "max-lines": [
        "warn",
        {
          max: 350,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      // Evita console.log solto em produção
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    },
  },
  // Arquivos de teste podem ter limites mais flexíveis
  {
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    rules: {
      "max-lines": "off",
    },
  }
);
```

---

## 3. Boundary de Camadas (Data vs. UI)
- Componentes visuais (`components/`) **nunca** devem instanciar conexões de banco de dados cruas ou rodar queries SQL inline.
- O fluxo obrigatório é: `Componente UI` → `Hook / Service` → `Supabase / API Route / Action` → `Banco`.
