import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { SET_SKIP_INTERCEPTOR } from '@goeko/core/lib/constants/skip-interceptor.constants'
import { ClassificationsDocumentsService, PARENT_CODE } from '@goeko/store'
import { TranslateService } from '@ngx-translate/core'
import { distinctUntilChanged, map, Observable, shareReplay, startWith, switchMap } from 'rxjs'

@Injectable()
export class SelectCertificateService {
  private _classificationsDocumentsServices = inject(ClassificationsDocumentsService)
  private _translateService = inject(TranslateService)
  private _http = inject(HttpClient)

  private _getClassificationsDocuments() {
    return this._classificationsDocumentsServices.getTranslatedDocumentTypeDepth()
  }

  getCertificates() {
    return this._getClassificationsDocuments().pipe(
      shareReplay(1),
      map((documents) => documents.find((document) => document.code === PARENT_CODE.CERTIFICATE)?.documentTypes),
    )
  }
  getCertificateTranslated() {
    return this._translateService.onLangChange.pipe(
      startWith(null),
      distinctUntilChanged((prev, curr) => prev?.lang === curr?.lang),
      switchMap(() => this.getCertificates()),
      shareReplay(1),
    )
  }
  viewFileOnBrowser(url: string): void {
    window.open(url, '_blank')
  }

  downloadFile(url: string): Observable<File> {
    const fileName = this._getFileNameFromUrl(url)
    return this._http
      .get(url, {
        responseType: 'blob',
        context: SET_SKIP_INTERCEPTOR,
      })
      .pipe(map((fileBloe) => this._convertBlobToFile(fileBloe, fileName)))
  }

  private _convertBlobToFile(blob: Blob, fileName: string): File {
    return new File([blob], fileName, { type: blob.type })
  }

  private _getFileNameFromUrl(url: string): string {
    return url.split('/').pop() || 'archivo_descargado.pdf'
  }
}
