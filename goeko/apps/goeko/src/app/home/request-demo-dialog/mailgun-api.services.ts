import { HttpClient } from '@angular/common/http'
import { VAR_GENERAL } from '@goeko/business-ui'
import * as FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { IMailgunClient } from 'mailgun.js/Interfaces'
import { Observable } from 'rxjs'
import { EmailMessage } from './email-message.model'
import { Injectable } from '@angular/core'
import { environment } from 'apps/goeko/src/environments/environment.prod'

const DOMAIN = 'email-stage.goeko.ch'
const URL = 'https://api.eu.mailgun.net'

@Injectable()
export class MailgunApiService {
  private _mg!: IMailgunClient

  constructor(
    public _http: HttpClient
  ) {
    const mailgun = new Mailgun(FormData)
    this._mg = mailgun.client({
      url: URL,
      username: 'api',
      key: environment.mailGunApiKey,
    })
  }

  sendEmail(data: { subject: string; text: string }) {
    return new Observable((observer) => {
      this._mg.messages
        .create(DOMAIN, { ...data, to: VAR_GENERAL.GOEKO_EMAIL })
        .then((msg) => {
          observer.next(msg)
          observer.complete()
        })
        .catch((err) => {
          observer.error(err)
        })
    })
  }

  sendEmailV2(message: EmailMessage) : Observable<any> {
    return this._http.post<any>(environment.baseUrl + `/v1/temp/request/email`, message)
  }
}
