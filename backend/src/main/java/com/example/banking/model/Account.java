package com.example.banking.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "contas")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idConta;

    @ManyToOne
    @JoinColumn(name = "idPessoa")
    private Person pessoa;

    private BigDecimal saldo;

    private BigDecimal limiteSaqueDiario;

    private Boolean flagAtivo;

    private Integer tipoConta;

    private LocalDateTime dataCriacao;
}
