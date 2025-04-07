import { CommonModule } from '@angular/common'
import { Component, computed, inject, input } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { DialogNewProjectComponent, MessageService } from '@goeko/business-ui'
import { BannerPartnerComponent } from '@goeko/business-ui/components/banner-partner/banner-partner.component'
import { EcosolutionsTaggingService, SmeRequestResponse, SummarySme, TAGGING, TaggingResponse } from '@goeko/store'
import { ButtonModule, CardProductComponent, DialogService, NotificationModule } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { PartnerService } from './../../../../../../libs/store/src/lib/partner/partner.service'
import { DashboardSmeService } from './dashboard-sme.service'

@Component({
  selector: 'goeko-dashboard-sme',
  standalone: true,
  templateUrl: './dashboard-sme.component.html',
  styleUrls: ['./dashboard-sme.component.scss'],
  imports: [CardProductComponent, TranslateModule, BannerPartnerComponent, RouterModule, ButtonModule, CommonModule, NotificationModule],
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

  private _partners = toSignal(this._partnerService.partners$, { initialValue: [] })
  public emisiuumPartners = computed(() => this._partners().at(0))
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
    this._goToEcosolutionDetail(ecosolutionId)
  }

  goToPartner(partnerId: string) {
    this._goToEcosolutionDetail(partnerId)
  }

  private _goToEcosolutionDetail(ecosolutionId: string) {
    this._router.navigate([`ecosolutions-detail/${this.id()}/${ecosolutionId}`], { relativeTo: this.route.parent?.parent })
  }
}
