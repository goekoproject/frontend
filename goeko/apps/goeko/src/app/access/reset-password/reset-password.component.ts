import { Component, inject, ViewEncapsulation } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AccessService } from '../access.services'

@Component({
  selector: 'goeko-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'reset-password',
  },
})
export class ResetPasswordComponent {
  _accessService = inject(AccessService)
  _fb = inject(FormBuilder)

  public formResetPassword = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
  })

  public resetPassword() {
    if (this.formResetPassword.invalid) {
      return
    }
    const email = this.formResetPassword.value.email as string
    this._accessService.changePassword(email).subscribe((res) => {
      console.log(res)
    })
  }
}
