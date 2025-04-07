import { inject, Injectable } from '@angular/core'
import { collection, collectionData, Firestore } from '@angular/fire/firestore'
import { TranslateService } from '@ngx-translate/core'
import { map, Observable, startWith, switchMap } from 'rxjs'
import { Partner } from './partner.interface'

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  private _firestore = inject(Firestore)
  private _translateService = inject(TranslateService)
  private _partners = collection(this._firestore, 'partners')

  private _partners$ = collectionData(this._partners, { idField: 'id' })

  get partners$(): Observable<Partner[]> {
    return this._translateService.onLangChange.pipe(
      startWith({ lang: this._translateService.currentLang || this._translateService.defaultLang }), // Emitir el idioma actual al inicio
      switchMap((langChange) => {
        const currentLang = langChange.lang
        return this._partners$.pipe(
          map((partners) =>
            partners.map((partner) => ({
              ...partner,
              description: partner['description'][currentLang] || partner['description']['en'], // Fallback al inglés
            })),
          ),
        ) as Observable<Partner[]>
      }),
    )
  }
}
