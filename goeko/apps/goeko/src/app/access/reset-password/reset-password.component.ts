import { Component, inject, ViewEncapsulation } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { GoInputModule } from '@goeko/ui'
import { TranslatePipe } from '@ngx-translate/core'
import { AccessService } from '../access.services'

@Component({
  selector: 'goeko-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, GoInputModule, RouterLink, TranslatePipe],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'reset-password',
  },
})
export class ResetPasswordComponent {
  private _accessService = inject(AccessService)
  private _fb = inject(FormBuilder)
  private _route = inject(ActivatedRoute)

  private _userEmail = this._route.snapshot.queryParams['email'] || ''

  public formResetPassword = this._fb.group({
    email: [this._userEmail, [Validators.required, Validators.email]],
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
