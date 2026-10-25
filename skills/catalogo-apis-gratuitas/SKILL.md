---
name: catalogo-apis-gratuitas
description: Guia e catálogo de APIs públicas gratuitas (public-apis) e infraestrutura $0 (free-for-dev) para potencializar apps como Mesa TCG, FitQuest, App Cartão e projetos de freelancer sem gastar nada.
---

# Catálogo de APIs Gratuitas & Infraestrutura Free-for-Dev

Guia de integração rápida de APIs abertas, sem chave ou com tiers gratuitos generosos, mapeados para nossos projetos e desenvolvimento de apps.

---

## 1. APIs Mapeadas por Projeto

### 🃏 1. Mesa TCG (Magic / Cards / Jogos)
- **Scryfall API** (`https://api.scryfall.com`):
  - *O que faz:* Base de dados completa de Magic: The Gathering (todas as cartas, imagens em alta resolução, rulings de regras, cotações em USD/EUR).
  - *Autenticação:* 100% gratuita, sem API key. Limite: 10 requisições/segundo.
  - *Exemplo:* `GET https://api.scryfall.com/cards/named?fuzzy=black+lotus`
- **Pokémon TCG API** (`https://pokemontcg.io`):
  - *O que faz:* Catálogo completo de cartas de Pokémon TCG com imagens e raridades.
  - *Gratuito:* 20.000 requisições/dia.
- **Yu-Gi-Oh! (YGOPRODeck API)** (`https://db.ygoprodeck.com/api/v7/cardinfo.php`):
  - *O que faz:* Cartas de Yu-Gi-Oh, banlists, decks e arquétipos. Sem autenticação.

---

### 🏋️‍♂️ 2. FitQuest (Fitness / Saúde / Gamificação)
- **Open Food Facts API** (`https://world.openfoodfacts.org/api/v2/`):
  - *O que faz:* Maior base aberta de alimentos do mundo. Busca por código de barras (EAN), tabela nutricional completa (calorias, carboidratos, proteínas, gorduras), ingredientes e Nutri-Score.
  - *Autenticação:* Gratuita, sem chave, dados públicos colaborativos.
  - *Exemplo:* `GET https://world.openfoodfacts.org/api/v2/product/{barcode}.json`
- **Wger Workout Manager API** (`https://wger.de/api/v2/`):
  - *O que faz:* Catálogo aberto de exercícios físicos com músculos ativados, descrições, imagens e rotinas.
  - *Gratuito:* REST API aberta.

---

### 💳 3. App Cartão / Finanças Pessoais & Inteligência de Mercado
- **API de Dados Abertos do Banco Central do Brasil (SGS)**:
  - *O que faz:* Cotações oficiais de moedas (Dólar, Euro), IPCA, Selic, CDI, IGP-M e indicadores econômicos históricos e atuais do Brasil.
  - *Endpoint:* `https://api.bcb.gov.br/dados/serie/bcdata.sgs.{codigo_serie}/dados?formato=json`
  - *Autenticação:* 100% aberta, sem cadastro.
- **AwesomeAPI (Economia & Câmbio BR)** (`https://economia.awesomeapi.com.br`):
  - *O que faz:* Cotação em tempo real de moedas e criptomoedas (USD-BRL, EUR-BRL, BTC-BRL) atualizada a cada 30 segundos.
  - *Exemplo:* `GET https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL`
- **BrasilAPI** (`https://brasilapi.com.br`):
  - *O que faz:* Consulta gratuita de CEP, CNPJ, bancos brasileiros (código COMPE/ISPB), feriados nacionais e tabela FIPE.
  - *Autenticação:* Sem chave, 100% aberta.
- **Mercado & Benchmarks Financeiros (Padrão Vibe-Trading)**:
  - *O que faz:* Dados abertos de índices de mercado (IBOV, CDI acumulado, inflação IPCA) e cotações históricas para comparar gastos com custo de oportunidade de investimentos.

---

### 🛠️ 4. Utilitários Globais para Apps e Freelancers
- **Open-Meteo** (`https://api.open-meteo.com`):
  - *O que faz:* Previsão do tempo, temperatura, UV e vento por coordenadas (latitude/longitude). Não exige API key.
- **Nominatim / OpenStreetMap** (`https://nominatim.openstreetmap.org`):
  - *O que faz:* Geocodificação reversa gratuita (converter lat/long em endereço e vice-versa).
- **Favicon Grabber & Clearbit Logo API**:
  - *O que faz:* Obter logotipos de empresas e cartões a partir do domínio (ex: `https://logo.clearbit.com/nubank.com.br`).

---

## 2. Infraestrutura $0 (Free-for-Dev Stack)

Ao desenhar novos sistemas ou projetos para clientes, utilize a pilha recomendada a custo zero:

| Recurso | Serviço Recomendado | Cota Gratuita |
| :--- | :--- | :--- |
| **Banco de Dados (SQL)** | **Supabase** ou **Neon** | 500 MB Postgres, conexões pooling, serverless |
| **Banco Edge (SQLite)** | **Turso** (libSQL) | 9 GB de armazenamento, 1 bilhão de leituras/mês |
| **Hospedagem Frontend** | **Cloudflare Pages** ou **Vercel** | Largura de banda ilimitada / 100 GB |
| **Serverless / Workers** | **Cloudflare Workers** | 100.000 requisições/dia gratuitas |
| **Storage de Arquivos** | **Cloudflare R2** | 10 GB grátis, **zero taxa de egress** (download) |
| **Cache & Filas** | **Upstash** (Redis & QStash) | 10.000 comandos/dia |
| **Autenticação** | **Clerk** ou **Supabase Auth** | Até 10.000 usuários ativos mensais grátis |
| **Email Transacional** | **Resend** ou **Brevo** | 3.000 emails/mês (Resend) / 300 emails/dia (Brevo) |

---

## 3. Padrão de Arquitetura "Zero Token" nos Nossos Apps

Ao integrar IA em apps:
1. **Ambiente Local / Dev:**
   - App faz requisições para `http://localhost:11434/v1` com modelo local (ex: `llama3.2:3b` ou `qwen2.5-coder:7b`).
   - Custo: **R$ 0,00**.
2. **Ambiente de Produção (Deploy):**
   - App aponta para API remota (OpenAI, Gemini via Google AI Studio tier gratuito com 15 RPM, ou Groq com Llama 3 gratuito).
   - Alternativa: Servidor VPS pequeno com Ollama ou endpoints Serverless.
