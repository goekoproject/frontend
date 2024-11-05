import { Inject, Injectable } from '@angular/core'
import { CreateEmailOptions, Resend } from 'resend'
import { Observable } from 'rxjs'
import { RESEND_APIKEY } from './resend-token.constants'

@Injectable()
export class ResendApiService {
  private _resend: Resend
  constructor(@Inject(RESEND_APIKEY) private apiKey: string) {
    this._resend = new Resend(apiKey)
  }

  sendEmail(data: CreateEmailOptions) {
    return new Observable((observer) => {
      this._resend.emails
        .send({ ...data, to: 'goekoapp@gmail.com' })
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
