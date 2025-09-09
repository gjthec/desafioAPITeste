import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  cpf = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (this.cpf) {
      this.http.get<number>(`http://localhost:8080/contas/cpf/${this.cpf}`)
        .subscribe({
          next: id => {
            alert('Login realizado com sucesso');
            this.router.navigate(['/account', id]);
          },
          error: () => alert('Conta não encontrada')
        });
    }
  }
}
