import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { DialogService } from '@goeko/ui'
import { TranslateModule } from '@ngx-translate/core'
import { Validators } from 'ngx-editor';
import { COUNTRIES_EU } from './country.contants';
import { environment } from 'apps/goeko/src/environments/environment';

import Mailgun from 'mailgun.js';
import * as FormData from 'form-data';

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({username: 'api', key: environment.mailGunApiKey || 'key-yourkeyhere'});

@Component({
  selector: 'goeko-request-demo-dialog',
  standalone: true,
  imports: [CommonModule, TranslateModule,FormsModule,
    ReactiveFormsModule],
  templateUrl: './request-demo-dialog.component.html',
  styleUrl: './request-demo-dialog.component.scss',
})
export class RequestDemoDialogComponent implements OnInit{

  private _dialogService = inject(DialogService)
  newSector: boolean= false;
  countries: any;

  constructor(
    private _fb: FormBuilder,
  ) {}

  public formRequestDemo!: FormGroup;

  ngOnInit(): void {
    this.formRequestDemo = this._fb.group({
      company: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      country: ['', [Validators.required]],
      email: ['', [Validators.required]],
      otherSector: ['', [Validators.required]],
    })

    this.formRequestDemo.controls['sector'].valueChanges.subscribe(res => {
        if(res === 'Other') {
          this.newSector = true;
        } else {
          this.newSector = false;
        }
    })
    this.countries = COUNTRIES_EU;
  }


  closeDialog(isAccepted: boolean = false) {
    this._dialogService.close(isAccepted)
  }

  send(): void {
    console.log(this.formRequestDemo.value);
    mg.messages.create('email.goeko.ch', {
      from: "Excited User <goeko@email.goeko.ch>",
      to: [this.formRequestDemo.controls['email'].value],
      subject: "Request a demo",
      text: "Testing some Mailgun awesomness!",
      html: "<h1>Testing some Mailgun awesomness!</h1>"
    })
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.error(err)); // logs any error
    this._dialogService.close()

  }

  // getSectorValue(): void {
  //   if(this.formRequestDemo.controls['sector'].value === 'other'){
  //     this.newSector = true;
  //   } else {
  //     this.newSector = false;
  //   }
  // }
}
