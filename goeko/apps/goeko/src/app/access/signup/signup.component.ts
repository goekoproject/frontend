import { Component, ElementRef, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ERROR_TYPE } from '@goeko/core'
import { DialogService } from '@goeko/ui'
import { AccessService } from '../access.services'
import { SignUp } from '../singup.model'
import { TermsOfServicesComponent } from './terms-of-services.component'
import { USER_TYPE } from '@goeko/store'

const POLICY_PASSWORD = ['passwordPolicy1', 'passwordPolicy2', 'passwordPolicy3', 'passwordPolicy4']
@Component({
  selector: 'goeko-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'signup',
  },
})
export class SignupComponent implements OnInit {
  @ViewChild('inputAcceptConditions') inputAcceptConditions!: ElementRef<HTMLInputElement>
  public userType = USER_TYPE
  public policyPassword = POLICY_PASSWORD
  isErrorPolicyPassword = false
  formSignup!: FormGroup
  selectedActor = signal('sme')
  changePassword = signal<boolean>(false)
  showPassword = signal<boolean>(false)

  constructor(
    private _fb: FormBuilder,
    private _accessService: AccessService,
    private _dialogService: DialogService,
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
          this.isErrorPolicyPassword = !!ERROR_TYPE[error.error.code as keyof typeof ERROR_TYPE]
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
