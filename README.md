# API Autentificação e Autorização

Uma API desenvolvida para praticar conceitos de autentificação e autorização

Rode o comando:

```bash
npm run migrate:dev
```

**Será essencial ter um banco de dados criado e referenciado nas variáveis de ambiente**

Rode o comando abaixo para inicar a aplicação em mode de desenvolvimento

```bash
npm run dev
```

## Rotas da Aplicação

### Registrar usuário /users POST

Padrão de corpo:

```json
{
  "name": "John Doe",
  "email": "johndoe@email.com",
  "password": "12345"
}
```

Padrão de resposta (STATUS 201):

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "johndoe@email.com"
}
```

### Login usuário /users/login POST

Padrão de corpo:

```json
{
  "email": "johndoe@email.com",
  "password": "12345"
}
```

Padrão de resposta (STATUS 201):

```json
{
  "email": "johndoe@email.com",
  "password": "12345"
}
```

#### Possíveis Erros

Usuário não encontrado (STATUS 404)

```json
{
  "message": "User not registered"
}
```

Email e senha não correspondem (STATUS 403)

```json
{
  "message": "Email and password doens't match."
}
```

### Auto Login GET /users (Precisa de autorização)

Autorização

```json
{
  "headers": {
    "authorization": "Bearer Token"
  }
}
```

Padrão de resposta:

```json
{
  "id": "1",
  "name": "John Doe",
  "email": "johndoe@email.com"
}
```

#### Possíveis Erros

Unauthorized (STATUS 401)
