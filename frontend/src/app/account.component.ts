import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.accountId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.loadBalance();
  }

  loadBalance() {
    this.http.get<number>(`http://localhost:8080/contas/${this.accountId}/saldo`)
      .subscribe(b => this.balance = b);
  }

  deposit() {
    if (this.depositValue != null) {
      this.http.post(`http://localhost:8080/contas/${this.accountId}/deposito`, { valor: this.depositValue })
        .subscribe(() => this.loadBalance());
    }
  }

  withdraw() {
    if (this.withdrawValue != null) {
      this.http.post(`http://localhost:8080/contas/${this.accountId}/saque`, { valor: this.withdrawValue })
        .subscribe(() => this.loadBalance());
    }
  }

  statement() {
    const params = [] as string[];
    if (this.startDate) params.push(`startDate=${this.startDate}`);
    if (this.endDate) params.push(`endDate=${this.endDate}`);
    const query = params.length ? '?' + params.join('&') : '';
    this.http.get<any[]>(`http://localhost:8080/contas/${this.accountId}/extrato${query}`)
      .subscribe(t => this.transactions = t);
  }
}
