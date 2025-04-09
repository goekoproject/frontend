import { computed, inject, Injectable } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { EcosolutionsTaggingService, SmeDashboard, SmeService, TaggingResponse } from '@goeko/store'
import { PartnerService } from '@goeko/store/partner/partner.service'
import { Observable } from 'rxjs'

@Injectable()
export class DashboardSmeService {
  private _smeServices = inject(SmeService)
  private _ecosolutionTaggingService = inject(EcosolutionsTaggingService)
  private _partnerService = inject(PartnerService)

  private _partners = toSignal(this._partnerService.partners$, { initialValue: [] })
  public emissiumPartner = computed(() => this._partners().find((partner) => partner.page === 'dashboard-sme'))

  getDashboardData(id: string): Observable<SmeDashboard> {
    return this._smeServices.getDashboardData(id)
  }

  getEcosolutionFavourites(id: string): Observable<TaggingResponse[]> {
    return this._ecosolutionTaggingService.getEcosolutionFavourites(id)
  }
}
