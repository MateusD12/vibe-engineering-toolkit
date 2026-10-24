import os
import re
from pathlib import Path
from datetime import datetime

# Pastas e arquivos ignorados na varredura
IGNORE_DIRS = {
    'node_modules', '.git', 'dist', 'build', '.next', '.venv', 'venv', 
    '__pycache__', '.memory', '.claude', '.vscode', 'coverage', 'out'
}
EXTENSIONS = {'.ts', '.tsx', '.js', '.jsx', '.py', '.sql', '.vba', '.dax'}

# Padrões Regex nativos para capturar assinaturas sem precisar de bibliotecas externas
PATTERNS = {
    'py': [
        (r'^\s*(?:async\s+)?def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)', 'def'),
        (r'^\s*class\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:\([^)]*\))?:', 'class')
    ],
    'ts': [
        (r'^\s*(?:export\s+)?(?:default\s+)?(?:async\s+)?function\s+([a-zA-Z0-9_]+)\s*\(', 'fn'),
        (r'^\s*(?:export\s+)?const\s+([a-zA-Z0-9_]+)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[a-zA-Z0-9_]+)\s*=>', 'const-fn'),
        (r'^\s*(?:export\s+)?(?:interface|type)\s+([a-zA-Z0-9_]+)', 'type'),
        (r'^\s*(?:export\s+)?class\s+([a-zA-Z0-9_]+)', 'class')
    ],
    'sql': [
        (r'(?i)^\s*CREATE\s+(?:OR\s+REPLACE\s+)?(?:TABLE|VIEW|FUNCTION|PROCEDURE)\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_.]+)', 'sql-obj')
    ]
}

def init_memory_vault(root_path: Path):
    """Cria a estrutura de pastas estilo Obsidian se não existir no projeto atual."""
    mem_dir = root_path / '.memory'
    folders = ['00-index', '01-arquitetura', '02-codemap', '03-logs-sessao']
    
    for folder in folders:
        (mem_dir / folder).mkdir(parents=True, exist_ok=True)
        
    moc_file = mem_dir / '00-index' / 'MOC-geral.md'
    if not moc_file.exists():
        moc_content = f"""---
project: {root_path.name}
updated: {datetime.now().strftime('%Y-%m-%d')}
type: moc
---
# Mapa de Contexto Geral ({root_path.name})

## Status do Mapeamento
Projeto em mapeamento progressivo (Lazy Indexing). Documente novos módulos conforme forem editados.

## Índices Principais
- [[tree-signatures|Mapa de Assinaturas e Linhas de Código]]

## Módulos de Arquitetura Mapeados
*(O Claude adicionará [[wikilinks]] aqui conforme atuar nos módulos)*
"""
        moc_file.write_text(moc_content, encoding='utf-8')
    return mem_dir

def extract_signatures(file_path: Path):
    ext = file_path.suffix.lower()
    lang = 'py' if ext == '.py' else ('sql' if ext == '.sql' else 'ts')
    rules = PATTERNS.get(lang, [])
    
    results = []
    try:
        lines = file_path.read_text(encoding='utf-8', errors='ignore').splitlines()
        for idx, line in enumerate(lines, start=1):
            for regex, kind in rules:
                match = re.search(regex, line)
                if match:
                    name = match.group(1)
                    results.append(f"  - `{kind}: {name}` (Linha {idx})")
    except Exception:
        pass
    return results

def build_codemap(root_path: Path):
    mem_dir = init_memory_vault(root_path)
    output_lines = [
        "---",
        f"updated: {datetime.now().strftime('%Y-%m-%d %H:%M')}",
        "type: codemap",
        "---",
        "# Mapa de Assinaturas do Código (Gerado Localmente)",
        "> Use os números de linha abaixo para dar Read parcial (offset/limit) sem ler arquivos inteiros.\n"
    ]
    
    file_count = 0
    for dirpath, dirnames, filenames in os.walk(root_path):
        # Filtra pastas ignoradas in-place
        dirnames[:] = [d for d in dirnames if d not in IGNORE_DIRS and not d.startswith('.')]
        
        for fname in sorted(filenames):
            fpath = Path(dirpath) / fname
            if fpath.suffix.lower() in EXTENSIONS and fpath.stat().st_size <= 1_000_000:
                rel_path = fpath.relative_to(root_path).as_posix()
                sigs = extract_signatures(fpath)
                try:
                    total_lines = len(fpath.read_text(encoding='utf-8', errors='ignore').splitlines())
                except Exception:
                    total_lines = 0
                
                output_lines.append(f"## `{rel_path}` ({total_lines} linhas)")
                if sigs:
                    output_lines.extend(sigs)
                else:
                    output_lines.append("  - *(Sem assinaturas padrão extraídas)*")
                output_lines.append("")
                file_count += 1

    codemap_file = mem_dir / '02-codemap' / 'tree-signatures.md'
    codemap_file.write_text('\n'.join(output_lines), encoding='utf-8')
    print(f"[Obsidian Engine] Mapeamento concluído ({root_path.name}): {file_count} arquivos indexados em .memory/02-codemap/tree-signatures.md")

def garante_exclusao_local(root_path: Path):
    """O cofre é local: registra .memory/ em .git/info/exclude (não é versionado, não entra em commit nem na producao)."""
    ex = root_path / '.git' / 'info' / 'exclude'
    ex.parent.mkdir(parents=True, exist_ok=True)
    atual = ex.read_text(encoding='utf-8', errors='ignore') if ex.exists() else ''
    if not any(l.strip().strip('/').rstrip('*').rstrip('/') == '.memory' for l in atual.splitlines()):
        with ex.open('a', encoding='utf-8') as f:
            quebra = '' if (not atual or atual.endswith('\n')) else '\n'
            f.write(quebra + '# Obsidian Engine (cofre local)\n.memory/\n')


if __name__ == '__main__':
    import sys
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    raiz = Path(args[0]).resolve() if args else Path.cwd()
    # só mapeia repositório de verdade: evita criar .memory/ em Downloads, OneDrive ou na pasta errada
    if not (raiz / '.git').exists() and '--forcar' not in sys.argv:
        print(f"[Obsidian Engine] {raiz} não é um repositório git. Passe a pasta do app: "
              "py codemap_generator.py C:/Projetos/projetos/<app>   (ou --forcar)")
        sys.exit(1)
    if (raiz / '.git').exists():
        garante_exclusao_local(raiz)
    build_codemap(raiz)