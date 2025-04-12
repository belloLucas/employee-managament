# Sistema de Gerenciamento de Funcionários

### Visão Geral

O Employee Management é um sistema completo para gerenciamento de funcionários, desenvolvido com Angular no frontend e Laravel no backend. O sistema permite o cadastro, visualização, edição e exclusão de funcionários, além de possibilitar filtrar e buscar informações de forma eficiente.

### Funcionalidades 

- Autenticação e Autorização: Sistema seguro com login e controle de acesso
- Gerenciamento de Funcionários: CRUD completo de funcionários
- Filtros Avançados: Busca por nome, departamento e status (ativo/inativo)
- Interface Responsiva: Layout adaptável para diferentes tamanhos de tela
- Validação de Formulários: Validação de dados no frontend e backend

### Estrutura do Projeto
```bash
employee-management/
├── api/                   # Backend Laravel
│   ├── app/              
│   │   ├── Http/         
│   │   │   ├── Controllers/
│   │   │   └── Services/  # Camada de serviços para lógica de negócios
│   │   └── Models/        # Models Eloquent
│   ├── routes/            # Definições de rotas da API
│   └── database/          # Migrações e seeds
└── frontend/              # Frontend Angular
    └── src/
        ├── app/ # Componentes, Models, Services
        │   ├── componentes/
        │   ├── models/    # Interfaces TypeScript
        │   └── services/  # Serviços Angular
```

### Requisitos

- Docker
- Git

### Instalação e Configuração com Docker (Recomendado)

1. Clone o repositório
    ```bash
    git clone https://github.com/seu-usuario/employee-management.git
    cd employee-management
    ```

2. Inicie os containers Docker:
    ```bash
    docker-compose up -d
    ```

3. Acesse o container da API para executar os comandos do Laravel:
    ```bash
    docker-compose exec api bash
    ```

4. Dentro do container, instale as dependencias e configure o projeto:
    ```bash
    composer install
    cp .env.example .env
    php artisan key:generate
    php artisan migrate
    php artisan db:seed
    ```
    O arquivo .env.example já está completamente configurado para funcionar com o projeto em Docker.

5. Acesse a aplicação no navegador:
    - frontend: `http://localhost:4200`
    - backend: `http://localhost:8080/api`

### Instalação Manual (Sem Docker)

#### Backend
1. Navegue até a pasta da API:
    ```bash
    cd api
    ```

2. Instale as dependências:
    ```bash
    composer install
    ```

3. Configure o arquivo `.env`:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. Configure o Banco de dados no arquivo `.env`

5. Execute as migrations:
    ```bash
    php artisan migrate
    ```

6. (Opcional) Execute os seeds para popular o banco de dados com dados de exemplo:
    ```bash
    php artisan db:seed
    ```

7. Inicie o servidor:
    ```bash
    php artisan serve --port=8080
    ```

#### Frontend
1. Navegue até a pasta do frontend:
    ```bash
    cd frontend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Inicie o servidor frontend:
    ```bash
    npm start
    ```

### Fluxos Principais
1. <b>Visualização de Funcionários</b>: A página principal exibe a lista de funcionários cadastrados
2. <b>Filtragem</b>: Utilize os filtros na parte superior da lista para encontrar funcionários específicos
3. <b>Adicionar Funcionário</b>: Clique no botão "Adicionar Funcionário" e preencha o formulário
4. <b>Editar/Visualizar</b>: Clique em um funcionário da lista para ver detalhes ou nos ícones de ação para editar/excluir

### Arquitetura
O sistema utiliza uma arquitetura em camadas:
- <b>Frontend</b>: Angular 19 com componentes standalone e TailwindCSS 3.3.5
- <b>Backend</b>: PHP 8.2 e Laravel 12 com padrão MVC e camada adicional de Services
- <b>API</b>: RESTful com autenticação baseada em tokens

#### Padrão de Serviços (Services)
O backend utiliza o padrão de Services para separar a lógica de negócios dos Controllers:

- <b>Controllers</b>: Responsáveis por receber requisições, validar dados e retornar respostas
- <b>Services</b>: Contêm a lógica de negócios e manipulação de dados
- <b>Models</b>: Representam entidades do banco de dados e suas relações