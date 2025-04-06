import { CommonModule } from '@angular/common'
import { Component, inject, input } from '@angular/core'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { DialogNewProjectComponent, MessageService } from '@goeko/business-ui'
import { EcosolutionsTaggingService, SmeRequestResponse, SummarySme, TAGGING, TaggingResponse } from '@goeko/store'
import { ButtonModule, CardProductComponent, DialogService, NotificationModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { PartnerService } from './../../../../../../libs/store/src/lib/partner/partner.service'
import { DashboardSmeService } from './dashboard-sme.service'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'goeko-dashboard-sme',
  standalone: true,
  templateUrl: './dashboard-sme.component.html',
  styleUrls: ['./dashboard-sme.component.scss'],
  imports: [CardProductComponent, TranslateModule, RouterModule, ButtonModule, CommonModule, NotificationModule],
  providers: [MessageService, DashboardSmeService, EcosolutionsTaggingService],
})
export class DashboardSmeComponent {
  private _router = inject(Router)
  public route = inject(ActivatedRoute)
  private _dialogService = inject(DialogService)
  private _partnerService = inject(PartnerService)

  public TAGGING = TAGGING

  public id = input<string>('')
  public summary = input<SummarySme | null>(null)
  public ecosolutionFavourites = input<TaggingResponse[] | null>(null)

  public partners = toSignal(this._partnerService.partners$, { initialValue: [] })
  openNewProjectDialog() {
    this._dialogService
      .open(DialogNewProjectComponent)
      .afterClosed()
      .subscribe((newProject) => {
        this._goToProject(newProject)
      })
  }
  private _goToProject(projects: SmeRequestResponse) {
    this._router.navigate(['../project-form', this.id(), projects.id], {
      relativeTo: this.route.parent,
    })
  }
  showMore(ecosolutionId: string) {
    this._router.navigate([`ecosolutions-detail/${this.id()}/${ecosolutionId}`], { relativeTo: this.route.parent?.parent })
  }


}
