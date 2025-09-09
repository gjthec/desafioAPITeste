# Manual de Execução

## Requisitos
- Java 17
- Maven
- Node.js 18 e npm
- Docker (para executar o SQL Server)

## Banco de Dados
1. Inicie um contêiner do SQL Server:
   ```bash
   docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=YourStrong!Passw0rd' \
     -p 1433:1433 --name mssql-bank -d \
     -v mssql_bank_data:/var/opt/mssql \
     mcr.microsoft.com/mssql/server:2022-latest
   ```
2. Carregue o esquema inicial:
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

## Testes
Para executar os testes automatizados do backend:
```bash
cd backend
mvn test
```
