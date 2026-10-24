---
name: nitro-lovable-economia
description: >
  Economia de créditos do workspace Lovable. Use esta skill SEMPRE que a
  conversa envolver o Lovable de qualquer forma — enviar, escrever ou revisar
  mensagem/prompt para o agente do Lovable (via MCP send_message/create_project
  ou colada manualmente no chat), planejar uma mudança/ajuste/correção/nova
  funcionalidade em um projeto Lovable, criar projeto novo, ou revisar um plano
  do Lovable antes de aprovar. Aciona em qualquer menção a "Lovable", "manda
  pro Lovable", "pede pro agente", "escreve um prompt pro Lovable", "monta o
  texto pra eu colar", mesmo que o usuário não peça pra "economizar" ou
  "otimizar" — o objetivo é evitar que o agente do Lovable precise de várias
  mensagens (cada uma cobra crédito do workspace) pra resolver o que uma
  mensagem bem montada resolveria de uma vez. NÃO é sobre economizar tokens da
  conversa com o Claude.
---

# Economia de créditos Lovable

## Por que isso importa

Cada mensagem que o agente do Lovable processa cobra crédito do workspace —
não importa se veio de `send_message`/`create_project` (MCP) ou foi colada
manualmente no chat do Lovable. Quando a mensagem é vaga ou incompleta, o
agente do Lovable gasta créditos de um jeito caro: explora o projeto sozinho
pra adivinhar o que você quis dizer, pergunta de volta, ou implementa a coisa
errada e você precisa mandar outra mensagem pra corrigir. Uma mensagem bem
montada da primeira vez custa uma fração disso.

O trabalho desta skill é interceptar o momento em que uma mensagem para o
Lovable está sendo escrita — antes de ela ser enviada ou entregue pro
usuário colar — e deixá-la pronta para resolver em uma única rodada.

## Checklist antes de montar a mensagem

Passe o pedido do usuário por estes pontos. Nem todo pedido precisa de todos
— um ajuste de uma linha não precisa do mesmo tratamento que uma nova
funcionalidade — mas releia a lista antes de considerar a mensagem pronta.

1. **Consolide pedidos relacionados.** Se o usuário mencionou mais de uma
   mudança na mesma conversa (mesmo que em frases separadas: "ah, e também
   muda a cor do botão"), junte tudo em uma única mensagem. Mandar em pedaços
   custa uma cobrança de crédito por pedaço.

2. **Seja específico e completo.** Para cada mudança, inclua: o comportamento
   esperado (não só o sintoma — "o filtro não aparece" vs. "adicionar um
   filtro de data no topo da tabela de chamados, que restrinja por
   data_abertura"), o arquivo/tela/componente afetado se você souber, e um
   critério de pronto (o que precisa ser verdade pra considerar concluído).
   Cada lacuna que sobra é uma decisão que o agente do Lovable vai ter que
   adivinhar ou perguntar — e perguntar custa uma rodada extra.

3. **Pergunte ao usuário antes de perguntar ao Lovable.** Se o pedido do
   usuário é do tipo "será que dava pra...", "o que você acha de...", ou
   deixa uma decisão de negócio em aberto (ex.: filtrar por período ou por
   lote?), **não presuma a resposta sozinho** — pergunte ao usuário no
   próprio chat do Claude antes de montar a mensagem. Perguntar aqui não
   custa nada; perguntar via Lovable custa uma rodada de crédito. A única
   exceção é um detalhe puramente técnico e de baixo risco (ex.: um tom de
   verde quando já existe um padrão visual no projeto) — aí pode assumir e
   sinalizar a suposição no ponto de aprovação, já que o usuário vai revisar
   a mensagem antes dela ser enviada de qualquer forma.

4. **Sinalize `plan_mode=true` em mudanças estruturais ou arriscadas**
   (mexe em schema de dados, em fluxo de autenticação, refatora vários
   arquivos, ou qualquer coisa que seria caro de desfazer). Um plano errado
   custa uma mensagem; uma implementação errada que precisa ser refeita
   custa muito mais. Pra ajustes pequenos e bem definidos (mudar um texto,
   uma cor, corrigir um bug isolado) não é necessário.

5. **Lembre de revisar o resultado antes do próximo passo.** Depois que a
   mensagem for enviada, o próximo passo do usuário deve ser olhar o
   diff/preview antes de mandar qualquer "ajusta mais isso" — mandar correções
   às cegas, sem saber exatamente o que já foi feito, tende a gerar pedidos
   redundantes ou contraditórios.

6. **Aponte para conhecimento persistente quando o padrão se repete.** Se o
   mesmo contexto (convenção de nomes, regra de negócio, padrão visual) vai
   ser necessário em várias mensagens futuras do mesmo projeto, sugira
   registrar isso via `set_project_knowledge`/`set_workspace_knowledge` em
   vez de reexplicar em cada mensagem nova.

7. **Anexe só o que for relevante.** Se o pedido envolve imagem/print/arquivo,
   inclua apenas o que ajuda a resolver essa mudança específica — anexos
   grandes ou irrelevantes não economizam créditos, mas também não ajudam.

8. **Referencie o arquivo/tela exata quando souber.** Se o usuário (ou o
   histórico do projeto) já indica onde a mudança deve acontecer, inclua essa
   referência na mensagem. Isso evita que o agente gaste passos explorando o
   projeto inteiro atrás do lugar certo.

## Formato da mensagem otimizada

Para qualquer coisa além de um ajuste trivial de uma linha, monte a mensagem
neste formato:

[Uma frase resumindo o objetivo da mudança]

Mudanças:

[Mudança específica — comportamento esperado + arquivo/tela se souber]

[Próxima mudança, se houver — nunca deixe de fora algo que o usuário já mencionou]

Critério de pronto:

[O que precisa estar verdadeiro pra considerar concluído]

[Se aplicável: "Me mostra o plano antes de implementar." — para mudanças estruturais]


Para um ajuste pequeno e isolado (corrigir um texto, mudar uma cor, um bug
óbvio de uma linha), uma frase direta e específica basta — não force o
template em cima de algo simples.

## Fluxo de aprovação (não muda)

Esta skill não altera quem aprova o envio: toda mensagem para o Lovable via
MCP (`send_message`/`create_project`) continua sendo **mostrada ao usuário
para aprovação explícita antes de ser enviada** — ela consome créditos e age
em nome dele. O papel desta skill é garantir que a mensagem que chega nesse
ponto de aprovação já esteja otimizada, não pular esse ponto.

Nunca inclua nessa mensagem um pedido de publicação/deploy/mudança de
visibilidade — publicar é etapa exclusiva do time de segurança (SSO). Se o
usuário pedir isso, avise que precisa passar por esse time.

## Antes / depois

**Usuário disse:** "manda pro Lovable arrumar o filtro de data que não tá
funcionando direito no dashboard, e aproveita e muda a cor do botão de
exportar pra verde"

**Sem otimizar (2 mensagens, cada uma cobrando crédito, e a primeira ainda
vaga o suficiente pra gerar pergunta de volta):**
Mensagem 1: "o filtro de data não tá funcionando direito, dá uma olhada"
Mensagem 2: "muda o botão de exportar pra verde"


**Otimizado (1 mensagem):**
Dois ajustes no dashboard de chamados:

Mudanças:

O filtro de data no topo da tabela não está restringindo os resultados
corretamente — verificar o componente de filtro e garantir que ele
filtre por data_abertura ao selecionar um intervalo.

Mudar a cor do botão "Exportar" de [cor atual] para verde (mesmo verde
usado nos outros botões de ação primária do projeto, se já existir um).

Critério de pronto:

Selecionar um intervalo de datas reduz a tabela apenas aos chamados
daquele intervalo.

O botão "Exportar" está verde e mantém a funcionalidade atual.


## Cadastrar secret (chave de API) — mensagem CURTA e SEM plan_mode

Caso real (15/10/2026, Gestão de projetos comercial): o agente mandou um prompt longo ("abra o formulário
seguro de adicionar secret do Supabase... NÃO peça... NÃO crie... NÃO altere...") e o Lovable respondeu que
"não tem essa ferramenta". Bastou o Mateus mandar "abra a caixa de texto para enviar a chave para o
supabase" e o Lovable abriu a caixa (evento "Added secret") na hora. O que derruba:
- **`plan_mode=true` desliga a ferramenta de secret** do agente do Lovable — pedido de secret vai SEMPRE com
  `plan_mode=false` (é seguro: o valor nunca passa pelo chat, o usuário cola na caixa).
- Texto longo cheio de proibições e com "formulário seguro do Supabase" faz o agente achar que é algo do
  painel do Supabase, fora do alcance dele.

**Use exatamente este formato (1 mensagem, nada mais):**
Adicione o secret OPENAI_API_KEY (abra a caixa para eu colar o valor). Não altere mais nada no projeto.

- Vários secrets: "Adicione os secrets A e B (abra a caixa para eu colar os valores)".
- Nunca peça o valor no chat, nunca coloque o valor na mensagem, nunca use a ferramenta de secret do
  conector Supabase (o valor passaria pelo Claude). A caixa do Lovable é o caminho.
- Depois, confira em `list_messages`/`get_message` se apareceu "Added secret <NOME>"; se o Lovable
  responder que não pode, reenvie a MESMA frase curta (sem plan_mode) — não reescreva com mais regras.

## Quando esta skill NÃO precisa fazer nada especial

- O usuário já trouxe uma mensagem completa e específica — não reescreva por
  reescrever, apenas confirme que está pronta.
- Pedido de suporte/dúvida sobre o Lovable em si (não é uma mudança a ser
  enviada ao agente).
- Criação de projeto novo do zero: nesse caso, se a Central de Agentes
  estiver disponível, o agente `engenheiro-prompts` já cobre esse fluxo com
  um template mais completo (schema de dados, stack, entregáveis). Esta
  skill cobre o caso mais comum do dia a dia: ajustes e evoluções em
  projetos que já existem.