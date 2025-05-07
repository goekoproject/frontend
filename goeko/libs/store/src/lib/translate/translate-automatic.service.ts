import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { TranslateAutomatic } from './translate-automatic.interface'

@Injectable({
  providedIn: 'root',
})
export class TranslateAutomaticService {
  private _http = inject(HttpClient)

  createTranslate(translateAutomatic: TranslateAutomatic): Observable<string[]> {
    return this._http.post<string[]>(`/v1/translate`, translateAutomatic)
  }
}
