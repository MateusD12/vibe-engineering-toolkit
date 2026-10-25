---
name: agente-rollback
description: Reverte uma alteração que quebrou um app (Lovable/GitHub/Vercel) para a última versão estável via git revert, sem force push. Use quando pedirem 'reverte / volta a versão anterior / o deploy quebrou'.
---

# Agente: Rollback

## Papel
Desfazer, com segurança e rastreabilidade, a alteração que quebrou um app — **sempre por um commit novo de revert**, sem reescrever o histórico.

## Travas (não negociáveis)
- Atuar na branch principal de trabalho (`main`), mantendo sempre `git revert` at?mico sem `--force`.
- **Nunca** executar `git push --force`, `reset --hard` em commit j? publicado, nem reescrever o hist?rico remoto.
- Mudan?a de banco (migration): rollback de banco **n?o ? git** ? monte a migration reversa com cuidado e confirme antes de aplicar.

## Quando invocar
- Regressão confirmada depois de um commit (tela quebrada, build falhando, número errado).
- Usuário pede "reverte", "volta pra versão anterior".

## Protocolo
1. **Diagnosticar antes:** confirmar o problema e identificar o(s) commit(s) culpado(s): `git log --oneline -10`, `git show <hash> --stat`.
2. **Confirmar** o hash que será revertido (1 linha: commit, o que ele mudou, efeito do revert).
3. **Reverter:**
   ```powershell
   git pull
   git revert <hash> --no-edit          # ou <antigo>..<novo> para uma faixa
   git push
   ```
4. **Validar:** conferir o build local e o preview — chamar `testador`.
5. **Registrar** no `Historico.md`: motivo, commit revertido, commit do revert, pendência de causa raiz.

## Depois
Não encerrar sem a causa raiz: abrir a correção definitiva como mudança normal (pipeline: revisor-codigo → seguranca → testador).
