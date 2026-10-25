---
name: seo-tecnico
description: Especialista em SEO técnico (inspirado no OpenSEO/Semrush), indexabilidade, Core Web Vitals, dados estruturados Schema.org, sitemaps e renderização SSR/SSG para máxima aquisição orgânica.
---

# Especialista em SEO Técnico & Auditoria de Busca (OpenSEO Pattern)

Inspirado nas práticas do **OpenSEO**, este módulo padroniza a auditoria, otimização e validação técnica de SEO em aplicações web (Next.js, Vite, React, Astro).

---

## 1. Pilares do SEO Técnico Moderno

### 1.1. Renderização & Indexabilidade (SSR / SSG vs. CSR)
- Páginas públicas de marketing, produtos, artigos e documentação **nunca devem depender de CSR puro**. Devem ser pré-renderizadas no servidor (SSR) ou estáticas (SSG).
- Bots de busca (Googlebot, Bingbot) e crawlers de IA (OpenAI, Anthropic, Perplexity) devem receber o HTML completo sem depender de hidratação demorada de JavaScript.

### 1.2. Meta Tags Essenciais & Redes Sociais
Toda página pública deve conter no `<head>`:
- `<title>`: 50 a 60 caracteres, contendo a palavra-chave primária e o nome da marca.
- `<meta name="description">`: 140 a 160 caracteres com proposta de valor clara.
- `<link rel="canonical" href="https://exemplo.com/pagina">`: Previne canibalização e conteúdo duplicado.
- **OpenGraph & Twitter Cards:** `og:title`, `og:description`, `og:image` (1200x630px), `og:url`, `twitter:card`.

### 1.3. Dados Estruturados (JSON-LD / Schema.org)
Injetar schemas semânticos em script `type="application/ld+json"`:
- **Produtos / Decks (ex: Mesa TCG):** `SoftwareApplication`, `Product`, `AggregateRating`.
- **Artigos / Tutoriais:** `Article`, `TechArticle`, `HowTo`.
- **Institucional / Negócio:** `Organization`, `WebSite` com `SearchAction`.

---

## 2. Checklist de Auditoria Técnica

1. **Robots.txt & Sitemap XML:**
   - `/robots.txt` deve apontar para `/sitemap.xml`.
   - Rotas autenticadas (`/app/*`, `/dashboard/*`, `/api/*`) devem estar bloqueadas (`Disallow: /app/`).
2. **Core Web Vitals:**
   - **LCP (Largest Contentful Paint):** < 2.5s (otimizar imagens hero com `priority` e WebP/AVIF).
   - **INP (Interaction to Next Paint):** < 200ms (evitar bloqueios na main thread).
   - **CLS (Cumulative Layout Shift):** < 0.1 (definir `width` e `height` explícitos em mídias).
3. **Semântica HTML5:**
   - Apenas 1 tag `<h1>` por página.
   - Hierarquia estrita (`<h1>` $\rightarrow$ `<h2>` $\rightarrow$ `<h3>`).
   - Imagens sempre com atributo `alt` descritivo.

---

## 3. Script Rápido de Verificação de Meta Tags (Node.js)

```javascript
import fs from "fs";

export function checkPageSEO(html) {
  const checks = {
    hasTitle: /<title>[^<]+<\/title>/i.test(html),
    hasDescription: /<meta\s+name=["']description["']/i.test(html),
    hasCanonical: /<link\s+rel=["']canonical["']/i.test(html),
    hasOpenGraph: /<meta\s+property=["']og:image["']/i.test(html),
    hasSingleH1: (html.match(/<h1[^>]*>/gi) || []).length === 1,
  };
  return checks;
}
```
