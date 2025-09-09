package com.example.banking.service;

import com.example.banking.dto.OperationRequest;
import com.example.banking.model.Account;
import com.example.banking.model.Transaction;
import com.example.banking.repository.AccountRepository;
import com.example.banking.repository.PersonRepository;
import com.example.banking.repository.TransactionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AccountServiceTest {

    @Mock
    private AccountRepository accountRepository;
    @Mock
    private PersonRepository personRepository;
    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private AccountService service;

    @Test
    void depositShouldIncreaseBalanceAndPersistTransaction() {
        Account account = new Account();
        account.setIdConta(1L);
        account.setSaldo(BigDecimal.valueOf(100));
        account.setFlagAtivo(true);
        when(accountRepository.findById(1L)).thenReturn(Optional.of(account));

        OperationRequest request = new OperationRequest();
        request.setValor(BigDecimal.valueOf(50));

        service.deposit(1L, request);

        assertEquals(BigDecimal.valueOf(150), account.getSaldo());
        verify(accountRepository).save(account);

        ArgumentCaptor<Transaction> captor = ArgumentCaptor.forClass(Transaction.class);
        verify(transactionRepository).save(captor.capture());
        assertEquals(BigDecimal.valueOf(50), captor.getValue().getValor());
        assertEquals(account, captor.getValue().getConta());
    }

    @Test
    void withdrawShouldThrowWhenInsufficientBalance() {
        Account account = new Account();
        account.setIdConta(1L);
        account.setSaldo(BigDecimal.valueOf(10));
        account.setFlagAtivo(true);
        when(accountRepository.findById(1L)).thenReturn(Optional.of(account));

        OperationRequest request = new OperationRequest();
        request.setValor(BigDecimal.valueOf(20));

        assertThrows(IllegalStateException.class, () -> service.withdraw(1L, request));
        verify(accountRepository, never()).save(any());
        verify(transactionRepository, never()).save(any());
    }

    @Test
    void blockShouldDeactivateAccount() {
        Account account = new Account();
        account.setIdConta(1L);
        account.setFlagAtivo(true);
        when(accountRepository.findById(1L)).thenReturn(Optional.of(account));

        service.block(1L);

        assertFalse(account.getFlagAtivo());
        verify(accountRepository).save(account);
    }
}
