import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'account/:id', component: AccountComponent }
];
