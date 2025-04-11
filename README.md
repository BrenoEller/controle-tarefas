Projeto fullstack desenvolvido com **Laravel (API RESTful)** no backend e **Angular** no frontend. O sistema permite o gerenciamento de tarefas pessoais e conta com uma área administrativa para controle de usuários.

### Usuário
- Cadastro e login (com Laravel Sanctum)
- Gerenciamento de tarefas pessoais (CRUD)
- Visualização de tarefas com data e descrição

### Administrador
- Acesso ao painel de gerenciamento de usuários
- Listagem de todos os usuários (exceto o próprio)
- Edição e exclusão de usuários
- Controle do status de administrador (`is_admin`)
## Instalação

### Backend (\controle-tarefas)
na pasta raiz do projeto faça os seguintes passos:

```bash
composer install
configure o env com o seu banco de dados MySql ou postgreSQL

php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Frontend (.\frontend)
```bash
Frontend entre na pasta ./frontend
npm install
ng serve
Acesse: http://localhost:4200
```

Usuário padrão para login inicial:
```bash
Nome: admin
Senha: admin123
```

### IMPORTANTE!!!

os servidores do php e angular devem estar rodando simultaneamente para o funcionamento. Comandos -> `php artisan serve` **(na pasta raiz do projeto)** e `ng serve` **(na pasta .\frontend)**