import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
  imports: [CommonModule, FormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
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
