---
name: configurar-pwa
description: Adiciona manifest, service worker e vercel.json para transformar um app web em PWA instalavel. Use ao finalizar um app web novo.
---

# Skill: Configurar PWA + Vercel

## Quando usar
Todo projeto web novo que vai para o Vercel. Executar sempre após criar a estrutura base do app.

## Pré-requisito
- Projeto React + Vite já criado
- Ícone base fornecido pelo usuário (qualquer tamanho, preferencialmente ≥512×512px)
- Se não houver ícone, executar o skill `gerar-icones-pwa` primeiro

---

## ⛔ Regras Críticas (erros que quebram o standalone)

1. **NUNCA coloque `manifest.webmanifest` ou `manifest.json` em `public/`** — VitePWA gera o manifest no build. Arquivo estático em `public/` conflita e o resultado é imprevisível.
2. **NUNCA adicione `<link rel="manifest">` no `index.html`** — VitePWA injeta isso automaticamente.
3. **NUNCA use `purpose: 'any maskable'` em uma entrada só** — o Chrome trata isso de forma inconsistente. Criar DUAS entradas separadas para o ícone 512: uma com `purpose: 'any'` e outra com `purpose: 'maskable'`.
4. **SEMPRE adicione `injectRegister: 'auto'`** — sem isso o service worker pode não ser registrado.

---

## Passos de Execução

### 1. Instalar vite-plugin-pwa

```bash
npm install -D vite-plugin-pwa
# ou
bun add -D vite-plugin-pwa
```

### 2. Configurar vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',          // ← obrigatório: registra SW automaticamente
      devOptions: { enabled: true },   // ← PWA funciona em dev (útil para testar)
      includeAssets: ['favicon.ico', 'icons/*.png'],
      manifest: {
        name: '<Nome Completo do App>',
        short_name: '<Nome Curto>',
        description: '<Descrição em uma linha>',
        theme_color: '<cor-hex>',
        background_color: '<cor-hex>',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        lang: 'pt-BR',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          // entrada separada maskable — obrigatório para Android não cortar o ícone
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'supabase-cache', expiration: { maxEntries: 100, maxAgeSeconds: 86400 } },
          },
        ],
      },
    }),
  ],
})
```

### 3. Meta tags no index.html

**Não** adicionar `<link rel="manifest">` — VitePWA injeta. Adicionar apenas as meta tags:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Tema e cor -->
  <meta name="theme-color" content="<cor-hex>" />

  <!-- iOS standalone (Safari não suporta manifest display:standalone nativo) -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="<Nome Curto>" />

  <!-- Ícones -->
  <link rel="apple-touch-icon" href="/icons/icon-192.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
  <!-- NÃO adicionar <link rel="manifest"> aqui -->

  <title><Nome do App></title>
</head>
```

### 4. Criar vercel.json

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 5. Colocar ícones em `public/icons/`

Mínimo obrigatório:
- `public/icons/icon-192.png` (192×192)
- `public/icons/icon-512.png` (512×512) — usada para `any` e `maskable`

Use o skill `gerar-icones-pwa` se ainda não tiver os ícones prontos.

---

## Verificação

Após build (`npm run build` / `bun run build`) e deploy:
1. Abrir o app no Chrome mobile
2. Menu ⋮ → "Adicionar à tela inicial" — deve aparecer sem precisar ir em configurações
3. Abrir o ícone instalado — app deve abrir SEM barra de URL do navegador (modo standalone)
4. DevTools → Application → Manifest — verificar `display: standalone` e ícones sem erro
5. DevTools → Application → Service Workers — verificar status "activated and is running"

---

## Diagnóstico: app abre como aba do navegador em vez de standalone

Causas mais comuns (em ordem de frequência):

| Causa | Sintoma | Correção |
|-------|---------|----------|
| `manifest.webmanifest` estático em `public/` | manifest conflita com o do VitePWA | Deletar o arquivo estático |
| `<link rel="manifest">` hardcoded no `index.html` | aponta para arquivo errado | Remover — VitePWA injeta |
| `injectRegister` ausente | SW não registrado | Adicionar `injectRegister: 'auto'` |
| `purpose: 'any maskable'` combinado | ícone maskable não reconhecido | Separar em duas entradas |
| App aberto pelo URL direto | comportamento normal do browser | Instalar via "Adicionar à tela inicial" |

---

## Notas
- `registerType: 'autoUpdate'` atualiza o SW silenciosamente; usar `'prompt'` se quiser notificar o usuário
- iOS Safari: `display: standalone` do manifest **não funciona** — o comportamento standalone no iOS depende EXCLUSIVAMENTE das meta tags `apple-mobile-web-app-capable` e `apple-mobile-web-app-status-bar-style`
- Android Chrome: o manifest é a fonte de verdade; meta tags são ignoradas
- Depois de corrigir o manifest, o usuário precisa **reinstalar o app** (remover da tela inicial e adicionar novamente) para o novo manifest ser aplicado
