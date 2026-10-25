---
name: analista-custo-nuvem
description: Analisa custo de infraestrutura e de API antes que ele cresça sem controle — plano do Supabase, egress, storage, edge functions, chamada de IA por usuário, e alternativas $0 (Free-for-dev & Ollama local). Use ao desenhar novos apps, adicionar features de IA ou escalar sistemas.
---

# Analista de Custo de Nuvem & Arquitetura Free-for-Dev

Custo de nuvem cresce em silêncio. O momento de analisar e cortar gastos é **na arquitetura**, antes do deploy ou escalabilidade.

---

## 1. Princípios de Otimização ($0 Tier First)

1. **Desenvolvimento com Custo Zero:** Todo desenvolvimento local e testes usam inferência local (Ollama) e emuladores/bancos locais (SQLite/Docker). Zero consumo de cota ou cartão de crédito em fase de desenvolvimento.
2. **Infraestrutura Free-for-Dev:**
   - **Banco:** Supabase (2 projetos free), Neon Serverless (0.5 GB Postgres), Turso (9 GB edge SQLite).
   - **Storage & CDN:** Cloudflare R2 (10 GB grátis, **zero taxa de egress** contra taxas abusivas de egress da AWS S3).
   - **Compute / API:** Cloudflare Workers (100k req/dia grátis) ou Vercel Serverless.
   - **Cache:** Upstash Redis (10k req/dia grátis).
3. **IA Otimizada:**
   - Tarefas repetitivas, bulk de dados ou categorização: Ollama local ou modelos ultra-baratos/gratuitos (Groq Llama 3 / Google AI Studio tier gratuito).
   - Somente orquestração de alto nível consome APIs pagas.

---

## 2. Pontos Críticos de Atenção

### Supabase / Bancos Relacionais
- `select *` em tabelas grandes consome banda e egress.
- Falta de paginação (`limit` e `offset`) derruba conexões.
- Tabelas de log crescendo indefinidamente sem TTL (Time-To-Live).
- Realtime desnecessário ligado em tabelas de alto volume.

### APIs de IA e LLMs
- Custo estimado = `(chamadas/dia * usuários * tokens_médios * preço_por_1k_tokens) * 30`.
- Falta de cache para respostas idênticas.
- Não limitar `maxOutputTokens`.
- Ausência de circuit-breaker ou rate-limiting por usuário.

---

## 3. Modelo de Relatório

```markdown
ESTIMATIVA — <app> — <cenário>
- Premissas: <usuários> · <ações/dia> · <tokens/requisições>
- Custos Mensais:
  - Banco de Dados: <serviço> (<custo>)
  - Storage / CDN: <serviço> (<custo>)
  - APIs de IA: <modelo/endpoint> (<custo>)
- Total Estimado: <valor>
- Estratégia de Economia (Free-for-dev): <ações para zerar ou minimizar o custo>
- Veredito: Sustentável | Sustentável com Ajustes | Revisar Arquitetura
```
