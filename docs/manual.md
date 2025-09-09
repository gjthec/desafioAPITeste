# Manual de Execução

## Requisitos
- Java 17
- Maven
- Node.js 18 e npm
- Docker e Docker Compose

## Banco de Dados
1. Na pasta `database`, utilize o Docker Compose para subir o SQL Server e o SQLPad:
   ```yaml
   services:
     mssql:
       image: mcr.microsoft.com/mssql/server:2022-latest
       container_name: mssql-bank
       environment:
         - ACCEPT_EULA=Y
         - SA_PASSWORD=YourStrong!Passw0rd
       ports:
         - "1433:1433"
       volumes:
         - mssql_bank_data:/var/opt/mssql
       networks:
         - banking-net

     sqlpad:
       image: sqlpad/sqlpad:latest
       container_name: sqlpad
       environment:
         - SQLPAD_ADMIN=admin@example.com
         - SQLPAD_ADMIN_PASSWORD=Admin123!
       ports:
         - "3050:3000"
       depends_on:
         - mssql
       networks:
         - banking-net

   volumes:
     mssql_bank_data:

   networks:
     banking-net:
   ```
2. Execute `docker compose up -d` dentro da pasta `database`.
3. Carregue o esquema inicial:
   ```bash
   sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -i database/schema.sql
   ```

## Backend
1. Acesse a pasta `backend`.
2. Execute a aplicação:
   ```bash
   mvn spring-boot:run
   ```
3. A API estará disponível em `http://localhost:8080`.

## Frontend
1. Acesse a pasta `frontend`.
2. Instale as dependências e execute:
   ```bash
   npm install
   npm start
   ```
3. A interface estará disponível em `http://localhost:4200`.
4. A página inicial permite o login informando o CPF da conta ou o acesso à tela de criação de conta.
5. Após o login é possível realizar depósitos, saques e consultar o extrato da conta.

## Testes
Para executar os testes automatizados do backend:
```bash
cd backend
mvn test
```
