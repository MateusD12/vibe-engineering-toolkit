---
name: ceia-lumi
description: Consome o modelo de fundação nacional brasileiro CEIA Lumi 4B localmente (localhost:8000) a custo zero de tokens ($0). Especialista em redação fluida em português nativo, diálogos de NPCs para mods de jogos, copywriting, cartas e mensagens executivas sem gastar créditos de nuvem.
---

# CEIA Lumi 4B — Modelo Nacional de Fundação em Português ($0 Tokens)

## 1. Visão Geral
O **CEIA Lumi 4B** é o modelo de inteligência artificial de fundação desenvolvido pelo **Centro de Excelência em Inteligência Artificial (CEIA)** no Brasil. Com 4 bilhões de parâmetros e arquitetura baseada em Llama otimizada para PT-BR, ele roda **100% offline e localmente** no computador de desenvolvimento com aceleração de GPU ou CPU.

### Quando Usar
- Geração de textos longos, artigos e documentação em português fluente.
- Criação de diálogos naturais para NPCs em mods de jogos e roteiros de áudio.
- Redação de mensagens, e-mails, relatórios e textos para os apps (Mesa TCG, FitQuest, App Cartão).
- Tarefas de linguagem natural que consumiriam muitos tokens em modelos pagos como Claude ou GPT.

---

## 2. Inicialização do Servidor Local

O servidor é executado em `C:\Projetos\ceia-lumi` via FastAPI/PyTorch expondo endpoint compatível com a OpenAI API na porta **8000**:

```powershell
cd C:\Projetos\ceia-lumi
.\iniciar_servidor.bat
```

Ou diretamente via Python:
```powershell
& "C:\Projetos\ceia-lumi\.venv\Scripts\python.exe" "C:\Projetos\ceia-lumi\server.py"
```

---

## 3. Consumo via API (Compatível OpenAI)

### Endpoint
* **URL:** `http://localhost:8000/v1/chat/completions`
* **Método:** `POST`
* **Headers:** `Content-Type: application/json`

### Exemplo em Python:
```python
import requests

payload = {
    "model": "ceia-lumi-4b",
    "messages": [
        {"role": "system", "content": "Você é um assistente técnico em português brasileiro."},
        {"role": "user", "content": "Escreva um anúncio empolgante para a nova versão da Mesa TCG."}
    ],
    "max_tokens": 400,
    "temperature": 0.7
}

response = requests.post("http://localhost:8000/v1/chat/completions", json=payload, timeout=60)
print(response.json()["choices"][0]["message"]["content"])
```

### Exemplo em PowerShell / cURL:
```powershell
$body = @{
    model = "ceia-lumi-4b"
    messages = @(@{ role = "user"; content = "Explique a importância da modularização de 350 linhas em código." })
    max_tokens = 300
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/v1/chat/completions" -Method Post -Body $body -ContentType "application/json"
```

---

## 4. Integração no Pipeline Powerhouse
No ecossistema Powerhouse e no Telegram Agent Bridge:
- O **Smart Auto-Router** direciona automaticamente pedidos com intenção de redação (`"redigir"`, `"português"`, `"texto em pt"`, `"lore"`, `"diálogo"`, `"copy"`) para o CEIA Lumi 4B.
- O custo é estritamente **$0 tokens**.
