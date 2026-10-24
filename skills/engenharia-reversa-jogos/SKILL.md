---
name: engenharia-reversa-jogos
description: Especialista em engenharia reversa de jogos de console (PS2, Xbox, N64, GameCube) e PC, recompilação estática (static recompilation), ports nativos para PC em C/C++, CMake/SDL2, hooking e automação via CLI um. Use ao trabalhar com decompilação de jogos, compilação de ports nativos de consoles no PC, modding ou análise de binários de jogos.
---

# Engenharia Reversa de Jogos, Ports Nativos & Modding Avançado

Guia mestre de engenharia reversa para jogos de console (PS2, Xbox, N64, GameCube) e PC, cobrindo decompilação, recompilação estática, criação de ports nativos para Windows, hooking de funções e o pipeline automatizado via CLI `um`.

---

## 1. Ferramentas Integradas (CLI `um`)

O comando `um` está instalado globalmente no sistema e provê utilitários imediatos:
```powershell
um scan "C:\Games\MeuJogo"              # Identifica engine, arquitetura, loaders, saves e rotas
um backup "C:\Games\MeuJogo\saves"       # Snapshot e restore atômico de saves antes do teste
um win screenshot                       # Captura tela do jogo no Windows
um win rec start                        # Gravação de gameplay com áudio do processo (loopback)
um kb search "decomp"                   # Pesquisa offline na base de conhecimento (>100 notas)
um comfy generate --prompt "..."         # Geração local de texturas/assets via ComfyUI (sem custo)
um render3d model.glb                   # Converte modelos 3D em frames de spritesheet (Blender)
```

---

## 2. Estratégias por Tipo de Binário

### A. Managed .NET & Unity Mono
- Ferramentas: `ilspycmd`, `dnSpyEx`.
- Fluxo:
  ```powershell
  ilspycmd -p -o ./decomp-output GameAssembly.dll
  ```
- O código descompilado deve ficar sempre **fora** do repositório de mod (`~/<game>-decomp/`).

### B. Unity IL2CPP
- Ferramentas: `Cpp2IL`, `Il2CppDumper`.
- Extração de `GameAssembly.dll` + `global-metadata.dat`: gera structs, tipos, dummy DLLs e assinaturas de funções para carregar no Ghidra ou IDA.

### C. Binários Nativos C/C++ e Consoles (PS2, N64, GameCube, Xbox)
- **Descompilação:** Ghidra (MCP/headless) ou IDA Pro.
  - Comece sempre por strings literais, siga as cross-references (XREFs) e renomeie as funções à medida que o fluxo for compreendido.
- **Recompilação Estática (Static Recompilation):**
  - MIPS (N64, PS2 EE/IOP) $\rightarrow$ C/C++ intermediário $\rightarrow$ Compilador nativo x86_64.
  - Frameworks de referência: *N64Recomp*, *OpenGOAL*, *re3/reVC*, *Ship of Harkinian*.
- **Matching Decompilation (Byte-Exact):**
  - Uso de `objdiff` para garantir paridade exata de registradores e instruções contra o compilador original (ex: MWCC / GCC 2.95).

---

## 3. Formatos de Arquivos & Prova de Ida e Volta (Round-Trip)

Ao fazer engenharia reversa de um formato de arquivo proprietário (`.dat`, `.pak`, `.sld`, `.bin`):
1. **Inspeção de Cabeçalho:** Examine arquivos com hex editor ou script Python (`xxd`). Procure *magic bytes*, contagens, offsets de tabelas e compressão (zlib, lz4, lzo).
2. **Leitor (Reader):** Escreva um parser que converta os dados brutos em formato legível (JSON, PNG, OBJ).
3. **Escritor (Writer) & Round-Trip:** Escreva o reconversor e valide a prova de ida e volta:
   $$\text{Arquivo Original} \xrightarrow{\text{Decode}} \text{Estrutura} \xrightarrow{\text{Encode}} \text{Arquivo Novo}$$
   O arquivo re-codificado deve ter paridade exata ou quase nula de erro antes de ser injetado no jogo.

---

## 4. Hooking, Interceptação & DLL Proxies

Para injetar código em executáveis nativos sem alterar o binário original:
- **DLL Proxying:** Colocar uma DLL na pasta do jogo com o mesmo nome de uma dependência do sistema (`version.dll`, `d3d9.dll`, `dxgi.dll`, `winmm.dll`), exportando as funções originais via forwarder e executando código customizado no `DllMain`.
- **VTable Hooks:** Substituir ponteiros de funções virtuais em memória para interceptar loops de renderização (`Present`, `EndScene`) ou lógica de entidades.
- **RenderDoc:** Capturar passes de renderização da GPU para identificar constantes, buffers e shaders (usando 3Dmigoto para decompiler DXBC para HLSL).

---

## 5. Regras Rígidas de Segurança e Legalidade

- **Uso estritamente pessoal e offline:** Nunca injete código em jogos online com anti-cheat ativo (Easy Anti-Cheat, BattlEye, Vanguard).
- **Sem Pirataria ou DRM Bypass:** Nunca remova ou contorne proteções de autenticação ou DRM.
- **Clean-Room:** O repositório Git nunca deve armazenar código descompilado do jogo nem arquivos protegidos por direitos autorais. O projeto deve sempre conter o script de extração que opera a partir da mídia original de posse do usuário.
- **Backup Obrigatório:** Sempre use `um backup` antes de inicializar o jogo com patches experimentais.
