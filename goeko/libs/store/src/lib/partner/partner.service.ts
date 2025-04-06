import { inject, Injectable } from '@angular/core'
import { collection, collectionData, Firestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  firestore = inject(Firestore)
  itemCollection = collection(this.firestore, 'partners')

  private _partners$ = collectionData(this.itemCollection)
  get partners$() {
    return this._partners$
  }
}
