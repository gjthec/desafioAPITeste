import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statement-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statement-table.component.html'
})
export class StatementTableComponent {
  @Input() transactions: any[] = [];
}
