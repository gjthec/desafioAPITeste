import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>Banking App</h1>
    <nav>
      <a routerLink="/">Login</a> |
      <a routerLink="/create">Criar Conta</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
