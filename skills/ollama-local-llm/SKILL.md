---
name: ollama-local-llm
description: Gerencia e consome inferência local de IA via Ollama (custo zero de tokens) com endpoint compatível OpenAI (localhost:11434/v1). Ideal para tarefas em lote, categorização, geração de código e features offline sem consumir créditos do Gemini ou Claude.
---

# Ollama Local LLM — Inferência a Custo Zero ($0 Tokens)

Este módulo padroniza o uso de modelos de linguagem locais rodando direto no hardware da máquina de desenvolvimento via **Ollama**.

## 1. Por que usar Ollama Local?
- **Zero Custo de Tokens:** 100% gratuito. Não consome cota nem créditos do Google Gemini, Anthropic Claude ou OpenAI.
- **Privacidade & Offline:** Os dados e códigos nunca saem do seu computador.
- **Padrão Universal OpenAI:** O Ollama expõe um endpoint compatível com a API da OpenAI em `http://localhost:11434/v1`.
- **Economia de Recursos:** Deixe tarefas de alto volume (classificação de 500 despesas, análise de dados brutos, geração de lero-lero/lore, testes unitários massivos) para a LLM local, reservando os modelos de nuvem apenas para arquitetura de altíssimo nível.

---

## 2. Modelos Recomendados por Tipo de Tarefa

Para máquinas com **16 GB de RAM** (como AMD Ryzen 5 / APU ou GPUs mid-tier):

| Modelo | Tamanho (VRAM/RAM) | Especialidade | Uso Típico |
| :--- | :--- | :--- | :--- |
| `qwen2.5-coder:7b` | ~4.7 GB | Código, refatoração, TypeScript/Python | Code review, testes unitários, boilerplate |
| `qwen2.5-coder:1.5b`| ~1.2 GB | Código ultrarrápido | Parsing de sintaxe, regex, linting |
| `deepseek-r1:8b` | ~5.0 GB | Raciocínio lógico, matemática, chain-of-thought | Resolução de bugs difíceis, lógica de regras |
| `deepseek-r1:1.5b` | ~1.3 GB | Raciocínio rápido e leve | Validação de lógica e filtros |
| `llama3.2:3b` | ~2.0 GB | Geral, multilíngue, rápido | Categorização, resumos, coaching, prompts |
| `llama3.2:1b` | ~0.8 GB | Ultraleve para dispositivos | Classificação em massa (ex: cartões/bancos) |

---

## 3. Comandos Úteis do Ollama CLI

```bash
# Verificar status e modelos baixados
ollama list

# Baixar um modelo recomendado
ollama pull qwen2.5-coder:7b
ollama pull llama3.2:3b

# Executar chat interativo no terminal
ollama run llama3.2:3b

# Testar se o servidor local está respondendo
curl http://localhost:11434/api/version
```

---

## 4. Integração Prática nos Projetos (Node.js / TypeScript & Python)

Como o Ollama é compatível com OpenAI, qualquer biblioteca padrão funciona trocando apenas o `baseURL` e usando qualquer valor fictício em `apiKey`:

### Exemplo TypeScript / Node (fetch nativo ou openai SDK)
```typescript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "http://localhost:11434/v1",
  apiKey: "ollama", // não requer chave real
});

export async function askLocalLLM(prompt: string, model = "llama3.2:3b"): Promise<string> {
  const response = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  return response.choices[0].message.content ?? "";
}
```

### Exemplo Python (usando requests / urllib)
```python
import json
import urllib.request

def query_ollama(prompt: str, model: str = "llama3.2:3b") -> str:
    url = "http://localhost:11434/v1/chat/completions"
    headers = {"Content-Type": "application/json"}
    payload = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.2
    }
    
    req = urllib.request.Request(url, data=json.dumps(payload).encode(), headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        return data["choices"][0]["message"]["content"]
```

---

## 5. Casos de Uso Diretos nos Nossos Projetos

1. **Mesa TCG:**
   - Sugestão de sinergia entre cartas e cálculo de curvas de mana.
   - Geração de flavor text e descrições temáticas para cartas customizadas.
   - Bot local para testes de turno (simulação de jogadas sem custo).

2. **FitQuest:**
   - Geração dinâmica de rotinas de treino baseadas no histórico do usuário.
   - Estimativa de macros e calorias a partir de descrição de refeições em texto livre.
   - Coach motivacional e dicas de postura.

3. **App Cartão / Finanças:**
   - **Categorização em lote:** Enviar 200 extratos bancários de uma vez ("UBER *TRIP", "PAG*PADARIA") para a LLM local categorizar em JSON sem gastar 1 centavo de nuvem.
   - Análise de tendências de gastos mensais e alertas de economia.

4. **Projetos Freelance:**
   - Ambiente de desenvolvimento 100% gratuito: você desenvolve e testa tudo localmente com Ollama e só pluga a API do cliente (OpenAI/Anthropic) no momento do deploy em produção.
