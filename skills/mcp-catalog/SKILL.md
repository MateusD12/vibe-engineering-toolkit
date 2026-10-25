---
name: mcp-catalog
description: Catálogo dos melhores servidores Model Context Protocol (MCP) curados (awesome-mcp-servers) para Claude Code e Antigravity. Conecta LLMs a bancos locais, navegadores headless, Ollama e sistemas de arquivos.
---

# Catálogo Curado de Servidores MCP (Model Context Protocol)

O protocolo **MCP (Model Context Protocol)** permite conectar Claude Code, Antigravity e outros clientes de IA diretamente a ferramentas, bancos de dados, navegadores e serviços externos de forma padronizada.

---

## 1. Servidores MCP Essenciais para Desenvolvimento

### 1.1. Ollama MCP (Inferência Local $0 Tokens via Ferramenta)
Permite que o próprio agente convoque a LLM local para resolver subtarefas sem gastar contexto:
- **Repositório:** `mcp-server-ollama`
- **Comando de inicialização:**
  ```json
  "ollama": {
    "command": "npx",
    "args": ["-y", "mcp-server-ollama"],
    "env": {
      "OLLAMA_HOST": "http://localhost:11434"
    }
  }
  ```

### 1.2. SQLite MCP (Consulta e Edição de Bancos Locais)
Permite rodar queries, criar tabelas e inspecionar schemas de bases SQLite locais (como bancos do Turso, Dexie ou bancos locais de apps):
- **Comando:**
  ```json
  "sqlite": {
    "command": "uvx",
    "args": ["mcp-server-sqlite", "--db-path", "./app.db"]
  }
  ```

### 1.3. Playwright / Browser MCP (Navegação & Testes E2E Visuais)
Permite ao agente navegar na web, clicar em botões, tirar screenshots e inspecionar formulários reais:
- **Comando:**
  ```json
  "playwright": {
    "command": "npx",
    "args": ["-y", "@executeautomation/playwright-mcp-server"]
  }
  ```

### 1.4. PostgreSQL / Supabase MCP
Conecta diretamente ao banco de dados Supabase ou Postgres de desenvolvimento para inspeção e migrations:
- **Comando:**
  ```json
  "postgres": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:password@localhost:5432/mydb"]
  }
  ```

---

## 2. Como Configurar no Claude Code & Antigravity

Adicione o servidor desejado no arquivo de configuração do seu ambiente:

- **Claude Code:** `~/.claude.json` (seção `mcpServers`)
- **Gemini / Antigravity:** `~/.gemini/antigravity/mcp_config.json` ou nas configurações do workspace.

Exemplo de estrutura:
```json
{
  "mcpServers": {
    "sqlite": {
      "command": "uvx",
      "args": ["mcp-server-sqlite", "--db-path", "local.db"]
    }
  }
}
```
