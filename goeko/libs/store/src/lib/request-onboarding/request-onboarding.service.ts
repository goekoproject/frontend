import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { TranslateService } from '@ngx-translate/core'
import { map, Observable } from 'rxjs'
import { SolutionRequest, SolutionRequestCreate, SolutionRequestUpdate } from './request-onboarding.model'

@Injectable({
  providedIn: 'root',
})
export class RequestOnboardingService {
  private readonly _translateService = inject(TranslateService)
  private readonly _http = inject(HttpClient)

  lang = toSignal(this._translateService.onLangChange.pipe(map((event) => event.lang)))

  getSolutionRequestsTranslated(smeId: string): Observable<SolutionRequest[]> {
    const url = `/v1/smes/${smeId}/solution-requests/translated?lang=${this.lang()}`
    return this._http.get<SolutionRequest[]>(url)
  }

  getSolutionRequestsTranslatedColleagues(smeId: string, requestedByColleagues: boolean): Observable<SolutionRequest[]> {
    const url = `/v1/smes/${smeId}/solution-requests/translated?lang=${this.lang()}&requestedByColleagues=${requestedByColleagues}`
    return this._http.get<SolutionRequest[]>(url)
  }

  createSolutionRequest(smeId: string, req: SolutionRequestCreate): Observable<SolutionRequest> {
    const url = `/v1/smes/${smeId}/solution-requests`
    return this._http.post<SolutionRequest>(url, req)
  }

  updateSolutionRequest(smeId: string, id: string, req: SolutionRequestUpdate): Observable<SolutionRequest> {
    const url = `/v1/smes/${smeId}/solution-requests/${id}`
    return this._http.put<SolutionRequest>(url, req)
  }

  deleteSolutionRequest(smeId: string, id: string): Observable<void> {
    const url = `/v1/smes/${smeId}/solution-requests/${id}`
    return this._http.delete<void>(url)
  }
}
