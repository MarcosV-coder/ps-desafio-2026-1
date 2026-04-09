This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Loja de artigos de esporte/fitness Prime sports - # PS Desafio 2026/1

## Fuincionalidades
- CRUD completo
- Troca de temas (Dark Mode)
- Filtros Inteligentes por categoria e nome.
- Tela responsiva até iphone SE 2
- Botão para acessar aba ADM
- Criação de sliders usando swiper para o banner
- Possibilidade de mover o banner com touch do celular
- O banner alternar com o tempo
- Factories para categorias e artigos esportives com dados aleatórios
- Seeders especificos para a promoção, pré criado com os dados.
- Página promotion com itens em promoção pré selecionado, possui somente header, as categorias e os produtos que estão em promoção.
- Utilização do Fontawesome para criação de ícones interativos e bonitos para opções.
   

## Instalação

### Laravel

Dentro da pasta `backend` siga as seguintes instruções.

1. Instale as dependências:
   ```bash
   composer install
   ```
2. Crie o arquivo de variáveis globais do projeto **backend**:
   ```bash
   cp .env.example .env
   ```
3. Após isso insira as credenciais do banco de dados no arquivo `.env`
4. Crie o schema no banco de dados. O nome do banco deve ser o valor contido na variável `DB_DATABASE` presente no arquivo `.env`.
5. Gere a chave do projeto:
   ```bash
   php artisan key:generate
   ```
6. Crie o link simbólico com o diretório storage:
   ```bash
   php artisan storage:link
   ```
7. Rode as migrations:
   ```bash
   php artisan migrate --seed
   ```

   1. Caso as migrations já tenham sido rodadas anteriormente no seu banco de dados, execute o comando:
      ```bash
      php artisan migrate:fresh --seed
      ```
8. Inicie o servidor **backend**:
   ```bash
   php artisan serve
   ```

   1. O servidor **backend** será iniciado por padrão no endereço `http://127.0.0.1:8000`.

### React.js/Next.js

Tenha o gerenciador de pacotes <a href="https://pnpm.io/pt/installation">pnpm</a> instalado globalmente em sua máquina.

Dentro da pasta `frontend` siga as seguintes instruções.

1. Instale as dependências:
   ```bash
   pnpm install
   ```
2. Crie o arquivo de variáveis globais do projeto **frontend**:
   ```bash
   cp .env.local.example .env.local
   ```
3. Inicie o servidor **frontend**:
   ```bash
   pnpm dev
   ```

   1. O servidor **frontend** será iniciado por padrão no endereço `http://127.0.0.1:3000`.

   ## Template/ref
   - **Adapti**
   

   ## Autor
   - **Marcos** - https://github.com/MarcosV-coder

   