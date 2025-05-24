import { CommonModule } from '@angular/common'
import { Component, computed, inject, input, signal } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  CATEGORIES,
  InfoCertificateComponent,
  LeadFormComponent,
  LineBreakPipe,
  PictureGetUrlPipe,
  SdgIconsComponent,
} from '@goeko/business-ui'
import { SafePipe } from '@goeko/coretools'
import { DataSelect, Document, EcosolutionSearchResponse, FilterByDocumentTypePipe, PARENT_CODE } from '@goeko/store'
import { BadgeModule, ButtonModule, InputFileComponent, PercentageModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
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
    InfoCertificateComponent,
    FilterByDocumentTypePipe,
  ],
  templateUrl: './project-catalog-detail.component.html',
  styleUrl: './project-catalog-detail.component.scss',
})
export class ProjectCatalogDetailComponent {
  private readonly _router = inject(Router)
  private readonly _route = inject(ActivatedRoute)
  public PARENT_CODE = signal(PARENT_CODE)
  public dataSelect = DataSelect as any
  public CATEGORIES = signal(CATEGORIES)
  public smeId = input.required<string>()
  public projectId = input.required<string>()
  ecosolutionSearchDetail = input<EcosolutionSearchResponse>({} as EcosolutionSearchResponse)
  categories = computed(() => this.ecosolutionSearchDetail()?.classifications || [])
  ecosolutionId = input.required<string>()
  categoriesGrouped = computed(
    () => Object.groupBy(this.categories(), (category) => category.category.code)[this.categories().at(0)?.category.code || ''] as any,
  )
  goBack = () => {
    this._router.navigate(['search', this.smeId(), this.projectId()], {
      relativeTo: this._route.parent,
    })
  }

  downloadCertified = (certifiedFile: Document) => {
    if (certifiedFile?.url) {
      window.open(certifiedFile.url, '_blank')
    }
  }
}
