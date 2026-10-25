"""Avaliação do harness — confere, sem gastar tokens, se os projetos e as sessões seguem o processo.

Uso:  py avaliar_harness.py [pasta-dos-projetos] [--geral]
  - pasta padrão: C:/Projetos/projetos
  - --geral: também confere os comentários das últimas 48 h na Geral (precisa do gh autenticado)

Só lê: não altera repositório, não faz commit, não posta nada.
"""
import json
import os
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path


def git(repo: Path, *args):
    try:
        r = subprocess.run(['git', '-C', str(repo), *args], capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=20)
        return r.stdout.strip()
    except Exception:
        return ''


def avalia_repo(repo: Path):
    ultimo = git(repo, 'log', '-1', '--format=%ct')
    if not ultimo:
        return None
    t_commit = datetime.fromtimestamp(int(ultimo), tz=timezone.utc)
    mapa = repo / '.memory' / '02-codemap' / 'tree-signatures.md'
    imports = repo / '.memory' / '02-codemap' / 'imports.md'
    notas = list((repo / '.memory' / '01-arquitetura').glob('*.md')) if (repo / '.memory').exists() else []
    t_mapa = datetime.fromtimestamp(mapa.stat().st_mtime, tz=timezone.utc) if mapa.exists() else None
    excl = repo / '.git' / 'info' / 'exclude'
    excluido = excl.exists() and '.memory' in excl.read_text(encoding='utf-8', errors='ignore')
    rastreado = bool(git(repo, 'ls-files', '.memory'))
    hist = repo / 'Historico.md'
    problemas = []
    if not mapa.exists():
        problemas.append('sem mapa Obsidian')
    elif t_mapa < t_commit - timedelta(minutes=5):
        problemas.append('mapa desatualizado (mais velho que o último commit)')
    if mapa.exists() and not imports.exists():
        problemas.append('sem grafo de imports (rodar o script de novo)')
    if mapa.exists() and not notas:
        problemas.append('nenhuma nota de módulo em 01-arquitetura')
    if mapa.exists() and not excluido:
        problemas.append('.memory fora do .git/info/exclude')
    if rastreado:
        problemas.append('ATENÇÃO: .memory está versionado no git')
    if not hist.exists():
        problemas.append('sem Historico.md')
    return {
        'repo': repo.name,
        'ultimo_commit': t_commit.strftime('%d/%m %H:%M'),
        'notas': len(notas),
        'problemas': problemas,
    }


def avalia_geral(horas=48):
    desde = (datetime.now(timezone.utc) - timedelta(hours=horas)).strftime('%Y-%m-%dT%H:%M:%SZ')
    try:
        r = subprocess.run(['gh', 'api', f"repos/{os.environ.get('CONSOLE_REPO', 'SEU-ORG/SEU-CONSOLE')}/issues/1/comments", '--paginate',
                            '-q', f'[.[]|select(.created_at>"{desde}")|{{id,created_at,body:.body[0:200]}}]'],
                           capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=60)
        itens = []
        for bloco in r.stdout.strip().splitlines():
            itens += json.loads(bloco)
    except Exception as e:
        return [f'não consegui ler a Geral ({e})']
    achados = []
    for c in itens:
        b = c['body'].lstrip('\ufeff').strip()
        tem_bot = '<!-- claude-bot' in b
        cara_de_bot = b.startswith('[') or b.startswith('**[') or b.startswith('##') or c['body'].startswith('\ufeff')
        if cara_de_bot and not tem_bot:
            achados.append(f"comentário {c['id']} ({c['created_at'][:16]}) parece resposta de sessão SEM as marcas claude-bot/notify")
        if tem_bot and '<!-- claude-notify' not in b and b.count('[') > 0 and ('?' in b or 'aguard' in b.lower()):
            achados.append(f"comentário {c['id']} ({c['created_at'][:16]}) tem pergunta/pendência mas SEM claude-notify (não avisou no Teams)")
    return achados


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    base = Path(args[0]) if args else Path('C:/Projetos/projetos')
    linhas = [f"# Avaliação do harness — {datetime.now().strftime('%d/%m/%Y %H:%M')}", '']
    ok, ruins = [], []
    for repo in sorted(p for p in base.iterdir() if (p / '.git').exists()):
        r = avalia_repo(repo)
        if not r:
            continue
        (ruins if r['problemas'] else ok).append(r)
    linhas.append(f"**Repositórios:** {len(ok) + len(ruins)} · em dia: {len(ok)} · com pendência: {len(ruins)}\n")
    if ruins:
        linhas.append('| Repositório | Último commit | Notas | Pendências |')
        linhas.append('|---|---|---|---|')
        for r in sorted(ruins, key=lambda x: x['ultimo_commit'], reverse=True):
            linhas.append(f"| {r['repo']} | {r['ultimo_commit']} | {r['notas']} | {'; '.join(r['problemas'])} |")
    if '--geral' in sys.argv:
        linhas += ['', '## Geral (últimas 48 h)']
        g = avalia_geral()
        linhas += [f'- {x}' for x in g] if g else ['- Tudo com as marcas certas.']
    sys.stdout.reconfigure(encoding='utf-8')
    print('\n'.join(linhas))


if __name__ == '__main__':
    main()
