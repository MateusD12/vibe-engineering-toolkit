---
name: nitro-app-publicado
description: >
  Checklist obrigatório sempre que um app Lovable da Nitro for publicado ou o
  usuário disser que acabou de publicar/lançar um app (ex.: "publiquei o
  app X", "o app X já está no ar", "lança esse projeto"). Também aciona ao
  fechar qualquer projeto novo no fluxo da Central de Agentes (skill
  `novo-projeto`) na etapa de publicação, e quando o usuário pedir para
  "colocar no Hub", "ligar o rastreio" ou "documentar" um app que já existe.
  Três passos nessa ordem: (1) cadastrar o card no Lovable Hub, (2) instalar
  o rastreamento de acesso no app, (3) gerar a documentação (POP) e salvar na
  pasta de conhecimento da Nina. Não cobre a publicação em si — publicar é
  sempre do time de ciber/SSO (ver regra separada), essa skill só cobre o que
  vem DEPOIS que o app já está publicado.
---

# Checklist pós-publicação de app Lovable

Toda vez que um app da Nitro é publicado no Lovable (pelo time de ciber, que
configura o SSO), três coisas precisam acontecer — nessa ordem — antes de
considerar o app "integrado":

## 1. Cadastrar o card no Lovable Hub

O Hub (`project_id <id-do-projeto>`) guarda os apps em
duas tabelas do próprio Supabase dele (fora do MCP `query_database` — usar
`send_message` pedindo ao agente do Hub para rodar o SQL):

- `apps`: `name` (nome de exibição — perguntar ao usuário qual nome usar se
  o produto tiver uma marca diferente do nome interno do projeto Lovable),
  `url`, `hidden` (boolean).
- `atlas_applications`: `tracking_app_id` (slug único, vira o `app_id` usado
  no rastreamento), `hub_app_id` (FK pra `apps.id`), `active`.

**Antes de cadastrar, pergunte ao usuário:**
- Qual nome de exibição usar (pode ser diferente do nome interno do projeto).
- Se o card deve ficar **visível no catálogo** (`hidden = false`, padrão
  para apps de uso geral) ou **oculto** (`hidden = true` — ferramentas
  restritas a um público pequeno, tipo conselho/diretoria, não devem
  aparecer no painel principal pro pessoal encontrar).

Sempre fazer uma consulta SOMENTE LEITURA primeiro pra checar se já existe
card com nome/URL parecidos (evita duplicata).

## 2. Instalar o rastreamento de acesso

Pedir ao agente do PRÓPRIO projeto do app (não o do Hub) pra instalar o hook
padrão — peça primeiro ao agente do Hub o snippet atualizado (ele conhece o
endpoint e o formato vigente), adapte ao mecanismo de autenticação real do
projeto (não force um hook genérico), e use exatamente o `tracking_app_id` e
o nome cadastrados no passo 1.

**Regras:**
- Toda mensagem enviada ao Lovable (Hub ou o app) passa pela skill
  `nitro-lovable-economia` (mensagem consolidada, específica, aprovada pelo
  usuário antes de enviar — consome crédito).
- **Nunca inclua um pedido de publicação/deploy na mensagem.** Publicar é
  exclusivo do time de ciber/SSO — mesmo que o app já esteja publicado e
  seja só uma atualização de código. Avise o usuário que alguém do time
  precisa publicar a atualização pra o rastreamento entrar em vigor.
- Depois do agente reportar a mudança, conferir com `get_diff` — nunca
  aceitar "instalado" sem olhar o que de fato mudou no código.

## 3. Gerar a documentação e arquivar no conhecimento da Nina

Pipeline em `C:\Projetos\projetos\documentacao-lovable\build\gera_pop_app.js`:

1. Escrever/atualizar `conteudo\<slug>.json` (mesmo formato usado nos outros
   32 apps — seções `readme`, `arquitetura`, `api`, `changelog`, `claude`).
   Se o app já tinha documentação em `fora_do_hub\conteudo\<slug>.json`
   (documentado antes de ter card no Hub), atualizar esse arquivo em vez de
   criar do zero.
2. `node build/gera_pop_app.js conteudo\<slug>.json saida\<slug>` — gera
   `POP_<slug>.docx` no padrão POP Nitro.
3. Copiar o `.docx` para
   `~\OneDrive - Companhia Nitro Quimica Brasileira\Atalhos\Conhecimento Nina - Documentos\Documentação aplicações Lovable\`.
4. Atualizar `PROGRESSO.md` do projeto `documentacao-lovable` (mover de
   "fora do escopo" pra "concluídos", se for o caso, ou adicionar na lista).

**Nome do arquivo:** usar o nome de exibição/marca do produto (o mesmo
cadastrado no passo 1 do Hub), não necessariamente o slug interno do
projeto Lovable — ex.: o projeto interno `nina-conselheiros` virou
`POP_nitro-board.docx`, porque a marca do produto é "Nitro Board".

## Sobre economia sem horas mensuráveis (custo evitado)

Se o app entrar no relatório mensal (`indicadores-semanais-time-ia`) mas a
área não tiver horas economizadas pra reportar, **isso não significa que o
app fica de fora do indicador de custo evitado** — aplicar a mesma lógica já
usada pros outros apps sem valor confirmado: pesquisar (WebSearch) quanto
custaria **contratar uma ferramenta equivalente no mercado** e colocar esse
valor na coluna "Estimado a mercado" do slide 02, linkado a um fornecedor
real (nunca inventar URL), sempre no **piso de entrada** da categoria (não o
líder de mercado — ver `custo-evitado/custo-reposicao.md` pra exemplos já
feitos: Auditoria Hub → AuditBoard R$60k, Quali Hub → SoftExpert R$55k,
Nitro Board → Diligent Boards R$85k). Ao adicionar essa linha, os totais em
cascata do slide 02 (faixa + rodapé) E do slide 05 (barras, tabela de
cenários, retorno por real gasto) mudam junto — sempre recalcular os dois
slides, nunca só um.

## Checklist rápido pra saber se terminou

- [ ] Card no Hub (nome certo, `hidden` certo, `tracking_app_id` único)
- [ ] Hook de rastreamento instalado e conferido via `get_diff`
- [ ] Usuário avisado que falta publicar a atualização (se aplicável)
- [ ] `conteudo\<slug>.json` atualizado e `POP_<slug>.docx` gerado
- [ ] `.docx` copiado pra pasta de conhecimento da Nina
- [ ] `PROGRESSO.md` do `documentacao-lovable` atualizado
- [ ] Se o app não tem economia de horas: estimativa de mercado adicionada
      no slide 02 + slide 05 recalculado
