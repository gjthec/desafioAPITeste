package com.example.banking.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateAccountRequest {
    private Long idPessoa;
    private BigDecimal limiteSaqueDiario;
    private Integer tipoConta;
}
