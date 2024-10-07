import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'
import { SdgIconsComponent } from '@goeko/business-ui'
import { DataSelect, EcosolutionSearchResponse } from '@goeko/store'
import { BadgeModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'goeko-project-catalog-detail',
  standalone: true,
  imports: [CommonModule, TranslateModule, BadgeModule, SdgIconsComponent],
  templateUrl: './project-catalog-detail.component.html',
  styleUrl: './project-catalog-detail.component.scss',
})
export class ProjectCatalogDetailComponent {
  public dataSelect = DataSelect as any
  ecosolutionSearchDetail = input.required<EcosolutionSearchResponse>()
}
