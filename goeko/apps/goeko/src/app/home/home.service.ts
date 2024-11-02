import { Injectable, signal } from '@angular/core'
import { Router } from '@angular/router'
import { ContentFulService } from '@goeko/store'
import { map } from 'rxjs'

const compareFn = (a: any, b: any) => {
  if (a.order < b.order) return -1
  if (a.order > b.order) return 1
  return 0
}
@Injectable({ providedIn: 'root' })
export class HomeService {
  dataContentTypeSignal = signal<unknown | null>(null)
  entryDataConnecting = signal<any | null>(null)
  entryDataSustainability = signal<any | null>(null)
  entryDataMain = signal<any | null>(null)
  connection = signal<any | null>(null)

  constructor(
    private _contentFul: ContentFulService,
    private _router: Router,
  ) {}

  getContent() {
    return this._contentFul.getContentEntry()
  }

  getEntry(entryId: string) {
    return this._contentFul.getEntryId(entryId)
  }

  getSloganConnecting(entryId: string) {
    this.getEntry(entryId)
      .pipe(map((res) => res.fields))
      .subscribe((entryData: any) => {
        if (entryData) {
          this.entryDataConnecting.set(entryData)
        }
      })
  }
  getSloganSustainability(entryId: string) {
    this.getEntry(entryId)
      .pipe(map((res) => res.fields))
      .subscribe((entryData: any) => {
        if (entryData) {
          this.entryDataSustainability.set(entryData)
        }
      })
  }
  getSloganMain(entryId: string) {
    this.getEntry(entryId)
      .pipe(map((res) => res.fields))
      .subscribe((entryData: any) => {
        if (entryData) {
          this.entryDataMain.set(entryData)
        }
      })
  }

  geConnection(entryId: string) {
    this.getEntry(entryId)
      .pipe(map((res) => res.fields))
      .subscribe((entryData: any) => {
        if (entryData) {
          this.connection.set(entryData)
        }
      })
  }

  getContentType(contentType: string) {
    return this._contentFul.getContentType(contentType).pipe(map((res) => res.items.map((item) => item.fields)))
  }

  getContentTypeSignal(contentType: string) {
    return this._contentFul
      .getContentType(contentType)
      .pipe(
        map((res) => res.items.map((item) => item.fields)),
        map((fields) => fields.sort(compareFn)),
      )

      .subscribe((dataContentTypeSignal) => {
        if (dataContentTypeSignal) {
          this.dataContentTypeSignal.set(dataContentTypeSignal)
        }
      })
  }
  goTologin() {
    this._router.navigate(['/login'])
  }
}
