import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar>
      Banking App
      <span class="spacer"></span>
      <a mat-button routerLink="/">Login</a>
      <a mat-button routerLink="/create">Criar Conta</a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
