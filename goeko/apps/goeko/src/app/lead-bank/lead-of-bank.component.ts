import { CommonModule } from '@angular/common'
import { Component, inject, input } from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { TableLeadsBankComponent } from '@goeko/business-ui/components/leads-bank/table-leads-bank.component'
import { switchMap } from 'rxjs'
import { LeadBankManagerService } from './lead-bank-manager.service'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'goeko-lead-of-bank',
  standalone: true,
  imports: [CommonModule, TableLeadsBankComponent, TranslatePipe],
  templateUrl: './lead-of-bank.component.html',
  styleUrl: './lead-of-bank.component.scss',
})
export class LeadOfBankComponent {
  private _leadBankManagerService = inject(LeadBankManagerService)
  public id = input.required<string>()

  leads = toSignal(toObservable(this.id).pipe(switchMap((id) => this._leadBankManagerService.getLeads(id))), { initialValue: [] })
}
