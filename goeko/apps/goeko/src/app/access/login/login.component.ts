import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { ErrorLogin, errorMessagelogin } from '@goeko/core'
import { AlertComponent, ButtonModule, GoInputModule } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'
import { AccessService } from '../access.services'

@Component({
  selector: 'goeko-login',
  standalone: true,
  imports: [GoInputModule, AlertComponent, ButtonModule, TranslatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'login',
  },
})
export class LoginComponent implements OnInit {
  public typeForm = true
  public formLogin!: FormGroup
  public signUpOk!: boolean
  public showPassword = false
  public changePassword = signal<boolean>(false)
  public errorMsgLogin = signal<string>('')
  constructor(
    private _fb: FormBuilder,
    private _accessService: AccessService,
  ) {}

  ngOnInit(): void {
    this._createFormLogin()
  }

  private _createFormLogin() {
    this.formLogin = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  submit() {
    if (this.formLogin.valid) {
      this._accessService.login(this.formLogin.value).subscribe(
        (res) => {
          console.log('res', res)
        },
        (error) => {
          const errorMsg = errorMessagelogin(error as ErrorLogin)
          console.log('error', errorMsg)
          this.errorMsgLogin.set(`ERROR_MESSAGES.${errorMsg}`)
        },
      )
    }
  }

  tooglePassword() {
    this.showPassword = !this.showPassword
  }
}
