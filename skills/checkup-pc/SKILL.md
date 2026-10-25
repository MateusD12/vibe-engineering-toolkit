---
name: checkup-pc
description: Executa a auditoria completa de saúde, performance, armazenamento e segurança do computador de desenvolvimento sob comando. Use sempre que o usuário pedir 'faz o checkup', 'audita o pc', 'como tá meu pc', 'manutenção geral' ou 'analisa o sistema'.
---

# Skill: Checkup Completo do Computador (Saúde, Performance e Segurança)

Esta skill executa uma varredura consolidada dos principais pilares do ambiente local de desenvolvimento em uma única rodada:

1. **Performance & Gargalos (CPU e RAM):**
   - Identificar qualquer processo consumindo > 5% de CPU ou RAM em segundo plano.
   - Diagnosticar eventuais loops ou processos filhos acumulados (ex.: servidores de desenvolvimento órfãos, workers travados).

2. **Inicialização & Processos em Segundo Plano:**
   - Verificar itens na inicialização do sistema (`Run` keys / serviços de usuário).
   - Garantir que apenas os utilitários essenciais permaneçam ativos no boot.

3. **Armazenamento & Lixo de Build:**
   - Medir espaço livre no disco principal e taxa de utilização.
   - Checar acúmulo de cache de gerenciadores de pacote (`npm-cache`, `pip-cache`, `cargo-cache`), arquivos temporários do sistema e artefatos de build não limpos.

4. **Segurança & Rede:**
   - Verificar status da proteção em tempo real do antivírus do sistema operacional.
   - Auditar extensões de navegadores instaladas e portas locais ativas em escuta (`netstat -ano`).

5. **Backup & Proteção de Dados:**
   - Conferir se repositórios de trabalho têm commits pendentes sem push.
   - Alertar sobre a necessidade de sincronização de pastas de trabalho locais.

## Regra de Ouro Inviolável:
- **NUNCA** apagar arquivos, desinstalar programas, desativar inicializações ou encerrar processos sem a **aprovação explícita** do usuário.
- Apresentar o relatório consolidado de forma clara e objetiva:
  1. *Status Geral e Saúde do Sistema*
  2. *Itens que precisam de atenção*
  3. *Recomendações e Otimizações Sugeridas*
