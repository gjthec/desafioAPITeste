import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account.component.html'
})
export class AccountComponent {
  accountId?: number;
  balance?: number;

  constructor(private http: HttpClient) {}

  load() {
    if (this.accountId != null) {
      this.http.get<number>(`http://localhost:8080/contas/${this.accountId}/saldo`)
        .subscribe(b => this.balance = b);
    }
  }
}
