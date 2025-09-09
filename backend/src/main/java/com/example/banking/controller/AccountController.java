package com.example.banking.controller;

import com.example.banking.dto.CreateAccountRequest;
import com.example.banking.dto.OperationRequest;
import com.example.banking.model.Account;
import com.example.banking.model.Transaction;
import com.example.banking.service.AccountService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/contas")
public class AccountController {
    private final AccountService service;

    public AccountController(AccountService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Account> create(@RequestBody CreateAccountRequest request) {
        return ResponseEntity.ok(service.createAccount(request));
    }

    @PostMapping("/{id}/deposito")
    public ResponseEntity<Void> deposit(@PathVariable Long id, @RequestBody OperationRequest request) {
        service.deposit(id, request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/saldo")
    public ResponseEntity<BigDecimal> balance(@PathVariable Long id) {
        return ResponseEntity.ok(service.getBalance(id));
    }

    @PostMapping("/{id}/saque")
    public ResponseEntity<Void> withdraw(@PathVariable Long id, @RequestBody OperationRequest request) {
        service.withdraw(id, request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/bloqueio")
    public ResponseEntity<Void> block(@PathVariable Long id) {
        service.block(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/extrato")
    public ResponseEntity<List<Transaction>> statement(
            @PathVariable Long id,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(service.statement(id, startDate, endDate));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccount(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAccount(id));
    }
}
