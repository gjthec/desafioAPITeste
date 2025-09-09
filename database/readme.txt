docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=YourStrong!Passw0rd' \
  -p 1433:1433 --name mssql-bank -d \
  -v mssql_bank_data:/var/opt/mssql \
  mcr.microsoft.com/mssql/server:2022-latest
 
 comandos para criar o sql server
 