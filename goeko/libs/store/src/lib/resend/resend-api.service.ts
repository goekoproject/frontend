import { HttpClient } from '@angular/common/http'
import { inject, Inject, Injectable } from '@angular/core'
import { CreateEmailOptions, Resend } from 'resend'
import { RESEND_APIKEY } from './resend-token.constants'

@Injectable()
export class ResendApiService {
  private _http = inject(HttpClient)
  private _resend: Resend
  constructor(@Inject(RESEND_APIKEY) private apiKey: string) {
    this._resend = new Resend(apiKey)
  }

  sendEmail(data: CreateEmailOptions) {
    return this._http.post('/send-email', data)
  }
}
