import { inject, Injectable, signal } from '@angular/core'
import { EcosolutionsTaggingService, SmeService, SummarySme } from '@goeko/store'

@Injectable()
export class DashboardSmeService {
  private _smeServices = inject(SmeService)
  private _ecosolutionTaggingService = inject(EcosolutionsTaggingService)

  public ecosolutionFavourites = signal<any>(null)
  public summary = signal<SummarySme | null>(null)

  constructor() {}

  getDashboardData(id: string) {
    this._smeServices.getDashboardData(id).subscribe((data) => this.summary.set(data.summary))
  }

  getEcosolutionFavourites(id: string) {
    this._ecosolutionTaggingService.getEcosolutionFavourites(id).subscribe((data) => this.ecosolutionFavourites.set(data))
  }
}
