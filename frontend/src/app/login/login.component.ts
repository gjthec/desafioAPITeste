import { Component } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { HttpClient } from "@angular/common/http";
import { finalize } from "rxjs/operators";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-login",
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
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  cpf = "";
  loading = false;
  year = new Date().getFullYear();

  constructor(private http: HttpClient, private router: Router) {}

  // Aplica máscara 000.000.000-00 enquanto digita
  maskCpf(value: string = ""): string {
    const v = value.replace(/\D/g, "").slice(0, 11);
    const p1 = v.slice(0, 3);
    const p2 = v.slice(3, 6);
    const p3 = v.slice(6, 9);
    const p4 = v.slice(9, 11);
    let out = p1;
    if (p2) out += "." + p2;
    if (p3) out += "." + p3;
    if (p4) out += "-" + p4;
    return out;
  }

  onCpfInput() {
    this.cpf = this.maskCpf(this.cpf);
  }

  // Validação clássica dos dígitos verificadores do CPF
  isCpfValid(masked: string): boolean {
    const digits = masked.replace(/\D/g, "");
    if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;

    const calc = (base: string, factor: number) => {
      let sum = 0;
      for (let i = 0; i < base.length; i++) sum += +base[i] * (factor - i);
      const rest = (sum * 10) % 11;
      return rest === 10 ? 0 : rest;
    };

    const d1 = calc(digits.slice(0, 9), 10);
    const d2 = calc(digits.slice(0, 10), 11);
    return d1 === +digits[9] && d2 === +digits[10];
  }

  cleanCpf(masked: string): string {
    return masked.replace(/\D/g, "");
  }

  login() {
    if (!this.isCpfValid(this.cpf)) {
      alert("Informe um CPF válido.");
      return;
    }

    const cpfOnlyNumbers = this.cleanCpf(this.cpf);
    this.loading = true;

    this.http
      .get<number>(`http://localhost:8080/contas/cpf/${cpfOnlyNumbers}`)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (id) => {
          alert("Login realizado com sucesso");
          this.router.navigate(["/account", id]);
        },
        error: (err) => {
          const msg =
            err?.status === 404
              ? "Conta não encontrada"
              : "Não foi possível realizar o login";
          alert(msg);
        },
      });
  }
}
