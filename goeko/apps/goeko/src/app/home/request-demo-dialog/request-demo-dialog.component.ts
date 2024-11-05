import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DialogService } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { Validators } from 'ngx-editor'
import { COUNTRIES_EU } from './country.contants'

import { RESEND_APIKEY, ResendApiService } from '@goeko/store'
import { CreateEmailOptions } from 'resend'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'goeko-request-demo-dialog',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule],
  providers: [
    ResendApiService,
    {
      provide: RESEND_APIKEY,
      useValue: environment.resendApiKey,
    },
  ],
  templateUrl: './request-demo-dialog.component.html',
  styleUrl: './request-demo-dialog.component.scss',
})
export class RequestDemoDialogComponent implements OnInit {
  private _dialogService = inject(DialogService)
  private _emailServices = inject(ResendApiService)
  newSector = false
  countries: any

  constructor(private _fb: FormBuilder) {}

  public formRequestDemo!: FormGroup

  ngOnInit(): void {
    this.formRequestDemo = this._fb.group({
      company: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      country: ['', [Validators.required]],
      email: ['', [Validators.required]],
      otherSector: ['', [Validators.required]],
    })

    this.formRequestDemo.controls['sector'].valueChanges.subscribe((res) => {
      if (res === 'Other') {
        this.newSector = true
      } else {
        this.newSector = false
      }
    })
    this.countries = COUNTRIES_EU
  }

  closeDialog(isAccepted: boolean = false) {
    this._dialogService.close(isAccepted)
  }

  send(): void {
    const message = this._buildHtmlMessage()
    this._emailServices
      .sendEmail({
        from: this.formRequestDemo.controls['email'].value,
        html: message,
        subject: 'Request Demo',
      } as CreateEmailOptions)
      .subscribe((res) => {
        if (res) {
          this._dialogService.close()
        }
      })
  }

  private _buildHtmlMessage() {
    return `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333333; /* Color principal */
      background-color: #f9f9f9; /* Color de fondo */
    }
    .container {
      max-width: 600px;
      margin: auto;
      padding: 20px;
      background-color: #ffffff; /* Color de fondo del contenido */
      border: 1px solid #dddddd;
    }
    .header {
      font-size: 24px;
      margin-bottom: 20px;
      color: #0056b3; /* Segundo color */
    }
    .content {
      font-size: 16px;
      line-height: 1.5;
    }
    .label {
      font-weight: bold;
      color: #0056b3; /* Segundo color */
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Your Information
    </div>
    <div class="content">
      <p><span class="label">Company:</span> ${this.formRequestDemo.controls['company'].value}</p>
      <p><span class="label">Sector:</span> ${this.formRequestDemo.controls['sector'].value}</p>
      <p><span class="label">Other:</span> ${this.formRequestDemo.controls['otherSector'].value}</p>
      <p><span class="label">Country:</span> ${this.formRequestDemo.controls['country'].value}</p>
      <p><span class="label">Email:</span> ${this.formRequestDemo.controls['email'].value}</p>
    </div>
  </div>
</body>
</html>
`
  }
}
