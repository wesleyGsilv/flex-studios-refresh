# Atualizar o WhatsApp após mudanças no WordPress

## Objetivo
Fazer o botão flutuante refletir o número atualizado no endpoint de configuração sem voltar a consultar a API a cada troca de página.

## Implementação
- Continuar exibindo imediatamente os dados salvos no navegador.
- Revalidar a configuração uma vez ao abrir ou recarregar o site.
- Atualizar o cache e o link do botão assim que a resposta mais recente chegar.
- Manter o dado salvo como contingência se a API estiver temporariamente indisponível.

## Validação
- Confirmar que o botão gera o link com o número atual `5531997061637` retornado pelo WordPress.
- Navegar entre páginas e verificar que não há novas consultas de configuração.
