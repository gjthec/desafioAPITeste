import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { StatementTableComponent } from "../statement-table.component";

@Component({
  selector: "app-account",
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
    MatDividerModule,
    MatSnackBarModule,
    StatementTableComponent,
  ],
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent {
  accountId: number;
  balance?: number;
  withdrawLimit?: number;

  depositValue?: number;
  withdrawValue?: number;

  startDate?: string;
  endDate?: string;

  transactions?: any[];

  loadingDeposit = false;
  loadingWithdraw = false;
  loadingStatement = false;

  year = new Date().getFullYear();

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private snack: MatSnackBar
  ) {
    this.accountId = Number(this.route.snapshot.paramMap.get("id"));
  }

  ngOnInit() {
    this.loadBalance();
    this.loadWithdrawLimit();
  }

  isValidAmount(v?: number) {
    return typeof v === "number" && !isNaN(v) && v > 0;
  }

  loadBalance() {
    this.http
      .get<number>(`http://localhost:8080/contas/${this.accountId}/saldo`)
      .subscribe((b) => (this.balance = b));
  }

  loadWithdrawLimit() {
    this.http
      .get<number>(
        `http://localhost:8080/contas/${this.accountId}/limite-diario`
      )
      .subscribe((l) => (this.withdrawLimit = l));
  }

  deposit() {
    if (!this.isValidAmount(this.depositValue)) {
      this.snack.open("Informe um valor de depósito válido", "OK", {
        duration: 2500,
      });
      return;
    }
    this.loadingDeposit = true;
    this.http
      .post(`http://localhost:8080/contas/${this.accountId}/deposito`, {
        valor: this.depositValue,
      })
      .subscribe({
        next: () => {
          this.depositValue = undefined;
          this.loadBalance();
          this.loadWithdrawLimit();
          this.snack.open("Depósito realizado com sucesso", "OK", {
            duration: 2500,
          });
          this.loadingDeposit = false;
        },
        error: () => {
          this.snack.open("Erro ao realizar depósito", "OK", {
            duration: 3000,
          });
          this.loadingDeposit = false;
        },
      });
  }

  withdraw() {
    if (!this.isValidAmount(this.withdrawValue)) {
      this.snack.open("Informe um valor de saque válido", "OK", {
        duration: 2500,
      });
      return;
    }
    this.loadingWithdraw = true;
    this.http
      .post(`http://localhost:8080/contas/${this.accountId}/saque`, {
        valor: this.withdrawValue,
      })
      .subscribe({
        next: () => {
          this.withdrawValue = undefined;
          this.loadBalance();
          this.loadWithdrawLimit();
          this.snack.open("Saque realizado com sucesso", "OK", {
            duration: 2500,
          });
          this.loadingWithdraw = false;
        },
        error: (err) => {
          const msg = err?.error?.message || "Erro ao realizar saque";
          this.snack.open(msg, "OK", { duration: 3500 });
          this.loadingWithdraw = false;
        },
      });
  }

  statement() {
    this.loadingStatement = true;
    const params: string[] = [];
    if (this.startDate) params.push(`startDate=${this.startDate}`);
    if (this.endDate) params.push(`endDate=${this.endDate}`);
    const query = params.length ? "?" + params.join("&") : "";

    this.http
      .get<any[]>(
        `http://localhost:8080/contas/${this.accountId}/extrato${query}`
      )
      .subscribe({
        next: (t) => {
          this.transactions = t;
          this.snack.open("Extrato carregado", "OK", { duration: 2000 });
          this.loadingStatement = false;
        },
        error: () => {
          this.snack.open("Erro ao carregar extrato", "OK", { duration: 3000 });
          this.loadingStatement = false;
        },
      });
  }
}
