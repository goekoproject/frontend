import { inject, Injectable } from '@angular/core'
import { EcosolutionsTaggingService, SmeDashboard, SmeService, TaggingResponse } from '@goeko/store'
import { Observable } from 'rxjs'

@Injectable()
export class DashboardSmeService {
  private _smeServices = inject(SmeService)
  private _ecosolutionTaggingService = inject(EcosolutionsTaggingService)

  getDashboardData(id: string): Observable<SmeDashboard> {
    return this._smeServices.getDashboardData(id)
  }

  getEcosolutionFavourites(id: string): Observable<TaggingResponse[]> {
    return this._ecosolutionTaggingService.getEcosolutionFavourites(id)
  }
}
