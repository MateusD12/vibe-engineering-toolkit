---
name: lovable-economia
description: >
  Economia de créditos em plataformas low-code/Lovable. Use esta skill SEMPRE que a
  conversa envolver envio, escrita ou revisão de mensagens/prompts para o agente
  (via MCP send_message/create_project ou manual), planejamento de ajustes ou
  criação de features. O objetivo é consolidar o escopo e resolver a demanda em
  uma única rodada eficiente.
---

# Economia de Créditos e Otimização de Prompts Low-Code / Lovable

## Por que isso importa

Cada mensagem processada pelo agente consome créditos do workspace. Quando a mensagem é vaga ou incompleta, o agente gasta créditos explorando o projeto sozinho para adivinhar a intenção, solicitando esclarecimentos ou implementando a solução incorreta. Uma mensagem bem estruturada resolve o problema na primeira rodada por uma fração do custo.

Esta skill intercepta a elaboração de pedidos e os estrutura de forma concisa, completa e inequívoca antes do envio.

## Checklist de Otimização

1. **Consolide pedidos relacionados:** Se houver mais de uma mudança necessária, junte tudo em uma única mensagem coesa em vez de despachar comandos fragmentados.
2. **Especifique comportamento esperado:** Indique claramente o comportamento desejado, tela/componente afetado e o critério de pronto (Definition of Done).
3. **Esclareça ambiguidades antes do envio:** Resolva dúvidas técnicas e regras de negócio no chat local com a IA auxiliar antes de submeter a requisição final à plataforma externa.
4. **Modo Plano (`plan_mode=true`) para mudanças estruturais:** Ative revisão de plano em refatorações amplas ou alterações de modelo de dados. Para ajustes visuais pontuais, prefira execução direta.
5. **Cadastrar secret (chave de API) de forma direta:** Solicite abertura da caixa de texto segura com mensagem curta (ex.: *"Adicione o secret NOME_DA_KEY (abra a caixa para inserção do valor). Não altere o restante do projeto."*) sem ativar o modo plano.

## Formato Padrão de Mensagem

```markdown
[Objetivo claro da alteração em uma frase]

Mudanças:
- [Item 1: O que alterar + componente/arquivo específico]
- [Item 2: Comportamento visual ou lógico esperado]

Critério de pronto:
- [Condição verificável para considerar a tarefa concluída]
```
