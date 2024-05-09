# FRONT-END Aplicação de Agendamento de Transferência

Desafio Tokyo Marine - Construir uma aplicação que cadastre a transferência e permita visualização dos agendamentos.

## Tecnologias usadas no projeto
- Node.js na versão v18.20.2 (LTS). Documentação oficial: https://nodejs.org/en/download.
- Vue.js 3 na versão vue/cli v5.0.8. Documentação oficial: https://vuejs.org/guide/introduction.html.
- Vue-Router 4. Documentação oficial: https://router.vuejs.org/installation.html.
- Pinia. Documentação oficial: https://pinia.vuejs.org/getting-started.html.
- Vuetify 3. Documentação oficial: https://vuetifyjs.com/en/getting-started/installation/.

OBS.: Vue.js 3, Vue-Router e Pinia podem ser instalados automaticamente na criação do projeto com o Vuetify.

## Arquitetura do Projeto Front-end

Sobre a arquitetura do front-end ela se baseia no padrão criado pelo próprio Vuetify 3, onde temos 3 principais diretórios:
  - "views": diretório com os componentes usados nas rotas para renderizar um ou mais componentes do diretório "components";
  - "components": diretório que contém os componentes que serão utilizados e reutilizados no projeto;
  - "routers": diretório com a configuração das rotas do nosso projeto, onde construi uma rota para login ("/") para o usuário se autenticar e ter acesso as rotas "/register-bank-transfer" (rota para cadastrar os agendamentos de transferência)  e "/bank-transfers" (rota para visualizar os agendamentos).

Além disso, temos outras rotas importantes para o funcionamento do projeto, como:
  - "services": diretório que contém as configurações para consumir a API e também os services de cada endpoint (AuthService, BankAccountService, BankTransferService);
  - "stores": diretório do Pinia que permite criar variáveis globais para serem utilizadas em mais de um component sem a necessidade de "props". Criei uma variavel "jwt" que armazena o token de autenticação da API, mas que é armazenada no cookie do navegador também;
  - "utils": diretório que contém interfaces e funções que podem ser usadas um mais de um lugar do projeto. Nesse caso, criei uma função para manipular o token no cookie do navegador e uma interface de usuário.

Os recursos para estilização e componets foram utilizados do Vuetify 3 que segue os padrões de UX Design e facilita na produtividade do desenvolvimento do projeto em questão.

## Rodando o projeto Front-end localmente

> Primeiro passo
    - baixar o repositorio "front-schedule-financial" na sua máquina local (https://github.com/MiguelAlves12/front-schedule-financial-transfer);
    
  > Segundo passo
    - entrar pelo pelo terminal no diretório onde foi clonado o projeto e rodar o comando: "npm install"(irá instalar todas as dependências), e depois "npm run dev". E assim, o Front-end vai rodar localmente pela porta 3000;
    OBS.: É necessário ter o Node.js e NPM instalado no seu computador para que os comandos possam ser reconhecidos pelo sistema.
    
  > Terceiro passo
    - Após o passo anterior basta entrar no seu navegador e colocar na barra de url: "http://localhost:3000/", 
      onde a tela de login será aberta. Para acessar basta inserir um desses usuários já pré cadastrados na API:
      email: teste@teste.com/senha: 123456, email: teste2@teste.com/senha: 123456, email: teste3@teste.com/senha: 123456.
    OBS.: Só será possível fazer login com a API rodando.

