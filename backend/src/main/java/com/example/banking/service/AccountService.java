package com.example.banking.service;

import com.example.banking.dto.CreateAccountRequest;
import com.example.banking.dto.OperationRequest;
import com.example.banking.model.Account;
import com.example.banking.model.Person;
import com.example.banking.model.Transaction;
import com.example.banking.repository.AccountRepository;
import com.example.banking.repository.PersonRepository;
import com.example.banking.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AccountService {
    private final AccountRepository accountRepository;
    private final PersonRepository personRepository;
    private final TransactionRepository transactionRepository;

    public AccountService(AccountRepository accountRepository, PersonRepository personRepository, TransactionRepository transactionRepository) {
        this.accountRepository = accountRepository;
        this.personRepository = personRepository;
        this.transactionRepository = transactionRepository;
    }

    public Account createAccount(CreateAccountRequest request) {
        if (personRepository.findByCpf(request.getCpf()).isPresent()) {
            throw new IllegalArgumentException("Pessoa já existe");
        }

        Person person = new Person();
        person.setNome(request.getNome());
        person.setCpf(request.getCpf());
        person.setDataNascimento(request.getDataNascimento());
        person = personRepository.save(person);

        Account account = new Account();
        account.setPessoa(person);
        account.setSaldo(BigDecimal.ZERO);
        account.setLimiteSaqueDiario(request.getLimiteSaqueDiario());
        account.setFlagAtivo(true);
        account.setTipoConta(request.getTipoConta());
        account.setDataCriacao(LocalDateTime.now());
        return accountRepository.save(account);
    }

    public void deposit(Long idConta, OperationRequest request) {
        Account account = accountRepository.findById(idConta)
                .orElseThrow(() -> new IllegalArgumentException("Conta não encontrada"));
        account.setSaldo(account.getSaldo().add(request.getValor()));
        accountRepository.save(account);

        Transaction t = new Transaction();
        t.setConta(account);
        t.setValor(request.getValor());
        t.setDataTransacao(LocalDateTime.now());
        transactionRepository.save(t);
    }

    public BigDecimal getBalance(Long idConta) {
        Account account = accountRepository.findById(idConta)
                .orElseThrow(() -> new IllegalArgumentException("Conta não encontrada"));
        return account.getSaldo();
    }

    public void withdraw(Long idConta, OperationRequest request) {
        Account account = accountRepository.findById(idConta)
                .orElseThrow(() -> new IllegalArgumentException("Conta não encontrada"));
        if (!account.getFlagAtivo()) {
            throw new IllegalStateException("Conta bloqueada");
        }
        if (account.getSaldo().compareTo(request.getValor()) < 0) {
            throw new IllegalStateException("Saldo insuficiente");
        }
        account.setSaldo(account.getSaldo().subtract(request.getValor()));
        accountRepository.save(account);

        Transaction t = new Transaction();
        t.setConta(account);
        t.setValor(request.getValor().negate());
        t.setDataTransacao(LocalDateTime.now());
        transactionRepository.save(t);
    }

    public void block(Long idConta) {
        Account account = accountRepository.findById(idConta)
                .orElseThrow(() -> new IllegalArgumentException("Conta não encontrada"));
        account.setFlagAtivo(false);
        accountRepository.save(account);
    }

    public List<Transaction> statement(Long idConta, LocalDate start, LocalDate end) {
        if (start != null && end != null) {
            return transactionRepository.findByContaIdContaAndDataTransacaoBetween(
                    idConta,
                    start.atStartOfDay(),
                    end.plusDays(1).atStartOfDay());
        }
        return transactionRepository.findByContaIdConta(idConta);
    }

    public Account getAccount(Long idConta) {
        return accountRepository.findById(idConta)
                .orElseThrow(() -> new IllegalArgumentException("Conta não encontrada"));
    }
}
