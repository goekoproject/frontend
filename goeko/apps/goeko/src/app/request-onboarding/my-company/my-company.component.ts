import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core'
import { ChipCategoryComponent } from '@goeko/business-ui'
import { SolutionRequest } from '@goeko/store'
import { CardRequestComponent } from '../components/card-request.component'

@Component({
  selector: 'goeko-my-company',
  standalone: true,
  imports: [CommonModule, CardRequestComponent, ChipCategoryComponent],
  templateUrl: './my-company.component.html',
  styleUrl: './my-company.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'flex flex-col gap-4',
  },
})
export class MyCompanyComponent {
  public companyIdeas = input.required<SolutionRequest[]>()
  public category = computed(() => {
    const companyIdeas = this.companyIdeas()
    return companyIdeas.length > 0 ? companyIdeas[0].classifications[0].category.label : ''
  })
}
