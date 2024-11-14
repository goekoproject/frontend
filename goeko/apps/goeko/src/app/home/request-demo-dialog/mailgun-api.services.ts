import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { VAR_GENERAL } from '@goeko/business-ui'
import { environment } from 'apps/goeko/src/environments/environment.prod'
import { Observable } from 'rxjs'
import { EmailMessage } from './email-message.model'

const DOMAIN = 'email-stage.goeko.ch'
const URL = 'https://api.eu.mailgun.net'

@Injectable()
export class MailgunApiService {
  private _mg!: any

  constructor(public _http: HttpClient) {
    /*    const mailgun = new Mailgun(FormData)
    this._mg = mailgun.client({
      url: URL,
      username: 'api',
      key: environment.mailGunApiKey,
    }) */
  }

  sendEmail(data: { subject: string; text: string }) {
    return new Observable((observer) => {
      this._mg.messages
        .create(DOMAIN, { ...data, to: VAR_GENERAL.GOEKO_EMAIL })
        .then((msg: any) => {
          observer.next(msg)
          observer.complete()
        })
        .catch((err: any) => {
          observer.error(err)
        })
    })
  }

  sendEmailV2(message: EmailMessage): Observable<any> {
    return this._http.post<any>(environment.baseUrl + `/v1/temp/request/email`, message)
  }
}
