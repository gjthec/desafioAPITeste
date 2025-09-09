# Documentação da API

## Criar conta
`POST /contas`

Corpo da requisição:
```json
{
  "nome": "João",
  "cpf": "12345678901",
  "dataNascimento": "1990-01-01",
  "limiteSaqueDiario": 100.00,
  "tipoConta": 1
}
```

## Depositar
`POST /contas/{id}/deposito`

Corpo:
```json
{
  "valor": 50.00
}
```

## Consultar saldo
`GET /contas/{id}/saldo`

## Sacar
`POST /contas/{id}/saque`

Corpo:
```json
{
  "valor": 20.00
}
```

## Bloquear conta
`POST /contas/{id}/bloqueio`

## Extrato
`GET /contas/{id}/extrato?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

## Consultar conta
`GET /contas/{id}`
