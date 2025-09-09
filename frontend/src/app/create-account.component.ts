import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface CreateAccountRequest {
  nome: string;
  cpf: string;
  dataNascimento: string;
  limiteSaqueDiario: number;
  tipoConta: number;
}

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-account.component.html'
})
export class CreateAccountComponent {
  account: CreateAccountRequest = { nome: '', cpf: '', dataNascimento: '', limiteSaqueDiario: 0, tipoConta: 1 };
  createdId?: number;

  constructor(private http: HttpClient) {}

  create() {
    this.http.post<any>('http://localhost:8080/contas', this.account)
      .subscribe(res => this.createdId = res.id);
  }
}
