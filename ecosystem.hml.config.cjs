// Configuração do PM2 exclusiva para o ambiente de homologação (HML).
// Espelha o mesmo comando usado hoje em produção (vite dev), apenas em outra porta/pasta,
// para garantir paridade de comportamento entre os ambientes.
//
// Uso (uma única vez, manualmente, na pasta do ambiente de HML na VPS):
//   pm2 start ecosystem.hml.config.cjs
//   pm2 save
//
// Depois disso, a pipeline do GitHub Actions apenas recarrega o processo
// (pm2 startOrReload) a cada novo merge na branch "homolog".
module.exports = {
  apps: [
    {
      name: "flex-studios-hml",
      script: "node_modules/.bin/vite",
      args: "dev --host 0.0.0.0 --port 4001",
      cwd: __dirname,
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
