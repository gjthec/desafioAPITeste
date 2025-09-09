Use o Docker Compose para subir o banco de dados e o SQLPad:

```bash
docker compose up -d
```

O arquivo `docker-compose.yml` define os serviços `mssql` e `sqlpad`.

Após subir os contêineres, carregue o esquema inicial:

```bash
sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -i schema.sql
```
