import { VAR_GENERAL } from '@goeko/business-ui'
import { environment } from 'apps/goeko/src/environments/environment'
import * as FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { IMailgunClient } from 'mailgun.js/Interfaces'
import { Observable } from 'rxjs'

const DOMAIN = 'email-stage.goeko.ch'
const URL = 'https://api.eu.mailgun.net'
export class MailgunApiService {
  private _mg!: IMailgunClient

  constructor() {
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
}
