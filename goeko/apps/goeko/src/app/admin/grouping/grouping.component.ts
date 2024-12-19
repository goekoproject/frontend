import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { RouterModule } from '@angular/router'
import { ButtonModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { GroupingFormService } from './grouping-form.services'

@Component({
  selector: 'goeko-grouping',
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslateModule, RouterModule],
  templateUrl: './grouping.component.html',
  styleUrl: './grouping.component.scss',
  providers: [GroupingFormService],
})
export class GroupingComponent {
  private _groupingFormService = inject(GroupingFormService)

  public groupingForm = toSignal(this._groupingFormService.getGroupingAll(), { initialValue: [] })

}
