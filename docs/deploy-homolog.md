# Ambiente de Homologação (HML)

Este documento descreve como o ambiente de homologação funciona e como ele é
atualizado automaticamente pela pipeline do GitHub Actions.

## Visão geral

- **Branch**: `homolog`
- **Pipeline**: [.github/workflows/deploy-homolog.yml](../.github/workflows/deploy-homolog.yml)
- **Disparo**: todo push/merge na branch `homolog` roda a pipeline automaticamente.
- **Servidor**: mesma VPS da produção, em uma pasta e porta separadas.
- **Processo**: gerenciado via [PM2](https://pm2.keymetrics.io/), rodando
  `vite dev` (mesmo comando usado hoje em produção), configurado em
  [ecosystem.hml.config.cjs](../ecosystem.hml.config.cjs).

O que a pipeline faz a cada merge na `homolog`:

1. Conecta na VPS via SSH.
2. Atualiza o código (`git fetch` + `git reset --hard origin/homolog`).
3. Instala as dependências (`bun install --frozen-lockfile`).
4. **Roda o build** (`bun run build`) para validar que o projeto compila sem erros.
5. Reinicia o processo da HML via PM2 (`pm2 startOrReload`).

Se o build falhar, a pipeline para (`set -e`) e o processo da HML em execução
**não é derrubado** — ele continua servindo a última versão que funcionou.

## Setup inicial (uma única vez, manual, na VPS)

Esses passos não fazem parte da pipeline; são feitos uma vez para preparar a pasta:

```bash
# 1. Clonar o projeto em uma pasta separada da produção
cd /home/ubuntu
git clone git@github.com:wesleyGsilv/flex-studios-refresh.git flex-studios-refresh-hml
cd flex-studios-refresh-hml
git checkout homolog

# 2. Instalar dependências e validar o build
bun install
bun run build

# 3. Subir o processo com PM2 (lê o ecosystem.hml.config.cjs do próprio repo)
pm2 start ecosystem.hml.config.cjs
pm2 save
```

A aplicação ficará acessível em `http://<IP-DA-VPS>:4001`.

> Se ainda não houver um domínio/subdomínio para a HML, configure depois um
> `server` no nginx fazendo proxy_pass para `127.0.0.1:4001`, sem necessidade
> de alterar a pipeline.

## Configuração dos Secrets no GitHub

Em **Settings > Secrets and variables > Actions** do repositório, cadastre:

| Secret               | Descrição                                               | Exemplo                              |
| -------------------- | -------------------------------------------------------- | ------------------------------------- |
| `HML_SSH_HOST`        | IP ou host da VPS                                        | `123.45.67.89`                        |
| `HML_SSH_USER`        | Usuário SSH                                              | `root`                                |
| `HML_SSH_PORT`        | Porta SSH                                                | `22`                                  |
| `HML_SSH_PRIVATE_KEY` | Chave privada SSH (conteúdo completo do arquivo `.pem`)  | conteúdo de `-----BEGIN ... KEY-----` |
| `HML_APP_PATH`        | Caminho absoluto do projeto na VPS                       | `/home/ubuntu/flex-studios-refresh-hml` |

**Recomendação de segurança**: gere uma chave SSH dedicada só para o GitHub
Actions (não reutilize sua chave pessoal), com acesso restrito ao necessário:

```bash
ssh-keygen -t ed25519 -C "github-actions-hml" -f github_actions_hml
# Adicione github_actions_hml.pub em ~/.ssh/authorized_keys na VPS
# Cole o conteúdo de github_actions_hml (chave privada) no secret HML_SSH_PRIVATE_KEY
```

## Fluxo de trabalho recomendado

1. Desenvolver em uma branch de feature a partir de `homolog` (ou `main`).
2. Abrir PR para `homolog` e revisar/testar.
3. Fazer merge → a pipeline atualiza automaticamente o ambiente de HML.
4. Validar em `http://<IP-DA-VPS>:4001`.
5. Quando aprovado, abrir PR de `homolog` para `main` (produção), que segue o
   processo manual já existente hoje.
