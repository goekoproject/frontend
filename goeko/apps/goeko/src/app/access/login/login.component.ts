import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ERROR_TYPE } from '@goeko/core'
import { AccessService } from '../access.services'
import { SignUp } from '../singup.model'

@Component({
  selector: 'goeko-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  typeForm = true
  formLogin!: FormGroup
  formSignup!: FormGroup
  public signUpOk!: boolean
  public isErrorPolicyPassword!: boolean

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

  createFormSignup(typeForm: boolean) {
    this.typeForm = typeForm
    this._createFormSignup()
  }
  private _createFormSignup() {
    this.formSignup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      userType: ['', Validators.required],
    })
  }
  submit() {
    if (this.formLogin.valid) {
      this._accessService.login(this.formLogin.value)
    }
  }
  submitSignUp() {
    if (this.formSignup.valid) {
      const dataSignUp = new SignUp(this.formSignup.value.email, this.formSignup.value.password, this.formSignup.value.userType)
      this._accessService.signUp(dataSignUp).subscribe(
        (res) => {
          this.signUpOk = true
          this.formLogin.patchValue(this.formSignup.value)
        },
        (error) => {
          console.log(error)
          this.isErrorPolicyPassword = !!ERROR_TYPE[error.error.code as keyof typeof ERROR_TYPE]
        },
      )
    }
  }
}
