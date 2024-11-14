import { Inject, Injectable, signal } from '@angular/core'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { TranslateService } from '@ngx-translate/core'
import * as contentful from 'contentful'
import { from } from 'rxjs'
import { ContentFulConfig } from './config.interface'
import { CONTENT_FUL_CONFIG } from './content-ful.module'
export enum LangOfLocalecontentFul {
  en = 'en-US',
  fr = 'fr',
}
@Injectable({ providedIn: 'root' })
export class ContentFulService {
  get currentLang() {
    const codeLang = this._translateService.currentLang || this._translateService.defaultLang
    const currentLang = LangOfLocalecontentFul[codeLang as keyof typeof LangOfLocalecontentFul]
    return signal(currentLang)
  }
  constructor(
    @Inject(CONTENT_FUL_CONFIG) public config: ContentFulConfig,
    private _translateService: TranslateService,
  ) {
    this._translateService.onLangChange.subscribe((lang) => {
      if (lang) {
      }
    })
  }

  private _client = contentful.createClient({
    space: this.config.contentFul.spaceId,
    accessToken: this.config.contentFul.token,
  })

  getContentEntry(entryId: string = '15Ahom6oBNAbJP3Mth7y18') {
    return from(this._client.getEntry(entryId))
  }

  getEntryId(entryId: string) {
    return from(
      this._client.getEntry(entryId, {
        locale: this.currentLang(),
      }),
    )
  }
  getEntryIdByHTML(entryId: string) {
    return from(this._getBodyLikeHtml(entryId))
  }
  private async _getBodyLikeHtml(entryId: string) {
    return this._client.getEntry(entryId, { locale: this.currentLang() }).then((entry: any) => {
      const newBody = documentToHtmlString(entry.fields.text)
      const documentlegal = {
        ...entry.fields,
        text: newBody,
      }

      return documentlegal
    })
  }

  getContentType(contentType: string) {
    return from(
      this._client.getEntries({
        content_type: contentType,
        locale: this.currentLang(),
      }),
    )
  }

  getAssetsById(id: string) {
    from(this._client.getAsset(id))
  }
}
