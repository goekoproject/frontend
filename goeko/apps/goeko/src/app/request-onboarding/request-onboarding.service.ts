import { inject, Injectable } from '@angular/core'
import { RequestOnboardingService, SolutionRequestCreate, SolutionRequestUpdate } from '@goeko/store'

@Injectable({
  providedIn: 'root',
})
export class RequestOnboardingFacadeService {
  private _requestOnboardingService = inject(RequestOnboardingService)

  constructor() {}

  createRequest(smeId: string, request: SolutionRequestCreate) {
    return this._requestOnboardingService.createSolutionRequest(smeId, request)
  }

  updateRequest(smeId: string, requestId: string, request: SolutionRequestUpdate) {
    return this._requestOnboardingService.updateSolutionRequest(smeId, requestId, request)
  }

  deleteRequest(smeId: string, requestId: string) {
    return this._requestOnboardingService.deleteSolutionRequest(smeId, requestId)
  }

  getRequest(smeId: string) {
    return this._requestOnboardingService.getTranslatedSolutionRequests(smeId)
  }
}
