import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  cpf = '';

  constructor(private router: Router) {}

  login() {
    if (this.cpf) {
      this.router.navigate(['/account', this.cpf]);
    }
  }
}
