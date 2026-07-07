## Ordem de desenvolvimento do backend 

- instalar as dependências
- configurar o tsconfig.json
- criar banco de dados
- configurar .env
- na camada config, fazer o data-source para conectar com o banco, usando as variáveis que estão no .env
- na camada model, criar as entidades
- criar o server e rodas para verificar se tudo está correto e se sobem as tabela. Mais tarde ele deve ser editado/aprimorado.

### A PARTIR DAQUI, NÃO VAMOS CRIAR OS SCRIPTS COMPLETOS, VAMOS TRABALHANDO UM POUCO EM CADA CAMADA E SEGUINDO ADIANTE

- na camada repositories, criamos o script 'create'
- na camada services, também fazemos o script create, fazemos as validações,etc
- na camada controllers, fazemos o método 'create' com req, res, etc
- ai, configuramos os middlewares
- depois, fazemos a roto de 'create', que é um POST

- voltamos ao server, acrescentamos o necessário(ex:app.use(routes)etc etc)
- rodamos o server e testamos a rota POST que criamos

### FAZEMOS ISSO PARA TODAS AS ROTAS, UMA POR UMA
