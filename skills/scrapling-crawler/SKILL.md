---
name: scrapling-crawler
description: Web scraping de alta performance e indetectável utilizando Scrapling (Python). Bypassa Cloudflare, Turnstile, extrai dados de APIs e páginas protegidas com Camoufox e converte conteúdo web em Markdown limpo para LLMs.
---

# Scrapling Crawler — Scraping Indetectável & Rápido

O **Scrapling** é um framework de web scraping em Python de alta velocidade projetado para extrair dados da web sem ser bloqueado por proteções como Cloudflare, Datadome, Kasada ou Turnstile, integrando o navegador stealth **Camoufox**.

## 1. Por que Scrapling?
- **Indetectável por padrão:** Emula impressões digitais de navegadores reais (Canvas, WebGL, AudioContext, headers TLS).
- **Extremamente rápido:** Motor C-speed com `lxml` e seletores inteligentes com auto-cura de seletores quebrados.
- **Limpeza de HTML para IA:** Converte tabelas, artigos e dados brutos em Markdown estruturado ideal para consumo por LLMs.

---

## 2. Instalação e Requisitos

Instalado diretamente via `uv` ou `pip`:

```bash
uv pip install scrapling --system
# Para habilitar suporte a navegadores stealth com Camoufox:
scrapling install
```

---

## 3. Padrões de Código

### 3.1. Fetch Rápido (HTTP com fingerprint spoofing)
Para páginas sem bloqueios pesados de JavaScript:

```python
from scrapling import Fetcher

fetcher = Fetcher()
response = fetcher.get("https://example.com/api/data")

# Seletores inteligentes CSS / XPath
title = response.css("h1::text").first()
items = response.css(".card-item").map(lambda el: el.text)
print(title, items)
```

### 3.2. Stealth Fetcher (Bypass de Cloudflare & Turnstile)
Para sites protegidos por desafios anti-bot:

```python
from scrapling import StealthyFetcher

# Usa Camoufox internamente com emulação completa
fetcher = StealthyFetcher()
page = fetcher.get("https://protected-site.com/search?q=cards")

# Extrai texto limpo
cards = []
for card in page.css(".tcg-card"):
    name = card.css(".title::text").first()
    price = card.css(".price::text").first()
    cards.append({"name": name, "price": price})

print(cards)
```

---

## 4. Casos de Uso no Ecossistema

1. **Mesa TCG:** Coletar cotações atualizadas de cartas em lojas locais e marketplaces que não possuem APIs públicas abertas ou bloqueiam bots convencionais.
2. **Engenharia Reversa de Jogos:** Baixar documentação técnica, fóruns legados salvos no Wayback Machine ou guias de modding.
3. **Projetos Freelance:** Extrair dados de leads, catálogos de produtos e cotações de concorrência para clientes sem custos de proxies pagos caros.
