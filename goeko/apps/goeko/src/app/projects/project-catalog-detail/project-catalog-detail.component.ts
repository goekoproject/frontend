import { CommonModule } from '@angular/common'
import { Component, input, signal } from '@angular/core'
import { CATEGORIES, LeadFormComponent, PictureGetUrlPipe, SdgIconsComponent } from '@goeko/business-ui'
import { SafePipe } from '@goeko/coretools'
import { DataSelect, EcosolutionSearchResponse } from '@goeko/store'
import { BadgeModule, InputFileComponent, PercentageModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'goeko-project-catalog-detail',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    BadgeModule,
    SdgIconsComponent,
    SafePipe,
    InputFileComponent,
    PictureGetUrlPipe,
    PercentageModule,
    LeadFormComponent
  ],
  templateUrl: './project-catalog-detail.component.html',
  styleUrl: './project-catalog-detail.component.scss',
})
export class ProjectCatalogDetailComponent {
  public dataSelect = DataSelect as any
  public CATEGORIES = signal(CATEGORIES)
  ecosolutionSearchDetail = input.required<EcosolutionSearchResponse>()
}
