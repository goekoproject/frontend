import { CommonModule } from '@angular/common'
import { Component, input, signal } from '@angular/core'
import { CATEGORIES, InfoCertificateComponent, LeadFormComponent, PictureGetUrlPipe, SdgIconsComponent } from '@goeko/business-ui'
import { SafePipe } from '@goeko/coretools'
import { DataSelect, Document, EcosolutionSearchResponse } from '@goeko/store'
import { BadgeModule, ButtonModule, InputFileComponent, PercentageModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import {LineBreakPipe} from '@goeko/business-ui'
@Component({
  selector: 'goeko-project-catalog-detail',
  standalone: true,
  imports: [
    LineBreakPipe,
    CommonModule,
    TranslateModule,
    BadgeModule,
    SdgIconsComponent,
    SafePipe,
    InputFileComponent,
    PictureGetUrlPipe,
    PercentageModule,
    LeadFormComponent,
    ButtonModule,
    InfoCertificateComponent
  ],
  templateUrl: './project-catalog-detail.component.html',
  styleUrl: './project-catalog-detail.component.scss',
})
export class ProjectCatalogDetailComponent {
  public dataSelect = DataSelect as any
  public CATEGORIES = signal(CATEGORIES)
  ecosolutionSearchDetail = input.required<EcosolutionSearchResponse>()
  ecosolutionId = input.required<string>()

  goBack = () => window.history.back()

  downloadCertified = (certifiedFile: Document) => {
    if (certifiedFile?.url) {
      window.open(certifiedFile.url, '_blank')
    }
  }
}
