import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { TranslateChangeService } from '../util/translate-change'
import { FavouritesEcosolutionsTagging, Tagging, TaggingFactory } from './tagging'
import { TaggingEnum } from './tagging.enum'
import { TaggingResponse } from './tagging.interface'

@Injectable({
  providedIn: 'root',
})
export class EcosolutionsTaggingService extends TranslateChangeService {
  private _http = inject(HttpClient)
  constructor() {
    super()
    this.changeLang()
  }

  addFavorite(smeId: string, ecosolutionId: string): Observable<Tagging> {
    return this._createEcosolutions(TaggingEnum.FAVOURITES, smeId, ecosolutionId)
  }
  private _createEcosolutions(tag: TaggingEnum, smeId: string, ecosolutionId: string): Observable<Tagging> {
    const bodyByTagging = TaggingFactory.createTagging(tag, smeId, ecosolutionId)
    return this._http.post<Tagging>(`/v1/ecosolution/search/tagging/smes`, bodyByTagging)
  }

  removeFavorite(smeId: string, ecosolutionId: string): Observable<FavouritesEcosolutionsTagging> {
    return this._removeEcosolutions(smeId, ecosolutionId)
  }

  private _removeEcosolutions(smeId: string, ecosolutionId: string): Observable<FavouritesEcosolutionsTagging> {
    return this._http.delete<FavouritesEcosolutionsTagging>(`/v1/ecosolution/search/tagging/smes/${smeId}/ecosolution/${ecosolutionId}`)
  }
  getEcosolutionFavourites(id: string): Observable<TaggingResponse[]> {
    return this.getEcosolutionsByTagging(id, TaggingEnum.FAVOURITES)
  }
  getEcosolutionNotInterested(id: string): Observable<TaggingResponse[]> {
    return this.getEcosolutionsByTagging(id, TaggingEnum.NOT_INTERESTED)
  }

  getEcosolutionsByTagging(id: string, tag: TaggingEnum): Observable<TaggingResponse[]> {
    return this._http.get<TaggingResponse[]>(`/v1/ecosolution/search/tagging/smes/${id}/details?lang=${this.lang()}&tag=${tag}`)
  }
}
