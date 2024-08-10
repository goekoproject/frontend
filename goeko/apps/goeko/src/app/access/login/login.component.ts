import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AccessService } from '../access.services'

@Component({
  selector: 'goeko-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'login',
  },
})
export class LoginComponent implements OnInit {
  typeForm = true
  formLogin!: FormGroup
  public signUpOk!: boolean
  showPassword = false
  changePassword =signal<boolean>(false)
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
      this._accessService.login(this.formLogin.value)
    }
  }

  tooglePassword() {
    this.showPassword = !this.showPassword
  }


}
