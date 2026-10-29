---
name: auditoria-360
description: Executa a bateria de avaliação multi-modelo 360° em qualquer projeto (Mesa TCG, App Cartão, FitQuest ou apps de clientes). Aciona o Conselho de IAs Locais (Qwen, Lumi 4B e TRIBE v2) e consolida erros, melhorias técnicas, UX brasileira e carga cognitiva.
---

# Auditoria 360° Multi-Model & Avaliação Cognitiva

Esta skill padroniza o comando mestre de auditoria de aplicações:
> *"Avalia o app e veja possíveis erros, melhorias e etc"*

Em vez de uma análise superficial de prompt único, o agente convoca o **Conselho de IAs Especializadas**, onde cada modelo avalia o sistema em sua área de excelência com **custo zero de tokens em nuvem ($0)**.

---

## 1. Arquitetura do Conselho de IAs

```
                   [ Comando: "Avalia o app..." ]
                                 │
                     ┌───────────┴───────────┐
                     ▼                       ▼
            [ Antigravity ]          [ Telegram Bot ]
             (Tech Lead)             (Controle Remoto)
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
 [ Qwen 2.5 ]   [ Lumi 4B ]   [ TRIBE v2 ]
  (Código/350L)  (UX/PT-BR)    (Cognitivo)
       │             │             │
       └─────────────┼─────────────┘
                     ▼
       [ Relatório Consolidado 360° ]
        • P0: Erros Críticos / Quebras
        • P1: Qualidade de Código & Perf
        • P2: Experiência & Tom PT-BR
        • P3: Carga Cognitiva & Estímulo
```

---

## 2. Divisão de Responsabilidades

| Agente / Modelo | Especialidade Técnica | Critérios de Avaliação |
| :--- | :--- | :--- |
| **Qwen 2.5 Coder / DeepSeek-R1** (Ollama Local) | Qualidade de Código & Engenharia | • Regra de ouro das 350 linhas por arquivo<br>• Tipagem TypeScript / Python rigorosa<br>• Tratamento de erros assíncronos e vazamento de memória<br>• Consultas lentas e boas práticas SOLID |
| **CEIA Lumi 4B** (Local - Nemotron-H) | UX, Linguagem Brasileira & Privacidade | • Clareza das mensagens de erro e feedback visual<br>• Onboarding e naturalidade em português brasileiro<br>• Privacidade: zero vazamento de dados de usuário<br>• Aderência à realidade cultural do usuário final |
| **TRIBE v2** (Meta FAIR - In-Silico Neuroscience) | Avaliação Cognitiva & Estímulo Sensorial | • Sobrecarga cognitiva no layout e densidade de informação<br>• Harmonia e contraste de cores nas interfaces<br>• Engajamento visual das artes e trailers (Mesa TCG / Jogos)<br>• Prevenção de fadiga mental do usuário |
| **Antigravity (Gemini 3.8 Flash)** | Tech Lead & Juiz Consolidador | • Priorização por severidade (P0 a P3)<br>• Fatiamento das tarefas em ondas paralelas<br>• Geração de correções acionáveis em 1 clique |

---

## 3. Protocolo de Execução da Auditoria

Ao receber o comando de avaliação:

1. **Passo 1 (Varredura Estrutural):**  
   Executa a leitura do mapa de arquitetura via `.memory/02-codemap/tree-signatures.md` e lista de dependências.

2. **Passo 2 (Disparo do Conselho Local):**  
   * Dispara inspeção de código para `http://localhost:11434/api/generate` (Qwen).
   * Dispara análise de UX/textos para `http://localhost:8000/v1/chat/completions` (Lumi 4B).
   * Aplica matriz cognitiva de estímulos (TRIBE v2).

3. **Passo 3 (Consolidação & Entrega):**  
   * Gera o relatório estruturado no chat ou terminal.
   * Se chamado via Telegram, compila os arquivos em `.docx` ou `.txt` e envia automaticamente como anexo para o celular do desenvolvedor.

---

## 4. Classificação de Achados (Matriz de Severidade)

* **P0 — Crítico (Bloqueia Deploy):** Falhas de autenticação, erros de runtime não tratados, perda de dados ou arquivos acima de 500 linhas que geram travamento.
* **P1 — Alto (Débito Técnico):** Violação da regra das 350 linhas, dependências com vulnerabilidade, código duplicado ou queries N+1.
* **P2 — Médio (UX & Clareza):** Textos confusos, mensagens de erro em inglês técnico, fluxos com fricção desnecessária.
* **P3 — Baixo (Cognitivo & Polimento):** Micro-ajustes de espaçamento, sobrecarga visual leve ou sugestões de animação e paleta.
