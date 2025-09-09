import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";

interface CreateAccountRequest {
  nome: string;
  cpf: string;
  dataNascimento: string;
  limiteSaqueDiario: number;
  tipoConta: number;
}

@Component({
  selector: "app-create-account",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.scss"],
})
export class CreateAccountComponent {
  account: CreateAccountRequest = {
    nome: "",
    cpf: "",
    dataNascimento: "",
    limiteSaqueDiario: 0,
    tipoConta: 1,
  };

  loading = false;
  year = new Date().getFullYear();

  constructor(private http: HttpClient, private router: Router) {}

  create() {
    this.loading = true;
    this.http
      .post<any>("http://localhost:8080/contas", this.account)
      .subscribe({
        next: () => {
          this.loading = false;
          alert("Conta criada com sucesso");
          this.router.navigate(["/"]);
        },
        error: () => {
          this.loading = false;
          alert("Erro ao criar conta");
        },
      });
  }
}
