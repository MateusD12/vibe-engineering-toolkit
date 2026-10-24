#!/usr/bin/env node
/**
 * Obsidian Engine — Motor Local de Mapa de Código (Node.js puro, zero dependências)
 * Adaptado de codemap_generator.py para rodar nativamente no PC pessoal sem depender de Python.
 * Inclui suporte a componentes React tipados (const X: FC<Props> = ...) e export default.
 */
const fs = require('fs');
const path = require('path');

const IGNORE_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', '.venv', 'venv',
  '__pycache__', '.memory', '.claude', '.vscode', 'coverage', 'out'
]);

const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.py', '.sql', '.vba', '.dax']);

const PATTERNS = {
  py: [
    [/^\s*(?:async\s+)?def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/, 'def'],
    [/^\s*class\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:\([^)]*\))?:/, 'class']
  ],
  ts: [
    [/^\s*(?:export\s+)?(?:default\s+)?(?:async\s+)?function\s+([a-zA-Z0-9_]+)\s*\(/, 'fn'],
    [/^\s*(?:export\s+)?const\s+([a-zA-Z0-9_]+)\s*(?::\s*[^=]+)?=\s*(?:async\s*)?(?:function\b|\([^)]*\)\s*(?::\s*[^=]+)?=>|[a-zA-Z0-9_]+\s*=>)/, 'const-fn'],
    [/^\s*(?:export\s+)?const\s+([a-zA-Z0-9_]+)\s*(?::\s*[^=]+)?=\s*(?:React\.)?(?:memo|forwardRef)\s*\(/, 'component'],
    [/^\s*(?:export\s+)?(?:interface|type)\s+([a-zA-Z0-9_]+)/, 'type'],
    [/^\s*(?:export\s+)?(?:default\s+)?class\s+([a-zA-Z0-9_]+)/, 'class']
  ],
  sql: [
    [/^\s*CREATE\s+(?:OR\s+REPLACE\s+)?(?:TABLE|VIEW|FUNCTION|PROCEDURE)\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_.]+)/i, 'sql-obj']
  ]
};

function formatDate(d = new Date(), withTime = false) {
  const pad = (n) => String(n).padStart(2, '0');
  const datePart = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  if (!withTime) return datePart;
  return `${datePart} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function initMemoryVault(rootPath) {
  const memDir = path.join(rootPath, '.memory');
  const folders = ['00-index', '01-arquitetura', '02-codemap', '03-logs-sessao'];

  for (const folder of folders) {
    fs.mkdirSync(path.join(memDir, folder), { recursive: true });
  }

  const mocFile = path.join(memDir, '00-index', 'MOC-geral.md');
  const projectName = path.basename(rootPath);
  if (!fs.existsSync(mocFile)) {
    const mocContent = [
      '---',
      `project: ${projectName}`,
      `updated: ${formatDate()}`,
      'type: moc',
      '---',
      `# Mapa de Contexto Geral (${projectName})`,
      '',
      '## Status do Mapeamento',
      'Projeto em mapeamento progressivo (Lazy Indexing). Documente novos módulos conforme forem editados.',
      '',
      '## Índices Principais',
      '- [[tree-signatures|Mapa de Assinaturas e Linhas de Código]]',
      '',
      '## Módulos de Arquitetura Mapeados',
      '*(Os agentes adicionarão [[wikilinks]] aqui conforme atuarem nos módulos)*',
      ''
    ].join('\n');
    fs.writeFileSync(mocFile, mocContent, 'utf8');
  }
  return memDir;
}

function extractSignatures(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const lang = ext === '.py' ? 'py' : (ext === '.sql' ? 'sql' : 'ts');
  const rules = PATTERNS[lang] || [];
  const results = [];

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const [regex, kind] of rules) {
        const match = line.match(regex);
        if (match) {
          results.push(`  - \`${kind}: ${match[1]}\` (Linha ${i + 1})`);
        }
      }
    }
    return { results, totalLines: lines.length };
  } catch {
    return { results: [], totalLines: 0 };
  }
}

function walkDir(dir, rootPath, fileCallback) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  entries.sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name) || entry.name.startsWith('.')) continue;
      walkDir(path.join(dir, entry.name), rootPath, fileCallback);
    } else if (entry.isFile()) {
      const fullPath = path.join(dir, entry.name);
      const ext = path.extname(entry.name).toLowerCase();
      if (!EXTENSIONS.has(ext)) continue;
      try {
        const stat = fs.statSync(fullPath);
        if (stat.size <= 1_000_000) {
          fileCallback(fullPath);
        }
      } catch {}
    }
  }
}

function garanteExclusaoLocal(rootPath) {
  const excludeFile = path.join(rootPath, '.git', 'info', 'exclude');
  try {
    fs.mkdirSync(path.dirname(excludeFile), { recursive: true });
    const atual = fs.existsSync(excludeFile) ? fs.readFileSync(excludeFile, 'utf8') : '';
    const hasMemory = atual.split(/\r?\n/).some((l) => {
      const clean = l.trim().replace(/^\/+/, '').replace(/\*+$/, '').replace(/\/+$/, '');
      return clean === '.memory';
    });
    if (!hasMemory) {
      const prefix = !atual || atual.endsWith('\n') ? '' : '\n';
      fs.appendFileSync(excludeFile, `${prefix}# Obsidian Engine (cofre local)\n.memory/\n`, 'utf8');
    }
  } catch {}
}

function buildCodemap(rootPath) {
  const memDir = initMemoryVault(rootPath);
  const outputLines = [
    '---',
    `updated: ${formatDate(new Date(), true)}`,
    'type: codemap',
    '---',
    '# Mapa de Assinaturas do Código (Gerado Localmente)',
    '> Use os números de linha abaixo para dar Read parcial (offset/limit) sem ler arquivos inteiros.\n'
  ];

  let fileCount = 0;
  walkDir(rootPath, rootPath, (fpath) => {
    const relPath = path.relative(rootPath, fpath).split(path.sep).join('/');
    const { results, totalLines } = extractSignatures(fpath);
    outputLines.push(`## \`${relPath}\` (${totalLines} linhas)`);
    if (results.length > 0) {
      outputLines.push(...results);
    } else {
      outputLines.push('  - *(Sem assinaturas padrão extraídas)*');
    }
    outputLines.push('');
    fileCount++;
  });

  const codemapFile = path.join(memDir, '02-codemap', 'tree-signatures.md');
  fs.writeFileSync(codemapFile, outputLines.join('\n'), 'utf8');
  console.log(`[Obsidian Engine] Mapeamento concluído (${path.basename(rootPath)}): ${fileCount} arquivos indexados em .memory/02-codemap/tree-signatures.md`);
}

if (require.main === module) {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const forcar = process.argv.includes('--forcar');
  const raiz = args[0] ? path.resolve(args[0]) : process.cwd();

  if (!fs.existsSync(path.join(raiz, '.git')) && !forcar) {
    console.error(`[Obsidian Engine] ${raiz} não é um repositório git. Passe a pasta do app: node codemap_generator.js C:/Projetos/<app> (ou --forcar)`);
    process.exit(1);
  }
  if (fs.existsSync(path.join(raiz, '.git'))) {
    garanteExclusaoLocal(raiz);
  }
  buildCodemap(raiz);
}
