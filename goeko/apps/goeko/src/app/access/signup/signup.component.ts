import { CommonModule } from '@angular/common'
import { Component, ElementRef, inject, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { errorMessageSignUp, ErrorSignUp, TypeErrorCode } from '@goeko/core'
import { USER_TYPE, USER_TYPE_DESCRIPTION } from '@goeko/store'
import { AlertComponent, ButtonModule, DialogMessageModule, DialogService, GoInputModule, TooltipComponent } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'
import { AccessService } from '../access.services'
import { PasswordPolicyComponent } from '../password-policy/password-policy.component'
import { SignUp } from '../singup.model'
import { TermsOfServicesComponent } from './terms-of-services.component'

@Component({
  selector: 'goeko-signup',
  standalone: true,
  imports: [
    CommonModule,
    TooltipComponent,
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
    ButtonModule,
    GoInputModule,
    PasswordPolicyComponent,
    AlertComponent,
    DialogMessageModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'signup',
  },
})
export class SignupComponent implements OnInit {
  private _dialogService = inject(DialogService)
  @ViewChild('inputAcceptConditions') inputAcceptConditions!: ElementRef<HTMLInputElement>
  public userType = signal(USER_TYPE_DESCRIPTION)
  public formSignup!: FormGroup
  public selectedActor = signal('sme')
  public changePassword = signal<boolean>(false)
  public showPassword = signal<boolean>(false)
  public errorMsgSignup = signal<string>('')
  public isErrorPolicyPassword = signal<boolean>(false)
  constructor(
    private _fb: FormBuilder,
    private _accessService: AccessService,
  ) {}

  ngOnInit(): void {
    this._createFormSignup()
  }
  private _createFormSignup() {
    this.formSignup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      userType: [USER_TYPE.SME, Validators.required],
    })
  }

  submitSignUp() {
    if (this.formSignup.valid) {
      const dataSignUp = new SignUp(this.formSignup.value.email, this.formSignup.value.password, this.formSignup.value.userType)
      this._accessService.signUpAndAccess(dataSignUp).subscribe(
        (res) => {
          this._accessService.afterSignUp()
        },
        (error) => {
          this.isErrorPolicyPassword.set(error.name === TypeErrorCode.PASSSWORD_STRENGTH_ERROR)
          const errorMsg = errorMessageSignUp(error as ErrorSignUp)
          console.log('error', errorMsg)
          this.errorMsgSignup.set(errorMsg)
        },
      )
    }
  }
  getSelectedActor(userType: string) {
    this.formSignup.get('userType')?.setValue(userType)
    this.selectedActor.set(userType)
  }
  openTermsServices() {
    this._dialogService
      .open(TermsOfServicesComponent)
      .afterClosed()
      .subscribe((isAccepted) => {
        this.inputAcceptConditions.nativeElement.checked = isAccepted
      })
  }
}
