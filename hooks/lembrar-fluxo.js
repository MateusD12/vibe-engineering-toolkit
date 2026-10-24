#!/usr/bin/env node
/**
 * Hook UserPromptSubmit — lê o pedido e injeta QUAIS agentes/skills a sessão deve chamar + protocolo Obsidian Engine.
 * Versão em Node.js nativa para o PC pessoal (zero dependência de Python).
 * Cobertura universal: Apps Web/Mobile, Backend/SQL, IA, Jogos/Engenharia Reversa/Ports/VR/Wasm e Sanitização.
 */
const REGRAS = [
  [
    /\b(novo\s+(projeto|sistema|app|aplicativo|jogo)|cria(r)?\s+(um|o|a)?\s*(projeto|sistema|app|aplicativo|jogo)|clon(a|ar|e)\b|come[cç](a|ar)\s+(a\s+)?(produ[cç][aã]o|o\s+sistema|o\s+app)|reposit[oó]rio\s+novo|sess[aã]o\s+nova)/i,
    "APP/PROJETO NOVO — ANTES do 1º código, nesta ordem: descoberta-agentes → engenheiro-prompts → arquiteto → infraestrutura-projetos → git-workflow. Depois cada entrega passa pelo pipeline."
  ],
  [
    /\b(atualiz|implement|corrig|ajust|refator|arrum|adicion|remov|mud|mex|troc|alter|consert|quebr)\w*\b|\b(bug|erros?)\b/i,
    "MUDANÇA DE CÓDIGO — limite estrito de 350 linhas/arquivo + pipeline antes do commit: revisor-codigo (sempre) → seguranca (auth/SSO/RLS/dados/rotas/uploads/segredos) → testador (build + preview) → pentester + tech-lead (mudança grande/sensível)."
  ],
  [
    /\b(pente[\s-]?fino|sanitiz\w*|c[oó]digo\s+morto|warnings?\b|350\s+linhas|limp(a|ar|eza)\s+(de\s+)?(c[oó]digo|legado|projeto))\b/i,
    "SANITIZAÇÃO & QUALITY GATE — skill sanitizacao-codigo (medir baseline antes/depois + eliminar código morto/warnings + fatiar arquivos > 350 linhas)."
  ],
  [
    /\b(ondas?\s+paralel\w*|subagentes?\s+paralel\w*|divid(ir|a)\s+(em\s+)?subagentes|parallel\s+wave)/i,
    "ONDAS PARALELAS — skill orquestracao-ondas: Files(A) ∩ Files(B) = ∅; subagentes implementadores NUNCA commitam (só o coordenador no HEAD fresco)."
  ],
  [
    /\b(jogos?|games?|mods?|modding|ports?\b|decomp\w*|recomp\w*|ps2|xbox|n64|gamecube|mips|elf\b|iso\b|ghidra|ilspy|cpp2il|il2cpp|bepinex|harmony|melonloader|objdiff|dll\s+hook|engenharia\s+reversa|\bum\s+(scan|kb|win|backup|comfy|voidless))\b/i,
    "JOGOS & ENGENHARIA REVERSA — agentes engenheiro-reversa-jogos + mod-orchestrator (e workers mod-game-worker / mod-offline-worker) + skills engenharia-reversa-jogos / reverse-engineering / mod-any-game + CLI `um` (`um scan`, `um kb search`, `um backup`, `um win`) + `ps2_native_port.py`."
  ],
  [
    /\b(\bvr\b|realidade\s+virtual|6dof|openxr|openvr|uevr|headset|quest\s*[23]|est[eé]reo)\b/i,
    "VR MODDING — skill vr-game-modding (matrizes estéreo, desacoplamento de câmera, OpenXR/OpenVR, perfis UEVR 6DOF)."
  ],
  [
    /\b(wasm|webassembly|webgpu|webgl|emscripten|port\s+(para\s+)?(o\s+)?navegador|clean[\s-]?room)\b/i,
    "PORT WEB/WASM — skill wasm-game-ports (Emscripten C++/Rust → Wasm/WebGPU + arquitetura Clean-Room via File System Access API sem assets proprietários no repo)."
  ],
  [
    /\b(sql|migration|migra[cç][aã]o|rls|supabase|tabela|golden|n[uú]meros?\s+(batem|conferir))/i,
    "BANCO — supabase-sql para SQL/migration/checagem de números."
  ],
  [
    /\b(tela|layout|p[aá]gina|celular|mobile|responsiv|pwa|bot[aã]o|formul[aá]rio|cores?\b|fonte)/i,
    "TELA — especialista-mobile + especialista-acessibilidade além do pipeline."
  ],
  [
    /(package\.json|\bdepend[eê]ncia|\bbiblioteca|\blib\b|\bnpm\b|\bvulnerab|\baudit)/i,
    "DEPENDÊNCIAS — gestor-dependencias (separar patch/minor de major e validar build)."
  ],
  [
    /(\bia\b|intelig[eê]ncia artificial|\bgpt|openai|\bprompt|\bocr\b|chatbot|\bllm\b|\bresum)/i,
    "IA NO APP — revisor-ia (prompt injection, custo, chave exposta)."
  ],
  [
    /\b(custo|quanto (vai )?custa|egress|storage|plano do supabase|azure|cr[eé]dito|escalar|mais usu[aá]rios)/i,
    "CUSTO — analista-custo-nuvem."
  ],
  [
    /\b(chamado|teams|e-?mail|pediram|me falaram|usu[aá]rio (disse|pediu|reclamou)|qual app)/i,
    "CHAMADO — triagem-chamados (identifica o app e a rota; despacha p/ a sessão do app)."
  ],
  [
    /\b(electron|desktop|agent sdk)/i,
    "DESKTOP — especialista-electron."
  ],
  [
    /\b(rollback|revert|volta(r)? a vers[aã]o|deploy quebr)/i,
    "ROLLBACK — agente-rollback."
  ],
  [
    /\b(document(a|ar|a[cç][aã]o)|readme|pop\b|manual)/i,
    "DOCUMENTAÇÃO — gerador-docs."
  ],
  [
    /\b(cri|mud|alter|edit|ajust|remov|adicion)\w*\s+(o |a |os |as |um |uma |no |na )?(agentes?|skills?|hooks?|settings|claude\.md|gemini\.md)\b/i,
    "SETUP — mudou agente/skill/hook/settings → auditor-agentes."
  ],
  [
    /\b(commit|push|sobe|subir|git)\b/i,
    "GIT — git-workflow (branch padrão: main)."
  ]
];

const OBSIDIAN =
  'OBSIDIAN ENGINE (obrigatório, custo zero de tokens) — antes de abrir código: se <app>/.memory/02-codemap/tree-signatures.md não existir, rode `node "C:/Users/Pichau/.claude/skills/obsidian-engine/scripts/codemap_generator.js" "C:/Projetos/<app>"`; ache arquivo/linha no mapa (busque pelo nome) e leia só os trechos; passe arquivos/linhas exatos aos subagentes; no fim rode o script de novo + nota do módulo em .memory/01-arquitetura/.';

const RODAPE =
  'No relatório final inclua: "Agentes: <quem rodou> ✔" ou "não necessário: <motivo>". Dúvida/explicação simples: responder direto, sem agentes.';

let entrada = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (c) => { entrada += c; });
process.stdin.on('end', () => {
  let prompt = '';
  try {
    prompt = (JSON.parse(entrada).prompt || '').toLowerCase();
  } catch {
    process.exit(0);
  }
  if (!prompt) process.exit(0);

  const hits = [];
  for (const [pat, msg] of REGRAS) {
    if (pat.test(prompt)) hits.push(msg);
  }

  const trabalho = hits.some((m) =>
    ['MUDANÇA', 'APP/PROJETO', 'SANITIZAÇÃO', 'ONDAS', 'JOGOS', 'VR', 'PORT WEB', 'BANCO', 'TELA', 'DESKTOP', 'DEPENDÊNCIAS', 'IA NO APP'].some((k) => m.includes(k))
  );
  if (trabalho || prompt.includes('cross-session-message') || prompt.includes('another claude session')) {
    hits.unshift(OBSIDIAN);
  }

  if (hits.length > 0) {
    process.stdout.write('[AGENTES — MODO TURBO ATIVO]\n- ' + hits.join('\n- ') + '\n' + RODAPE + '\n');
  }
  process.exit(0);
});
