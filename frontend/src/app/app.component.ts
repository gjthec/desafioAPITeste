import { Component } from '@angular/core';
import { AccountComponent } from './account.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccountComponent],
  template: '<h1>Banking App</h1><app-account></app-account>'
})
export class AppComponent {}
