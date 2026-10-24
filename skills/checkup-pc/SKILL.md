---
name: checkup-pc
description: Executa a auditoria completa de saúde, performance, armazenamento, segurança e backup do computador do Mateus sob comando. Use sempre que o usuário pedir 'faz o checkup', 'audita o pc', 'como tá meu pc', 'manutenção geral' ou 'analisa o sistema'.
---

# Skill: Checkup Completo do Computador (Saúde, Performance e Segurança)

Esta skill executa uma varredura consolidada de todos os 5 pilares do computador do Mateus em uma única rodada:

1. **Performance & Gargalos (CPU e RAM):**
   - Executar `C:\Users\Pichau\.manutencao\executar_checkup_completo.ps1`.
   - Identificar qualquer processo consumindo > 5% de CPU ou RAM.
   - Diagnosticar eventuais loops ou processos filhos acumulados.

2. **Inicialização & Boot:**
   - Verificar itens em `HKCU:\Software\Microsoft\Windows\CurrentVersion\Run` e `HKLM`.
   - Garantir que apenas os itens essenciais (`SecurityHealth`) estejam ativos e alertar se apps como Steam, Discord, Edge ou torrents voltaram a se auto-iniciar.

3. **Armazenamento & Lixo:**
   - Medir espaço livre no SSD C: e comparar com o baseline.
   - Checar acúmulo de cache do NPM (`AppData\Local\npm-cache`), temporários (`Temp`) e instaladores/compactados no Desktop.

4. **Segurança & Intrusos:**
   - Verificar status da proteção em tempo real do Microsoft Defender.
   - Auditar extensões ativas do Google Chrome e Edge em busca de extensões não autorizadas.
   - Auditar conexões de rede ativas.

5. **Backup & Proteção de Dados:**
   - Checar o status da rotina de backup do Google Drive e lembrar da execução do atalho `Criar-Backup-GoogleDrive.bat`.

## Regra de Ouro Inviolável:
- **NUNCA** apagar arquivos, desinstalar programas, desativar inicializações ou encerrar processos sem a **aprovação explícita** do Mateus.
- Apresentar o relatório consolidado de forma didática, categorizado em:
  1. *O que mudou / Status Atual*
  2. *O que precisa de atenção imediata*
  3. *O que pode esperar*
