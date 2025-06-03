import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core'
import { ChipCategoryComponent } from '@goeko/business-ui'
import { SolutionResponse } from '@goeko/store'
import { DialogService } from '@goeko/ui'
import { CardRequestComponent } from '../components/card-request.component'
import { DetailRequestOnboardingComponent } from '../detail-request-oboarding/detail-request-onboarding.component'

@Component({
  selector: 'goeko-myideas',
  standalone: true,
  imports: [CommonModule, CardRequestComponent, ChipCategoryComponent],
  templateUrl: './myideas.component.html',
  styleUrl: './myideas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flex flex-col gap-4',
  },
})
export class MyideasComponent {
  private _dialogService = inject(DialogService)
  public myIdeas = input.required<SolutionResponse[]>()

  public category = computed(() => {
    const ideas = this.myIdeas()
    return ideas.length > 0 ? ideas[0].classifications[0].category.label : ''
  })

  public onViewMore(idea: SolutionResponse) {
    this._dialogService
      .open(DetailRequestOnboardingComponent, {
        data: idea,
      })
      .afterClosed()
      .subscribe((res) => {
        console.log(res)
      })
  }
}
