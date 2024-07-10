import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { TranslateChangeService } from '../util/translate-change'
import { EcosolutionsOptions } from './ecosolutions-options'
import { ECOSOLUTIONS_CONFIGURATION } from './ecosolutions.module'
import { Tagging, TaggingFactory } from './tagging'
import { TaggingEnum } from './tagging.enum'

@Injectable({
  providedIn: 'root',
})
export class EcosolutionsTaggingService extends TranslateChangeService {
  constructor(
    private _http: HttpClient,
    @Inject(ECOSOLUTIONS_CONFIGURATION)
    public configuration: EcosolutionsOptions,
  ) {
    super()
    this.changeLang()
  }

  private _createEcosolutions(tag: TaggingEnum, smeId: string, ecosolutionId: string): Observable<Tagging> {
    const bodyByTagging = TaggingFactory.createTagging(tag, smeId, ecosolutionId).tagging()
    return this._http.post<Tagging>(`/v1/ecosolution/search/tagging/smes`, bodyByTagging)
  }

  private _removeEcosolutions(ecosolutionId: string): Observable<Tagging> {
    return this._http.delete<Tagging>(`/v1/ecosolution/search/tagging/smes/${ecosolutionId}`)
  }

  addFavorite(smeId: string, ecosolutionId: string): Observable<Tagging> {
    return this._createEcosolutions(TaggingEnum.FAVOURITES, smeId, ecosolutionId)
  }

  removeFavorite(ecosolutionId: string): Observable<Tagging> {
    return this._removeEcosolutions(ecosolutionId)
  }

  getEcosolutionsByTagging(id: string, tag: TaggingEnum): Observable<any> {
    return this._http.get<any>(`/v1/ecosolution/search/tagging/smes/${id}/details?lang=${this.lang()}?tag=${tag}`)
  }

  getEcosolutionFavourites(id: string): Observable<any> {
    return this.getEcosolutionsByTagging(id, TaggingEnum.FAVOURITES)
  }
  getEcosolutionNotInterested(id: string): Observable<any> {
    return this.getEcosolutionsByTagging(id, TaggingEnum.NOT_INTERESTED)
  }
}
