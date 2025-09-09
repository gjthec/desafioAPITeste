package com.example.banking.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CreateAccountRequest {
    private String nome;
    private String cpf;
    private LocalDate dataNascimento;
    private BigDecimal limiteSaqueDiario;
    private Integer tipoConta;
}
