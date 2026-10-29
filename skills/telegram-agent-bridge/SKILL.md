---
name: telegram-agent-bridge
description: Gerencia a ponte remota Telegram-PC (Telegram Agent Bridge v2.0). Permite monitorar hardware, tirar prints remotos da tela, conversar com memória contínua e disparar comandos para o Antigravity e modelos locais direto do celular via 4G/Wi-Fi.
---

# Telegram Agent Bridge v2.0 — Controle Remoto do PC & Agentes

A **Telegram Agent Bridge** conecta o desenvolvedor ao seu computador de desenvolvimento e aos agentes locais diretamente pelo celular via **Telegram Bot API oficial**, garantindo estabilidade absoluta, custo $0 e sem necessidade de abrir portas ou roteadores.

---

## 1. Por que Telegram em vez de WhatsApp?

* **Estabilidade Permanente:** Não expira sessão nem pede reescaneamento de QR Code.
* **Segurança por User ID:** Pareamento exclusivo no primeiro `/start`. Comandos de terceiros são ignorados silenciosamente.
* **Sem Risco de Bloqueio:** Bots são cidadãos de primeira classe na plataforma do Telegram.
* **Suporte Completo a Mídias:** Recebe áudios, fotos e envia prints de tela inteira sem compressão destrutiva.

---

## 2. Comandos Disponíveis no Chat Móvel

| Comando | Descrição |
| :--- | :--- |
| `/status` | Exibe porcentagem de CPU, memória RAM usada/total, espaço livre no SSD e status dos motores de IA locais (Ollama, Lumi, Antigravity). |
| `/print` ou `/screenshot` | Tira um print da tela do computador em tempo real e envia a foto no Telegram (ideal para checar builds longos ou downloads). |
| `/modo <antigravity\|lumi\|ollama>` | Alterna qual inteligência responderá as mensagens comuns do chat. |
| `/novo` | Limpa a memória de contexto para iniciar um tópico novo do zero. |
| `/agy <tarefa>` | Executa uma tarefa direta no Antigravity CLI com acesso a leitura/escrita de arquivos em `C:\Projetos`. |
| `/lumi <pergunta>` | Consulta o modelo soberano brasileiro CEIA Lumi 4B local a $0 tokens. |

---

## 3. Arquitetura Técnica & Memória Contínua

* **Gerenciador:** `uv` em `C:\Projetos\telegram-agent`.
* **Motor CLI:** Antigravity CLI (`agy.exe`) com `--model gemini-3.8-flash-low` para resposta ultrarrápida (2 a 5 segundos).
* **Memória de Contexto:** Opera com a flag `-c` (`--continue`). O agente lembra exatamente das mensagens anteriores.
* **Envio Automático de Documentos:** Quando o agente gera arquivos (`.docx`, `.txt`, `.pdf`, `.png`), o bot detecta o caminho e anexa o arquivo automaticamente para download no celular.
* **Fatiamento de Mensagens:** Divide respostas longas em blocos de até 3.900 caracteres para respeitar os limites da API do Telegram.
