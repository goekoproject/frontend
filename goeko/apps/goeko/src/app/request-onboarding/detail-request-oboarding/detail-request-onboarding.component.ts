import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { ChipCategoryComponent } from '@goeko/business-ui'
import { SolutionResponse } from '@goeko/store'
import { BadgeModule, ButtonModule, DialogService, OVERLAY } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'goeko-detail-request-onboarding',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ChipCategoryComponent, BadgeModule, ButtonModule],
  templateUrl: './detail-request-onboarding.component.html',
  styleUrl: './detail-request-onboarding.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailRequestOnboardingComponent {
  private _dialogService = inject(DialogService)
  dataDialog = inject(OVERLAY, { optional: true }) as SolutionResponse

  public dataRequestOnboarding = computed(() => this.dataDialog)
  public category = computed(() => {
    const ideas = this.dataRequestOnboarding()
    return ideas.classifications[0].category.label
  })

  public onClose() {
    this._dialogService.close()
  }
}
