import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { StatementTableComponent } from '../statement-table.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, StatementTableComponent],
  templateUrl: './account.component.html'
})
export class AccountComponent {
  accountId: number;
  balance?: number;
  depositValue?: number;
  withdrawValue?: number;
  startDate?: string;
  endDate?: string;
  transactions?: any[];
  withdrawLimit?: number;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.accountId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.loadBalance();
    this.loadWithdrawLimit();
  }

  loadBalance() {
    this.http.get<number>(`http://localhost:8080/contas/${this.accountId}/saldo`)
      .subscribe(b => this.balance = b);
  }

  deposit() {
    if (this.depositValue != null) {
      this.http.post(`http://localhost:8080/contas/${this.accountId}/deposito`, { valor: this.depositValue })
        .subscribe({
          next: () => {
            this.loadBalance();
            this.loadWithdrawLimit();
            alert('Depósito realizado com sucesso');
          },
          error: () => alert('Erro ao realizar depósito')
        });
    }
  }

  withdraw() {
    if (this.withdrawValue != null) {
      this.http.post(`http://localhost:8080/contas/${this.accountId}/saque`, { valor: this.withdrawValue })
        .subscribe({
          next: () => {
            this.loadBalance();
            this.loadWithdrawLimit();
            alert('Saque realizado com sucesso');
          },
          error: () => alert('Erro ao realizar saque')
        });
    }
  }

  statement() {
    const params = [] as string[];
    if (this.startDate) params.push(`startDate=${this.startDate}`);
    if (this.endDate) params.push(`endDate=${this.endDate}`);
    const query = params.length ? '?' + params.join('&') : '';
    this.http.get<any[]>(`http://localhost:8080/contas/${this.accountId}/extrato${query}`)
      .subscribe({
        next: t => {
          this.transactions = t;
          alert('Extrato carregado');
        },
        error: () => alert('Erro ao carregar extrato')
      });
  }

  loadWithdrawLimit() {
    this.http.get<number>(`http://localhost:8080/contas/${this.accountId}/limite-diario`)
      .subscribe(l => this.withdrawLimit = l);
  }
}
