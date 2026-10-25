#!/usr/bin/env node
/**
 * Obsidian Engine — Motor Local Universal de Mapa de Código + Grafo de Imports (Node.js puro, zero dependências)
 * Suporta: TypeScript/JavaScript/React, Python, C/C++, C#, Rust, Go, Lua, SQL, VBA, DAX.
 * Gera:
 *   - .memory/02-codemap/tree-signatures.md (com alerta automático de arquivos > 350 linhas)
 *   - .memory/02-codemap/imports.md (grafo "usa" / "usado por" para leitura cirúrgica de vizinhos)
 */
const fs = require('fs');
const path = require('path');

const IGNORE_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', '.venv', 'venv',
  '__pycache__', '.memory', '.claude', '.vscode', 'coverage', 'out',
  'target', 'bin', 'obj', 'third_party', 'extern', 'external'
]);

const EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx',
  '.py',
  '.c', '.cpp', '.cc', '.cxx', '.h', '.hpp',
  '.cs',
  '.rs',
  '.go',
  '.lua',
  '.sql', '.vba', '.dax'
]);

const LIMITE_LINHAS = 350;
const EXT_RESOLVE = ['', '.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '.h', '.hpp', '.cpp', '.c'];

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
  cpp: [
    [/^\s*(?:template\s*<[^>]*>\s*)?(?:class|struct)\s+(?:[A-Z0-9_]+\s+)?([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:final\s*)?(?::|{|\b)/, 'class/struct'],
    [/^\s*namespace\s+([a-zA-Z_][a-zA-Z0-9_:]*)/, 'namespace'],
    [/^(?:[a-zA-Z_][a-zA-Z0-9_:<>*&\s]{1,60})\s+([a-zA-Z_][a-zA-Z0-9_:]*)\s*\([^;]*\)\s*(?:const\s*)?(?:noexcept\s*)?(?:override\s*)?{/, 'fn']
  ],
  cs: [
    [/^\s*(?:public|private|protected|internal|static|sealed|abstract|partial|\s)+class\s+([a-zA-Z_][a-zA-Z0-9_]*)/, 'class'],
    [/^\s*(?:public|private|protected|internal|static|\s)+(?:struct|interface|enum)\s+([a-zA-Z_][a-zA-Z0-9_]*)/, 'type'],
    [/^\s*(?:public|private|protected|internal|static|virtual|override|async|\s)+[a-zA-Z0-9_<>,\[\]\?]+\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\([^;]*\)\s*(?:where\b[^{]*)?{/, 'method']
  ],
  rs: [
    [/^\s*(?:pub(?:\([^)]*\))?\s+)?(?:async\s+)?(?:unsafe\s+)?fn\s+([a-zA-Z_][a-zA-Z0-9_]*)/, 'fn'],
    [/^\s*(?:pub(?:\([^)]*\))?\s+)?(?:struct|enum|trait|type)\s+([a-zA-Z_][a-zA-Z0-9_]*)/, 'type'],
    [/^\s*impl(?:<[^>]*>)?\s+([a-zA-Z_][a-zA-Z0-9_:<>\s]*?)\s*\{/, 'impl']
  ],
  go: [
    [/^\s*func\s+(?:\([^)]+\)\s+)?([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/, 'func'],
    [/^\s*type\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+(?:struct|interface)/, 'type']
  ],
  lua: [
    [/^\s*(?:local\s+)?function\s+([a-zA-Z_][a-zA-Z0-9_.:]*)\s*\(/, 'fn']
  ],
  sql: [
    [/^\s*CREATE\s+(?:OR\s+REPLACE\s+)?(?:TABLE|VIEW|FUNCTION|PROCEDURE|POLICY)\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_."]+)/i, 'sql-obj']
  ]
};

function getLang(ext) {
  if (ext === '.py') return 'py';
  if (ext === '.sql') return 'sql';
  if (['.c', '.cpp', '.cc', '.cxx', '.h', '.hpp'].includes(ext)) return 'cpp';
  if (ext === '.cs') return 'cs';
  if (ext === '.rs') return 'rs';
  if (ext === '.go') return 'go';
  if (ext === '.lua') return 'lua';
  return 'ts';
}

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
      '- [[imports|Grafo de Imports e Dependências Locais]]',
      '',
      '## Módulos de Arquitetura Mapeados',
      '*(Os agentes adicionarão [[wikilinks]] aqui conforme atuarem nos módulos)*',
      ''
    ].join('\n');
    fs.writeFileSync(mocFile, mocContent, 'utf8');
  }
  return memDir;
}

function resolveImport(spec, origem, rootPath, lang) {
  if (!spec) return null;
  if (lang === 'py') {
    let cand;
    if (spec.startsWith('.')) {
      const nivel = spec.length - spec.replace(/^\.+/, '').length;
      let base = path.dirname(origem);
      for (let i = 0; i < nivel - 1; i++) base = path.dirname(base);
      cand = path.join(base, spec.replace(/^\.+/, '').split('.').join(path.sep));
    } else {
      cand = path.join(rootPath, spec.split('.').join(path.sep));
    }
    for (const c of [`${cand}.py`, path.join(cand, '__init__.py')]) {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) return path.resolve(c);
    }
    return null;
  }
  if (lang === 'cpp') {
    const candLocal = path.resolve(path.dirname(origem), spec);
    if (fs.existsSync(candLocal) && fs.statSync(candLocal).isFile()) return candLocal;
    const candRoot = path.resolve(rootPath, spec);
    if (fs.existsSync(candRoot) && fs.statSync(candRoot).isFile()) return candRoot;
    return null;
  }
  let cand;
  if (spec.startsWith('@/')) {
    cand = path.join(rootPath, 'src', spec.slice(2));
  } else if (spec.startsWith('.')) {
    cand = path.resolve(path.dirname(origem), spec);
  } else {
    return null;
  }
  for (const e of EXT_RESOLVE) {
    const c = cand + e;
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return path.resolve(c);
  }
  return null;
}

function extractImports(content, filePath, rootPath, lang) {
  if (lang === 'sql') return [];
  const deps = new Set();
  const rootResolved = path.resolve(rootPath);

  if (lang === 'py') {
    const rePy = /^\s*(?:from\s+(\.+[\w.]*|[\w.]+)\s+import|import\s+([\w.]+))/gm;
    let m;
    while ((m = rePy.exec(content)) !== null) {
      const spec = m[1] || m[2];
      const alvo = resolveImport(spec, filePath, rootResolved, 'py');
      if (alvo && alvo.startsWith(rootResolved)) {
        deps.add(path.relative(rootResolved, alvo).split(path.sep).join('/'));
      }
    }
  } else if (lang === 'cpp') {
    const reCpp = /^\s*#include\s*"([^"]+)"/gm;
    let m;
    while ((m = reCpp.exec(content)) !== null) {
      const alvo = resolveImport(m[1], filePath, rootResolved, 'cpp');
      if (alvo && alvo.startsWith(rootResolved)) {
        deps.add(path.relative(rootResolved, alvo).split(path.sep).join('/'));
      }
    }
  } else if (lang === 'ts') {
    const reTs = /(?:import|export)\s[^'"]*?from\s*['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)|^\s*import\s*['"]([^'"]+)['"]/gm;
    let m;
    while ((m = reTs.exec(content)) !== null) {
      const spec = m[1] || m[2] || m[3];
      const alvo = resolveImport(spec, filePath, rootResolved, 'ts');
      if (alvo && alvo.startsWith(rootResolved)) {
        deps.add(path.relative(rootResolved, alvo).split(path.sep).join('/'));
      }
    }
  }
  return Array.from(deps).sort();
}

function extractFileInfo(filePath, rootPath) {
  const ext = path.extname(filePath).toLowerCase();
  const lang = getLang(ext);
  const rules = PATTERNS[lang] || [];
  const results = [];

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const [regex, kind] of rules) {
        const match = line.match(regex);
        if (match && match[1]) {
          const sym = match[1].trim();
          if (!['if', 'for', 'while', 'switch', 'catch', 'return', 'sizeof'].includes(sym)) {
            results.push(`  - \`${kind}: ${sym}\` (Linha ${i + 1})`);
          }
        }
      }
    }
    const imports = extractImports(content, filePath, rootPath, lang);
    return { results, totalLines: lines.length, imports };
  } catch {
    return { results: [], totalLines: 0, imports: [] };
  }
}

function writeImportGraph(memDir, graph) {
  const usadoPor = {};
  for (const [f, deps] of Object.entries(graph)) {
    for (const d of deps) {
      if (!usadoPor[d]) usadoPor[d] = [];
      usadoPor[d].push(f);
    }
  }
  const allFiles = Array.from(new Set([...Object.keys(graph), ...Object.keys(usadoPor)])).sort();
  const linhas = [
    '---',
    `updated: ${formatDate(new Date(), true)}`,
    'type: import-graph',
    '---',
    '# Grafo de imports (gerado localmente)',
    '> Antes de mexer num arquivo, leia só os arquivos que ele USA e os que o USAM — não o repositório inteiro.\n'
  ];

  for (const f of allFiles) {
    const u = graph[f] || [];
    const p = (usadoPor[f] || []).sort();
    if (u.length === 0 && p.length === 0) continue;
    linhas.push(`## \`${f}\``);
    if (u.length > 0) {
      linhas.push('  - usa: ' + u.map((x) => `\`${x}\``).join(', '));
    }
    if (p.length > 0) {
      linhas.push(`  - usado por (${p.length}): ` + p.map((x) => `\`${x}\``).join(', '));
    }
    linhas.push('');
  }
  fs.writeFileSync(path.join(memDir, '02-codemap', 'imports.md'), linhas.join('\n'), 'utf8');
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
  const graph = {};
  let grandes = 0;
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
    const { results, totalLines, imports } = extractFileInfo(fpath, rootPath);
    graph[relPath] = imports;
    let aviso = '';
    if (totalLines > LIMITE_LINHAS) {
      aviso = ` ⚠ acima de ${LIMITE_LINHAS} linhas`;
      grandes++;
    }
    outputLines.push(`## \`${relPath}\` (${totalLines} linhas)${aviso}`);
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
  writeImportGraph(memDir, graph);
  const arestas = Object.values(graph).reduce((acc, v) => acc + v.length, 0);
  console.log(`[Obsidian Engine] Mapeamento concluído (${path.basename(rootPath)}): ${fileCount} arquivos, ${arestas} ligações de import, ${grandes} arquivos acima de ${LIMITE_LINHAS} linhas — .memory/02-codemap/tree-signatures.md + imports.md`);
}

if (require.main === module) {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const forcar = process.argv.includes('--forcar');
  const raiz = args[0] ? path.resolve(args[0]) : process.cwd();

  if (!fs.existsSync(path.join(raiz, '.git')) && !forcar) {
    console.error(`[Obsidian Engine] ${raiz} não é um repositório git. Passe a pasta do projeto: node codemap_generator.js <caminho_do_projeto> (ou --forcar)`);
    process.exit(1);
  }
  if (fs.existsSync(path.join(raiz, '.git'))) {
    garanteExclusaoLocal(raiz);
  }
  buildCodemap(raiz);
}
